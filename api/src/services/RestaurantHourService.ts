import { PrismaClient, Restaurant_Hour } from "@prisma/client";
import { RestaurantHourRequest } from "@src/models/requests/RestaurantHourRequest";
import { BadRequestError, ConflictError, NotFound } from "@src/util/errors/ApiError";
import { validateInputs } from "@src/util/validate";
import { validate } from "class-validator";

const prisma = new PrismaClient()

export class RestaurantHourService {
  public async createHour(hours: RestaurantHourRequest) {  
    const restaurantHour = await validateInputs(hours,RestaurantHourRequest)
   
    const existingHour = await prisma.restaurant_Hour.findFirst({
      where: { days_of_week_id: hours.days_of_week_id }
    })

    if(existingHour)
      throw new ConflictError("A schedule for this day already exists. Please modify the existing hours or choose a different day.")
  
    return await prisma.restaurant_Hour.create({
      data: {
        open_time: restaurantHour.open_time,
        close_time: restaurantHour.close_time,
        is_closed: restaurantHour.is_closed,
        is_24_hours: restaurantHour.is_24_hours,
        days_of_week_id: restaurantHour.days_of_week_id,
        restaurant_id: restaurantHour.restaurant_id
      }
    })
  }

  public async getHoursForLoggedRestaurant(restaurant_id: string): Promise<Restaurant_Hour[]> {
    const hours = await prisma.restaurant_Hour.findMany({
      where: { restaurant_id },
      include: { 
        Days_of_week: true  
      }
    })
    
    if(!hours)
      throw new NotFound('Hours not found!')

    return hours
  }

  public async getHourById(id: number) {
    const hour = await prisma.restaurant_Hour.findFirst({
      where: { id }
    })

    if(!hour)
      throw new NotFound('Hour not found')

      return hour
  }

  public async updateHourById(hours: RestaurantHourRequest, id: number): Promise<Restaurant_Hour> {
    const restaurantHour = new RestaurantHourRequest();
    restaurantHour.open_time = hours.open_time;
    restaurantHour.close_time = hours.close_time;
    restaurantHour.is_closed = hours.is_closed;
    restaurantHour.is_24_hours = hours.is_24_hours;

    const validateErrors = await validate(restaurantHour);
    if (validateErrors.length > 0) {
      throw new BadRequestError("Some fields are missing or invalid.");
    }

    const existingHour = await prisma.restaurant_Hour.findFirst({
      where: { id }
    })

    if (!existingHour) {
      throw new NotFound("The specified schedule for this restaurant does not exist.");
    }

    const updatedHour = await prisma.restaurant_Hour.update({
      where: {
        id: existingHour.id,
      },
      data: {
        open_time: restaurantHour.open_time,
        close_time: restaurantHour.close_time,
        is_closed: restaurantHour.is_closed,
        is_24_hours: restaurantHour.is_24_hours,
      },
    });

    return updatedHour;
  }
}