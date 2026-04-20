/**
 * @fileoverview Entry point for the application.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TestPage from '@/test-page';

import '@lumir/styles/normalize.css';

// --------------------------------------------------------------------------------
// Render
// --------------------------------------------------------------------------------

createRoot(document.getElementById('app') as HTMLDivElement).render(
  <StrictMode>
    <TestPage />
  </StrictMode>,
);
