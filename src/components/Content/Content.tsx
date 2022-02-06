import React, { FC } from "react";
import { StyledContent } from "./Content.styles";

export const Content: FC = ({ children }) => {
    return <StyledContent>{children}</StyledContent>;
};
