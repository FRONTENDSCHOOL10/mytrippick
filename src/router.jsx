import RootLayout from '@/layouts/RootLayout';
import { configRoutes, getNavigationItems } from '@/utils';
import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/Home';
import PostDetailPage from '@/pages/PostDetail';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import PostWrite from './pages/PostWrite';

/**@type {import('react-router-dom').RouteObject[]} */
const navigation = [
  {
    text: '홈',
    path: '',
    // display: false,
    element: <HomePage />,
  },
  {
    text: '로그인',
    path: '/login',
    element: <LoginPage />,
  },
  {
    text: '회원가입',
    path: '/register',
    element: <RegisterPage />,
  },
  {
    text: '게시글 상세',
    path: '/post/:id',
    element: <PostDetailPage />,
  },
  {
    text: '게시글 작성',
    path: '/writepost',
    element: <PostWrite />,
  },
];

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: configRoutes(navigation),
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
