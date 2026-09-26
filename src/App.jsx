import { Route, Routes } from 'react-router-dom';
import NavBarComponent from './components/NavBarComponent';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
