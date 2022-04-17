import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useRootStore } from "../../store/RootStore";
import { AccountHeader } from "../AccountHeader/AccountHeader";
import classes from "./Header.module.scss";

const Header: FC = () => {
    

    return (
        <header className={classes.root}>
            <img src="/logo.png" alt="logo" />
            <AccountHeader /> 
        </header>
    );
};

export default Header;
