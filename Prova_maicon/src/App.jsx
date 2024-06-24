import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [advice, setAdvice] = useState('');

    const fetchAdvice = async (keyword = '') => {
        try {
            let url = 'https://api.adviceslip.com/advice';
            if (keyword) {
                url = `https://api.adviceslip.com/advice/search/${keyword}`;
            }
            
            const response = await axios.get(url);
            
            if (response.data.slips && response.data.slips.length > 0) {
                const randomIndex = Math.floor(Math.random() * response.data.slips.length);
                setAdvice(response.data.slips[randomIndex].advice);
            } else {
                setAdvice('Conselho não encontrado.');
            }
        } catch (error) {
            console.error('Error fetching advice:', error);
            setAdvice('Ocorreu um erro ao buscar o conselho. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Conselhos Aleatórios</h1>
            <div className="text-center mb-4">
                <button className="btn btn-primary mr-2" onClick={() => fetchAdvice('dog')}>Conselho sobre Dog</button>
                <button className="btn btn-primary mr-2" onClick={() => fetchAdvice('caty')}>Conselho sobre Caty</button>
                <button className="btn btn-primary mr-2" onClick={() => fetchAdvice('study')}>Conselho sobre Study</button>
                <button className="btn btn-primary mr-2" onClick={() => fetchAdvice()}>Conselho Aleatório</button>
            </div>
            {advice && (
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">{advice}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
