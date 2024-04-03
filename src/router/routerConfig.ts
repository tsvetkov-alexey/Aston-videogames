import { lazily } from 'react-lazily';

const { Home } = lazily(() => import('../pages/Home'));
const { FullGameInfo } = lazily(() => import('../pages/FullGameInfo'));
const { NotFoundBlock } = lazily(() => import('../components/NotFound'));
const { SignIn } = lazily(() => import('../pages/SignIn'));
const { SignUp } = lazily(() => import('../pages/SignUp'));
const { History } = lazily(() => import('../pages/History'));
const { FavouriteGames } = lazily(() => import('../pages/FavouriteGames'));

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
