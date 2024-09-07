import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollDirectionDetector from '@/components/ScrollDirectionDetector';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="wrapper">
      <Header />
      <ScrollDirectionDetector />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
