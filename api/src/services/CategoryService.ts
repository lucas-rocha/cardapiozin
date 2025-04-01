import { Category, Menu_item, PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "@src/databases/PrismaClient";
import { CategoryRequest } from "@src/models/requests/CategoryRequest";
import { CategoryResponse } from "@src/models/responses/CategoryResponse";
import { BadRequestError, ConflictError, NotFound} from "@src/util/errors/ApiError";
import { validateInputs } from "@src/util/validate";

interface MenuItem {
  id: number;
  item_name: string;
  price: number;
  description?: string; 
  serving?: number;     
  quantity?: number;   
  visible: boolean;
}

interface CategoryWithMenuItem {
  id: number;
  name: string;
  image?: string;       
  menuItems: MenuItem[]; 
}


export class CategoryService {
  
  constructor(private prisma = PrismaClientSingleton.getInstance()) {}

  public async createCategories(categoriesValues: {categoriesList: CategoryRequest[]
    , restaurant_id: string }
    , limit: number
    , file: Express.Multer.File | null
    , transaction?: any): Promise<Category[]> {
  
    
    this.prisma = transaction ? transaction : this.prisma;

    await Promise.all(categoriesValues.categoriesList.map(category => validateInputs(category, CategoryRequest)));
    
    const categoryCount = await this.prisma.category.count({
      where: { restaurant_id: categoriesValues.restaurant_id },
    });
  
    if (categoryCount + categoriesValues.categoriesList.length > limit) {
      throw new ConflictError(`The limit of ${limit} categories has been reached for this restaurant.`);
    }
  
    const existingCategories = await this.prisma.category.findMany({
      where: {
        restaurant_id: categoriesValues.restaurant_id,
        name: { in: categoriesValues.categoriesList.map(category => category.name) }
      }
    });
  
    if (existingCategories.length > 0) {
      const existingNames = existingCategories.map(category => category.name).join(", ");
      throw new ConflictError(`The following categories already exist: ${existingNames}`);
    }

      await this.prisma.category.createMany({
        data: categoriesValues.categoriesList.map(category => ({
          name: category.name,
          category_image_id: category.image_id,
          restaurant_id: categoriesValues.restaurant_id
        })),
      });
    
      const createdCategories = await this.prisma.category.findMany({
        where: {
          restaurant_id: categoriesValues.restaurant_id,
          name: { in: categoriesValues.categoriesList.map(category => category.name) }
        },
      });
    
      return createdCategories;

  }
  
  
  
  
public async getAllItemsForCategory(category_id: number, restaurant_id: string):Promise<CategoryResponse>{

  await this.verifyCategory(category_id, restaurant_id);
    
  const categoryWithMenuItems = await this.prisma.category.findUnique({
      where: {
          restaurant_id: restaurant_id,
          id:category_id
      },
      select: {
          id: true,
          name: true,
          category_images: {
              select: {
                  image: true,
              },
          },
          Menu_item_Category: {
              select: {
                  Menuitem: {
                      select: {
                          id: true,
                          item_name: true,
                          price: true,
                          description: true,
                          serving: true,
                          quantity: true,
                          visible: true,
                      },
                  },
              },
          },
      },
  });

  if(!categoryWithMenuItems)
    throw new NotFound("This category does not exist in this restaurant!")

  return {

    id: categoryWithMenuItems.id,
    name: categoryWithMenuItems.name,
    image: categoryWithMenuItems.category_images?.image || null,
    menuItems: categoryWithMenuItems.Menu_item_Category.map(menuItemCategory => ({
        id: menuItemCategory.Menuitem.id,
        item_name: menuItemCategory.Menuitem.item_name,
        price: menuItemCategory.Menuitem.price,
        description: menuItemCategory.Menuitem.description,
        serving: menuItemCategory.Menuitem.serving,
        quantity: menuItemCategory.Menuitem.quantity,
        visible: menuItemCategory.Menuitem.visible,
    })),
  }
      


}
public async getAllItemsForCategories(restaurant_id?: string): Promise<CategoryResponse[]> {
    
    const categoriesWithMenuItems = await this.prisma.category.findMany({
        where: {
            restaurant_id: restaurant_id,
        },
        select: {
            id: true,
            name: true,
            category_images: {
                select: {
                    image: true,
                },
            },
            Menu_item_Category: {
                select: {
                    Menuitem: {
                        select: {
                            id: true,
                            item_name: true,
                            price: true,
                            description: true,
                            serving: true,
                            quantity: true,
                            visible: true,
                        },
                    },
                },
            },
        },
    });

    return categoriesWithMenuItems.map(category => ({
        id: category.id,
        name: category.name,
        image: category.category_images?.image || null,
        menuItems: category.Menu_item_Category.map(menuItemCategory => ({
            id: menuItemCategory.Menuitem.id,
            item_name: menuItemCategory.Menuitem.item_name,
            price: menuItemCategory.Menuitem.price,
            description: menuItemCategory.Menuitem.description,
            serving: menuItemCategory.Menuitem.serving,
            quantity: menuItemCategory.Menuitem.quantity,
            visible: menuItemCategory.Menuitem.visible,
        })),
    }));

}

public async addMenuItemInCategory(
  menuItemCategory: { category_id: number, menuItem_id: number }[], 
  restaurant_id?: string,
  transaction?: any 
): Promise<{ count: number }> {

  const prisma = transaction? transaction : this.prisma
  for (const item of menuItemCategory) {
    await this.verifyCategory(item.category_id, restaurant_id);
  }

  const result = await prisma.menu_item_Category.createMany({
    data: menuItemCategory.map((item) => ({
      menu_item_id: item.menuItem_id,
      category_id: item.category_id,
    })),
    skipDuplicates: true,  
  });

  return { count: result.count };
}

public async removeMenuItemInCategory(menu_item_id: number, transaction?: any): Promise<{ count: number }> {
  const prisma = transaction ? transaction : this.prisma;

   const result = await prisma.menu_item_Category.deleteMany({
    where: {
      menu_item_id: menu_item_id
    },
  });

  return result;  
}

  public async updateCategory(
    category_id: number,
    categoryUpdate: {menuItemId: number[],name: string, imageId: number},
    restaurant_id?: string, 
  ): Promise<{ countAdded: number; countRemoved: number; updatedCategory: Category }> {

      await this.verifyCategory(category_id,restaurant_id)
      const result = await this.prisma.$transaction(async (prisma) => {
      const updatedCategory = await this.prisma.category.update({
        where: { id: category_id },
        data: { name: categoryUpdate.name, category_image_id: categoryUpdate.imageId, updated_at: new Date() },
      });
    
      const currentItemsInCategory = await this.prisma.menu_item_Category.findMany({
        where: {
          category_id: category_id,
        },
        select: {
          menu_item_id: true,
        },
      });
      
      const currentItemIds = currentItemsInCategory.map(item => item.menu_item_id);
      const itemsToRemove = currentItemIds.filter(id => !categoryUpdate.menuItemId.includes(id));
      const removed = await this.prisma.menu_item_Category.deleteMany({
        where: {
          category_id: category_id,
          menu_item_id: {
            in: itemsToRemove,
          },
        },
      });
      const itemsToAdd = categoryUpdate.menuItemId.filter(id => !currentItemIds.includes(id));
      const added = await this.prisma.menu_item_Category.createMany({
        data: itemsToAdd.map((menuItemId) => ({
          menu_item_id: menuItemId,
          category_id: category_id,
        })),
        skipDuplicates: true, 
      });
    
    
      return {
        countAdded: added.count,
        countRemoved: removed.count,
        updatedCategory, 
      };
  })
  return result
  }

  public async deleteCategory(category_id: number, restaurant_id?: string){

    await this.verifyCategory(category_id,restaurant_id)
    const result = await this.prisma.$transaction(async (prisma) => {
        
        await this.prisma.menu_item_Category.deleteMany({
          where: {
            category_id: category_id, 
          },
        });
  
        await this.prisma.category.delete({
          where: {
            id: category_id,  
          },
        });
      });
     return result
  }


  public async getAllCategoriesByRestaurant(restaurantId: string) {
      const categories = await this.prisma.category.findMany({
          where: {
              restaurant_id: restaurantId,
          },
          select: {
              id: true,
              name: true,
              category_images: {
                  select: {
                      image: true,
                  },
              },
          },
      });

      return categories.map(category => ({
          id: category.id,
          name: category.name,
          image: category.category_images?.image || null,
      }));
  }


  private async verifyCategory(category_id: number, restaurant_id?: string){
    const exists= await this.prisma.category.findFirst({
      where: {id: category_id, restaurant_id: restaurant_id},
    });
  
    if (!exists) 
      throw new BadRequestError("This category does not exist in this restaurant");
  }
  
}