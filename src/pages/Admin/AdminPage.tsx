import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ManageApplications from '../../components/Admin/ManageApplications/ManageApplications'
import { ApplicationDetails } from '../../components/Admin/ApplicationDetails/ApplicationDetails'
import CommonContainer from '../../components/common/CommonContainer/CommonContainer'
import { authPageHof } from '../Auth/authPageHof'
import { useRootStore } from '../../store/RootStore'
import { observer } from 'mobx-react'
import { ROLES } from '../../constants/roles'

const AdminPage = () => {

  const navigate = useNavigate();
  const { authStore: { roles, hasRole } } = useRootStore();

  useEffect(() => {
    if (!hasRole(ROLES.Admin)) {
      return navigate('/');
    }
  }, [roles])

  return (
    <CommonContainer>
      <Routes>
        <Route path="/applications">
          <Route path="details/:id" element={<ApplicationDetails />} />
          <Route path=":page/:perPage" element={<ManageApplications />} />
          <Route path="" element={<ManageApplications />} />
        </Route>
      </Routes>
    </CommonContainer >
  )
}

export default authPageHof(observer(AdminPage))
