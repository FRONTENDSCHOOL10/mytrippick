import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="">
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
