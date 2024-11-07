import React, { useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
    useEffect(() => {
        const handleDetected = (result) => {
            const code = result.codeResult.code;
            onDetected(code);
        };

        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                target: document.querySelector('#barcode-scanner'),
                constraints: {
                    facingMode: 'environment'
                }
            },
            decoder: {
                readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader']
            }
        }, (err) => {
            if (err) {
                console.error('Error al inicializar Quagga:', err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected(handleDetected);

        return () => {
            Quagga.stop();
            Quagga.offDetected(handleDetected);
        };
    }, [onDetected]);

    return (
        <div id="barcode-scanner" style={{ width: '100%', height: '100%' }}>
            {/* Elemento donde se renderiza el video */}
        </div>
    );
};

export default BarcodeScanner;
