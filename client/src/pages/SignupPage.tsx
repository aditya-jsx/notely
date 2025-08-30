import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { signupUser, verifyOtp } from '../services/api';
import { useAuth } from '../context/AuthContext';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type SignupFormData = z.infer<typeof signupSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

const SignupPage = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const signupForm = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });
  const otpForm = useForm<OtpFormData>({ resolver: zodResolver(otpSchema) });

  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      setError(null);
      await signupUser(data);
      setEmail(data.email);
      setShowOtpForm(true);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'An error occurred during signup.');
    }
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    try {
      setError(null);
      const response = await verifyOtp({ email, otp: data.otp });
      login(response.data.token);
      navigate('/welcome');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'An error occurred during OTP verification.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {!showOtpForm ? (
          <>
            <h2 className="text-2xl font-bold text-center">Create an Account</h2>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              {/* Form Inputs for name, email, password */}
              <input {...signupForm.register('name')} placeholder="Name" className="w-full px-4 py-2 border rounded-md" />
              {signupForm.formState.errors.name && <p className="text-red-500">{signupForm.formState.errors.name.message}</p>}
              
              <input {...signupForm.register('email')} placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
              {signupForm.formState.errors.email && <p className="text-red-500">{signupForm.formState.errors.email.message}</p>}
              
              <input type="password" {...signupForm.register('password')} placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
              {signupForm.formState.errors.password && <p className="text-red-500">{signupForm.formState.errors.password.message}</p>}

              <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">Sign Up</button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
            <p className="text-center text-gray-600">An OTP has been sent to {email}</p>
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
               <input {...otpForm.register('otp')} placeholder="Enter 6-digit OTP" className="w-full px-4 py-2 border rounded-md" />
               {otpForm.formState.errors.otp && <p className="text-red-500">{otpForm.formState.errors.otp.message}</p>}
               <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">Verify</button>
            </form>
          </>
        )}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SignupPage;