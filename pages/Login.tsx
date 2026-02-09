
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  navigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, navigate }) => {
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin Credentials Check
    if (role === UserRole.ADMIN) {
      if (email === 'Admin@trotech.com' && password === 'Trotechadmin@102') {
        const adminUser: User = {
          id: 'ADM001',
          name: 'Super Admin',
          email: 'Admin@trotech.com',
          role: UserRole.ADMIN,
          status: 'ACTIVE'
        };
        onLogin(adminUser);
        navigate('portal');
        return;
      } else {
        setError('Invalid Admin Credentials. Please check your email and password.');
        return;
      }
    }

    // Default mock login for other roles
    const mockUser: User = {
      id: role === UserRole.DEVELOPER ? 'DEV001' : 'CLT001',
      name: role === UserRole.DEVELOPER ? 'Lead Dev' : 'Premium Client',
      email: email || 'user@example.com',
      role: role,
      status: 'ACTIVE'
    };
    onLogin(mockUser);
    navigate('portal');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-brand-red rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg shadow-red-900/20">T</div>
          <h2 className="text-4xl font-bold text-brand-dark tracking-tight">Portal Access</h2>
          <p className="mt-2 text-gray-500 font-medium">Select your role to enter the dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-2xl mb-6">
            {(Object.keys(UserRole) as Array<keyof typeof UserRole>).filter(k => k !== 'PUBLIC').map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(UserRole[r]);
                  setError('');
                }}
                className={`py-3 text-xs font-bold rounded-xl transition-all ${role === UserRole[r] ? 'bg-white shadow-md text-brand-red' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {r}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-brand-red text-sm font-bold p-4 rounded-2xl border border-red-100 animate-bounce">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-red focus:bg-white transition-all font-medium"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-red focus:bg-white transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-5 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-brand-dark hover:bg-gray-800 transition-all shadow-xl hover:scale-[1.02] active:scale-95"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
