import {
    TableCell,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    Paper,
    Table,
} from "@mui/material";
import React, { FC } from "react";
import { StyledTable } from "./ScientificTable.styles";

export interface IScientificTableProps {
    headerRow: ITableRow;
    bodyRows: Array<ITableRow>;
}

export interface ITableRow {
    id: number;
    columns: Array<FC | string>;
}

export const ScientificTable: FC<IScientificTableProps> = ({
    headerRow,
    bodyRows,
}) => {
    return (
        <StyledTable>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headerRow?.columns.map((it, index) => (
                                <TableCell key={index}>{it}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {bodyRows.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    {row.columns.map((column) => (
                                        <TableCell>{column}</TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledTable>
    );
};
