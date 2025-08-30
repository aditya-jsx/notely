import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SigninFormData = z.infer<typeof signinSchema>;

const SigninPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      setError(null);
      const response = await signinUser(data);
      login(response.data.token);
      navigate('/welcome');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Sign-in failed. Please check your credentials.');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('email')} placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          
          <input type="password" {...register('password')} placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">Sign In</button>
        </form>
        <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
        </div>
        <a href="http://localhost:3000/api/v1/auth/google" className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Sign in with Google
        </a>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign Up
          </Link>
        </p>
        
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SigninPage;