import { Box, Divider } from "@mui/material";
import { observe } from "mobx";
import { observer } from "mobx-react";
import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { WithLoader } from "../../../HOC/WithLoader";
import { useFetch } from "../../../hooks/useFetch";
import { useLKStores, useRootStore } from "../../../store/RootStore";
import { Button } from "../../../UI/Button/Button";
import { Table } from "../../../UI/Table/Table";
import { ApplicationCard } from "../ApplicationCard";
import classes from './MyApplications.module.scss';

export const MyApplications: FC = observer(() => {

    const { applicationStore: { getApplications, pagedApplications } } = useLKStores();
    const { startFetch, isLoading } = useFetch();

    const _getApplications = async () => {
        await startFetch(getApplications);
    }

    useEffect(() => {
        _getApplications();
    }, []);

    return (
        <WithLoader isLoading={isLoading}>
            <div>
                <h1 className={classes.header}>Мои заявки</h1>
                <Divider />

                {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button>Новая заявка</Button>
                    <Button>Фильтрация</Button>
                </Box>

                <Divider /> */}

                <div className={classes.cards}>
                    {
                        pagedApplications?.items?.map(it => {
                            return (
                                <Link key={it?.id} to={`/my-applications/details/${it?.id}`}>
                                    <ApplicationCard {...it} />
                                </Link>
                            )
                        })
                    }
                </div>



                {/* <Table
                    headerRow={{
                        id: 1,
                        columns: [
                            "ID",
                            "Дата",
                            "Наименованиие",
                            "Рег.номер",
                            "Статус",
                            "",
                        ],
                    }}
                    bodyRows={[
                        {
                            id: 1,
                            columns: ["1", "06.02.2022", "Тестовый проект", "3131", "",
                                <div>
                                    <Button>Изменить</Button>
                                    <Button>Удалить</Button>
                                </div>],
                        },

                        {
                            id: 2,
                            columns: ["2", "01.01.2022", "Мой проект", "43442", "",
                                <div>
                                    <Button>Изменить</Button>
                                    <Button>Удалить</Button>
                                </div>],
                        },
                    ]}
                /> */}
            </div>
        </WithLoader>
    );
});
