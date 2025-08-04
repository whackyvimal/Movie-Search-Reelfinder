import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface SearchFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const SearchFilters = ({ selectedType, onTypeChange }: SearchFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-4 h-4 text-muted-foreground" />
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-40 bg-secondary border-border">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="movie">Movies</SelectItem>
          <SelectItem value="series">TV Series</SelectItem>
          <SelectItem value="episode">Episodes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;