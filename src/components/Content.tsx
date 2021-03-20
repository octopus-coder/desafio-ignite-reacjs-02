import React, { useEffect, useState } from 'react';
import { GenreResponseProps, MovieProps } from '../@types/custom';
import { api } from '../services/api';
import '../styles/content.scss';
import { MovieCard } from './MovieCard';

interface ContentProps {
  genre: GenreResponseProps;
}

export function Content({ genre }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genre.id}`).then((response) => {
      setMovies(response.data);
    });
  }, [genre.id]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {genre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
