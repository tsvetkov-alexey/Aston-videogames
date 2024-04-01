import { NotFoundBlock } from '../components/NotFound';
import { FavouriteGames } from '../pages/FavouriteGames';
import { FullGameInfo } from '../pages/FullGameInfo';
import { History } from '../pages/History';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export const publicRoutes = [
  { path: '', component: Home },
  { path: 'game/:id', component: FullGameInfo },
  { path: 'notFound', component: NotFoundBlock },
  { path: '*', component: NotFoundBlock },
];

export const noAuthRoutes = [
  { path: 'signIn', component: SignIn },
  { path: 'signUp', component: SignUp },
];

export const authOnlyRoutes = [
  { path: 'favourite', component: FavouriteGames },
  { path: 'history', component: History },
];
