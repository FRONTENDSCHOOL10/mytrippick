import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollDirectionDetector from '@/components/ScrollDirectionDetector';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <ScrollDirectionDetector />
        <main className="container">
          <Outlet />
        </main>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default RootLayout;
