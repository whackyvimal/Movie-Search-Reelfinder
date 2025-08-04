const API_KEY = 'a66b50e6';
const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Runtime?: string;
  imdbRating?: string;
  Released?: string;
  Country?: string;
  Language?: string;
  Awards?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

export interface SearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailResponse extends Movie {
  Response: string;
  Error?: string;
}

export const searchMovies = async (
  query: string,
  page: number = 1,
  type?: string
): Promise<SearchResponse> => {
  try {
    const typeParam = type && type !== 'all' ? `&type=${type}` : '';
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}${typeParam}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies. Please try again.');
  }
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetailResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details. Please try again.');
  }
};