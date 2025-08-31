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

    const token = searchParams.get('token');
    if (token) {
      login(token);

      navigate('/welcome', { replace: true });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/" element={<SignupPage />} />
        
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