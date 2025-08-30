import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import WelcomePage from './pages/WelcomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // This handles the redirect from the Google OAuth callback
    const token = searchParams.get('token');
    if (token) {
      login(token);
      // Clean the URL and navigate to the welcome page
      navigate('/welcome', { replace: true });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/" element={<SigninPage />} />
        
        <Route 
          path="/welcome" 
          element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;