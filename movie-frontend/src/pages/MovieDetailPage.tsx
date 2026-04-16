import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error("Помилка деталей:", err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Ви точно хочете видалити цей фільм?")) {
      try {
        await axios.delete(`http://localhost:3001/movies/${id}`);
        alert("Фільм видалено!");
        navigate('/');
      } catch (err) {
        console.error("Помилка при видаленні:", err);
      }
    }
  };
  
  if (!movie) return <p>Завантаження...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{movie.title}</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src={movie.posterUrl || 'https://upload.wikimedia.org/wikipedia/ru/b/bc/Poster_Inception_film_2010.jpg'} 
          alt={movie.title} 
          style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
        />
      </div>

      <p><b>Жанр:</b> {movie.genre}</p>
      <p><b>Рік:</b> {movie.year}</p>
      <p><b>Рейтинг:</b> ⭐ {movie.rating}/10</p>
      <p><b>Опис:</b> {movie.description}</p>
      
      <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px' }}>
        <button 
          onClick={handleDelete}
          style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}
        >
          Видалити цей фільм
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;