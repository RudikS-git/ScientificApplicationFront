import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../../components/common/Login/Login";
import { Registration } from "../../components/common/Registration";
import { useRootStore } from "../../store/RootStore";
import { TypeAuth } from "../../store/_types/TypeAuth";
import { Token } from "../../Token";

const _AuthPage: FC = () => {

    const navigate = useNavigate();

    const { authStore: { typeAuth } } = useRootStore();

    useEffect(() => {
        if (typeAuth === TypeAuth.Auth) {
            navigate("/");
        }
    }, [typeAuth])

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
        </Routes>
    );
};

export default observer(_AuthPage);