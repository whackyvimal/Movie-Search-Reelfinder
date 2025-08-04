# ReelFinder Pro - Movie Search Application

A comprehensive movie search application built with React that integrates with the OMDB API to help users discover movies, TV shows, and episodes with detailed information and advanced filtering capabilities.

## 🎬 Features

### Core Functionality
- **Movie Search**: Search for movies, TV shows, and episodes using the OMDB API
- **Advanced Filtering**: Filter results by type (Movies, TV Series, Episodes)
- **Pagination**: Navigate through large sets of search results efficiently
- **Detailed Movie View**: View comprehensive information including cast, plot, ratings, and more
- **Responsive Design**: Optimized for all device sizes

### User Experience
- **Real-time Search**: Dynamic search with URL parameter management
- **Error Handling**: User-friendly error messages with retry functionality
- **Loading States**: Beautiful loading spinners and skeleton screens
- **Cinema-themed UI**: Dark theme with gold accents inspired by movie theaters

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Fetch API with OMDB API
- **Build Tool**: Vite
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reel-finder-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🎯 Usage

### Searching for Movies
1. Enter a movie title, TV show name, or keywords in the search bar
2. Optionally filter by type (All Types, Movies, TV Series, Episodes)
3. Click "Search" or press Enter
4. Browse through paginated results

### Viewing Movie Details
1. Click on any movie card from the search results
2. View comprehensive details including:
   - Movie poster and basic information
   - Plot summary
   - Cast and crew information
   - Ratings and awards
   - Release information and box office data

### Navigation
- Use the browser's back button or the "Back to Search" button to return to search results
- URL parameters are maintained for easy sharing and bookmarking

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── ErrorMessage.tsx    # Error handling component
│   ├── LoadingSpinner.tsx  # Loading state component
│   ├── MovieCard.tsx       # Movie display card
│   ├── Pagination.tsx      # Pagination navigation
│   └── SearchFilters.tsx   # Type filter dropdown
├── pages/
│   ├── SearchPage.tsx      # Main search page
│   ├── MovieDetailsPage.tsx # Movie details page
│   └── NotFound.tsx        # 404 error page
├── services/
│   └── omdbApi.ts          # OMDB API integration
├── hooks/
│   └── use-toast.ts        # Toast notification hook
├── lib/
│   └── utils.ts            # Utility functions
└── App.tsx                 # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary**: Gold (#FFD700) - Premium, cinema-inspired accent
- **Background**: Dark navy (#0F1419) - Theater-like atmosphere
- **Cards**: Charcoal (#1A1D23) - Content containers
- **Accent**: Red (#DC2626) - Action buttons and highlights

### Typography
- Clean, modern fonts with excellent readability
- Hierarchical text sizing for clear information structure

### Components
- Consistent spacing and border radius
- Smooth transitions and hover effects
- Accessible color contrasts

## 🔧 API Integration

### OMDB API
- **Base URL**: `https://www.omdbapi.com/`
- **API Key**: Configured for development use
- **Endpoints Used**:
  - Search: `/?apikey={key}&s={query}&page={page}&type={type}`
  - Details: `/?apikey={key}&i={imdbID}&plot=full`

### Error Handling
- Network error handling with retry functionality
- API error response handling
- User-friendly error messages
- Graceful fallbacks for missing data

## 🚦 Performance Optimizations

- **Efficient API Calls**: Debounced search with proper loading states
- **Image Optimization**: Lazy loading and error handling for movie posters
- **Code Splitting**: Organized component structure for optimal bundling
- **Responsive Images**: Adaptive image sizing for different screen sizes

## 🧪 Testing & Quality

### Code Quality
- TypeScript for type safety
- ESLint configuration for code consistency
- Proper error boundaries and handling
- Clean, documented code structure

### Browser Compatibility
- Modern browser support
- Responsive design for mobile, tablet, and desktop
- Progressive enhancement approach

## 🔮 Future Enhancements

- [ ] User authentication and favorites system
- [ ] Advanced search filters (year, genre, rating)
- [ ] Movie watchlists and collections
- [ ] Social features (reviews, ratings)
- [ ] Offline support with caching
- [ ] Multiple API integrations
- [ ] Video trailer integration

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: Single column layout with touch-friendly interactions
- **Tablet**: Adjusted grid layouts and spacing
- **Desktop**: Full-featured layout with optimal information density

## 🎭 Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Focus management for modal interactions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**ReelFinder Pro** - Your gateway to discovering amazing movies and TV shows! 🎬✨