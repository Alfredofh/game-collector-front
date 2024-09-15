import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import GlobalStyles from './styles/GlobalStyles'; 

const App: React.FC = () => {
    return (
        <>
            <GlobalStyles /> 
            <Router>
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
