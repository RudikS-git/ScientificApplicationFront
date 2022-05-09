import { Button, Menu, MenuItem } from '@mui/material';
import { isObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react'
import { useNavigate } from 'react-router';
import { useRootStore } from '../../../store/RootStore';
import classes from './AccountHeader.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const AccountHeader = observer(() => {

	const { authStore: { id, email, logout } } = useRootStore();
	const navigator = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const logoutHandler = async () => {
		await logout();
	}

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<Button
				className={classes.main}
				variant="text"
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				{email}
			</Button>

			<Menu
				id="demo-customized-menu"
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem className={classes.btn} onClick={logoutHandler} disableRipple>
					Выйти
				</MenuItem>
			</Menu>
		</div>
	)
})
