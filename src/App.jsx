import { Route, Routes } from 'react-router-dom';
import NavBarComponent from './components/NavBarComponent';
import HomePage from './pages/HomePage';
import Works from './pages/Works';

function App() {
  return (
    <div>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<Works />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
