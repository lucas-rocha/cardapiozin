import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Length,
  Min,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "isTwoDecimalMinValue", async: false })
class IsTwoDecimalMinValue implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    const decimalPattern = /^\d+(\.\d{1,2})?$/;
    return decimalPattern.test(value.toString()) && value >= 0.01;
  }

  defaultMessage(args: ValidationArguments) {
    return "Price must be a number with two decimal places and a minimum value of 0.01.";
  }
}

export class AdditionalItemRequest {
  id: number;

  @IsNotEmpty({
    message: "Category name should not be empty",
  })
  @Length(1, 50)
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Price must be a number with up to two decimal places." }
  )
  @Validate(IsTwoDecimalMinValue) 
  price: number;

  @IsInt()
  @IsNotEmpty({
    message: "Quantity should not be empty",
  })
  @Min(1, {
    message: "Quantity must be a positive integer",
  })
  quantity: number;

  restaurant_id: string;
  isAdditional: boolean;
  isRemoved: boolean;
}
