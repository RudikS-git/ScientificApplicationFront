import React, { FC } from "react";
import { ScientificTable } from "../ScientificTable/ScientificTable";

export const InnovativeDevelopments: FC = () => {
    return (
        <div>
            <div>TABLE</div>

            <ScientificTable
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
                        columns: ["1", "06.02.2022", "Тестовый проект"],
                    },

                    {
                        id: 2,
                        columns: ["2", "01.01.2022", "Мой проект"],
                    },
                ]}
            />
        </div>
    );
};
