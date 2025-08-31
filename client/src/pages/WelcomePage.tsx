import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotes, createNote, deleteNote, Note } from '../services/api';
import { useForm } from 'react-hook-form';
import logo from "../../public/icon.png";

const DeleteIcon = () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-500 transition-colors hover:text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
    </svg>
);

interface NewNoteData {
  title: string;
  content: string;
}

const WelcomePage = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { register, handleSubmit, reset } = useForm<NewNoteData>();

  const fetchNotes = async () => {
    setIsLoading(true);
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
    reset();
  };

  const openCreateModal = () => {
    reset({ title: '', content: '' });
    setIsModalOpen(true);
  };
  
  const onSaveNote = async (data: NewNoteData) => {
    try {
      await createNote(data);
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

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="HD Logo" className='w-6 h-6' />
            <h1 className="text-xl font-bold text-gray-800">
              Dashboard
            </h1>
          </div>
          <button onClick={logout} className="text-blue-500 font-semibold hover:underline">
            Sign Out
          </button>
        </header>

        {/* Welcome Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome, {user?.name || 'User'}!</h2>
            <p className="text-gray-500 text-sm">Email: {user?.email || 'No email found'}</p>
        </div>

        {/* Create Note Button */}
        <button 
          onClick={openCreateModal} 
          className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-8 shadow-sm"
        >
          Create Note
        </button>

        {/* Notes Section */}
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Notes</h3>
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="space-y-3">
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 break-words">{note.title}</h4>
                                        <p className="text-gray-600 text-sm mt-1 break-words whitespace-pre-wrap">{note.content}</p>
                                    </div>
                                    <button onClick={() => onDeleteNote(note._id)} className="flex-shrink-0 mt-1">
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No notes found. Create one!</p>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* Modal for Creating Note */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Create New Note</h2>
            <form onSubmit={handleSubmit(onSaveNote)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                <input 
                    {...register('title', { required: true })} 
                    placeholder="Enter note title..." 
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                <textarea 
                    {...register('content', { required: true })} 
                    placeholder="Write your note here..."
                    rows={5}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">Save Note</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;

