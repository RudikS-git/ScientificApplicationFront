import React, { FC } from 'react'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { BreadcrumbsProps } from '@mui/material/Breadcrumbs';

export const Breadcrumbs : FC<BreadcrumbsProps> = ({ children }) => {
    
    return (
        <MuiBreadcrumbs aria-label="breadcrumb">
            {children}
        </MuiBreadcrumbs>
    )
}
