"use client"
import React, { useState } from 'react'
import NoteForm from '../components/NoteForm'
import Btn from '../components/Btn'
import Toast from '@/app/components/Toast';

function page() {
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [form, setForm] = useState({
    title: '',
    tag_line: '',
    body: ''
  })
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (!form.title) {
        setToast({ show: true, message: 'Title is required!', type: 'error' });
        return
      }
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      if (res.status === 201) {
        setIsLoading(false)
        setToast({ show: true, message: 'Note created successfully!', type: 'success' });
      }
    } catch (error) {
      setIsLoading(false)
      setToast({ show: true, message: 'Failed to create note!', type: 'error' });
    }
  }

  const handleCloseToast = () => {
    setToast({ show: false, message: '', type: '' });
    window.location.href = '/'
  };

  return (
    <div className='flex flex-col items-end w-[90%] sm:w-[80%] lg:w-[50%] mx-auto mt-10 gap-3'>
      <NoteForm form={form} setForm={setForm} mode={'create'} />
      <Btn text='Create' onClick={handleSubmit} isLoading={isLoading} />
      {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={handleCloseToast}
                />
            )}
    </div>
  )
}

export default page