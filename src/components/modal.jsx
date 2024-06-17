import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'

const Modal = ({
    isOpen,
    setIsOpen,
    children
}) => {
    return (
        <Dialog open={isOpen}>
            <DialogContent className='p-0 max-w-5xl m-auto'>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal
