import { TextFieldType } from "../../Types/inputVariantTypes";
import { useFormik } from 'formik'
import React from 'react'
import { useFetch } from '../../../../hooks/useFetch';
import { useAdminStores } from '../../../../store/RootStore';
import { InputVariant } from '../../Types/Input';
import { InputType } from '../../Types/inputVariantTypes'
import { InputModel } from "../../../../store/admin/models/InputModel";

export const useCreateInput = () => {

  const { applicationStore: { createInput, updateInput }, applicationDetails } = useAdminStores();
  const { startFetch, isLoading } = useFetch();

  const formik = useFormik<InputType>({
    initialValues: {
      groupId: undefined,
      id: undefined,
      isRequired: undefined,
      label: undefined,
      description: undefined,
      field: { id: InputVariant.TextField, value: {} }
    },
    onSubmit: () => _createInput(),
    enableReinitialize: true
  })

  const _createInput = async () => {

    const inputModel: Partial<InputModel> = {
      groupId: formik.values.groupId,
      id: formik.values.id,
      isRequired: formik.values.isRequired,
      label: formik.values.label,
      description: formik.values.description,
      inputUnderTypeId: formik.values.field.id
    }

    switch (formik.values.field.id) {
      case InputVariant.TextField:
        inputModel.textField = formik.values.field.value;
        break;

      case InputVariant.PhoneField:
        inputModel.numberPhoneField = formik.values.field.value;
        break;

      case InputVariant.NumberField:
        inputModel.numberField = formik.values.field.value;
        break;

      case InputVariant.DateField:
        inputModel.dateField = formik.values.field.value;
        break;
    }

    const { error, validateErrors } = await startFetch(() => createInput(inputModel));

    if (error) {
      formik.setErrors(validateErrors);
    }
  }

  return {
    formik,
    applicationDetails
  }
}
