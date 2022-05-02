import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ManageApplications from '../../components/Admin/ManageApplications/ManageApplications'
import { ApplicationDetails } from '../../components/Admin/ApplicationDetails/ApplicationDetails'
import CommonContainer from '../../components/common/CommonContainer/CommonContainer'

export const AdminPage = () => {

  return (
    <CommonContainer>
      <Routes>
        <Route path="/applications">
          <Route path="details/:id" element={<ApplicationDetails />} />
          <Route path=":page/:perPage" element={<ManageApplications />} />
          <Route path="" element={<ManageApplications />} />
        </Route>
      </Routes>
    </CommonContainer>
  )
}
