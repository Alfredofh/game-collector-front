import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const handleDetected = (result) => {
            const code = result.codeResult.code;
            onDetected(code);
        };

        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                target: videoRef.current,
                constraints: {
                    facingMode: 'environment',
                    width: 640, // Ancho de video
                    height: 480  // Alto de video
                }
            },
            decoder: {
                readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader']
            },
            locate: true // Habilitar localización para mejorar el escaneo
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
        <div style={{ position: 'relative', width: '320px', height: '240px', margin: '0 auto' }}>
            <div
                ref={videoRef}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '80%',
                    height: '30%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px dashed red',
                    boxSizing: 'border-box',
                    pointerEvents: 'none'
                }}
            ></div>
        </div>
    );
};

export default BarcodeScanner;
