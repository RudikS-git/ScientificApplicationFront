import React from "react";
import classes from './style.module.scss';

export const Welcome = () => {
    return (
        <div className={classes.root}>
            Вы на главной странице портала научно-исследовательских работ.
            <br />
            Пройдите по интересующей вас категории в меню.
        </div>
    );
};
