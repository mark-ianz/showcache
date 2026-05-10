import { useState, useEffect, useCallback } from 'react';
import { UserAccount } from '@/types/auth';
import { authService } from '@/api/auth.service';

const STORAGE_KEY = 'tmdb_v4_account';

export function useAuth() {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAccount(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async () => {
    try {
      const callbackUrl = import.meta.env.VITE_REDIRECT_URL || `${window.location.origin}/auth/callback`;
      console.log('Initiating login with redirect_to:', callbackUrl);
      const { request_token } = await authService.createRequestToken(callbackUrl);
      
      // Save token to sessionStorage as a backup in case redirect params are lost
      sessionStorage.setItem('tmdb_pending_token', request_token);
      
      window.location.href = `https://www.themoviedb.org/auth/access?request_token=${request_token}`;
    } catch (error) {
      console.error('Failed to initiate login:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    if (account) {
      try {
        await authService.logout(account.access_token);
      } catch (error) {
        console.error('Failed to logout from TMDB:', error);
      }
    }
    localStorage.removeItem(STORAGE_KEY);
    setAccount(null);
  }, [account]);

  const completeLogin = useCallback(async (requestToken: string) => {
    try {
      const data = await authService.createAccessToken(requestToken);
      const newAccount: UserAccount = {
        access_token: data.access_token,
        account_id: data.account_id,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAccount));
      setAccount(newAccount);
      return newAccount;
    } catch (error) {
      console.error('Failed to complete login:', error);
      throw error;
    }
  }, []);

  return {
    account,
    isLoggedIn: !!account,
    loading,
    login,
    logout,
    completeLogin,
  };
}
