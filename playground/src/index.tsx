/**
 * @fileoverview Entry point for the application.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TestPage from '@/test-page';

// --------------------------------------------------------------------------------
// Render
// --------------------------------------------------------------------------------

createRoot(document.getElementById('app') as HTMLDivElement).render(
  <StrictMode>
    <TestPage />
  </StrictMode>,
);
