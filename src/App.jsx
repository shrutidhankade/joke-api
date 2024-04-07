import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchJoke } from './store/Action/jokeAction';

function App() {
  const [joke, setJoke] = useState(null);
  const [showDelivery, setShowDelivery] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = () => {
    fetch('https://v2.jokeapi.dev/joke/Dark')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch joke');
        }
        return response.json();
      })
      .then(data => {
        setJoke(data);
        setShowDelivery(false); // Hide delivery when fetching new joke
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleRandomClick = () => {
    dispatch(fetchJoke)
    fetchJoke();
  };

  const handleDeliverClick = () => {
    setShowDelivery(!showDelivery);
  };

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <header className="App-header">
        <h1 className="text-3xl font-bold mb-4">Random Jokes</h1>
        {error && <p className="error text-red-600">{error}</p>}
        {joke && (
          <>
            <p className="category font-semibold">{joke.category}</p>
            <p className="setup text-lg mb-4">{joke.setup}</p>
            {showDelivery && <p className="delivery text-lg mb-4">{joke.delivery}</p>}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2  px-4 rounded"
              onClick={handleDeliverClick}>
              {showDelivery ? 'Hide Delivery' : 'Deliver'}
            </button>
          </>
        )}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleRandomClick}>Random</button>
      </header>
    </div>
  );
}

export default App;



