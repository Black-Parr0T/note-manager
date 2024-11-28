'use client';
import React from 'react'

function NoteForm({ form, setForm, mode }) {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }
  const Pin = () => {
    setForm({
      ...form,
      pinned: !form.pinned
    })
  }
  return (
    <div className='flex flex-col justify-center items-center border w-full h-full rounded-2xl mx-auto py-3 gap-5'>
      <div className='flex justify-between w-[80%]'>
        <span></span>
        <h2 className='font-bold'>
          {
            mode === 'edit' ? 'Edit Note' : 'Create Note'
          }
        </h2>
        <p className='text-gray-400 cursor-pointer w-9' onClick={Pin} >
          {
            form.pinned ? 'unpin' : 'pin'
          }
        </p>
      </div>
      <div className='border-b-2 w-[80%] flex justify-between'>
        <label htmlFor="title" className='italic w-[10%]'>Title:</label>
        <input type="text" id="title" className='px-2 bg-inherit border-none focus:outline-none w-[90%]' onChange={handleChange} value={form.title} />
      </div>
      <div className='border-b-2 w-[80%] flex justify-between'>
        <label htmlFor="tag_line w-[10%]" className='w-[10%] italic'>Tag:</label>
        <input type="text" id="tag_line" className='px-2 bg-inherit border-none focus:outline-none w-[90%]' onChange={handleChange} value={form.tag_line} />
      </div>
      <div className='border-b-2 w-[80%] flex justify-between'>
        <label htmlFor="body" className='w-[10%] italic'>Body:</label>
        <textarea id="body" className='px-2 bg-inherit border-none focus:outline-none w-[90%]' rows={5} onChange={handleChange} value={form.body}></textarea>
      </div>
    </div>
  )
}

export default NoteForm