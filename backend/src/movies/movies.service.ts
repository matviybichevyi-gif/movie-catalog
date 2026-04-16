import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// Оновлюємо інтерфейс: додаємо posterUrl
export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  description: string;
  posterUrl?: string; 
}

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      year: 2010,
      rating: 8.8,
      description: 'A mind-bending thriller',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/bc/Poster_Inception_film_2010.jpg/250px-Poster_Inception_film_2010.jpg',
    },
  ];

  findAll(): Movie[] {
    return this.movies;
  }

  findOne(id: number): Movie {
    const movie = this.movies.find((m) => m.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  create(movieData: CreateMovieDto): Movie {
    const newMovie = {
      id: Date.now(),
      ...movieData,
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  update(id: number, updateData: UpdateMovieDto): Movie {
    const movie = this.findOne(id);
    const movieIndex = this.movies.findIndex((m) => m.id === id);
    
    this.movies[movieIndex] = {
      ...movie,
      ...updateData,
    };
    
    return this.movies[movieIndex];
  }

  remove(id: number): Movie {
    const movie = this.findOne(id);
    this.movies = this.movies.filter((m) => m.id !== id);
    return movie;
  }
}