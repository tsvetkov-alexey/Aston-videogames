import { FullGameInfo } from './pages/FullGameInfo';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:id" element={<FullGameInfo />}></Route>
    </Routes>
  );
}

export default App;
