import RootLayout from '@/layouts/RootLayout';
import { configRoutes, getNavigationItems } from '@/utils';
import { createBrowserRouter } from 'react-router-dom';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MapSearchPage from './pages/MapSearch';
import PostWrite from './pages/PostWrite';
import EditUserInfo from './pages/EditUserInfo';
import Curation from './pages/Curation';
import ConfirmPassword from './pages/ConfirmPassword';
import DeleteAccount from './pages/DeleteAccount';
import PostEdit from './pages/PostEdit';
import EditPassword from './pages/EditPassword';

/**@type {import('react-router-dom').RouteObject[]} */
const navigation = [
  {
    text: '홈',
    path: '',
    lazy: () => import('@/pages/Home'),
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
    text: '마이페이지',
    path: '/mypage',
    lazy: () => import('@/pages/MyPage'),
  },
  {
    text: '인기 여행지 랭킹',
    path: '/ranking',
    lazy: () => import('@/pages/Ranking'),
  },
  {
    text: '내 주변 여행지 찾기',
    path: '/map-search',
    element: <MapSearchPage />,
  },
  {
    text: '게시글 작성',
    path: '/writepost',
    element: <PostWrite />,
  },
  {
    text: '게시글 상세',
    path: '/posts/:postId',
    lazy: () => import('@/pages/PostDetail'),
  },
  {
    text: '비밀번호 확인',
    path: '/mypage/confirmpassword',
    element: <ConfirmPassword />,
  },
  {
    text: '회원정보수정',
    path: '/mypage/edituserinfo',
    element: <EditUserInfo />,
  },
  {
    text: '회원탈퇴',
    path: '/mypage/deleteaccount',
    element: <DeleteAccount />,
  },
  {
    text: '나만의 큐레이션',
    path: '/curation',
    element: <Curation />,
  },
  {
    text: '게시글 수정',
    path: '/posts/:postId/postedit',
    element: <PostEdit />,
  },
  {
    text: '비밀번호 변경',
    path: '/mypage/edituserinfo/editpassword',
    element: <EditPassword />,
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
