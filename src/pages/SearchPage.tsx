import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Film } from 'lucide-react';
import { searchMovies, Movie } from '@/services/omdbApi';
import MovieCard from '@/components/MovieCard';
import SearchFilters from '@/components/SearchFilters';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { useToast } from '@/hooks/use-toast';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string = searchQuery, page: number = 1, type: string = selectedType) => {
    if (!query.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a movie title to search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchMovies(query, page, type);
      
      if (response.Response === 'False') {
        setMovies([]);
        setTotalResults(0);
        setError(response.Error || 'No movies found');
        return;
      }

      setMovies(response.Search || []);
      setTotalResults(Number(response.totalResults) || 0);
      
      // Update URL params
      const params = new URLSearchParams();
      params.set('q', query);
      params.set('page', page.toString());
      if (type !== 'all') params.set('type', type);
      setSearchParams(params);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch(searchQuery, page, selectedType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
    if (hasSearched) {
      handleSearch(searchQuery, 1, type);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    handleSearch(searchQuery, 1, selectedType);
  };

  const handleRetry = () => {
    handleSearch(searchQuery, currentPage, selectedType);
  };

  // Load initial search if URL has query params
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      setSelectedType(searchParams.get('type') || 'all');
      setCurrentPage(Number(searchParams.get('page')) || 1);
      handleSearch(query, Number(searchParams.get('page')) || 1, searchParams.get('type') || 'all');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-movie-dark via-movie-card to-movie-dark border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Film className="w-12 h-12 md:w-16 md:h-16 text-primary" />
              ReelFinder Pro
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover your next favorite movie or TV show
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for movies, TV shows, episodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <SearchFilters
                selectedType={selectedType}
                onTypeChange={handleTypeChange}
              />
              <Button 
                type="submit" 
                size="lg" 
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={handleRetry}
            className="mb-8"
          />
        )}

        {loading && !error && (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner size="lg" />
            <p className="text-muted-foreground mt-4">Searching for movies...</p>
          </div>
        )}

        {!loading && !error && hasSearched && movies.length === 0 && (
          <div className="text-center py-20">
            <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No movies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Search Results ({totalResults.toLocaleString()} found)
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              resultsPerPage={10}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!hasSearched && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Start your search</h3>
            <p className="text-muted-foreground">
              Enter a movie title above to discover amazing films and TV shows
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;