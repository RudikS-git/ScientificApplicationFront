import { TextFieldType } from "../../../Types/inputVariantTypes";
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useFetch } from '../../../../hooks/useFetch';
import { useAdminStores } from '../../../../store/RootStore';
import { InputVariant } from '../../../Types/Input';
import { VariantInputTypes } from '../../../Types/inputVariantTypes'
import { InputModel } from "../../../../store/admin/models/InputModel";
import { toast } from "react-toastify";
import { ManageApplicationStates } from "../../Types/Application";

interface UseCreateInputProps {
  id?: number,
  cancel(): void
}

export const useCreateInput = ({ id, cancel }: UseCreateInputProps) => {

  const { applicationStore: { createInput, updateInput }, applicationDetails } = useAdminStores();
  const { startFetch, isLoading } = useFetch();

  const formik = useFormik<VariantInputTypes>({
    initialValues: {
      groupId: applicationDetails.inputModalData?.groupId,
      id: applicationDetails.inputModalData?.id,
      isRequired: applicationDetails.inputModalData?.isRequired,
      label: applicationDetails.inputModalData?.label || '',
      description: applicationDetails.inputModalData?.description || '',
      inputUnderTypeId: applicationDetails.inputModalData?.inputUnderTypeId || InputVariant.TextField,
      inputFieldId: applicationDetails.inputModalData?.inputFieldId || 0,
    },
    onSubmit: () => _createUpdateInput(),
    enableReinitialize: true
  })

  useEffect(() => {

    if (formik?.values?.inputUnderTypeId !== applicationDetails.inputModalData?.inputUnderTypeId) {
      formik.setFieldValue('id', undefined);
    }

    switch (formik?.values?.inputUnderTypeId) {
      case InputVariant.TextField:
        if (applicationDetails.inputModalData?.inputUnderTypeId === InputVariant.TextField) {
          formik.setFieldValue('minLength', applicationDetails.inputModalData?.minLength || 0)
          formik.setFieldValue('maxLength', applicationDetails.inputModalData?.maxLength || 0)
        }

        break;

      case InputVariant.PhoneField:
        if (applicationDetails.inputModalData?.inputUnderTypeId === InputVariant.PhoneField) {
          formik.setFieldValue('type', applicationDetails.inputModalData?.type || '')
        }

        break;

      case InputVariant.NumberField:
        if (applicationDetails.inputModalData?.inputUnderTypeId === InputVariant.NumberField) {
          formik.setFieldValue('min', applicationDetails.inputModalData?.min || 0)
          formik.setFieldValue('max', applicationDetails.inputModalData?.max || 0)
        }

        break;

      case InputVariant.DateField:
        if (applicationDetails.inputModalData?.inputUnderTypeId === InputVariant.DateField) {
          formik.setFieldValue('minDateTime', applicationDetails.inputModalData?.minDateTime)
          formik.setFieldValue('maxDateTime', applicationDetails.inputModalData?.maxDateTime)
        }

        break;
    }

  }, [formik?.values?.inputUnderTypeId])

  const _createUpdateInput = async () => {

    const inputModel: Partial<InputModel> = {
      groupId: formik.values.groupId,
      id: formik.values.id,
      isRequired: formik.values.isRequired,
      label: formik.values.label,
      description: formik.values.description,
      inputUnderTypeId: formik.values.inputUnderTypeId,
      inputFieldId: formik.values.inputFieldId
    }

    switch (formik.values.inputUnderTypeId) {
      case InputVariant.TextField:
        inputModel.textField = {
          inputUnderTypeId: formik.values.inputUnderTypeId,
          minLength: formik.values.minLength,
          maxLength: formik.values.maxLength,
          inputFieldId: formik.values.inputFieldId
        };
        break;

      case InputVariant.PhoneField:
        inputModel.numberPhoneField = {
          inputUnderTypeId: formik.values.inputUnderTypeId,
          type: formik.values.type,
          inputFieldId: formik.values.inputFieldId
        }
        break;

      case InputVariant.NumberField:
        inputModel.numberField = {
          inputUnderTypeId: formik.values.inputUnderTypeId,
          min: formik.values.min,
          max: formik.values.max,
          inputFieldId: formik.values.inputFieldId
        }
        break;

      case InputVariant.DateField:
        inputModel.dateField = {
          inputUnderTypeId: formik.values.inputUnderTypeId,
          minDateTime: formik.values.minDateTime,
          maxDateTime: formik.values.maxDateTime,
          inputFieldId: formik.values.inputFieldId
        }
        break;
    }

    let request;
    if (!inputModel.id) {
      request = () => createInput(inputModel);
    }
    else {
      request = () => updateInput(inputModel);
    }

    const { error, validateErrors } = await startFetch(request);

    if (error) {
      formik.setErrors(validateErrors);
    }
    else {

      toast('Вы успешно создали текстовое поле', { type: 'success' });
      cancel();
    }
  }

  const cancelModal = () => {
    applicationDetails.inputModalData = undefined;
    cancel();
  }

  return {
    formik,
    applicationDetails,
    cancelModal
  }
}
