import axios from 'axios';

export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signupUser = (data: any) => api.post('/signup', data);
export const verifyOtp = (data: any) => api.post('/verify-otp', data);
export const signinUser = (data: any) => api.post('/signin', data);
export const getNotes = () => api.get<{ content: Note[] }>('/note');
export const createNote = (data: { title: string; content: string }) => api.post('/note', data);
export const deleteNote = (noteId: string) => api.delete(`/note/${noteId}`);