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
