# UK Manufacturing Megaprojects Dashboard

A comprehensive dashboard showcasing UK manufacturing investments over £250 million, featuring interactive maps, detailed project information, and advanced filtering capabilities.

## Features

- **Interactive Map**: UK-focused map with project locations and clustering
- **Project Cards**: Detailed information cards with UK formatting
- **Advanced Filtering**: Filter by industry, region, investment size, and status
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Search**: Search across projects, companies, and locations
- **UK-specific**: Proper £ currency formatting, UK English, and regional data

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Map**: Mapbox GL JS (with fallback for demo)
- **Build Tool**: Vite
- **State Management**: React hooks
- **Date Handling**: date-fns with UK locale

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (optional for demo):
   ```bash
   cp .env.example .env
   ```
   
   If you want the interactive Mapbox map, add your token:
   ```
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Map Configuration

The dashboard includes two map modes:

### Interactive Map (with Mapbox token)
- Full interactive UK map with zoom, pan, and satellite views
- Proper marker clustering
- Real-time hover tooltips
- Smooth animations and transitions

### Fallback Map (without token)
- Simplified SVG-based UK map
- Static regional boundaries
- Basic project markers
- Hover information panels

To use the interactive map, get a free Mapbox token at https://mapbox.com and add it to your `.env` file.

## Project Structure

```
├── components/
│   ├── layout/           # Header, Layout components
│   ├── map/             # Map and fallback components
│   ├── project/         # Project cards and filters
│   └── ui/              # Reusable UI components
├── data/                # Sample project data
├── types/               # TypeScript interfaces
├── utils/               # Utility functions
└── styles/              # Global styles
```

## Sample Data

The dashboard includes sample data for 5 major UK manufacturing projects:

1. **Britishvolt Gigafactory** (£2.6bn) - Battery manufacturing in Northumberland
2. **Jaguar Land Rover Halewood** (£500m) - EV production in Merseyside
3. **Rolls-Royce SMR Programme** (£400m) - Nuclear energy in Derby
4. **GlobalFoundries Malta** (£300m) - Semiconductors in Scotland
5. **Tata Steel Port Talbot** (£750m) - Green steel in Wales

## Key Features

### UK-Specific Formatting
- Currency: £2.6bn, £500m format
- Dates: DD/MM/YYYY format
- Spelling: UK English throughout
- Regions: England, Scotland, Wales, Northern Ireland

### Responsive Design
- Mobile-first approach
- Collapsible filters on mobile
- Touch-friendly interactions
- Adaptive layouts for all screen sizes

### Advanced Filtering
- **Industry**: Semiconductor, Automotive, Battery, etc.
- **Region**: All UK regions including Northern Ireland
- **Investment Size**: From £250m to £2bn+
- **Status**: Announced, Planning, Construction, etc.
- **Search**: Real-time text search across all fields

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

### Adding New Projects

Projects are stored in `/data/sample-projects.json`. Each project follows the `UKProject` interface:

```typescript
interface UKProject {
  id: string;
  companyName: string;
  projectName: string;
  location: {
    city: string;
    region: 'England' | 'Scotland' | 'Wales' | 'Northern Ireland';
    coordinates: { latitude: number; longitude: number };
  };
  investment: {
    amount: number;
    displayAmount: string;
  };
  // ... more fields
}
```

### Styling Guidelines

- Use Tailwind CSS classes
- Follow UK design patterns
- Ensure mobile-first responsive design
- Use semantic HTML elements
- Maintain accessibility standards

## Deployment

The project is configured for deployment on:

- **Vercel**: Ready with `vercel.json`
- **Netlify**: Compatible with build settings
- **GitHub Pages**: Static build support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Mapbox for mapping services
- UK Government for data sources
- Tailwind CSS for styling framework
- React community for excellent tooling