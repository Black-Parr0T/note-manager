'use client'
import React, { useEffect } from 'react';

function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-5 right-5 p-4 rounded shadow-lg text-white flex justify-between items-center ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-white font-bold">x</button>
        </div>
    );
}

export default Toast;