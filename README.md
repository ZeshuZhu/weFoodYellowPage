# WeFood Yellow Page Project

## Project Overview

WeFood Yellow Page is a comprehensive business directory platform focused on connecting restaurants with suppliers, service providers, and other business partners within the Asian/Chinese restaurant industry. The application serves as a digital yellow pages that helps businesses find reliable suppliers and partners, while allowing suppliers to showcase their services to potential clients.

## Features

- **Business Listings**: Display businesses with filtering by category, ratings, location, etc.
- **Search Functionality**: Search for businesses by name, type, or keywords
- **User Authentication**: Registration and login system
- **Business Detail View**: View detailed information about each business
- **Category Navigation**: Browse businesses by categories
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Business Verification**: "WEFOOD Certified" badging for verified businesses

## Project Structure
src/
├── assets/             # Images and other static assets
├── components/         # React components
│   ├── common/         # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer)
│   └── pages/          # Page components
├── contexts/           # React context providers
├── styles/             # CSS and styling files
└── utils/              # Utility functions and helpers

## Key Components

### Layout Components

- **Layout.js**: Main layout wrapper that includes Header, content area, and Footer
- **Header.js**: Navigation header with logo and user authentication menu
- **Footer.js**: Basic footer component

### Page Components

- **LandingPage.js**: Initial entry page with animated business cards and call-to-action buttons
- **HomePage.js**: Main dashboard showing business listings with filtering and search
- **SearchPage.js**: Dedicated search page (currently a placeholder)
- **LoginPage.js**: User login form
- **RegisterPage.js**: User registration form
- **PublishPage.js**: Form for publishing new business listings

### Common Components

- **BusinessCard.js**: Card component for displaying business information in grid or list view
- **BusinessDetailPanel.js**: Side panel showing detailed business information
- **CategorySelector.js**: Horizontal scrollable category selection bar
- **FilterSort.js**: Filtering and sorting controls for business listings
- **SearchBar.js**: Search input component
- **Logo.js**: Logo component with configurable size

## Styling Information

- The project uses **Tailwind CSS** for styling
- **Main style file**: `src/styles/tailwind.css` contains custom utilities and animations
- **Component-specific styles**: Most components use inline Tailwind classes
- **Landing page styles**: Special animations for the landing page cards are defined in the tailwind.css file
- **Modal animations**: Defined in tailwind.css for smooth transitions
- **Responsive breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

To modify styling:
1. For global changes, edit the `src/styles/tailwind.css` file
2. For component-specific styling, modify the Tailwind classes in individual component files
3. Animation styles are defined in the `tailwind.css` file

## Data Management

- **Mock data source**: Currently using a CSV file (`public/fakeDataBase.csv`) for business listings
- **Data loading**: Handled by `src/utils/data.js` using Papa Parse for CSV parsing
- **Data structure**: Business objects have fields like name, description, contact, phone, website, addresses, tags, etc.

## Images and Assets

- **Logo**: Located in `src/assets/images/Logo.png`
- **Business images**: Currently using placeholder images (`https://placehold.co/...`)
- To update images:
  1. Add new images to `src/assets/images/`
  2. Import and use them in components
  3. For business listing images, update the `getPlaceholderImage()` function in relevant components

## Backend Integration Points

Currently, the application uses mock data, but it's designed to be connected to a backend. Key integration points:

1. **Authentication**: Login/Register forms in `LoginPage.js` and `RegisterPage.js`
2. **Business data loading**: `loadBusinessData()` in `src/utils/data.js`
3. **Search functionality**: `handleSearch()` in `SearchBar.js`
4. **Business filtering**: `filterBusinesses()` in `src/utils/data.js`
5. **Form submissions**: Various form handlers in page components

To connect to a real backend:
1. Create API service functions in `src/utils/api.js`
2. Replace mock data loading with API calls
3. Implement authentication token management
4. Add error handling for API responses

## Configuration

Key points that may need configuration:

1. **Router base path**: In `App.js`, update the `basename` prop in the Router component if deploying to a subdirectory
2. **API endpoints**: When implementing real API calls, create a configuration file for endpoint URLs
3. **Business categories**: The category list in `HomePage.js` might need updating based on your specific needs
4. **Filter options**: Update filter options in `FilterSort.js` to match your data structure

## CSV Data Format

The project uses a CSV file with the following columns:
fax, phone, name, contact, description, url, website, addresses, tags, keyword

## Mobile Responsiveness

The application is fully responsive with specific layouts for:
- **Mobile**: Single column grid view or list view with simplified UI
- **Tablet**: Two or three column grid view
- **Desktop**: Four column grid layout with side panel for details

Mobile-specific components adapt their layout based on screen width, detected through:
```javascript
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
```
## Known Issues and Limitations
1. The search functionality is currently not fully implemented (placeholder alert)
2. CSV data loading may fail if the file format doesn't match exactly
3. Business detail panel might cause layout shifts on some browsers
4. No actual backend integration is implemented yet

## Future Development
Based on the PRD, future development will include:

1. Business verification workflow
2. User reviews and ratings
3. Direct messaging between users and businesses
4. Advanced search with more filtering options
5. Promotion and advertising features

## Getting Started

1. Clone the repository
2. Install dependencies: npm install
3. Start the development server: npm start
4. The application will be available at http://localhost:3000

## Deployment
The project is configured for GitHub Pages deployment:

1. Update the homepage field in package.json with your GitHub Pages URL
2. Run npm run deploy to build and deploy to GitHub Pages

## Dependencies

- ** React and React DOM **
- ** React Router DOM **
- ** Axios for HTTP requests **
- ** PapaParse for CSV parsing **
- ** React Transition Group for animations **

For any questions or clarification, please feel free to contact with me.
