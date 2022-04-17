import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'

interface CreateApplicationTabsProps {
    value: number,
    handleChange(): void
}

export const CreateApplicationTabs = ({ value, handleChange } : CreateApplicationTabsProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab
          value="one"
          label="Главная"
        />
        <Tab value="two" label="Форма" />
      </Tabs>
    </Box>
  )
}
