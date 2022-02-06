import { FC } from "react";
import { StyledMain } from "./Main.styles";

const Main: FC = ({ children }) => {
    return <StyledMain>{children}</StyledMain>;
};

export default Main;
