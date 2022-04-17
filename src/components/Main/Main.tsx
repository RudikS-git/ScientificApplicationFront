import { Fade } from "@mui/material";
import { FC } from "react";
import classes from "./Main.module.scss";

const Main: FC = ({ children }) => {

    return(
        <div className={classes.wrapper}>
            <div className={classes.root}>
                {children}
            </div>
        </div>
    )
};

export default Main;
