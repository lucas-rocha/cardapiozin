import { validate } from 'class-validator';
import { mapper } from './mapper';
import { BadRequestError } from './errors/ApiError';

export async function validateInputs<T extends Record<string, any>>(
    obj: Partial<T>,
    constructor: new (...args: any[]) => T
): Promise<T>{
    const newObject = mapper(obj, constructor);
    const validationErrors = await validate(newObject);
    console.log(validationErrors)
    if (validationErrors.length > 0) 
        throw new BadRequestError('Some fields are missing or invalid!');  
    return newObject
  }