/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu_item, PrismaClient } from "@prisma/client";
import { MenuItemRequest } from "@src/models/requests/MenuItemRequest";
import { MenuItemResponse } from "@src/models/responses/MenuItemResponse";
import {ConflictError, NotFound, UnprocessableError } from "@src/util/errors/ApiError";
import { validateInputs } from "@src/util/validate";
import { S3Service } from "./S3Service";
import { MenuItemUpdate } from "@src/models/requests/MenuItemUpdateRequest";
import { MenuItensInCategoryResponse } from "@src/models/responses/MenuItensInCategoryResponse";
import { paths } from "@src/util/pathImages";
import { CategoryService } from "./CategoryService";
import { AdditionalItemService } from "./AdditionalItemService";
import PrismaClientSingleton from "@src/databases/PrismaClient";
import { AdditionalItemRequest } from "@src/models/requests/AdditionalItemRequest";

export class MenuItemService {
  constructor(
    private s3Service: S3Service = new S3Service(),
    private categoryService: CategoryService = new CategoryService(),
    private additionalItemService: AdditionalItemService = new AdditionalItemService(),
    private prisma = PrismaClientSingleton.getInstance()

) {}

  public async createMenuItem(menuItem: MenuItemRequest, file?: Express.Multer.File): Promise<Menu_item> {

    const exist = await this.prisma.menu_item.findUnique({ where: { item_name: menuItem.item_name, restaurant_id: menuItem.restaurant_id } })
    if(exist)
      throw new ConflictError('Item name already exists!')

    await validateInputs(menuItem,MenuItemRequest)

   
    const result = await this.prisma.$transaction(async (transaction) => {
      const newMenuItem = await transaction.menu_item.create({
        data: {
          item_name: menuItem.item_name,
          price: menuItem. price,
          image: file? file.filename: null,
          description: menuItem.description,
          serving: menuItem.serving,
          visible: menuItem.visible,
          quantity: menuItem.quantity,
          unit_id: menuItem.unit_id,
          unit_measure: menuItem.unit_measure,
          restaurant_id: menuItem.restaurant_id
        }
      })

      const createdCategories = await this.categoryService.createCategories(
        {categoriesList:menuItem.categoriesCreated, restaurant_id: menuItem.restaurant_id}   
          , 100
          , file? file : null
          , transaction)

      const categoriesCreatedAndMenuitem = createdCategories.map(category => ({
        category_id: category.id,
        menuItem_id: newMenuItem.id
      }));

      const chosenCategoriesAndMenuItem = menuItem.categoryIds? menuItem.categoryIds.map(categoryId =>({
        category_id: categoryId,
        menuItem_id: newMenuItem.id
      })) : []

      await this.categoryService.addMenuItemInCategory([...categoriesCreatedAndMenuitem,...chosenCategoriesAndMenuItem], menuItem.restaurant_id,transaction)
      const addItems = await this.additionalItemService.createAdditionalItems(menuItem.additionalItemCreated, menuItem.restaurant_id, transaction)

      const itemIds = addItems.reduce(
        (acc, item) => {
          const current = menuItem.additionalItemCreated.find(x=>x.name == item.name)
          if (current?.isAdditional) {
            acc.additionalIds.push(item.id);
          }
          if (current?.isRemoved) {
            acc.removeIds.push(item.id);
          }
          return acc;
        },
        { additionalIds: [], removeIds: [] } as { additionalIds: number[]; removeIds: number[] }
      );
     
      const addItemsIds =  Array.from(new Set([...(menuItem.additionalItemIds || []), ...(itemIds.additionalIds || [])]))
      const removeItemsIds = Array.from(new Set([...(menuItem.removeAdditionalItemIds || []), ...(itemIds.removeIds || [])]))

      if(addItemsIds.length > 0 || removeItemsIds.length > 0){
        await this.additionalItemService.additionalItemInMenuItem({
          addAdditionalItemsIds: addItemsIds,
          removeAdditionalItemsIds: removeItemsIds,
          menuItem_id: newMenuItem.id,
        }, menuItem.restaurant_id, transaction)
      }
   
      if(file)
        this.s3Service.uploadImage(file)

      return newMenuItem
    })

    return result
  }

  public async getMenuItem(): Promise<MenuItensInCategoryResponse[]> {

    const categoriesWithProducts = await this.prisma.category.findMany({
      include: {
        Menu_item_Category: {
          include: {
            Menuitem: true, 
          },
        },
      },
    });
    
    const result = categoriesWithProducts.map(category => ({
      category: category.name,
      anchor: category.name.trim().replace(/\s+/g, '-'),
      itens: category.Menu_item_Category.map(menuItemCategory => ({
        id: menuItemCategory.Menuitem.id,
        item_name: menuItemCategory.Menuitem.item_name,
        price: menuItemCategory.Menuitem.price,
        description: menuItemCategory.Menuitem.description,
        image: menuItemCategory.Menuitem.image ? paths.menuItemsPath + menuItemCategory.Menuitem.image : null
      }))
    }));

    return result
  }

