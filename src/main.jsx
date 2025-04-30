import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './ThemeContex.jsx';
import { FilterProvider, SearchTermProvider } from './pages/Hooks.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ThemeProvider>
    <FilterProvider>
    <SearchTermProvider>
      <App />
      </SearchTermProvider>
      </FilterProvider>
    </ThemeProvider>
  </StrictMode>
);
