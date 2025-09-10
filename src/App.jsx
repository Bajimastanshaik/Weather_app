
import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  React.useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`flex justify-center items-center h-screen ${theme}`}> {/* theme class for root div */}
        <WeatherCard />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
