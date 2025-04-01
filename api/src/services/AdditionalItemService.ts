import { Additional_Item,  Prisma,  PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "@src/databases/PrismaClient";
import { AddAdditionalItemRequest } from "@src/models/requests/AddAdditioalItemRequest";
import { AdditionalItemRequest } from "@src/models/requests/AdditionalItemRequest";
import {BadRequestError, ConflictError, NotFound } from "@src/util/errors/ApiError";
import { validateInputs } from "@src/util/validate";


export class AdditionalItemService {
  constructor(private prisma = PrismaClientSingleton.getInstance()) {}

  public async createAdditionalItems(additionalItems: AdditionalItemRequest[], restaurant_id: string, transaction?: any): Promise<Additional_Item[]> {
  
    this.prisma = transaction ? transaction : this.prisma;

    for (const item of additionalItems) {
        await validateInputs(item, AdditionalItemRequest);
    }

    const existingItems = await this.prisma.additional_Item.findMany({
        where: {
            restaurant_id: restaurant_id,
            name: { in: additionalItems.map(item => item.name) },
        },
    });

    if (existingItems.length > 0) {
        const existingNames = existingItems.map(item => item.name).join(", ");
        throw new ConflictError(`The following Additional Items already exist: ${existingNames}`);
    }

    await this.prisma.additional_Item.createMany({
        data: additionalItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            restaurant_id: restaurant_id,
        })),
    });


    const createdItems = await this.prisma.additional_Item.findMany({
        where: {
            restaurant_id: restaurant_id,
            name: { in: additionalItems.map(item => item.name) },
        },
    });

    return createdItems;
}

    public async updateAdditionalItem(additionalItemUpdate: AdditionalItemRequest): Promise<Additional_Item>{

        await validateInputs(additionalItemUpdate,AdditionalItemRequest)

        const exists = await this.prisma.additional_Item.findFirst({
            where: {
                id: additionalItemUpdate.id,
                restaurant_id: additionalItemUpdate.restaurant_id
            },
        })
    
        if(!exists)
            throw new ConflictError("Additional Item does not exists!")

           return await this.prisma.additional_Item.update({
                where:{id: additionalItemUpdate.id},
                data:{
                    name: additionalItemUpdate.name,
                    quantity: additionalItemUpdate.quantity,
                    price: additionalItemUpdate.price,
                }
            })
    }

    public async deleteAdditionalItem(id: number, restaurant_id: string): Promise<Additional_Item>{

        const exists = await this.prisma.additional_Item
            .findFirst({ where: {id, restaurant_id: restaurant_id} })
           
        if(!exists)
            throw new ConflictError("Additional Item does not exists!")

        return await this.prisma.additional_Item.delete({where:{id}})

    }

    public async additionalItemInMenuItem(
        addAdditionalItemRequest: AddAdditionalItemRequest,
        restaurant_id: string,
        transactionPrisma : Prisma.TransactionClient
    ): Promise<{ success: boolean }> {

        const {menuItem_id, addAdditionalItemsIds, removeAdditionalItemsIds} = addAdditionalItemRequest

        const existMenuitem = await transactionPrisma.menu_item.findFirst({
            where: {
                restaurant_id: restaurant_id,
                id: addAdditionalItemRequest.menuItem_id
            }
        });
    
        if (!existMenuitem) 
            throw new ConflictError("Menu Item does not exist!");
        
    
        const uniqueIds = Array.from(new Set([...addAdditionalItemsIds, 
            ...removeAdditionalItemsIds]));
            
        const removedAddtionalItems = await transactionPrisma.menu_Item_Additional_Item.findMany({
            where:{
                menu_item_id: menuItem_id,
                additional_item_id: {
                    notIn: uniqueIds
                }
            }
        })
        if(removedAddtionalItems.length >0){
            const removedAddtionalItemsIds = removedAddtionalItems.map(x=>x.additional_item_id)
            await transactionPrisma.menu_Item_Additional_Item.deleteMany({
                where: {
                    additional_item_id: {
                        in: removedAddtionalItemsIds
                    }
                }
            });
        }
        
        const additionalItems = await transactionPrisma.menu_Item_Additional_Item.findMany({
            where: {
                menu_item_id: menuItem_id,
                additional_item_id: {
                    in: uniqueIds
                }
            },
        });
    
        const additionalItemsIds = additionalItems.map(item => item.additional_item_id);
    
        const insertAddItemInMenuitem = uniqueIds
            .filter(id => !additionalItemsIds.includes(id))
            .map(id => ({
                menu_item_id: menuItem_id,
                additional_item_id: id,
                add_item: false,
                remove_item: false,
            }));

    
        if (insertAddItemInMenuitem.length > 0) {                                                                                            
            const createResult = await transactionPrisma.menu_Item_Additional_Item.createMany({
                data: insertAddItemInMenuitem
            });
            
            if (createResult.count === 0) 
                throw new BadRequestError("Failed to add additional items.");
        }
    

        const updateResults = await Promise.all(uniqueIds.map(async id => {
            const result = await transactionPrisma.menu_Item_Additional_Item.updateMany({
                where: {
                    menu_item_id: menuItem_id,
                    additional_item_id: id,
                },
                data: {
                    add_item: addAdditionalItemsIds.includes(id),
                    remove_item: removeAdditionalItemsIds.includes(id),
                }
            });
            
            return result.count;
        }));
    
        await transactionPrisma.menu_Item_Additional_Item.deleteMany({
            where: {
                menu_item_id: menuItem_id,
                add_item: false,
                remove_item: false
            }
        });

        return { success: true }; 
    }
    

    public async getAdditionalItensByRestaurant(restaurant_id: string): Promise<Additional_Item[]>{

        return await this.prisma.additional_Item.findMany({where:{restaurant_id: restaurant_id}})

    }

    public async getAdditionalItemById(additional_item_id: number): Promise<Additional_Item | null>{
        return await this.prisma.additional_Item.findUnique({where: {id: additional_item_id}})
    }

    public async getAdditionalItemsByIds(additional_item_ids: number[], restaurant_id: string): Promise<Additional_Item[] | null>{
        return await this.prisma.additional_Item.findMany({
            where: {
              id: { in: additional_item_ids },
              restaurant_id
            }
          });
    }
}