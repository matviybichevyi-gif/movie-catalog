import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsOptional()
  posterUrl: string; 

  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsNumber()
  year: number;

  @IsNumber()
  rating: number;

  @IsString()
  description: string;
}