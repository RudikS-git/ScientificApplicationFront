import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'

interface CreateApplicationTabsProps {
  value: string,
  handleChange(newValue: string): void
}

export const CreateApplicationTabs = ({ value, handleChange }: CreateApplicationTabsProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: string) => handleChange(newValue)}
        aria-label="wrapped label tabs example"
      >
        <Tab
          value="main"
          label="Главная"
        />
        <Tab value="form" label="Форма" />
      </Tabs>
    </Box>
  )
}
