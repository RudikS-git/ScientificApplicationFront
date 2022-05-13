import dayjs from 'dayjs'
import React from 'react'
import { PagedItems } from '../../../Models/PagedItems'
import { Button } from '../../../UI/Button/Button'
import { Mark } from '../../../UI/Mark/Mark'
import { Table } from '../../../UI/Table/Table'
import { ApplicationSubmissionState, ApplicationSubmissionStateEnum, ApplicationSubmissionType } from '../../Types/ApplicationSubmission'
import { ApplicationStateMark } from '../ApplicationStateMark'
import classes from './ApplicationSubmissionTable.module.scss';

interface ApplicationSubmissionTableProps {
  pagedApplicationSubmissions?: PagedItems<ApplicationSubmissionType>,
  renderActionNode(it: ApplicationSubmissionType): React.ReactNode | undefined
}

export const ApplicationSubmissionTable = (props: ApplicationSubmissionTableProps) => {

  const { pagedApplicationSubmissions, renderActionNode } = props || {};

  return (
    <Table
      className={classes.submissionTable}
      headerRow={{
        id: 1,
        columns: [
          "ID",
          "Дата",
          "Наименованиие",
          "Рег.номер",
          "Статус",
          "",
        ],
      }}
      bodyRows={
        pagedApplicationSubmissions?.items?.map((it: ApplicationSubmissionType) => {
          return {
            id: it.id,
            columns: [
              it.id?.toString(),
              dayjs(it.created).format('DD.MM.YYYY'),
              it.name,
              `RN-${it.id}`,
              (<ApplicationStateMark state={it.applicationState} />),

              <div className={classes.manageBlock}>
                {renderActionNode && renderActionNode(it)}
              </div>
            ],
          }
        })
      }

    /* // pagination={{
      //   perPages: perPages,
      //   page: Number(page) || 1,
      //   perPage: Number(perPage) || 15,
      //   count: pagedApplications?.totalCount,
      //   changePageHandler: (newPage: number, perPage: number) => navigate(`/admin/applications/${newPage}/${perPage}`),
      //   changeRowsPerPageHandler: (perPage: number) => navigate(`/admin/applications/1/${perPage}`)
      // }} */
    />
  )
}
