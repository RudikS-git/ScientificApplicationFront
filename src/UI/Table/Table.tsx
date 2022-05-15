import {
    TableCell,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    Table as MuiTable
} from "@mui/material";
import React, { FC, ReactNode, useEffect } from "react";
import classes from "./Table.module.scss";
import TablePagination from '@mui/material/TablePagination';
import classNames from "classnames";

export interface TableProps {
    className?: string,
    headerRow: TableRow;
    bodyRows?: Array<TableRow>;
    pagination?: Pagination
}

export interface TableRow {
    id: number | undefined;
    columns: Array<ReactNode | string>;
}

export interface Pagination {
    perPages: number[],
    page: number,
    perPage: number,
    count?: number,
    changePageHandler(newPage: number, perPage: number): void,
    changeRowsPerPageHandler(perPage: number): void
}

export const Table: FC<TableProps> = ({
    className,
    headerRow,
    bodyRows,
    pagination
}) => {

    const { perPages, page: iPage, perPage: iPerPage, count, changeRowsPerPageHandler, changePageHandler } = pagination || {};
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const currentClassname = classNames({
        [classes.root]: true,
        [className || '']: true
    })

    useEffect(() => {
        if (iPage) {
            setPage(Number(iPage) - 1);
        }

    }, [iPage])

    useEffect(() => {

        if (iPerPage) {
            setRowsPerPage(iPerPage);
        }

    }, [iPerPage])

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        changePageHandler && changePageHandler(newPage + 1, rowsPerPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
        changeRowsPerPageHandler && changeRowsPerPageHandler(parseInt(event.target.value, 10));
    };

    return (
        <TableContainer component={'div'}>
            <MuiTable className={currentClassname} aria-label="table">
                <TableHead>
                    <TableRow>
                        {headerRow?.columns.map((it, index) => (
                            <TableCell key={index}>{it}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {
                    bodyRows &&
                    <TableBody>
                        {bodyRows?.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    {row.columns.map((column, index) => (
                                        <TableCell key={index}>{column}</TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                }

            </MuiTable>

            {(!bodyRows || bodyRows?.length == 0) && <div className={classes.emptyText}>В таблице отсутствуют записи</div>}

            {
                (bodyRows?.length != 0 && count) && (
                    <TablePagination
                        component="div"
                        count={count}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={perPages}
                    />
                )
            }

        </TableContainer>
    );
};
