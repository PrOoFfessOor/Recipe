import { useEffect, useState } from 'react';
import Container from './Container';

function App() {
  const [recipes, setRecipes] = useState([]); // Store recipe data
  const [search, setSearch] = useState(''); // Store user input
  const [query, setQuery] = useState('chicken'); // Default query

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data.meals || []); // Set recipes or empty array if no data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRecipes();
  }, [query]); // Trigger fetching when `query` changes

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update search input
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery(search); // Set query based on user input
    setSearch(''); // Reset search input after submission
  };

  return (
    <Container>
      <h1>Recipe App</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a recipe"
          value={search}
          onChange={handleSearchChange}
          style={{
            width: '300px',
            height: '30px',
            textAlign: 'center',
            fontSize: '20px',
            textTransform: 'capitalize',
          }}
        />
        <button
          type="submit"
          style={{
            width: '200px',
            height: '30px',
            fontSize: '20px',
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '10px',
            marginTop: '10px',
            border: '1px solid black',
          }}
        >
          Search Recipes
        </button>
      </form>

      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} style={{ marginBottom: '20px' }}>
              <h2>{recipe.strMeal}</h2>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                style={{ width: '200px', height: 'auto' }}
              />
              <p><strong>Instructions:</strong> {recipe.strInstructions}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default App;