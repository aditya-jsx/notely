// src/services/api.ts

import axios from 'axios';

// Define the shape of a Note for TypeScript
export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string;
}

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Your backend URL
});

// Use an interceptor to automatically add the auth token to every request
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

// Define your API functions
export const signupUser = (data: any) => api.post('/signup', data);
export const verifyOtp = (data: any) => api.post('/verify-otp', data);
export const signinUser = (data: any) => api.post('/signin', data);
export const getNotes = () => api.get<{ notes: Note[] }>('/note');
export const createNote = (data: { title: string; content: string }) => api.post('/note', data);
export const deleteNote = (noteId: string) => api.delete(`/note/${noteId}`);