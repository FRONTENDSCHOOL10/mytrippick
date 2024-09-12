import router from '@/router';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import useGlobalStore from '@/stores/useGlobalStore';

function App() {
  useEffect(() => {
    useGlobalStore.getState().initializeUser(); // 앱 로드 시 초기화
  }, []);
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
