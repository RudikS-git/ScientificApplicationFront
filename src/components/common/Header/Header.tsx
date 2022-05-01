import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useRootStore } from "../../../store/RootStore";
import { AccountHeader } from "../AccountHeader/AccountHeader";
import classes from "./Header.module.scss";

const Header: FC = () => {


    return (
        <header className={classes.root}>
            <Link className={classes.logoBlock} to="/">
                <img src="/logo.png" alt="logo" />
            </Link>
            <AccountHeader />
        </header>
    );
};

export default Header;
