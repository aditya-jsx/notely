import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { signinUser, verifyGoogleToken } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import Auth_img from "../../public/auth-image.png";
import logo from "../../public/icon.png";

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
  
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      setError(null);
      if (credentialResponse.credential) {
        const response = await verifyGoogleToken(credentialResponse.credential);
        login(response.data.token);
        navigate('/welcome');
      } else {
        throw new Error("Google credential not found");
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Google sign-in failed.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen lg:bg-gray-100 bg-white p-4">
      <div className="flex bg-white rounded-2xl lg:shadow-lg shadow-none overflow-hidden w-full max-w-5xl">
        
        <div className="flex items-center absolute lg:ml-5 ml-38 mt-4 gap-2">
          <img src={logo} alt="logo" className='w-5' />
          <span className="font-semibold text-gray-800 text-lg">HD</span>
        </div>
        {/* Left Section: Form */}
        <div className="w-full lg:w-[40%] p-8 sm:p-12 flex flex-col justify-center lg:mt-0 mt-8 gap-3">

          <h2 className="text-3xl font-bold text-gray-900 text-center lg:text-start">Sign in</h2>
          <p className="text-gray-600 mb-6 text-center lg:text-start">
            Please login to continue to your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                id="email" 
                type="email" 
                {...register('email')} 
                placeholder="Enter your email" 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                id="password" 
                type="password" 
                {...register('password')} 
                placeholder="Enter your password" 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
              />
              {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          {/* Google OAuth Button */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-white text-gray-500">Or</span></div>
          </div>
          <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                    setError('Google Login Failed');
                }}
            />
          </div>

          <p className="text-center text-sm text-gray-600 pt-4">
            Need an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
              Create one
            </Link>
          </p>
          
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex w-[60%] relative items-center justify-center pt-1 pr-1">
          <img src={Auth_img} alt="Abstract illustration" className="h-[42.5rem] w-[43rem] object-fit" />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;

