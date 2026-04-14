import { Controller, Get, Post, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.moviesService.findAll();
  }

  @Post()
  createMovie(@Body() body: any) {
    return this.moviesService.create(body);
  }
}