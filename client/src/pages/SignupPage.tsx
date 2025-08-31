import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, verifyOtp } from '../services/api';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Auth_img from "../../public/auth-image.png";
import logo from "../../public/icon.png";

// Schema for the main signup form
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.date("Date of birth is required"),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
type SignupFormData = z.infer<typeof signupSchema>;

// Schema for the OTP form
const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});
type OtpFormData = z.infer<typeof otpSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      setError(null);
      await signupUser(data);
      setUserEmail(data.email);
      setIsOtpSent(true);      
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Signup failed. An account with this email may already exist.');
    }
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    try {
      setError(null);
      const response = await verifyOtp({ email: userEmail, otp: data.otp });
      login(response.data.token); 
      navigate('/welcome');       
    } catch (err: any) {
      setError(err.response?.data?.msg || 'OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-5xl">
        
        <div className="flex items-center absolute lg:ml-5 ml-38 mt-4 gap-2">
          <img src={logo} alt="logo" className='w-5' />
          <span className="font-semibold text-gray-800 text-lg">HD</span>
        </div>
        {/* Left Section: Form */}
        <div className="w-full lg:w-[40%] p-8 sm:p-12 flex flex-col justify-center lg:mt-0 mt-8">

          <h2 className="text-3xl font-bold text-gray-900 text-center lg:text-start">Sign up</h2>
          <p className="text-gray-600 mb-6 text-center lg:text-start">
            {!isOtpSent 
              ? 'Sign up to enjoy the feature of HD' 
              : `An OTP has been sent to ${userEmail}`}
          </p>

          {!isOtpSent ? (
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input id="name" {...signupForm.register('name')} placeholder="Enter your name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                {signupForm.formState.errors.name && <p className="mt-1 text-red-500 text-sm">{signupForm.formState.errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Controller
                  control={signupForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Enter DOB"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      dateFormat="dd MMMM yyyy"
                      className="mt-1 block lg:w-[19.5rem] w-[17.6rem] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                    />
                  )}
                />
                {signupForm.formState.errors.dateOfBirth && <p className="mt-1 text-red-500 text-sm">{signupForm.formState.errors.dateOfBirth.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="email" {...signupForm.register('email')} placeholder="Enter your email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                {signupForm.formState.errors.email && <p className="mt-1 text-red-500 text-sm">{signupForm.formState.errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input id="password" type="password" {...signupForm.register('password')} placeholder="Enter your password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                {signupForm.formState.errors.password && <p className="mt-1 text-red-500 text-sm">{signupForm.formState.errors.password.message}</p>}
              </div>
              
              <button type="submit" className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Get OTP
              </button>
            </form>
          ) : (
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP Code</label>
                <input id="otp" {...otpForm.register('otp')} placeholder="Enter 6-digit OTP" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                {otpForm.formState.errors.otp && <p className="mt-1 text-red-500 text-sm">{otpForm.formState.errors.otp.message}</p>}
              </div>
              <button type="submit" className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Verify & Sign Up
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 pt-4">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-500">Sign in</Link>
          </p>
          
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>

        {/* Right Section: Image - Hidden on screens smaller than lg */}
        <div className="hidden lg:flex w-[60%] relative items-center justify-center pt-1 pr-1">
          <img src={Auth_img} alt="Abstract illustration" className="h-[42.5rem] w-[43rem] object-fit" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
