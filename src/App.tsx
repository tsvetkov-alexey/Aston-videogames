import { FavouriteGames } from './pages/FavouriteGames';
import { FullGameInfo } from './pages/FullGameInfo';
import { History } from './pages/History';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:id" element={<FullGameInfo />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/favourite" element={<FavouriteGames />}></Route>
      <Route path="/history" element={<History />}></Route>
    </Routes>
  );
}

export default App;
