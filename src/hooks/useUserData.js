import { useState, useEffect } from 'react';
import pb from '@/api/pb';

export function useUserData(userId) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const user = await pb.collection('users').getOne(userId);
        setUserInfo(user);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('사용자 정보 가져오기 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return { userInfo, loading, error };
}
