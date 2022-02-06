import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { InnovativeDevelopments } from "../components/InnovativeDevelopments/InnovativeDevelopments";
import Main from "../components/Main/Main";
import UnknownPage from "../components/UnknownPage/UnknownPage";
import { Welcome } from "../components/Welcome/Welcome";

const Pages: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
                path="innovative-projects"
                element={<InnovativeDevelopments />}
            />
            <Route path="scientific-schools" element={<div />} />
            <Route path="infrastructure-projects" element={<div />} />

            <Route path="*" element={<UnknownPage />} />
        </Routes>
    );
};

export default Pages;
