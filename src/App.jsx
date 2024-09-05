import router from '@/router';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
