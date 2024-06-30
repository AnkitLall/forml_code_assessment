import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [combination, setCombination] = useState("");
  const [attempts, setAttempts] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCombination(e.target.value);
    setAttempts(null);
    setTimeTaken(null);
    setError(null);
  };

  const handleClear = () => {
    setCombination('');
    setError(null);
    setAttempts(0);
    setTimeTaken(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (combination.length !== 10 || !/^\d+$/.test(combination)) {
      setError("Please enter a valid 10-digit combination.");
      return;
    }

    fetchPostAPI()
  }

  const fetchPostAPI = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/crack_safe', {actual_combination: '1234567890'});
      console.log(response);
      setAttempts(response.data.attempts);
      setTimeTaken(response.data.time_taken);
    } catch (error) {
      setError("Failed to crack the safe. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center p-4" style={{ backgroundImage: 'url(/vault.jpg)' }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Crack the Safe</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter 10-digit combination:
            </label>
            <input
              type="text"
              value={combination}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Crack Safe
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Clear
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        {timeTaken !== null ? (
          <div className="mt-4">
            <p className="text-green-500 font-bold">Number of attempts: {attempts}</p>
            <p className="text-green-500 font-bold">Time taken: {timeTaken.toFixed(2)} seconds</p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-gray-700 font-bold">Number of attempts so far: {attempts}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App




