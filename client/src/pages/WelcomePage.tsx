import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotes, createNote, deleteNote, Note } from '../services/api';
import { useForm } from 'react-hook-form';

interface NewNoteData {
  title: string;
  content: string;
}

const WelcomePage = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<NewNoteData>();

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

  const onAddNote = async (data: NewNoteData) => {
    try {
      await createNote(data);
      reset(); // Clear the form
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };
  
  const onDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <button onClick={logout} className="px-4 py-2 text-white bg-red-600 rounded-md">Logout</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Add a New Note</h2>
          <form onSubmit={handleSubmit(onAddNote)} className="p-4 bg-white rounded-lg shadow-md space-y-4">
            <input {...register('title')} placeholder="Title" className="w-full px-4 py-2 border rounded-md" />
            <textarea {...register('content')} placeholder="Content" className="w-full px-4 py-2 border rounded-md" rows={4}></textarea>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">Add Note</button>
          </form>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
          {isLoading ? (
            <p>Loading notes...</p>
          ) : notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note._id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{note.title}</h3>
                      <p className="text-gray-700 mt-2">{note.content}</p>
                    </div>
                    <button onClick={() => onDeleteNote(note._id)} className="text-red-500 hover:text-red-700 font-bold">X</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You have no notes yet. Add one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;