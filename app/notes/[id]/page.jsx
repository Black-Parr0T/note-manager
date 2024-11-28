'use client';
import Btn from '@/app/components/Btn';
import NoteForm from '@/app/components/NoteForm';
import Toast from '@/app/components/Toast';
import React, { useEffect, useState } from 'react';

function Page({ params }) {
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [note, setNote] = useState({});
    const [isLoading, setLoading] = useState(true);
    const slug = React.use(params).id;
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await fetch(`/api/notes/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                setNote(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch note:', error);
                setLoading(false);
            }
        };

        fetchNote();
    }, []);
    const updateNote = async () => {
        if (isLoading) {
            return;
        }
        if (isLoading) {
            return;            
        }
        if (!note.title) {
            setToast({ show: true, message: 'Please fill all fields!', type: 'error' });
            return;
        }
        try {
            const res = await fetch(`/api/notes/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });
            if (res.status === 200) {
                setToast({ show: true, message: 'Note saved successfully!', type: 'success' });
            }
        } catch (error) {
            setToast({ show: true, message: 'Failed to update note!', type: 'error' });
        }
    };
    const deleteNote = async () => {
        if (isLoading) {
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/notes/${slug}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {            
                setToast({ show: true, message: 'Note Deleted successfully!', type: 'success' });
                window.location.href = '/';
            }
        } catch (error) {
            setToast({ show: true, message: 'Failed to delete note!', type: 'error' });
        }
    }
    const handleCloseToast = () => {
        setToast({ show: false, message: '', type: '' });
    };
    return (
        <div className='flex flex-col items-end w-[90%] sm:w-[80%] lg:w-[50%] mx-auto mt-10 gap-3'>
            <NoteForm form={note} setForm={setNote} mode={'edit'} />
            <div className='flex gap-3'>
            <Btn text='Update' onClick={updateNote} />
            <Btn text='Delete' onClick={deleteNote} isLoading={isLoading} />
            </div>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={handleCloseToast}
                />
            )}
        </div>
    );
}

export default Page;