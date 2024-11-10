import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [url, setUrl] = useState('');
    const [numWords, setNumWords] = useState(10);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/word-frequency', { url, n: numWords });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching word frequencies', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=2000&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg max-w-lg w-full rounded-3xl shadow-2xl p-10 transition-all duration-500 ease-in-out transform hover:scale-105">
                <h1
                    className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text"
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        backgroundImage: 'linear-gradient(90deg, #ff7e5f, #feb47b, #ff6a00, #d8365b)', // Sunset-inspired gradient
                    }}
                >
                    Word Frequency Checker
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow-400 placeholder-gray-500"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                    <input
                        type="number"
                        value={numWords}
                        onChange={(e) => setNumWords(e.target.value)}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow-400"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-400"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            backgroundImage: 'linear-gradient(135deg, #ff7e5f, #feb47b, #ff6a00, #d8365b)', // Sunset gradient
                            color: 'white',
                        }}
                    >
                        Submit
                    </button>
                </form>

                {loading ? (
                    <div className="flex justify-center mt-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
                    </div>
                ) : (
                    results.length > 0 && (
                        <div className="mt-8 overflow-hidden rounded-lg shadow-lg">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                <thead
                                    className="text-white"
                                    style={{
                                        backgroundImage: 'linear-gradient(90deg, #ff7e5f, #feb47b, #ff6a00, #d8365b)', // Sunset gradient
                                    }}
                                >
                                    <tr>
                                        <th
                                            className="px-6 py-4 font-semibold text-left"
                                            style={{
                                                fontFamily: 'Poppins, sans-serif',
                                                color: 'white', // Sunset orange for header text
                                            }}
                                        >
                                            Word
                                        </th>
                                        <th
                                            className="px-6 py-4 font-semibold text-left"
                                            style={{
                                                fontFamily: 'Poppins, sans-serif',
                                                color: 'white', // Sunset pink for header text
                                            }}
                                        >
                                            Frequency
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map(({ word, count }, index) => (
                                        <tr
                                            key={index}
                                            className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-orange-50`}
                                        >
                                            <td
                                                className="px-6 py-4 border-b border-gray-200"
                                                style={{ fontFamily: 'Poppins, sans-serif', color: '#ff7e5f' }} // Sunset red
                                            >
                                                {word}
                                            </td>
                                            <td
                                                className="px-6 py-4 border-b border-gray-200"
                                                style={{ fontFamily: 'Poppins, sans-serif', color: '#feb47b' }} // Sunset yellow
                                            >
                                                {count}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default App;