  public async getMenuItemById(id: number): Promise<MenuItemResponse> {
    const menuItem = await this.prisma.menu_item.findUnique({
      where: { id },
      include: {
        menu_item_additional_item: {
          include: {
            additional_item: true,
          },
        },
        Menu_item_Category:{
          include: {
            Category: true,
          }
        }
      },
    })

    if(!menuItem)
      throw new NotFound('Menu item not found!')

    return {
      id: menuItem.id,
      name: menuItem.item_name,
      description: menuItem.description,
      image: menuItem.image,  
      price: menuItem.price,
      quantity: menuItem.quantity,
      unit_id: menuItem.unit_id,
      visible: menuItem.visible,
      category: menuItem.Menu_item_Category.map(x => x.category_id),
      add_item: menuItem.menu_item_additional_item
        .filter((item) => item.add_item)
        .map((item) => ({
          name: item.additional_item.name,
          price: Number(item.additional_item.price),
          quantity: item.additional_item.quantity,
        })),
      remove_item: menuItem.menu_item_additional_item
        .filter((item) => item.remove_item)
        .map((item) => ({
          name: item.additional_item.name,
          price: Number(item.additional_item.price),
          quantity: item.additional_item.quantity,
        })),
    };
  }

  public async updateMenuItemById(menuItemUpdate: MenuItemUpdate, file?: Express.Multer.File): Promise<Menu_item> {
    
    const menuitem = await this.prisma.menu_item.findUnique({ where: { id: menuItemUpdate.id }})
    
    if(!menuitem)
      throw new NotFound('Menu item not found!')
   
    if(menuItemUpdate.categoryIds.length == 0 && menuItemUpdate.categoriesCreated.length == 0)
      throw new UnprocessableError('At least there should be a category')

    const result = await this.prisma.$transaction(async (transaction) => {

      const updatedMenuItem = await this.prisma.menu_item.update({
        where: { id: menuItemUpdate.id  },
        data: {
          item_name: menuItemUpdate.item_name,
          price: menuItemUpdate.price,
          image: file? file.filename : (menuItemUpdate.removeImage? null : menuitem.image),
          description: menuItemUpdate.description,
          serving: menuItemUpdate.serving,
          visible: menuItemUpdate.visible,
          quantity: menuItemUpdate.quantity,
          unit_id: menuItemUpdate.unit_id,
          unit_measure: menuItemUpdate.unit_measure,
          updated_at: new Date()
        }
      })

      await this.categoryService.removeMenuItemInCategory(menuItemUpdate.id, transaction)
      
      const createdCategories = menuItemUpdate.categoriesCreated ? await this.categoryService.createCategories(
        {categoriesList:menuItemUpdate.categoriesCreated, restaurant_id: menuItemUpdate.restaurant_id}   
          , 100
          , file? file : null
          , transaction) : []

          const categoriesCreatedAndMenuitem = createdCategories ? createdCategories.map(category => ({
            category_id: category.id,
            menuItem_id: menuItemUpdate.id
          })) : [];
    
          const chosenCategoriesAndMenuItem = menuItemUpdate.categoryIds? menuItemUpdate.categoryIds.map(categoryId =>({
            category_id: categoryId,
            menuItem_id: menuItemUpdate.id
          })) : []
    
          await this.categoryService.addMenuItemInCategory([...categoriesCreatedAndMenuitem,...chosenCategoriesAndMenuItem], menuItemUpdate.restaurant_id,transaction)
          const addItems = menuItemUpdate.additionalItemCreated? 
            await this.additionalItemService.createAdditionalItems(menuItemUpdate.additionalItemCreated, menuItemUpdate.restaurant_id, transaction) : []
    
      const itemIds = addItems.reduce(
        (acc, item) => {
          const current = menuItemUpdate.additionalItemCreated.find(x=>x.name == item.name)
          if (current?.isAdditional) {
            acc.additionalIds.push(item.id);
          }
          if (current?.isRemoved) {
            acc.removeIds.push(item.id);
          }
          return acc;
        },
        { additionalIds: [], removeIds: [] } as { additionalIds: number[]; removeIds: number[] }
      );
     
      const addItemsIds =  Array.from(new Set([...(menuItemUpdate.additionalItemIds || []), ...(itemIds.additionalIds || [])]))
      const removeItemsIds = Array.from(new Set([...(menuItemUpdate.removeAdditionalItemIds || []), ...(itemIds.removeIds || [])]))

      if(addItemsIds.length > 0 || removeItemsIds.length > 0){
        await this.additionalItemService.additionalItemInMenuItem({
          addAdditionalItemsIds: addItemsIds,
          removeAdditionalItemsIds: removeItemsIds,
          menuItem_id: menuItemUpdate.id,
        }, menuItemUpdate.restaurant_id, transaction)
      }

      if (file) {
        if (!menuitem.image) 
            this.s3Service.uploadImage(file);
        else if (menuItemUpdate.removeImage) {
            this.s3Service.deleteImage(menuitem.image);
            this.s3Service.uploadImage(file);
        }
      } else if (menuitem.image && menuItemUpdate.removeImage)    
        this.s3Service.deleteImage(menuitem.image);
          
      return updatedMenuItem;
      
  })

  return result
  }

  public async deleteMenuItem(id: number){
  
   const exists = await this.prisma.menu_item.findUnique({where:{id}})
   
   if(!exists)
    throw new NotFound("throw new NotFound")
  
   const result = await this.prisma.$transaction(async (transaction)=>{
      await transaction.menu_item_Category.deleteMany({where:{menu_item_id: id}})
      await transaction.menu_Item_Additional_Item.deleteMany({where:{menu_item_id: id}})
      const menuItem = await transaction.menu_item.delete({where:{id}})
      if(menuItem.image)
        this.s3Service.deleteImage(menuItem.image)
      return menuItem
    })
    return result
  } 

  public async visibilityMenuItem(id: number) {

    const menuItem = await this.prisma.menu_item.findUnique({
      where: { id },
      select: { visible: true }
    });
  
    if (menuItem) {
      return await this.prisma.menu_item.update({
        where: { id },
        data: {
          visible: !menuItem.visible, 
        },
      });
    } else {
      throw new NotFound("Menu item not found");
    }
  } 
}