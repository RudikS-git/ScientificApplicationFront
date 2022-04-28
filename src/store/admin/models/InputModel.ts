import { TextField } from "./../../../UI/TextField/TextField";
import { InputVariant } from "../../../components/Admin/Types/Input";
import { DateFieldType, InputField, NumberFieldType, PhoneFieldType, TextFieldType } from "../../../components/Admin/Types/inputVariantTypes";

export interface InputModel {
  groupId?: number,
  id?: number,
  isRequired?: boolean,
  label?: string,
  description?: string,

  inputUnderTypeId: InputVariant,
  textField: TextFieldType,
  numberField: NumberFieldType,
  dateField: DateFieldType,
  numberPhoneField: PhoneFieldType
}
