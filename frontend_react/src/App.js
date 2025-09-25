import React from 'react';
import './styles/theme.css';
import './styles/global.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import BacklogPage from './pages/BacklogPage';

/**
 * VizAi – Frontend entry. Renders the application layout:
 * - Header navigation
 * - Sidebar filters
 * - Main content with backlog management
 */
function App() {
  return (
    <div className="vizai-app">
      <Header />
      <div className="vizai-shell">
        <Sidebar />
        <main className="vizai-main">
          <BacklogPage />
        </main>
      </div>
    </div>
  );
}

export default App;
