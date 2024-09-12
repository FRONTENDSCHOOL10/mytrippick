import useGlobalStore from '@/stores/useGlobalStore';
import { useEffect } from 'react';

const ScrollDirectionDetector = () => {
  const setScrollDirection = useGlobalStore(
    (state) => state.setScrollDirection
  );

  useEffect(() => {
    const isScrollDown = () => {
      //이전 스크롤 위치
      let lastScrollTop = 0;
      window.addEventListener('scroll', function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
        lastScrollTop = st <= 0 ? 0 : st;
      });
    };

    isScrollDown();
    return () => {
      window.removeEventListener('scroll', isScrollDown);
    };
  }, [setScrollDirection]);

  return null;
};

export default ScrollDirectionDetector;
