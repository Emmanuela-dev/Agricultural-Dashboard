import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Sun, Cloud, Wind, Droplets, ClipboardList, CheckCircle2, Circle, SunDim, Moon } from 'lucide-react';
import './App.css'; // <-- MAKE SURE TO IMPORT THE NEW CSS FILE

// --- MOCK DATA FOR THE NEW DESIGN ---
const weatherData = {
  location: "Narok, Kenya",
  temperature: 24,
  description: "Sunny with light clouds",
  icon: <Sun size={80} />,
  details: {
    humidity: "64%",
    wind: "12 km/h"
  }
};

const cropPerformanceData = [
  { name: "Maize", yield: "1.8 tons/acre", profit: "KES 22,500/ton", icon: "🌽" },
  { name: "Wheat", yield: "1.5 tons/acre", profit: "KES 30,000/ton", icon: "🌾" },
  { name: "Potatoes", yield: "8 tons/acre", profit: "KES 5,500/bag", icon: "🥔" },
  { name: "Beans", yield: "0.6 tons/acre", profit: "KES 70,000/ton", icon: "🫘" },
];

const profitTrendData = [
  { month: 'Jan', profit: 40000 },
  { month: 'Feb', profit: 30000 },
  { month: 'Mar', profit: 55000 },
  { month: 'Apr', profit: 48000 },
  { month: 'May', profit: 72000 },
  { month: 'Jun', profit: 68000 },
];

const initialTasks = [
  { id: 1, text: "Inspect Field A1 for pests", completed: false },
  { id: 2, text: "Schedule fertilizer delivery", completed: true },
  { id: 3, text: "Repair the irrigation pump", completed: false },
  { id: 4, text: "Check market prices for wheat", completed: false },
];

// --- THEME HOOK ---
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };
  return [isDarkMode, toggleDarkMode];
};

// --- UI COMPONENTS ---

const Header = ({ onThemeToggle, isDarkMode }) => (
  <header className="header">
    <div className="header-brand">
      <Leaf className="icon" size={28} />
      <span>AgriFuture</span>
    </div>
    <div className="header-controls">
      <button onClick={onThemeToggle} className="theme-toggle" aria-label="Toggle theme">
        {isDarkMode ? <SunDim size={20} /> : <Moon size={20} />}
      </button>
      {/* Add other controls like user profile here */}
    </div>
  </header>
);

const WelcomeBanner = () => (
  <div className="welcome-banner">
    <h1>Hello Farmer!</h1>
    <p>Here is your farm's overview .</p>
  </div>
);

const WeatherWidget = () => (
  <div className="card weather-widget">
    <div className="weather-main">
      <div className="icon">{weatherData.icon}</div>
      <div>
        <div className="weather-temp">{weatherData.temperature}°</div>
        <p className="weather-desc">{weatherData.description}</p>
      </div>
    </div>
    <div className="weather-details">
      <p>{weatherData.location}</p>
      <p><Droplets size={16} style={{ verticalAlign: 'middle' }} /> Humidity: {weatherData.details.humidity}</p>
      <p><Wind size={16} style={{ verticalAlign: 'middle' }} /> Wind: {weatherData.details.wind}</p>
    </div>
  </div>
);

const CropPerformanceCard = () => (
  <div className="card crop-performance-card">
    <h2 className="card-title">
      <Leaf className="icon" size={24} />
      <span>Crop Performance</span>
    </h2>
    <div className="crop-list">
      {cropPerformanceData.map(crop => (
        <div className="crop-item" key={crop.name}>
          <div className="crop-info">
            <span className="crop-icon">{crop.icon}</span>
            <div>
              <div className="crop-name">{crop.name}</div>
              <div className="crop-yield">{crop.yield}</div>
            </div>
          </div>
          <div className="crop-profit">{crop.profit}</div>
        </div>
      ))}
    </div>
  </div>
);

const TaskListCard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="card task-list-card">
      <h2 className="card-title">
        <ClipboardList className="icon" size={24} />
        <span>Farm Tasks</span>
      </h2>
      <div className="task-list">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`task-item ${task.completed ? 'completed' : ''}`}
            onClick={() => toggleTask(task.id)}
          >
            {task.completed ? <CheckCircle2 className="icon" size={20} /> : <Circle className="icon" size={20} />}
            <span>{task.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfitTrendChart = () => (
  <div className="card profit-chart-card">
    <h2 className="card-title">Monthly Profit Trend (KES)</h2>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={profitTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
          <XAxis dataKey="month" stroke="var(--text-secondary-light)" />
          <YAxis stroke="var(--text-secondary-light)" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg-light)', border: '1px solid var(--border-light)' }} />
          <Line type="monotone" dataKey="profit" stroke="#8D6E63" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="dashboard-container">
      <Header onThemeToggle={toggleDarkMode} isDarkMode={isDarkMode} />
      <main>
        <WelcomeBanner />
        <div className="main-grid">
          <WeatherWidget />
          <CropPerformanceCard />
          <TaskListCard />
          <ProfitTrendChart />
        </div>
      </main>
    </div>
  );
}
