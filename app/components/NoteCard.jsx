import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NoteCard({ note }) {
    console.log(note);

    return (
        <Link href={`/notes/${note._id}`}>
            <div className='w-80 h-40 border px-2 py-3 rounded-lg flex flex-col justify-between cursor-pointer'>
                {note.pinned &&
                    <span className='flex text-xs'>
                        <Image src='/pinned.svg' width={12} height={12} alt='Pinned' />
                        pinned
                    </span>
                }
                <div className=''>
                    <h3 className='mb-3 font-bold border-b-2'>
                        {note.title}
                    </h3>
                    {
                        note.tag_line && (
                            <h4 className='text-sm mb-1 font-semibold'>
                                {note.tag_line}
                            </h4>
                        )
                    }
                    {
                        note.body && (
                            <p className='text-sm text-ellipsis whitespace-normal'>
                                {
                                    note.body.length > 85
                                        ? note.body.substring(0, 85) + '...'
                                        : note.body
                                }
                            </p>
                        )
                    }
                </div>
                <div className='flex justify-between'>
                    <div className='text-xs'>
                        {note.createdAt}
                    </div>
                    <div className='text-xs'>
                        {note.updatedAt}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard