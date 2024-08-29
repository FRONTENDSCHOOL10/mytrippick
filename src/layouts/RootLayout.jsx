import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
