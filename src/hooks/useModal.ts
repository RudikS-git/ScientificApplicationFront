import React, { useState } from 'react'

export const useModal = () => {

    const [isOpen, setIsOpen] = useState(false);
    
    return {
        isOpen,
        setIsOpen,
        toggle: () => setIsOpen(!setIsOpen),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }
}
