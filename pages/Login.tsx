
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
  const [showHelper, setShowHelper] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (role === UserRole.ADMIN) {
      if (normalizedEmail === 'admin@trotech.com' && normalizedPassword === 'Trotechadmin@102') {
        const adminUser: User = {
          id: 'ADM001',
          name: 'Super Admin',
          email: 'Admin@trotech.com',
          role: UserRole.ADMIN,
          status: 'ACTIVE',
          joinedAt: '2023 01 01'
        };
        onLogin(adminUser);
        navigate('portal');
        return;
      } else {
        setError('Invalid Admin Credentials.');
        setShowHelper(true);
        return;
      }
    }

    const mockUser: User = {
      id: role === UserRole.DEVELOPER ? 'DEV001' : 'CLT001',
      name: role === UserRole.DEVELOPER ? 'Lead Dev' : 'Premium Client',
      email: normalizedEmail || 'user@example.com',
      role: role,
      status: 'ACTIVE',
      joinedAt: new Date().toLocaleDateString()
    };
    onLogin(mockUser);
    navigate('portal');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-brand-red rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg shadow-red-900/20">T</div>
          <h2 className="text-4xl font-bold text-brand-dark tracking-tight">Portal Access</h2>
          <p className="mt-2 text-gray-500 font-medium">Secure login for Trotech stakeholders</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-gray-100 rounded-2xl mb-6">
            {(Object.keys(UserRole) as Array<keyof typeof UserRole>).filter(k => k !== 'PUBLIC').map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(UserRole[r]);
                  setError('');
                  setShowHelper(false);
                }}
                className={`py-3 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all ${role === UserRole[r] ? 'bg-white shadow-md text-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {r}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-brand-red text-sm font-bold p-4 rounded-2xl border border-red-100 flex flex-col gap-2">
              <span>{error}</span>
              {showHelper && (
                <div className="mt-2 pt-2 border-t border-red-100 text-[10px] uppercase tracking-tighter opacity-80">
                  Hint: admin@trotech.com | Trotechadmin@102
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2">Email Identity</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-red focus:bg-white transition-all font-bold"
                placeholder="name@trotech.com"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2">Access Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-red focus:bg-white transition-all font-bold"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-5 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-brand-dark hover:bg-gray-800 transition-all shadow-xl hover:scale-[1.02] active:scale-95"
          >
            Authorize Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
