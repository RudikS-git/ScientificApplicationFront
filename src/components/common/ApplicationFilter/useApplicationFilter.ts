import { useLocation } from "react-router-dom";
import React, { useEffect, useReducer } from 'react'
import { ApplicationSubmissionStateEnum } from '../../Types/ApplicationSubmission'
import queryString from 'query-string';
import { useNavigate } from 'react-router';

export interface ApplicationFilterOptions {
  id: number,
  name: string,
  startDate: string,
  endDate: string,
  applicationState: ApplicationSubmissionStateEnum
}

interface UseApplicationFilterProps {
  setCollapseIn(value: boolean): void,
}

// <Key extends keyof ApplicationFilterOptions, Type extends ApplicationFilterOptions[Key]>

export const useApplicationFilter = ({ setCollapseIn }: UseApplicationFilterProps) => {

  const navigate = useNavigate();
  const location = useLocation();

  const filterDispatcher = (state: ApplicationFilterOptions, newState: Partial<ApplicationFilterOptions>) => {
    return ({
      ...state,
      ...newState,
    })
  }

  const [filterState, setFilterState] = useReducer(filterDispatcher, {} as ApplicationFilterOptions);

  useEffect(() => {
    const obj = queryString.parse(location.search);
    setFilterState(obj)

    if (Object.keys(obj).length != 0) {
      setCollapseIn(true);
    }
  }, [location.search])

  const launchFilter = () => {
    if (filterState) {
      const query = queryString.stringify(filterState)

      navigate({
        pathname: location.pathname,
        search: `?${query}`,
      });
    }
  }

  const resetFilter = () => {
    setFilterState({ id: undefined, name: undefined, startDate: undefined, endDate: undefined, applicationState: undefined });
    navigate({
      pathname: location.pathname,
      search: undefined,
    });
  }

  return {
    filterState,
    setFilterState,
    launchFilter,
    resetFilter
  }
}
