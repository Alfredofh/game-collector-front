import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from '../components/BarcodeScanner';

const BarcodeScannerPage: React.FC = () => {
    const navigate = useNavigate();
    const [detectedCode, setDetectedCode] = useState<string | null>(null);

    const handleBarcodeDetected = (code: string) => {
        setDetectedCode(code);
        console.log('Código de barras detectado:', code);
    };

    const handleBack = () => {
        navigate(-1); // Navegar hacia atrás
    };

    return (
        <div>
            <h1>Escáner de Código de Barras</h1>
            {detectedCode ? (
                <p style={{ color: 'green' }}>Código Detectado: {detectedCode}</p>
            ) : (
                <p>Escaneando...</p>
            )}
            <BarcodeScanner onDetected={handleBarcodeDetected} />

            <button onClick={handleBack} style={{ marginTop: '20px' }}>
                Volver
            </button>
        </div>
    );
};

export default BarcodeScannerPage;
