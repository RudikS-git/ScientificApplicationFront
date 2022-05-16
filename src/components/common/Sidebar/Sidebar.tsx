import { AppBar, List, ListItem } from "@mui/material";
import React from "react";
import { StyledSidebar, appBarStyles } from "./Sidebar.styles";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import TopicIcon from '@mui/icons-material/Topic';
import { Button } from "../../../UI/Button/Button";
import classes from './Sidebar.module.scss';
import classNames from "classnames";
import { useLocation } from "react-router";
import { ROLES } from "../../../constants/roles";
import { useRootStore } from "../../../store/RootStore";

const StyledAppBar = styled(AppBar)({ ...appBarStyles });

const LINKS = {
    myApplications: '/my-applications',
    moderate: '/moderator/applications',
    admin: '/admin/applications'
}

const Sidebar = () => {

    const location = useLocation();
    const { authStore: { hasRole } } = useRootStore();

    return (
        <StyledSidebar>
            <StyledAppBar position="static">
                <List>
                    {
                        hasRole(ROLES.User) &&
                        <ListItem className={classNames({ [classes.item]: true, [classes.active]: location.pathname.includes(LINKS.myApplications) })}>
                            <Link to={LINKS.myApplications}>
                                <Button
                                    startIcon={<TopicIcon />}
                                    fullWidth
                                >
                                    Мои заявки
                                </Button>
                            </Link>
                        </ListItem>
                    }

                    {
                        hasRole(ROLES.Moderator) &&
                        <ListItem className={classNames({ [classes.item]: true, [classes.active]: location.pathname.includes(LINKS.moderate) })}>
                            <Link to={LINKS.moderate}>
                                <Button
                                    startIcon={<ManageAccountsIcon />}
                                    fullWidth
                                >
                                    Модерация
                                </Button>
                            </Link>
                        </ListItem>
                    }

                    {
                        hasRole(ROLES.Admin) &&
                        <ListItem className={classNames({ [classes.item]: true, [classes.active]: location.pathname.includes(LINKS.admin) })}>
                            <Link to={LINKS.admin}>
                                <Button
                                    startIcon={<SettingsIcon />}
                                    fullWidth
                                >
                                    Конструктор заявок
                                </Button>
                            </Link>
                        </ListItem>
                    }
                </List>
            </StyledAppBar>
        </StyledSidebar>
    );
};

export default Sidebar;
