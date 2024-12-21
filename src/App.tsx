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
const App: React.FC = () => {
    return (
        <>
            <GlobalStyles />
            <AuthProvider>
                <Router>
                    <NavBar />
                    <Routes>
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/dashboard" element={<UserDashboard />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/collection/new" element={<CreateCollectionPage />} />
                        <Route path="/scanner" element={<SearchPage />} />
                        <Route path="/collection/:id" element={<CollectionPage />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    );
};

export default App;
