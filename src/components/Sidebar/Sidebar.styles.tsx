import styled from "styled-components";

export const StyledSidebar = styled.div`
    color: green;
    width: 250px;
    height: 100%;
`;

export const appBarStyles = {
    height: "100%",
    background: "#ffffff !important",

    "& a": {
        color: "#000000b5",
        textDecoration: "none",
    },

    "& ul": {
        marginTop: 16
    },

    "& li": {
        marginBottom: 16
    }
};
