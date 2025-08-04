import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Globe, 
  Star, 
  Trophy,
  DollarSign,
  Users,
  Play
} from 'lucide-react';
import { getMovieDetails, MovieDetailResponse } from '@/services/omdbApi';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground mt-4">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage 
            message={error} 
            onRetry={fetchMovieDetails}
          />
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="border-border hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {movie.Poster !== 'N/A' && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={movie.Poster}
              alt=""
              className="w-full h-full object-cover blur-xl scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
          </div>
        )}
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <div className="w-80 max-w-full">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
                  alt={movie.Title}
                  className="w-full rounded-lg shadow-2xl"
                  onError={handleImageError}
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-6">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {movie.Title}
                </h1>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground capitalize">
                    {movie.Type}
                  </Badge>
                  {movie.Genre?.split(', ').map((genre) => (
                    <Badge key={genre} variant="outline" className="border-border">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  {movie.Year && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.Year}</span>
                    </div>
                  )}
                  {movie.Runtime && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{movie.Runtime}</span>
                    </div>
                  )}
                  {movie.Country && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <span>{movie.Country}</span>
                    </div>
                  )}
                  {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <div className="flex items-center gap-2 text-primary">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{movie.imdbRating}/10</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Plot */}
              {movie.Plot && movie.Plot !== 'N/A' && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Plot</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {movie.Plot}
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-4">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Trailer
                </Button>
                <Button variant="outline" className="border-border">
                  Add to Favorites
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cast & Crew */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Cast & Crew
              </h3>
              <div className="space-y-3">
                {movie.Director && movie.Director !== 'N/A' && (
                  <div>
                    <span className="font-medium text-foreground">Director: </span>
                    <span className="text-muted-foreground">{movie.Director}</span>
                  </div>
                )}
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div>
                    <span className="font-medium text-foreground">Cast: </span>
                    <span className="text-muted-foreground">{movie.Actors}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Additional Information
              </h3>
              <div className="space-y-3">
                {movie.Released && movie.Released !== 'N/A' && (
                  <div>
                    <span className="font-medium text-foreground">Released: </span>
                    <span className="text-muted-foreground">{movie.Released}</span>
                  </div>
                )}
                {movie.Language && movie.Language !== 'N/A' && (
                  <div>
                    <span className="font-medium text-foreground">Language: </span>
                    <span className="text-muted-foreground">{movie.Language}</span>
                  </div>
                )}
                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <div>
                    <span className="font-medium text-foreground">Box Office: </span>
                    <span className="text-muted-foreground">{movie.BoxOffice}</span>
                  </div>
                )}
                {movie.Production && movie.Production !== 'N/A' && (
                  <div>
                    <span className="font-medium text-foreground">Production: </span>
                    <span className="text-muted-foreground">{movie.Production}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Awards */}
        {movie.Awards && movie.Awards !== 'N/A' && (
          <Card className="bg-card border-border mt-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Awards & Recognition
              </h3>
              <p className="text-muted-foreground">{movie.Awards}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;