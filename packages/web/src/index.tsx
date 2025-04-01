import React from 'react';
import ReactDOM from 'react-dom/client';
import { sum } from '@ditwordhet/shared';

function App() {
  const result = sum(1, 2);
  return (
    <div>
      <h1>Dit Word Het</h1>
      <p>Test shared package: {result}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
