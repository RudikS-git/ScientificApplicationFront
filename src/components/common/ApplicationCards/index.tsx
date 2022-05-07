import React from 'react'
import classes from './ApplicationCards.module.scss';
import { PagedItems } from '../../../Models/PagedItems';
import { Application } from '../../LK/types/Application';
import { Link } from 'react-router-dom';
import { ApplicationCard } from '../ApplicationCard';

interface ApplicationCardsProps {
  pagedApplications?: PagedItems<Application>,
  linkToWithoutId: string
}

export const ApplicationCards = (props: ApplicationCardsProps) => {

  const { pagedApplications, linkToWithoutId } = props || {};

  return (
    <div className={classes.cards}>
      {
        pagedApplications?.items?.map(it => {
          return (
            <Link key={it?.id} to={`${linkToWithoutId}/${it?.id}`}>
              <ApplicationCard {...it} />
            </Link>
          )
        })
      }
    </div>
  )
}
