import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotes, createNote, deleteNote, Note } from '../services/api';
import { useForm } from 'react-hook-form';

const PlusIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>;
const SearchIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;
const EditIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>;
const DeleteIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>;
const EmptyNotesIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;

interface NewNoteData {
  title: string;
  content: string;
}

const WelcomePage = () => {
  const { logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null); 
  const [searchTerm, setSearchTerm] = useState('');

  const { register, handleSubmit, reset, setValue } = useForm<NewNoteData>();

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data.content);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    reset();
  };

  const openCreateModal = () => {
    setEditingNote(null);
    reset({ title: '', content: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setValue('title', note.title);
    setValue('content', note.content);
    setIsModalOpen(true);
  };
  
  const onSaveNote = async (data: NewNoteData) => {
    try {
      if (editingNote) {
        // await updateNote(editingNote._id, data);
        console.log("Updating note... (feature to be added)");
      } else {
        await createNote(data);
      }
      fetchNotes();
      closeModal();
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const onDeleteNote = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(noteId);
        fetchNotes();
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0a0a0a] text-gray-100 min-h-screen font-sans">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-indigo-600 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600 to-transparent rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto p-8 relative z-10">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <EditIcon />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Notes
            </h1>
          </div>
          <button onClick={logout} className="px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
            Logout
          </button>
        </header>

        <div className="mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">Your thoughts, organized</h2>
          <p className="text-lg text-gray-400 max-w-2xl">Capture ideas, create lists, and keep everything that matters in one beautiful, minimal space.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center">
            <button onClick={openCreateModal} className="w-full md:w-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 transform transition hover:shadow-indigo-500/40">
                <PlusIcon /> New Note
            </button>
            <div className="relative w-full md:max-w-xs">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><SearchIcon /></span>
                <input 
                    type="text" 
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
            </div>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-400">Loading your notes...</p>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div key={note._id} className="group bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/20 relative before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-100 flex-1 pr-4">{note.title}</h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* <button onClick={() => openEditModal(note)} className="p-2 rounded-md hover:bg-gray-700"><EditIcon /></button> */}
                      <button onClick={() => onDeleteNote(note._id)} className="p-2 rounded-md hover:bg-red-500/20 hover:text-red-400"><DeleteIcon /></button>
                  </div>
                </div>
                <p className="text-gray-400 line-clamp-3">{note.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-8 bg-[#1a1a1a] border border-gray-800 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-2">No notes yet</h3>
              <p className="text-gray-400 mb-6">{searchTerm ? 'Try a different search term.' : 'Create your first note to get started!'}</p>
              {!searchTerm && <button onClick={openCreateModal} className="flex items-center mx-auto gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 transform transition hover:shadow-indigo-500/40">
                <PlusIcon /> Create Note
            </button>}
          </div>
        )}
      </div>

      {/* Modal for Creating/Editing Note */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
            <form onSubmit={handleSubmit(onSaveNote)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                <input {...register('title')} placeholder="Enter note title..." className="w-full bg-[#111111] border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                <textarea {...register('content')} placeholder="Write your note here..." rows={6} className="w-full bg-[#111111] border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 transform transition hover:shadow-indigo-500/40">Save Note</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
