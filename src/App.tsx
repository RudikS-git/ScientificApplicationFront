import React, { FC } from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Pages from "./pages";
import CommonContainer from "./components/CommonContainer/CommonContainer";

const App: FC = () => {
    return (
        <CommonContainer>
            <Pages />
        </CommonContainer>
    );
};

export default App;
