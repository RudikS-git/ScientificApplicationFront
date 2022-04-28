import React, { useState } from 'react'

export const useTabs = () => {

  const [tab, setTab] = useState<string>("main");

  return {
    tab,
    setTab
  }
}
