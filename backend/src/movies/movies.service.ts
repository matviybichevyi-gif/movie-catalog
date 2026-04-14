import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  private movies = [
    {
      id: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      year: 2010,
      rating: 8.8,
      description: 'A mind-bending thriller',
    },
  ];

  findAll() {
    return this.movies;
  }

  create(movie: any) {
    const newMovie = {
      id: this.movies.length + 1,
      ...movie,
    };

    this.movies.push(newMovie);
    return newMovie;
  }
}