import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMoviesByKeyword(keyword: string, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: keyword,
        page,
      },
    });

    return {
      data: response.data.results,
      total: response.data.total_results,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.status_message ||
          error.message ||
          'Request failed',
      );
    }

    throw new Error('Something went wrong while fetching movies');
  }
}
