import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import AddMoviePage from './pages/AddMoviePage';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Каталог</Link>
        <Link to="/add" style={{ color: 'white' }}>+ Додати фільм</Link>
      </nav>

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/add" element={<AddMoviePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;