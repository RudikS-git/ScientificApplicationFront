import { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import { Token } from "../../Token";

const AuthPage: FC = () => {

    const navigate = useNavigate();

    if(Token.getInstance().content) {
        navigate("/");
    }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AuthPage;