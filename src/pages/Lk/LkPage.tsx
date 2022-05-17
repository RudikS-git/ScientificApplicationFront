import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { refreshToken } from '../../api/refreshToken'
import CommonContainer from '../../components/common/CommonContainer/CommonContainer'
import { MyApplications } from '../../components/LK/MyApplications'
import { Welcome } from '../../components/common/Welcome/Welcome'
import { Token } from '../../Token'
import { ApplicationSubmissions } from '../../components/LK/ApplicationSubmissions'
import { ApplicationSubmission } from '../../components/LK/ApplicationSubmission'
import { HistorySubmissions } from '../../components/LK/HistorySubmissions'
import { authPageHof } from '../Auth/authPageHof'

const LkPage = () => {

  return (
    <CommonContainer>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/my-applications">

          <Route path="details/:id">
            <Route path=":applicationSubmissionId">
              <Route path="history-submission">
                <Route path=":page/:perPage" element={<HistorySubmissions />} />
                <Route path="" element={<HistorySubmissions />} />
              </Route>
              <Route path="" element={<ApplicationSubmission />} />
            </Route>

            <Route path="" element={<ApplicationSubmissions />} />
          </Route>

          <Route path=":page/:perPage" element={<MyApplications />} />
          <Route path="" element={<MyApplications />} />
        </Route>
      </Routes>
    </CommonContainer>
  )
}

export default authPageHof(LkPage);