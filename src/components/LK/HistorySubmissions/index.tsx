import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useLKStores, useModeratorStores } from '../../../store/RootStore';
import { HistorySubmissionsTable } from '../../common/HistorySubmissionsTable';
import { PageHeader } from '../../common/PageHeader';
import { ToolBar } from '../../common/ToolBar';

const _HistorySubmissions = () => {

  const { applicationStore: { pagedSubmissionApplications, historySubmissions, gitHistorySubmissions } } = useLKStores();
  const perPages = [10, 15, 20, 25]
  const navigate = useNavigate();
  const { id, applicationSubmissionId, page, perPage } = useParams();

  useEffect(() => {
    if (page && perPage) {
      if (perPages.includes(Number(perPage))) {
        gitHistorySubmissions(Number(applicationSubmissionId), Number(page), Number(perPage))
      }
      else {
        navigate(`/my-applications/details/${id}`)
      }
    }
    else {
      gitHistorySubmissions(Number(applicationSubmissionId))
    }

  }, [perPage, id, applicationSubmissionId, page, perPage])

  return (
    <div>
      <PageHeader>
        История заявки № {applicationSubmissionId}
      </PageHeader>

      <ToolBar>
      </ToolBar>

      <HistorySubmissionsTable
        pagedHistorySubmissions={historySubmissions}

        changePageHandler={function (newPage: number, perPage: number): void {
          navigate(`/my-applications/details/${id}/${applicationSubmissionId}/history-submission/${newPage}/${perPage}`)
        }}

        changeRowsPerPageHandler={function (perPage: number): void {
          navigate(`/my-applications/details/${id}/${applicationSubmissionId}/history-submission/1/${perPage}`)
        }}

        page={Number(page)}
        perPage={Number(perPage)}
        perPages={perPages}
      />

    </div>
  )
}

const HistorySubmissions = observer(_HistorySubmissions);
export { HistorySubmissions }