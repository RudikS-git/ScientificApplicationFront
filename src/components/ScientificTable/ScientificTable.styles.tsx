import { Table } from "@mui/material";
import { styled } from '@mui/system';

export const StyledTable = styled(Table)`
    && {
        & th:first-of-type {
            padding-left: 32px
        }

        & td:first-of-type {
            padding-left: 32px
        }

        & td:nth-of-type(1) {
            width: 10%
        }

        & td:nth-of-type(2) {
            width: 10%
        }

        & td:nth-of-type(3) {
            word-break: break-all;
        }

        & td:nth-of-type(4) {
            width: 10%
        }

        & td:nth-of-type(5) {
            width: 10%
        }

        & td:nth-of-type(6) {
            & div {
                display: flex;
                justify-content: flex-end;
            }
        }
        
    }
`;

export const tableStyles = {};
