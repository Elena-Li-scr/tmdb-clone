export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
  vote_average?: number;
}

export interface RatedMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
  rating: number;
}

export interface AppContextType {
  guestSessionId: string | null;
  genres: Record<number, string>;
  loading: boolean;
  ratedMovies: RatedMovie[];
  updateRatedMovie: (page?: number) => void;
  setCurrentRatedPage: React.Dispatch<React.SetStateAction<number>>;
  currentRatedPage: number;
  totalRated: number;
  ratedMap: Record<number, number>;
  setRatedMap: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}
