import { AppBar, List, ListItem } from "@mui/material";
import React from "react";
import { StyledSidebar, appBarStyles } from "./Sidebar.styles";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InnovationIcon } from "../../images/InnovationIcon";

const StyledAppBar = styled(AppBar)({ ...appBarStyles });

const Sidebar = () => {
    return (
        <StyledSidebar>
            <StyledAppBar position="static">
                <List>
                    <ListItem>
                        {/* <InnovationIcon /> */}
                        <Link to={"/innovative-projects"}>
                            Инновационная разработка
                        </Link>
                    </ListItem>

                    <ListItem>
                        <Link to={"/admin/applications"}>
                            Панель администратора
                        </Link>
                    </ListItem>
                </List>
            </StyledAppBar>
        </StyledSidebar>
    );
};

export default Sidebar;
