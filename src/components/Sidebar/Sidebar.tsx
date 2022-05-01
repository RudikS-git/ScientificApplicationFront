import { AppBar, List, ListItem } from "@mui/material";
import React from "react";
import { StyledSidebar, appBarStyles } from "./Sidebar.styles";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SettingsIcon from '@mui/icons-material/Settings';
import TopicIcon from '@mui/icons-material/Topic';
import { Button } from "../../UI/Button/Button";
import classes from './Sidebar.module.scss';
import classNames from "classnames";
import { useLocation } from "react-router";

const StyledAppBar = styled(AppBar)({ ...appBarStyles });

const Sidebar = () => {

    const location = useLocation();

    return (
        <StyledSidebar>
            <StyledAppBar position="static">
                <List>
                    <ListItem className={classNames({ [classes.item]: true, [classes.active]: location.pathname.includes('/my-applications') })}>
                        <Link to={"/my-applications"}>
                            <Button
                                startIcon={<TopicIcon />}
                                fullWidth
                            >
                                Мои заявки
                            </Button>
                        </Link>
                    </ListItem>

                    <ListItem className={classNames({ [classes.item]: true, [classes.active]: location.pathname.includes('/admin/applications') })}>
                        <Link to={"/admin/applications"}>
                            <Button
                                startIcon={<SettingsIcon />}
                                fullWidth
                            >
                                Конструктор заявок
                            </Button>
                        </Link>
                    </ListItem>
                </List>
            </StyledAppBar>
        </StyledSidebar>
    );
};

export default Sidebar;
