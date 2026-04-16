import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

useEffect(() => {
  axios.get('http://localhost:3001/movies')
    .then(res => {
      console.log("Дані з сервера:", res.data); // Це з'явиться в консолі F12
      setMovies(res.data);
    })
    .catch(err => {
      console.error("Помилка при отриманні:", err);
    });
}, []);

 return (
  <div>
    <h1>Список фільмів</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
      {movies.map((movie: any) => (
        <div key={movie.id} className="movie-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '12px', textAlign: 'center' }}>
          

          <img 
            src={movie.posterUrl ? movie.posterUrl : 'https://upload.wikimedia.org/wikipedia/ru/b/bc/Poster_Inception_film_2010.jpg'} 
            alt={movie.title} 
            className="movie-poster"
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
          
          <h3>{movie.title}</h3>
          <p>Жанр: {movie.genre} | Рік: {movie.year}</p>
          <p>Рейтинг: ⭐ {movie.rating}</p>
          
          <Link to={`/movies/${movie.id}`} className="details-link">
            Детальніше
          </Link>
        </div>
      ))}
    </div>
  </div>
);
};

export default HomePage;