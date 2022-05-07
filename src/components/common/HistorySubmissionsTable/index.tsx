import dayjs from 'dayjs'
import { observer } from 'mobx-react'
import React from 'react'
import { PagedItems } from '../../../Models/PagedItems'
import { HistorySubmission } from '../../../store/_types/HistorySubmission'
import { Table } from '../../../UI/Table/Table'
import { ApplicationStateMark } from '../ApplicationStateMark'
import classes from './HistorySubmissionsTable.module.scss';

interface HistorySubmissionsProps {
  pagedHistorySubmissions?: PagedItems<HistorySubmission>,
  changePageHandler(newPage: number, perPage: number): void,
  changeRowsPerPageHandler(perPage: number): void,
  page: number,
  perPage: number,
  perPages: number[]
}

export const HistorySubmissionsTable = ({ pagedHistorySubmissions, page, perPage, changePageHandler, changeRowsPerPageHandler, perPages }: HistorySubmissionsProps) => {

  return (
    <Table
      className={classes.table}
      headerRow={{
        id: 1,
        columns: [
          "ID",
          "Дата",
          "Прошлый статус",
          "Новый статус",
          "Комментарий",
        ],
      }}
      bodyRows={
        pagedHistorySubmissions?.items?.map((it: HistorySubmission) => {
          return {
            id: it.id,
            columns: [
              it.id?.toString(),
              dayjs(it.created).format('DD.MM.YYYY hh:mm'),
              (<ApplicationStateMark state={it.lastApplicationState} />),
              (<ApplicationStateMark state={it.newApplicationState} />),
              it.comment
            ],
          }
        })
      }

      pagination={{
        perPages: perPages,
        page: Number(page) || 1,
        perPage: Number(perPage) || 15,
        count: pagedHistorySubmissions?.totalCount,
        changePageHandler: changePageHandler,
        changeRowsPerPageHandler: changeRowsPerPageHandler
      }}
    />
  )
}
