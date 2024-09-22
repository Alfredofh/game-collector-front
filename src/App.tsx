import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import GlobalStyles from './styles/GlobalStyles'; 
import Logout from './components/LogOut';
import UserDashboard from './pages/UserDashboard';
import { AuthProvider } from './contexts/authContext';
const App: React.FC = () => {
    return (
        <>
            <GlobalStyles /> 
            <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                </Routes>
            </Router>
            </AuthProvider>
        </>
    );
};

export default App;
