import React, { FC } from "react";
import classes from "./Content.module.scss";


export const Content: FC = ({ children }) => {
    return <div className={classes.root}>{children}</div>;
};
