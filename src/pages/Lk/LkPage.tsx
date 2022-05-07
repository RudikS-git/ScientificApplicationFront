import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { refreshToken } from '../../api/refreshToken'
import CommonContainer from '../../components/common/CommonContainer/CommonContainer'
import { MyApplications } from '../../components/LK/MyApplications'
import { Welcome } from '../../components/common/Welcome/Welcome'
import { Token } from '../../Token'
import { lkPageHof } from './lkPageHof'
import { ApplicationSubmissions } from '../../components/LK/ApplicationSubmissions'
import { ApplicationSubmission } from '../../components/LK/ApplicationSubmission'

const LkPage = () => {

  // useEffect(() => {

  // }, [])

  return (
    <CommonContainer>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/my-applications">
          <Route path="details/:id/:applicationSubmissionId" element={<ApplicationSubmission />} />
          <Route path="details/:id" element={<ApplicationSubmissions />} />
          <Route path=":page/:perPage" element={<MyApplications />} />
          <Route path="" element={<MyApplications />} />
        </Route>
      </Routes>
    </CommonContainer>
  )
}

export default lkPageHof(LkPage);