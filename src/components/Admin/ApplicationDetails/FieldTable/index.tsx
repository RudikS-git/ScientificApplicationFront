import { observer } from 'mobx-react';
import React from 'react'
import { toast } from 'react-toastify';
import { INPUT_TYPES } from '../../../../constants/inputTypes';
import { useFetch } from '../../../../hooks/useFetch';
import { useAdminStores } from '../../../../store/RootStore';
import { Button } from '../../../../UI/Button/Button'
import { Table } from '../../../../UI/Table/Table'
import { VariantInputTypes } from '../../Types/inputVariantTypes';
import classes from './style.module.scss';

interface FieldTableProps {
  groupName?: string,
  groupId?: number,
  fields?: VariantInputTypes[]
}

export const FieldTable = observer(({ groupName, groupId, fields }: FieldTableProps) => {

  const { applicationStore: { createInput, updateInput, deleteInput }, applicationDetails } = useAdminStores();
  const { open } = applicationDetails?.inputToolModal || {};
  const { startFetch } = useFetch();

  const _deleteInput = async (inputFieldId: number | undefined) => {
    if (inputFieldId) {
      const { errors } = await startFetch(() => deleteInput(inputFieldId));

      if (!errors) {
        const group = applicationDetails?.application?.applicationGroups?.find(it => it.id === groupId);

        if (group) {
          group.inputFields = group.inputFields?.filter(it => it.inputFieldId !== inputFieldId);
          toast("Текстовое поле успешно удалено", { type: "success" });
        }
      }
    }
    else {
      toast("Не удалось удалить текстовое поле", { type: "error" });
    }
  }

  const _openInputModal = async (inputField: VariantInputTypes) => {

    if (inputField && open) {
      applicationDetails.inputModalData = inputField;
      open();
    }
    else {
      toast("Не удалось открыть окно для изменения текстового поля", { type: "error" });
    }
  }

  return (
    <div className={classes.root}>
      <h2>{groupName}</h2>

      <Table
        className={classes.table}
        headerRow={{
          id: 1,
          columns: [
            "ID",
            "Обязательное",
            "Тип",
            "Наименованиие",
            "",
          ],
        }}
        bodyRows={
          fields?.map((it, index) => {
            return {
              id: it.id || index,
              columns: [
                it.id,
                it.isRequired ? "Да" : "Нет",
                INPUT_TYPES[it.inputUnderTypeId],
                it.label,
                <div>
                  <Button onClick={() => _openInputModal(it)}>Изменить</Button>
                  <Button onClick={() => _deleteInput(it.inputFieldId)}>Удалить</Button>
                </div>],
            }
          })
        }
      />
    </div>

  )
})
