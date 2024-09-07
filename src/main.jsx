import '@/styles/main.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import App from '@/App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('react-app');

if (!container) {
  throw new Error('문서에 "#root" 요소가 존재하지 않습니다.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
