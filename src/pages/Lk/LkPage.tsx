import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { refreshToken } from '../../api/refreshToken'
import CommonContainer from '../../components/CommonContainer/CommonContainer'
import { MyApplications } from '../../components/MyApplications'
import { Welcome } from '../../components/common/Welcome/Welcome'
import { Token } from '../../Token'
import { lkPageHof } from './lkPageHof'


const LkPage = () => {

  // useEffect(() => {

  // }, [])

  return (
    <CommonContainer>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />
      </Routes>
    </CommonContainer>
  )
}

export default lkPageHof(LkPage);