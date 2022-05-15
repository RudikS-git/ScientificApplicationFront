import React from "react";
import classes from './style.module.scss';

export const Welcome = () => {
    return (
        <div className={classes.root}>
            <div className={classes.text}>
                <p>
                    Вы на главной странице личного кабинета для <b>научно-исследовательских работ</b>.
                </p>
                <p>
                    Пройдите по интересующей вас категории слева в меню.
                </p>
            </div>
        </div>
    );
};
