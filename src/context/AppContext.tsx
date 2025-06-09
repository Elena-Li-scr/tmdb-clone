'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createGuestSession,
  fetchGenres,
  fetchRatedMovies,
} from '@/server/api';

interface RatedMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
  rating: number;
}

interface AppContextType {
  guestSessionId: string | null;
  genres: Record<number, string>;
  loading: boolean;
  ratedMovies: RatedMovie[];
  updateRatedMovie: (page?: number) => void;
  setCurrentRatedPage: React.Dispatch<React.SetStateAction<number>>;
  currentRatedPage: number;
  totalRated: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [genres, setGenres] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [currentRatedPage, setCurrentRatedPage] = useState(1);
  const [totalRated, setTotalRated] = useState(0);

  const updateRatedMovie = useCallback(
    (page = 1) => {
      if (!guestSessionId) return;
      setLoading(true);

      fetchRatedMovies(guestSessionId, page)
        .then((res) => {
          if (!res) return;
          setRatedMovies(res.data);
          setTotalRated(res.total);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    },
    [guestSessionId],
  );

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const sessionId = await createGuestSession();
        const genreMap = await fetchGenres();
        setGuestSessionId(sessionId);
        setGenres(genreMap);
      } catch (error) {
        console.error('App init error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        guestSessionId,
        genres,
        loading,
        ratedMovies,
        updateRatedMovie,
        currentRatedPage,
        setCurrentRatedPage,
        totalRated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
