import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            setError(null); 
            const jsonData = JSON.parse(jsonInput); 
            const res = await axios.post('https://baja-backendj.onrender.com/bfhl', { data: jsonData.data });
            setResponse(res.data);
            console.log(res);
        } catch (error) {
            if (error instanceof SyntaxError) {
                setError('Invalid JSON format');
            } else {
                setError('API Error');
                console.error('API Error', error);
            }
            setResponse(null); 
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(opt => opt !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    return (
        <div className="App">
            <h1>Bajaj Finserv Health Dev Challenge Qualifier 1</h1>
            <br />
            <h3>By ADITH SAGAR GOWDA (21BAI1928)</h3>
            <h3>API Input</h3>
            <input
                type="text"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"data":["M","1","334","4","B"]}'
            />
            <button onClick={handleSubmit}>Submit</button>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <h4>Multi Filter</h4>
            <select multiple onChange={handleOptionChange}>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>

            {response && (
                <div>
                    <h4>Filtered Response</h4>
                    {selectedOptions.includes('numbers') && <div>Numbers: {response.numbers.join(',')}</div>}
                    {selectedOptions.includes('alphabets') && <div>Alphabets: {response.alphabets.join(',')}</div>}
                    {selectedOptions.includes('highest_lowercase_alphabet') && <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(',')}</div>}
                </div>
            )}
        </div>
    );
}

export default App;
