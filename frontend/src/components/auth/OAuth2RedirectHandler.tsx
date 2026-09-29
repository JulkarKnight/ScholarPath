import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export const OAuth2RedirectHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      localStorage.setItem('jwt_token', token);
      navigate('/app/profile', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center items-center">
      <Loader2 className="w-10 h-10 animate-spin text-[var(--color-brand)] mb-4" />
      <p className="text-[var(--color-text-secondary)] font-medium">Authenticating...</p>
    </div>
  );
};
