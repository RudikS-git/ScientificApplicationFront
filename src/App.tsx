import React, { FC, useEffect } from "react";
import "./App.css";
import Pages from "./pages";
import CommonContainer from "./components/common/CommonContainer/CommonContainer";
import { MainStoreHOC } from "./store/MainStoreHOC";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import './fonts/font.css';
import { ThemeProvider } from "@emotion/react";
import { baseTheme } from "./styles/theme";
import './api/axiosConfig';
import { useRootStore } from "./store/RootStore";
import { TypeAuth } from "./store/_types/TypeAuth";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Token } from "./Token";
import { refreshToken } from "./api/refreshToken";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './dayjs.config.ts'

const App: FC = observer(() => {

    const { authStore: { getUserInfo, typeAuth, makeUnAuthState } } = useRootStore();

    const getInitialData = async () => {
        try {
            if (!Token.getInstance().content) {
                await getToken();
            }

            await getUserInfo();
        }
        catch {
            makeUnAuthState();
        }
    }

    const getToken = async () => {
        const token = Token.getInstance();

        if (!token?.content || token.hasTokenExpired) {
            const { data } = await refreshToken();

            if (data && data?.accessToken) {
                token.content = data.accessToken;
            }
        }
    }

    useEffect(() => {
        if (typeAuth === TypeAuth.Loading) {
            getInitialData();
        }

    }, [Token.getInstance().content])

    if (typeAuth === TypeAuth.Loading) {
        return <></>
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={baseTheme}>
                <CssBaseline />
                <BrowserRouter>
                    <Pages />
                </BrowserRouter>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <ToastContainer />
            </ThemeProvider>
        </StyledEngineProvider>
    );
});

export default App;
