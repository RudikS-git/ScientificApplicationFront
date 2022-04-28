import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { refreshToken } from '../../api/refreshToken'
import CommonContainer from '../../components/CommonContainer/CommonContainer'
import { InnovativeDevelopments } from '../../components/InnovativeDevelopments/InnovativeDevelopments'
import { ScientificSchools } from '../../components/ScientificSchools/ScientificSchools'
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
          path="/innovative-projects"
          element={<InnovativeDevelopments />}
        />
      </Routes>
    </CommonContainer>
  )
}

export default lkPageHof(LkPage);