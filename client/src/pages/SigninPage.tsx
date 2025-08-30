// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useNavigate } from 'react-router-dom';
// import { signinUser } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const signinSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(1, 'Password is required'),
// });

// type SigninFormData = z.infer<typeof signinSchema>;

// const SigninPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [error, setError] = useState<string | null>(null);
//   const { register, handleSubmit, formState: { errors } } = useForm<SigninFormData>({
//     resolver: zodResolver(signinSchema),
//   });

//   const onSubmit = async (data: SigninFormData) => {
//     try {
//       setError(null);
//       const response = await signinUser(data);
//       login(response.data.token);
//       navigate('/welcome');
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'Sign-in failed. Please check your credentials.');
//     }
//   };
  
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center">Sign In</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input {...register('email')} placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          
//           <input type="password" {...register('password')} placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
//           {errors.password && <p className="text-red-500">{errors.password.message}</p>}

//           <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">Sign In</button>
//         </form>
//         <div className="relative my-4">
//             <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
//             <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
//         </div>
//         <a href="http://localhost:3000/api/v1/auth/google" className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
//           Sign in with Google
//         </a>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign Up
//           </Link>
//         </p>
        
//         {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default SigninPage;





// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useNavigate } from 'react-router-dom';
// import { signinUser, verifyGoogleToken } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

// const signinSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(1, 'Password is required'),
// });

// type SigninFormData = z.infer<typeof signinSchema>;

// const SigninPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [error, setError] = useState<string | null>(null);
//   const { register, handleSubmit, formState: { errors } } = useForm<SigninFormData>({
//     resolver: zodResolver(signinSchema),
//   });

//   const onSubmit = async (data: SigninFormData) => {
//     try {
//       setError(null);
//       const response = await signinUser(data);
//       login(response.data.token);
//       navigate('/welcome');
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'Sign-in failed. Please check your credentials.');
//     }
//   };
  
//   const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
//     try {
//       setError(null);
//       if (credentialResponse.credential) {
//         const response = await verifyGoogleToken(credentialResponse.credential);
//         login(response.data.token);
//         navigate('/welcome');
//       } else {
//         throw new Error("Google credential not found");
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'Google sign-in failed.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center">Sign In</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input {...register('email')} placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          
//           <input type="password" {...register('password')} placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
//           {errors.password && <p className="text-red-500">{errors.password.message}</p>}

//           <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">Sign In</button>
//         </form>
//         <div className="relative my-4">
//             <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
//             <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
//         </div>
//         <div className="flex justify-center">
//             <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={() => {
//                     setError('Google Login Failed');
//                 }}
//             />
//         </div>
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign Up
//           </Link>
//         </p>
        
//         {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default SigninPage;







import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { signinUser, verifyGoogleToken } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Left Section: Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-2 mb-8">
            {/* logo */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#3B82F6"/>
            </svg>
            <span className="font-bold text-gray-800 text-lg">HD</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
          <p className="text-gray-600 mb-6">Please login to continue to your account.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                id="email" 
                type="email" 
                {...register('email')} 
                placeholder="jonas_kahnwald@gmail.com" 
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
          <div className="relative my-2">
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

          <p className="text-center text-sm text-gray-600 mt-4">
            Need an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
              Create one
            </Link>
          </p>
          
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>

        {/* Right Section: Image */}
        <div className="w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1616400619175-5beda3fdcd7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Abstract Waves" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;