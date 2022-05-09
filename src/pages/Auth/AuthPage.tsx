import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../../components/common/Login/Login";
import { useRootStore } from "../../store/RootStore";
import { TypeAuth } from "../../store/_types/TypeAuth";
import { Token } from "../../Token";

const AuthPage: FC = observer(() => {

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
        </Routes>
    );
});

export default AuthPage;