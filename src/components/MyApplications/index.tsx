import { Box, Divider } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useLKStores, useRootStore } from "../../store/RootStore";
import { Button } from "../../UI/Button/Button";
import { Table } from "../../UI/Table/Table";

export const MyApplications: FC = () => {

    const { applicationStore: { getApplications } } = useLKStores();

    useEffect(() => {

        getApplications();

    }, []);

    return (
        <div>
            <Box mb="0px">
                <Box sx={{ fontSize: "26px", padding: '24px 32px' }} >Мои заявки</Box>
                <Divider />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button>Новая заявка</Button>
                <Button>Фильтрация</Button>
            </Box>

            <Divider />

            <Table
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
            />
        </div>
    );
};
