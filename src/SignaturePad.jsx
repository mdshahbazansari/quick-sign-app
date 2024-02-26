import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';

const SignaturePad = () => {
    const sigCanvas = useRef({});
    const [signatureId, setSignatureId] = useState(null);
    const [signatureData, setSignatureData] = useState(null);

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const saveSignature = async () => {
        const dataURL = sigCanvas.current.toDataURL();
        try {
            const response = await axios.post('/api/signatures', { signatureData: dataURL });
            alert('Signature saved successfully');
            setSignatureId(response.data.signatureId);
            setSignatureData(dataURL);
        } catch (error) {
            console.error('Error saving signature:', error);
            alert('Failed to save signature');
        }
    };

    const fetchSignature = async () => {
        try {
            const response = await axios.get(`/api/signatures/${signatureId}`);
            setSignatureData(response.data.signatureData);
        } catch (error) {
            console.error('Error fetching signature:', error);
            alert('Failed to fetch signature');
        }
    };

    return (
        <div className='bg-warning'>
            <SignatureCanvas ref={sigCanvas} penColor='black' canvasProps={{ width: 600, height: 300, className: 'sigCanvas' }} />
            <button onClick={clearSignature}>Clear Signature</button>
            <button onClick={saveSignature}>Save Signature</button>
            {signatureData && (
                <div>
                    <h2>Saved Signature:</h2>
                    <img src={signatureData} alt="Saved Signature" />
                </div>
            )}
        </div>

    );
};

export default SignaturePad;
