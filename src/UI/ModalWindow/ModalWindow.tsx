import React from 'react'
import { Backdrop, Fade, Modal, ModalProps } from '@mui/material';
import classes from './ModalWindow.module.scss';
// interface ModalWindowProps extends ModalProps {

// }

export const ModalWindow = (props: ModalProps) => {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            {...props}
        >
            <Fade in={props?.open}>
                <div className={classes.root}>
                    {props?.children}
                </div>
            </Fade>
        </Modal>
    )
}
