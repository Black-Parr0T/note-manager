'use client'
import Link from "next/link";
import NoteCard from "./components/NoteCard";
import { useEffect, useState } from "react";
import Btn from "./components/Btn";
import Toast from "./components/Toast";

export default function Home() {
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setIsLoading(true);
    const fetchNotes = async () => {
      try {
        const res = await fetch(`/api/notes?page=${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          setNotes(data.notes);
          setHasMore(data.hasMore);
        } else {
          setToast({ show: true, message: 'Failed to fetch notes!', type: 'error' });
        }
        setIsLoading(false);
      } catch (error) {
        setToast({ show: true, message: 'Failed to fetch notes!', type: 'error' });
        setIsLoading(false);
      }
    }
    fetchNotes();
    
  }, [page]);
  const handleCloseToast = () => {
    setToast({ show: false, message: '', type: '' });
  };
  return (
    <div className="px-2 py-4 w-full min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Link href="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add Note
          </button>
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center items-center">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
      <div className="flex justify-between left-[12.5%] sm:left-1/4 w-3/4 sm:w-1/2 sticky bottom-4 mt-10 z-10">
        {
          !isLoading && (
            <Btn onClick={() => setPage(page - 1)} text={'Previous'} disabled={page === 1} />
          )
        }
        <span className="bg-slate-500 inline-block w-auto mx-auto rounded-xl px-5 py-1">{
          isLoading ? 'Loading...' : `Page ${page}`
        }</span>
        {
          !isLoading && (
            <Btn onClick={() => setPage(page + 1)} text={'Next'} disabled={!hasMore} />
          )
        }
      </div>
      {
        toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )
      }
    </div>
  );
}
