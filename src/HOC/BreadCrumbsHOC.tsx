import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../UI/Breadcrumbs/Breadcrumbs';


interface BreadCrumbsHOCProps {
    links?: BreadCrumb[]
}

interface BreadCrumb {
    title: string,
    to: string
}

export const BreadCrumbsHOC: FC<BreadCrumbsHOCProps> = ({ links, children }) => {

    return (
        <div>
            <Breadcrumbs>
                {
                    links?.map(it => {
                        return (
                            <Link to={it.to}>
                                {it.title}
                            </Link>
                        )
                    })
                }
            </Breadcrumbs>

            {children}
        </div>
    )
}
