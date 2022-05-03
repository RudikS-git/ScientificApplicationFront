import { InputVariant } from "./Input";

export interface BaseFieldType {
  groupId?: number,
  id?: number,
  inputFieldId: number,
  isRequired?: boolean,
  label?: string,
  description?: string,
}

export type VariantInputTypes = TextFieldType | DateFieldType | PhoneFieldType | NumberFieldType

export interface TextFieldType extends BaseFieldType {
  inputUnderTypeId: InputVariant.TextField,
  maxLength?: number,
  minLength?: number
}

export interface DateFieldType extends BaseFieldType {
  inputUnderTypeId: InputVariant.DateField,
  minDateTime?: Date,
  maxDateTime?: Date
}

export interface PhoneFieldType extends BaseFieldType {
  inputUnderTypeId: InputVariant.PhoneField,
  type?: string
}

export interface NumberFieldType extends BaseFieldType {
  inputUnderTypeId: InputVariant.NumberField,
  min?: number,
  max?: number
}

export interface StyleType {
  order: number
}