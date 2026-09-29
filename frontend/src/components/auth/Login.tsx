import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Lock, User } from 'lucide-react';
import { ScholarPathLogo } from '../ScholarPathLogo';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawRedirect = searchParams.get('redirect');
  const redirectPath = rawRedirect && rawRedirect.startsWith('/app') ? rawRedirect : '/app/readiness';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      localStorage.setItem('jwt_token', data.token);
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-6 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
        <div className="flex justify-center mb-6">
          <Link to="/">
            <ScholarPathLogo variant="full" />
          </Link>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-[var(--color-text-primary)]">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--color-surface)] py-8 px-4 shadow-xl shadow-[var(--color-navy)]/5 sm:rounded-2xl sm:px-10 border border-[var(--color-border)]">
          <div className="mb-6">
            <a
              href="http://localhost:8080/oauth2/authorization/google"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition-colors font-medium shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              Continue with Google
            </a>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--color-surface)] text-[var(--color-text-tertiary)]">
                Or continue with username
              </span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-[var(--color-danger)]/10 text-[var(--color-danger)] dark:text-[#F87171] border border-[var(--color-danger)]/20 p-3 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}
            <div>
              <label className="sp-label">Username</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[var(--color-text-tertiary)]" />
                </div>
                <input
                  type="text"
                  required
                  className="sp-input !pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label className="sp-label">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[var(--color-text-tertiary)]" />
                </div>
                <input
                  type="password"
                  required
                  className="sp-input !pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="sp-btn sp-btn-primary w-full flex justify-center py-2.5"
              >
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to={searchParams.get('redirect') ? `/register?redirect=${encodeURIComponent(redirectPath)}` : '/register'}
                className="font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
              >
                Create a new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
