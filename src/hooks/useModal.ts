import React, { useState } from 'react'

export interface UseModalResponse {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open(): void,
    close(): void,
    toggle(): void
}

export const useModal = (): UseModalResponse => {

    const [isOpen, setIsOpen] = useState(false);

    return {
        isOpen,
        setIsOpen,
        toggle: () => setIsOpen(!setIsOpen),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }
}
