import RootLayout from '@/layouts/RootLayout';
import { configRoutes, getNavigationItems } from '@/utils';
import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/Home';
import PostDetailPage from '@/pages/PostDetail';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MapSearchPage from './pages/MapSearch';

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
    text: '내 주변 여행지 찾기',
    path: '/map-search',
    element: <MapSearchPage />,
  },
  {
    text: '게시글 상세',
    path: '/post/:id',
    element: <PostDetailPage />,
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
