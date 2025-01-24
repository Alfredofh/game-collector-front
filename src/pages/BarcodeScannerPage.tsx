import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from '../features/games/BarcodeScanner';
import SearchByGameNameForm from '../components/searchForm';
const SearchPage: React.FC = () => {
    const navigate = useNavigate();
    const [detected, setDetected] = useState(false);
    const [detectedCode, setDetectedCode] = useState<string | null>(null);

    const handleBarcodeDetected = (code: string) => {
        if (code === detectedCode) {
            return;
        }

        setDetectedCode(code);
        setDetected(true);

        console.log('Código de barras detectado:', code);

        setTimeout(() => {
            setDetected(false);
        }, 2000);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: detected ? 'lightgreen' : '#1e1e1e',
                transition: 'background-color 0.3s ease',
            }}
        >
            <h1>Escáner de Código de Barras</h1>

            {detected && (
                <p style={{ color: 'green', fontWeight: 'bold' }}>¡Código Detectado Exitosamente!</p>
            )}

            <BarcodeScanner onDetected={handleBarcodeDetected} />
            <SearchByGameNameForm />
            <button onClick={handleBack} style={{ marginTop: '20px' }}>
                Volver
            </button>
        </div>
    );
};

export default SearchPage;
