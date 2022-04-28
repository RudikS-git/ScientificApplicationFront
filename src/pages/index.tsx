import React, { Suspense, useEffect } from "react";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { refreshToken } from "../api/refreshToken";
import ManageApplications from "../components/Admin/ManageApplications/ManageApplications";
import { InnovativeDevelopments } from "../components/InnovativeDevelopments/InnovativeDevelopments";
import { Login } from "../components/common/Login/Login";
import Main from "../components/Main/Main";
import { ScientificSchools } from "../components/ScientificSchools/ScientificSchools";
import UnknownPage from "../components/common/UnknownPage/UnknownPage";
import { Welcome } from "../components/common/Welcome/Welcome";
import { useRootStore } from "../store/RootStore";
import { Token } from "../Token";
import { AdminPage } from "./Admin/AdminPage";
import AuthPage from "./Auth/AuthPage";

const LkPage = React.lazy(() => import('./Lk/LkPage'));

const Pages: FC = () => {

    return (
        <Routes>
            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/*"
                element={
                    <Suspense fallback={<div />}>
                        <LkPage />
                    </Suspense>
                }
            />
            <Route path="*" element={<UnknownPage />} />
        </Routes>
    );
};

export default Pages;
