import { Box, Divider } from "@mui/material";
import { observe } from "mobx";
import { observer } from "mobx-react";
import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { WithLoader } from "../../../HOC/WithLoader";
import { useFetch } from "../../../hooks/useFetch";
import { useLKStores, useModeratorStores, useRootStore } from "../../../store/RootStore";
import { Button } from "../../../UI/Button/Button";
import { Table } from "../../../UI/Table/Table";
import { ApplicationCard } from "../../common/ApplicationCard";
import { ApplicationCards } from "../../common/ApplicationCards";
import { PageHeader } from "../../common/PageHeader";
import classes from './MyApplications.module.scss';

const _Applications: FC = () => {

  const { applicationStore: { getApplications, pagedApplications } } = useModeratorStores();
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
        <PageHeader>
          Модерация типов заявок
        </PageHeader>

        <ApplicationCards
          linkToWithoutId="/moderator/applications/details"
          pagedApplications={pagedApplications}
        />
      </div>
    </WithLoader>
  );
};

const Applications = observer(_Applications);
export { Applications }