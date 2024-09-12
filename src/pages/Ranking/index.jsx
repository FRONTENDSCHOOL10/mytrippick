import { lazy, Suspense } from 'react';
import S from './Ranking.module.css';
import AppSpinner from '@/components/AppSpinner/AppSpinner';

const RankContents = lazy(() => import('./RankContents'));

export function Component() {
  return (
    <>
      <h1 className={`headline2 ${S.sectionTitle}`}>인기 여행지 랭킹</h1>
      <Suspense fallback={<AppSpinner />}>
        <RankContents />
      </Suspense>
    </>
  );
}
