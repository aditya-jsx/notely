// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useNavigate } from 'react-router-dom';
// import { signupUser, verifyOtp } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// const signupSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
// });

// const otpSchema = z.object({
//   otp: z.string().length(6, 'OTP must be 6 digits'),
// });

// type SignupFormData = z.infer<typeof signupSchema>;
// type OtpFormData = z.infer<typeof otpSchema>;

// const SignupPage = () => {
//   const [showOtpForm, setShowOtpForm] = useState(false);
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const signupForm = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });
//   const otpForm = useForm<OtpFormData>({ resolver: zodResolver(otpSchema) });

//   const onSignupSubmit = async (data: SignupFormData) => {
//     try {
//       setError(null);
//       await signupUser(data);
//       setEmail(data.email);
//       setShowOtpForm(true);
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'An error occurred during signup.');
//     }
//   };

//   const onOtpSubmit = async (data: OtpFormData) => {
//     try {
//       setError(null);
//       const response = await verifyOtp({ email, otp: data.otp });
//       login(response.data.token);
//       navigate('/welcome');
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'An error occurred during OTP verification.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         {!showOtpForm ? (
//           <>
//             <h2 className="text-2xl font-bold text-center">Create an Account</h2>
//             <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
//               {/* Form Inputs for name, email, password */}
//               <input {...signupForm.register('name')} placeholder="Name" className="w-full px-4 py-2 border rounded-md" />
//               {signupForm.formState.errors.name && <p className="text-red-500">{signupForm.formState.errors.name.message}</p>}
              
//               <input {...signupForm.register('email')} placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
//               {signupForm.formState.errors.email && <p className="text-red-500">{signupForm.formState.errors.email.message}</p>}
              
//               <input type="password" {...signupForm.register('password')} placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
//               {signupForm.formState.errors.password && <p className="text-red-500">{signupForm.formState.errors.password.message}</p>}

//               <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">Sign Up</button>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
//             <p className="text-center text-gray-600">An OTP has been sent to {email}</p>
//             <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
//                <input {...otpForm.register('otp')} placeholder="Enter 6-digit OTP" className="w-full px-4 py-2 border rounded-md" />
//                {otpForm.formState.errors.otp && <p className="text-red-500">{otpForm.formState.errors.otp.message}</p>}
//                <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md">Verify</button>
//             </form>
//           </>
//         )}

//         <p className="text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign In
//           </Link>
//         </p>

//         {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default SignupPage;









// import { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Link, useNavigate } from 'react-router-dom';
// import { signupUser } from '../services/api';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const signupSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   // Change dateOfBirth to accept a Date object
//   dateOfBirth: z.date({
//     // required_error: "Date of Birth is required",
//     // invalid_type_error: "That's not a valid date!",
//   }),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(8, 'Password must be at least 8 characters long'),
// });

// type SignupFormData = z.infer<typeof signupSchema>;

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState<string | null>(null);
//   // We get 'control' from useForm now
//   const { register, handleSubmit, control, formState: { errors } } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = async (data: SignupFormData) => {
//     try {
//       setError(null);
//       // The 'data' object will now contain a Date object for dateOfBirth
//       console.log(data); 
//       await signupUser(data);
//       navigate('/signin'); 
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
//         {/* Left Section: Form */}
//         <div className="w-1/2 p-12 flex flex-col justify-center space-y-6">
//           <div className="flex items-center space-x-2 mb-8">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#3B82F6"/></svg>
//             <span className="font-bold text-gray-800 text-lg">HD</span>
//           </div>

//           <h2 className="text-3xl font-bold text-gray-900">Sign up</h2>
//           <p className="text-gray-600 mb-6">Sign up to enjoy the feature of HD</p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
//               <input id="name" {...register('name')} placeholder="Jonas Khanwald" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//               {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
//             </div>

//             {/* --- CUSTOM DATE PICKER IMPLEMENTATION --- */}
//             <div>
//               <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
//               <Controller
//                 control={control}
//                 name="dateOfBirth"
//                 render={({ field }) => (
//                   <DatePicker
//                     placeholderText="11 December 1997"
//                     onChange={(date) => field.onChange(date)}
//                     selected={field.value}
//                     dateFormat="dd MMMM yyyy"
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     showYearDropdown
//                     scrollableYearDropdown
//                     yearDropdownItemNumber={100}
//                   />
//                 )}
//               />
//               {errors.dateOfBirth && <p className="mt-1 text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
//             </div>
            
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input id="email" type="email" {...register('email')} placeholder="jonas_kahnwald@gmail.com" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//               {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input id="password" type="password" {...register('password')} placeholder="Enter your password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//               {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>}
//             </div>
            
//             <button type="submit" className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//               Get OTP
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{' '}
//             <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-500">Sign in</Link>
//           </p>
          
//           {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//         </div>

//         {/* Right Section: Image */}
//         <div className="w-1/2 relative">
//           <img src="https://images.unsplash.com/photo-1616400619175-5beda3fdcd7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Abstract Waves" className="w-full h-full object-cover" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;






import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, verifyOtp } from '../services/api';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Schema for the main signup form
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.date("Invalid date of birth"),
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
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Left Section: Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-2 mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#3B82F6"/></svg>
            <span className="font-bold text-gray-800 text-lg">HD</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900">Sign up</h2>
          <p className="text-gray-600 mb-6">
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
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-500">Sign in</Link>
          </p>
          
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>

        <div className="w-1/2 relative">
          <img src="https://images.unsplash.com/photo-1616400619175-5beda3fdcd7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Abstract Waves" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;