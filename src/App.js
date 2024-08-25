// import React, { useState } from 'react';
// import './App.css';

// function App() {
//     const [jsonInput, setJsonInput] = useState('');
//     const [response, setResponse] = useState(null);
//     const [selectedOptions, setSelectedOptions] = useState([]);
//     const [error, setError] = useState('');

//     const handleSubmit = async () => {
//         try {
//             const parsedData = JSON.parse(jsonInput);
//             const res = await fetch('http://localhost:5000/bfhl', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ data: parsedData }),
//             });

//             const data = await res.json();
//             setResponse(data);
//             setError('');
//         } catch (e) {
//             setError('Invalid JSON input');
//         }
//     };

//     const handleOptionChange = (e) => {
//         const value = Array.from(
//             e.target.selectedOptions,
//             (option) => option.value
//         );
//         setSelectedOptions(value);
//     };

//     const renderResponse = () => {
//         if (!response) return null;
//         return (
//             <div>
//                 {selectedOptions.includes('Numbers') && (
//                     <div>Numbers: {response.numbers.join(', ')}</div>
//                 )}
//                 {selectedOptions.includes('Alphabets') && (
//                     <div>Alphabets: {response.alphabets.join(', ')}</div>
//                 )}
//                 {selectedOptions.includes('Highest lowercase alphabet') && (
//                     <div>
//                         Highest Lowercase Alphabet:{' '}
//                         {response.highest_lowercase_alphabet.join(', ')}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className="App">
//             <h1>Bajaj Finserv Health Challenge</h1>
//             <textarea
//                 value={jsonInput}
//                 onChange={(e) => setJsonInput(e.target.value)}
//                 placeholder='Enter JSON here'
//             />
//             <br />
//             <button onClick={handleSubmit}>Submit</button>
//             {error && <div className="error">{error}</div>}
//             {response && (
//                 <>
//                     <h2>Response:</h2>
//                     <select multiple onChange={handleOptionChange}>
//                         <option value="Numbers">Numbers</option>
//                         <option value="Alphabets">Alphabets</option>
//                         <option value="Highest lowercase alphabet">
//                             Highest lowercase alphabet
//                         </option>
//                     </select>
//                     {renderResponse()}
//                 </>
//             )}
//         </div>
//     );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.parse(jsonInput);
            const res = await axios.post('https://baja-backendj.onrender.com/bfhl', { data: jsonData.data });
            setResponse(res.data);
            console.log(res);
        } catch (error) {
            console.error('Invalid JSON or API Error', error);
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
            <h1>Bajaj Finserv Health Dev Challenge Qualifier 1</h1><br /><h3>By ADITH SAGAR GOWDA (21BAI1928)</h3>
            <h3>API Input</h3>
            <input
                type="text"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"data":["M","1","334","4","B"]}'
            />
            <button onClick={handleSubmit}>Submit</button>

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
