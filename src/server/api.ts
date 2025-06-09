import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

function handleAxiosError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.status_message ||
      error.message ||
      `Request failed during ${context}`;
    throw new Error(message);
  }
  throw new Error(`Unexpected error during ${context}`);
}

export async function fetchMoviesByKeyword(keyword: string, page = 1) {
  try {
    const response = await tmdb.get('/search/movie', {
      params: {
        query: keyword,
        page,
      },
    });

    return {
      data: response.data.results,
      total: response.data.total_results,
    };
  } catch (error: unknown) {
    handleAxiosError(error, 'fetching movies');
  }
}

// Guest session
export async function createGuestSession(): Promise<string> {
  try {
    const res = await tmdb.get('/authentication/guest_session/new');
    return res.data.guest_session_id;
  } catch (error) {
    handleAxiosError(error, 'creating guest session');
  }
}

// Get genres
export async function fetchGenres(): Promise<Record<number, string>> {
  try {
    const res = await tmdb.get('/genre/movie/list', {
      params: { language: 'en-US' },
    });

    const genres: Record<number, string> = {};
    res.data.genres.forEach((g: { id: number; name: string }) => {
      genres[g.id] = g.name;
    });

    return genres;
  } catch (error) {
    handleAxiosError(error, 'fetching genres');
  }
}

// Rated Movies

export async function fetchRatedMovies(guestSessionId: string, page = 1) {
  try {
    const response = await tmdb.get(
      `/guest_session/${guestSessionId}/rated/movies`,
      {
        params: {
          page,
          sort_by: 'created_at.asc',
        },
      },
    );

    return {
      data: response.data.results,
      total: response.data.total_results,
    };
  } catch (error) {
    handleAxiosError(error, 'fetching rated movies');
  }
}

//Rated Movie

export async function rateMovie(
  movieId: number,
  value: number,
  guestSessionId: string,
) {
  try {
    await tmdb.post(
      `/movie/${movieId}/rating`,
      { value },
      {
        params: {
          guest_session_id: guestSessionId,
        },
      },
    );
  } catch (error) {
    handleAxiosError(error, `rating movie ID ${movieId}`);
  }
}
