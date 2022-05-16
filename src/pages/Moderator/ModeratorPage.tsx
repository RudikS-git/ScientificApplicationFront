import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ManageApplications from '../../components/Admin/ManageApplications/ManageApplications'
import { ApplicationDetails } from '../../components/Admin/ApplicationDetails/ApplicationDetails'
import CommonContainer from '../../components/common/CommonContainer/CommonContainer'
import { ApplicationSubmission } from '../../components/Moderator/ApplicationSubmission'
import { ApplicationSubmissions } from '../../components/Moderator/ApplicationSubmissions'
import { Applications } from '../../components/Moderator/Applications'
import { HistorySubmissions } from '../../components/Moderator/HistorySubmissions'
import { authPageHof } from '../Auth/authPageHof'
import { useRootStore } from '../../store/RootStore'
import { ROLES } from '../../constants/roles'
import { observer } from 'mobx-react'

const ModeratorPage = () => {

  const navigate = useNavigate();
  const { authStore: { roles, hasRole } } = useRootStore();

  useEffect(() => {
    if (!hasRole(ROLES.Moderator)) {
      return navigate('/');
    }
  }, [roles])

  return (
    <CommonContainer>
      <Routes>
        <Route path="/">
          <Route path="/applications">
            <Route path="history-submission/:id/:applicationSubmissionId">
              <Route path=":page/:perPage" element={<HistorySubmissions />} />
              <Route path="" element={<HistorySubmissions />} />
            </Route>

            <Route path="details/:id/:applicationSubmissionId" element={<ApplicationSubmission />} />
            <Route path="details/:id" element={<ApplicationSubmissions />} />
            <Route path=":page/:perPage" element={<Applications />} />
            <Route path="" element={<Applications />} />
          </Route>
        </Route>
      </Routes>
    </CommonContainer>
  )
}

export default authPageHof(observer(ModeratorPage))