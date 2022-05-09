import React, { Suspense, useEffect } from "react";
import { FC } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { refreshToken } from "../api/refreshToken";
import ManageApplications from "../components/Admin/ManageApplications/ManageApplications";
import { Login } from "../components/common/Login/Login";
import Main from "../components/common/Main/Main";
import UnknownPage from "../components/common/UnknownPage/UnknownPage";
import { Welcome } from "../components/common/Welcome/Welcome";
import { useRootStore } from "../store/RootStore";
import { Token } from "../Token";
import AuthPage from "./Auth/AuthPage";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Fade } from "@mui/material";
import "./Page.css";
const LkPage = React.lazy(() => import('./Lk/LkPage'));
const AdminPage = React.lazy(() => import('./Admin/AdminPage'));
const ModeratorPage = React.lazy(() => import('./Moderator/ModeratorPage'));

const Pages: FC = () => {

    const location = useLocation();

    return (

        <TransitionGroup component={null}>
            <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={400}
            >
                <Suspense fallback={<div />}>
                    <Routes location={location}>
                        <Route path="/auth/*" element={<AuthPage />} />
                        <Route path="/admin/*" element={<AdminPage />} />
                        <Route path="/moderator/*" element={<ModeratorPage />} />
                        <Route path="/*" element={<LkPage />} />
                        <Route path="*" element={<UnknownPage />} />
                    </Routes>
                </Suspense>

            </CSSTransition>
        </TransitionGroup>
    );
};

export default Pages;
