import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import GlobalStyles from './styles/GlobalStyles';
import Logout from './components/LogOut';
import UserDashboard from './pages/UserDashboard';
import { AuthProvider } from './contexts/authContext';
import NavBar from './components/NavBar';
import CreateCollectionPage from './pages/CreateCollectionPage';
import SearchPage from './pages/BarcodeScannerPage';
import CollectionPage from './pages/CollectionPage';
import AddVideogameForm from './pages/addVideoGameForm';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
const App: React.FC = () => {
    return (
        <>
            <NotificationProvider>
                <GlobalStyles />
                <AuthProvider>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route path="/register" element={<RegisterForm />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/dashboard" element={<UserDashboard />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/collection/new" element={<ProtectedRoute><CreateCollectionPage /></ProtectedRoute>} />
                            <Route path="/scanner" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                            <Route path="/collection/" element={<ProtectedRoute><CollectionPage /></ProtectedRoute>} />
                            <Route path="/collection/:id/add-videogame" element={<ProtectedRoute><AddVideogameForm /></ProtectedRoute>} />
                        </Routes>
                    </Router>
                </AuthProvider>
            </NotificationProvider>
        </>
    );
};

export default App;
