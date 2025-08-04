import { Link } from 'react-router-dom';
import { Movie } from '@/services/omdbApi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Film } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="group">
      <Card className="bg-movie-card border-border hover:bg-movie-hover transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-movie-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-primary text-primary-foreground capitalize"
          >
            {movie.Type}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {movie.Title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{movie.Year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Film className="w-4 h-4" />
              <span className="capitalize">{movie.Type}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;