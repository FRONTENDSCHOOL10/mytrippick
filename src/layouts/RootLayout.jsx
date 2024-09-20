import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollDirectionDetector from '@/components/ScrollDirectionDetector';
import { Outlet } from 'react-router-dom';
import LikesHandler from '@/components/LikesHandler';

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <ScrollDirectionDetector />
        <LikesHandler />
        <main className="container">
          <Outlet />
        </main>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default RootLayout;
