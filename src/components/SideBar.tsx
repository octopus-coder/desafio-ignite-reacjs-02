import React, { useEffect, useState } from 'react';
import { GenreResponseProps } from '../@types/custom';
import { api } from '../services/api';
import '../styles/button.scss';
import '../styles/sidebar.scss';
import { Button } from './Button';

interface SideBarProps {
  selectedGenre: GenreResponseProps;
  selectGenre: (id: number) => void;
}

export function SideBar({ selectedGenre, selectGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => selectGenre(genre.id)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
