import { FC } from "react";
import { Content } from "../Content/Content";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import { StyledCommonContainer } from "./CommonContainer.styles";
import Footer from "../Footer/Footer";

const CommonContainer: FC = ({ children }) => {
    return (
        <StyledCommonContainer>
            <Header />

            <Content>
                <Sidebar />

                <Main>{children}</Main>
            </Content>

            <Footer />
        </StyledCommonContainer>
    );
};

export default CommonContainer;
