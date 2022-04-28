import { InputVariant } from "./Input";

export interface InputType {
  groupId?: number,
  id?: number,
  isRequired?: boolean,
  label?: string,
  description?: string,

  field: InputField;
}

export type InputField =
  { id: InputVariant.TextField, value: TextFieldType } |
  { id: InputVariant.DateField, value: DateFieldType } |
  { id: InputVariant.PhoneField, value: PhoneFieldType } |
  { id: InputVariant.NumberField, value: NumberFieldType }

export interface TextFieldType {
  maxLength?: number,
  minLength?: number
}

export interface DateFieldType {
  minDateTime?: Date,
  maxDateTime?: Date
}

export interface PhoneFieldType {
  type?: string
}

export interface NumberFieldType {
  min?: number,
  max?: number
}

export interface StyleType {
  order: number
}