import { TextField } from "./../../../UI/TextField/TextField";
import { InputVariant } from "../../../components/Types/Input";
import { DateFieldType, NumberFieldType, PhoneFieldType, TextFieldType } from "../../../components/Types/inputVariantTypes";

export interface InputModel {
  groupId?: number,
  id?: number,
  inputFieldId?: number,
  isRequired?: boolean,
  label?: string,
  description?: string,

  inputUnderTypeId: InputVariant,
  textField: TextFieldType,
  numberField: NumberFieldType,
  dateField: DateFieldType,
  numberPhoneField: PhoneFieldType
}
