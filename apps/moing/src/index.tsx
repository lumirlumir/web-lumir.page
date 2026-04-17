/**
 * @fileoverview Entry point for the application.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

import '@/styles/index.css';

// --------------------------------------------------------------------------------
// Render
// --------------------------------------------------------------------------------

createRoot(document.getElementById('app') as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
