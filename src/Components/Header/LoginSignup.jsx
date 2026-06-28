// src/Components/Header/LoginSignup.jsx
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function LoginSignup() {
  const navigate = useNavigate();
  const { 
    login, 
    signup, 
    googleLogin, 
    closeAuthModal,
    sendPasswordResetOTP,
    verifyOTP,
    resetPassword 
  } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState('login'); // login | forgot | otp | reset
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // ✅ OTP Timer
  useEffect(() => {
    if (step === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (otpTimer === 0) {
      setCanResend(true);
    }
  }, [otpTimer, step]);

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      closeAuthModal();
      navigate('/');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  // ✅ Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signup(fullName, email, password);
    setLoading(false);

    if (result.success) {
      closeAuthModal();
      navigate('/');
    } else {
      setError(result.error || 'Signup failed. Please try again.');
    }
  };

  // ✅ Handle Forgot Password - Send OTP
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await sendPasswordResetOTP(email);
    setLoading(false);

    if (result.success) {
      setSuccess(`OTP sent to ${email}. Check console.`);
      setStep('otp');
      setOtpTimer(60);
      setCanResend(false);
      console.log('🔐 OTP for testing:', result.otp);
    } else {
      setError(result.error || 'Failed to send OTP. Try again.');
    }
  };

  // ✅ Handle OTP Verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await verifyOTP(email, otp);
    setLoading(false);

    if (result.success) {
      setSuccess('OTP verified! Set new password.');
      setStep('reset');
    } else {
      setError(result.error || 'Invalid OTP. Try again.');
    }
  };

  // ✅ Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await resetPassword(email, newPassword);
    setLoading(false);

    if (result.success) {
      setSuccess('Password reset successfully!');
      setTimeout(() => {
        setStep('login');
        setEmail('');
        setPassword('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccess('');
      }, 2000);
    } else {
      setError(result.error || 'Failed to reset password.');
    }
  };

  // ✅ Resend OTP
  const handleResendOTP = async () => {
    setError('');
    setLoading(true);
    const result = await sendPasswordResetOTP(email);
    setLoading(false);

    if (result.success) {
      setSuccess(`New OTP sent to ${email}`);
      setOtpTimer(60);
      setCanResend(false);
      console.log('🔐 New OTP:', result.otp);
    } else {
      setError(result.error || 'Failed to resend OTP.');
    }
  };

  // ✅ Google Login
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const userData = await userInfo.json();
        
        const result = await googleLogin(userData);
        if (result.success) {
          closeAuthModal();
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError('Google login failed.');
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      setError('Google login failed.');
    }
  });

  const renderStep = () => {
    switch(step) {
      case 'forgot': return renderForgotPassword();
      case 'otp': return renderOTPVerification();
      case 'reset': return renderResetPassword();
      default: return renderLoginSignup();
    }
  };

  // ✅ Forgot Password View
  const renderForgotPassword = () => (
    <div className="space-y-4 animate-fade-in">
      <button
        onClick={() => { setStep('login'); setError(''); setSuccess(''); setEmail(''); }}
        className="text-orange-600 text-xs flex items-center gap-1.5 hover:text-orange-700 font-bold transition-all duration-300 group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Login
      </button>

      <div>
        <h2 className="text-xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-900 bg-clip-text text-transparent">Reset Password</h2>
        <p className="text-gray-400 text-xs mt-0.5">Enter your email for a 6-digit OTP</p>
      </div>

      {error && (
        <div className="p-2.5 bg-rose-50/80 backdrop-blur-md border border-rose-100 rounded-xl text-rose-600 text-xs flex items-center gap-2 animate-shake">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleForgotPassword} className="space-y-3.5">
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all duration-300 shadow-inner"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-rose-600 text-white py-2.5 rounded-xl font-bold hover:opacity-95 active:scale-[0.98] transition-all duration-300 shadow-md shadow-orange-500/20 text-sm disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
    </div>
  );

  // ✅ OTP Verification View
  const renderOTPVerification = () => (
    <div className="space-y-4 animate-fade-in">
      <button
        onClick={() => { setStep('login'); setError(''); setSuccess(''); setOtp(''); }}
        className="text-orange-600 text-xs flex items-center gap-1.5 hover:text-orange-700 font-bold transition-all duration-300 group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Login
      </button>

      <div>
        <h2 className="text-xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-900 bg-clip-text text-transparent">Verify OTP</h2>
        <p className="text-gray-400 text-xs mt-0.5">Enter code sent to {email}</p>
      </div>

      {error && (
        <div className="p-2.5 bg-rose-50/80 backdrop-blur-md border border-rose-100 rounded-xl text-rose-600 text-xs flex items-center gap-2 animate-shake">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {success && (
        <div className="p-2.5 bg-emerald-50/80 backdrop-blur-md border border-emerald-100 rounded-xl text-emerald-600 text-xs flex items-center gap-2 animate-fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}

      <form onSubmit={handleVerifyOTP} className="space-y-3.5">
        <div className="space-y-1 text-center">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            maxLength="6"
            className="w-40 mx-auto px-3 py-1.5 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-lg tracking-widest font-black text-center transition-all duration-300 block shadow-inner"
            required
          />
          <p className="text-[11px] text-gray-400 font-medium">
            {otpTimer > 0 ? `Expires in ${otpTimer}s` : 'OTP expired'}
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading || otpTimer === 0}
          className="w-full bg-gradient-to-r from-orange-500 to-rose-600 text-white py-2.5 rounded-xl font-bold hover:opacity-95 active:scale-[0.98] transition-all duration-300 shadow-md shadow-orange-500/20 text-sm disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {canResend && (
          <button
            type="button"
            onClick={handleResendOTP}
            className="w-full text-orange-600 text-xs font-bold hover:text-orange-700 transition-all text-center block hover:underline"
          >
            Resend OTP
          </button>
        )}
      </form>
    </div>
  );

  // ✅ Reset Password View
  const renderResetPassword = () => (
    <div className="space-y-3.5 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-900 bg-clip-text text-transparent">Set New Password</h2>
        <p className="text-gray-400 text-xs mt-0.5">Create a highly secure password</p>
      </div>

      {error && (
        <div className="p-2 bg-rose-50/80 backdrop-blur-md border border-rose-100 rounded-xl text-rose-600 text-xs flex items-center gap-2 animate-shake">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleResetPassword} className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all duration-300 shadow-inner"
            required
            minLength="6"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all duration-300 shadow-inner"
            required
            minLength="6"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="col-span-2 w-full bg-gradient-to-r from-orange-500 to-rose-600 text-white py-2 rounded-xl font-bold hover:opacity-95 active:scale-[0.98] transition-all duration-300 shadow-md shadow-orange-500/20 text-sm disabled:opacity-50 mt-1"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );

  // ✅ Login/Signup View
  const renderLoginSignup = () => (
    <div className="animate-fade-in">
      {/* Tabs & Title Wrapper */}
      <div className="flex flex-row justify-between items-center mb-3.5 border-b border-gray-100 pb-2">
        <div>
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-orange-950 bg-clip-text text-transparent tracking-tight leading-tight">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-gray-400 text-[11px] font-medium">
            {isLogin ? 'Login to your dashboard portal' : 'Create an account dashboard'}
          </p>
        </div>
        
        {/* Sleek High-End Tab Switcher */}
        <div className="flex bg-gray-100/80 p-0.5 rounded-xl border border-gray-200/40 relative">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); setSuccess(''); setPassword(''); }}
            className={`text-[11px] font-extrabold px-3 py-1.5 rounded-lg transition-all duration-300 relative z-10 ${
              isLogin ? 'text-white shadow-sm bg-gradient-to-r from-orange-500 to-rose-500' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); setSuccess(''); setPassword(''); setFullName(''); }}
            className={`text-[11px] font-extrabold px-3 py-1.5 rounded-lg transition-all duration-300 relative z-10 ${
              !isLogin ? 'text-white shadow-sm bg-gradient-to-r from-orange-500 to-rose-500' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-2.5 p-2 bg-rose-50/80 backdrop-blur-md border border-rose-100 rounded-xl text-rose-600 text-xs flex items-center gap-2 animate-shake">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {success && (
        <div className="mb-2.5 p-2 bg-emerald-50/80 backdrop-blur-md border border-emerald-100 rounded-xl text-emerald-600 text-xs flex items-center gap-2 animate-fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}

      {/* Form with smooth heights */}
      <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-2.5">
        <div className={`grid ${!isLogin ? 'grid-cols-2 animation-expand' : 'grid-cols-1'} gap-2.5`}>
          {!isLogin && (
            <div className="space-y-0.5 animate-fade-in">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                placeholder="Dhruv Patel"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all duration-300 shadow-inner"
                required
              />
            </div>
          )}

          <div className="space-y-0.5">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              placeholder="Dhruvkumar@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all duration-300 shadow-inner"
              required
            />
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="flex justify-between items-center">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
            {isLogin && (
              <button
                type="button"
                onClick={() => { setStep('forgot'); setError(''); setSuccess(''); }}
                className="text-[10px] text-orange-600 hover:text-rose-600 font-extrabold transition-colors duration-300"
              >
                Forgot Password?
              </button>
            )}
          </div>
          <input
            type="password"
            placeholder="5252552"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all duration-300 shadow-inner"
            required
            minLength={isLogin ? 1 : 6}
          />
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1.5">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-rose-600 text-white py-2.5 rounded-xl font-bold hover:opacity-95 active:scale-[0.97] transition-all duration-300 shadow-md shadow-orange-500/20 text-sm disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-1.5">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ...
              </span>
            ) : (
              isLogin ? 'Login' : 'Register'
            )}
          </button>

          {/* Premium Branded Google Button */}
          <button
            type="button"
            onClick={() => googleLoginHandler()}
            className="w-full flex items-center justify-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50/80 active:scale-[0.97] py-2.5 rounded-xl transition-all duration-300 text-sm font-bold text-gray-600 shadow-sm hover:border-gray-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Google</span>
          </button>
        </div>
      </form>

      {/* Footer Switcher link */}
      <p className="text-center text-gray-400 text-[11px] mt-3.5 font-bold tracking-wide">
        {isLogin ? "Don't have an account? " : 'Already registered? '}
        <button
          onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); setPassword(''); }}
          className="text-orange-500 hover:text-rose-600 transition-colors duration-300 font-extrabold ml-0.5 relative group"
        >
          {isLogin ? 'Sign Up' : 'Login'}
          <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </button>
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-fade-in-backdrop">
      {/* Container - Landscape, Compact Height, Micro Glassmorphism Ambient Glow */}
      <div className="w-full max-w-[430px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(234,88,12,0.15)] border border-gray-100 relative overflow-hidden transform scale-100 transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(234,88,12,0.22)]">
        {/* Decorative Top Accent Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 via-orange-600 to-rose-600" />
        
        {/* High-End Absolute Close Icon Trigger */}
        <button
          onClick={closeAuthModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-all duration-300 p-1.5 rounded-xl hover:bg-gray-100/60 hover:rotate-90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5.5 sm:p-6">
          {renderStep()}
        </div>
      </div>

      {/* Injection of Core Premium Smooth Framework CSS Keyframes directly */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInBackdrop {
          from { backdrop-filter: blur(0px); background-color: rgba(0,0,0,0); }
          to { backdrop-filter: blur(12px); background-color: rgba(0,0,0,0.5); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-backdrop { animation: fadeInBackdrop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-shake { animation: shake 0.2s ease-in-out 2; }
      `}</style>
    </div>
  );
}

export default LoginSignup;