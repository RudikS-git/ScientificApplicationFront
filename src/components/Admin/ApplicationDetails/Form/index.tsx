import React from 'react'
import { Button } from '../../../../UI/Button/Button';
import { Table } from '../../../../UI/Table/Table';
import { FieldTable } from '../FieldTable';
import { Toolbar } from '../Toolbar'
import { useForm } from './useForm';
import classes from './Form.module.scss';
import { useAdminStores } from '../../../../store/RootStore';
import { observer } from 'mobx-react';

const _Form = () => {

  const { applicationStore: { createInput, updateInput }, applicationDetails } = useAdminStores();

  return (
    <div className={classes.root}>
      <Toolbar />

      {
        applicationDetails.application?.applicationGroups?.map(it => {
          return (
            <FieldTable
              key={it.id}
              groupName={it.name}
              groupId={it.id}
              fields={it.inputFields} />
          )
        })
      }

    </div>
  )
}

const Form = observer(_Form);
export { Form }
