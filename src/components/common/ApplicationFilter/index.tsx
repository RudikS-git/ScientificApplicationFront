import { DesktopDatePicker } from '@mui/lab';
import { Collapse, Divider, MenuItem, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'
import { Button } from '../../../UI/Button/Button';
import { Select } from '../../../UI/Select';
import { ApplicationSubmissionState } from '../../Types/ApplicationSubmission';
import classes from './ApplicationFilter.module.scss';
import { ApplicationFilterOptions, useApplicationFilter } from './useApplicationFilter';

interface ApplicationFilterProps {
  applicationStates: ApplicationSubmissionState[];
  collapseIn: boolean,
  setCollapseIn(value: boolean): void,
}

export const ApplicationFilter = ({ applicationStates, collapseIn, setCollapseIn }: ApplicationFilterProps) => {

  const { filterState, setFilterState, resetFilter, launchFilter } = useApplicationFilter({ setCollapseIn });

  return (
    <Collapse in={collapseIn}>
      <div className={classes.root}>
        <TextField
          label="ID"
          size="small"
          value={filterState.id || ''}
          onChange={(e) => setFilterState({ id: Number(e.target.value) })}
        />

        <DesktopDatePicker
          label="Дата начала"
          inputFormat="DD.MM.YYYY"
          mask='__.__.____'
          value={filterState.startDate || ''}
          onChange={(date) => setFilterState({ startDate: date || undefined })}
          // maxDate={filterState.endDate || new Date().toDateString()}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
            />
          )}
        />

        <DesktopDatePicker
          label="Дата конца"
          inputFormat="DD.MM.YYYY"
          mask='__.__.____'
          value={filterState.endDate || ''}
          onChange={(date) => setFilterState({ endDate: date || undefined })}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
            />
          )}
        />

        <TextField
          label="Наименование"
          size="small"
          value={filterState.name || ''}
          onChange={(e) => setFilterState({ name: e.target.value })}
        />

        <Select
          label="Статус"
          size="small"
          options={applicationStates}
          value={filterState.applicationState || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterState({ applicationState: +e.target.value })}
        >
          {
            applicationStates?.map(({ id, name }) => <MenuItem value={id} key={id}>{name}</MenuItem>)
          }
        </Select>

        <div className={classes.btnGroup}>
          <Button
            variant='contained'
            color='error'
            onClick={resetFilter}
          >
            Сбросить
          </Button>

          <Button
            variant='contained'
            onClick={launchFilter}
          >
            Фильтровать
          </Button>
        </div>
      </div>
      <Divider />
    </Collapse>
  )
}
