import React, { useState } from 'react';
import './PokemonImage.css'; // Import the CSS file

export const PokemonImage = () => {
    const [pokemonName, setPokemonName] = useState(''); // State for input
    const [pokemonImageUrl, setPokemonImageUrl] = useState(''); // State for image URL
    const [error, setError] = useState(null); // State for error handling

    // Step 1: Function to handle form submission and API call
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default page reload on form submit
        setError(null); // Reset previous errors

        try {
            // Step 2: Make the API call to fetch the Pokémon data
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            
            // Check if the response is OK (status 200)
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }

            const data = await response.json(); // Convert the response data into JSON
            
            // Step 3: Extract and update the Pokémon image URL
            setPokemonImageUrl(data.sprites.front_default); // Set the Pokémon image URL to state

        } catch (err) {
            // Step 4: Handle any errors (like a non-existent Pokémon)
            setError('Error: Pokémon not found. Please check the spelling.');
        }
    };

    return (
        <div>
          <div className="pokemon-container">
    <h1>Pokémon Image Finder</h1>

    <form onSubmit={handleFormSubmit}>
        <input
            type="text"
            placeholder="Enter Pokémon name"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type="submit">Search</button>
    </form>

    {error && <p>{error}</p>}

    {pokemonImageUrl && (
        <div className="pokemon-image-container">
            <h2>Here is your Pokémon:</h2>
            <img src={pokemonImageUrl} alt="Pokemon" />
        </div>
    )}
</div>

        </div>
    );
};

