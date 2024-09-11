import { useState, useEffect } from 'react';
import pb from '@/api/pb';

export function useUserData(userId) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered with userId:', userId); // useEffect 실행 여부 확인

    if (!userId) {
      setError('유효하지 않은 사용자 ID');
      setLoading(false);
      return; // userId가 없으면 fetch를 하지 않음
    }

    // AbortController 생성
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const user = await pb.collection('users').getOne(userId, { signal });

        console.log('Fetched user from PocketBase:', user); // 데이터가 제대로 넘어오는지 확인
        setUserInfo(user);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted'); // 요청이 중단된 경우
        } else {
          console.error('Error fetching user:', error); // 구체적인 에러 확인
          setError('사용자 정보 가져오기 실패');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();

    // 컴포넌트가 언마운트되거나 useEffect가 재실행될 때 요청을 취소
    return () => {
      controller.abort();
    };
  }, [userId]);

  return { userInfo, loading, error };
}
