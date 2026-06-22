// src/component/LoginSignup.jsx
import React, { useState } from 'react';

function LoginSignup() {
  // ============================================
  // ⚙️ 1. STATES MANAGEMENT (Data Store)
  // ============================================
  
  // Isse check karenge ki Login screen dikhani hai ya Sign Up (True = Login, False = Signup)
  const [isLogin, setIsLogin] = useState(true); 
  
  // Forgot Password screen ko ON/OFF karne ke liye toggle state
  const [showForgotPassword, setShowForgotPassword] = useState(false); 
  
  // Inputs ki value track karne ke liye states
  const [email, setEmail] = useState('');           // User ka email storage
  const [password, setPassword] = useState('');       // User ka password storage
  const [fullName, setFullName] = useState('');       // Sirf Signup ke waqt naam store karne ke liye
  const [forgotEmail, setForgotEmail] = useState(''); // Forgot password screen ka email storage
  
  // UI States (Loading animation aur success message ke liye)
  const [loading, setLoading] = useState(false);      // Button par 'Please wait...' dikhane ke liye
  const [resetSent, setResetSent] = useState(false);  // Password link bhejne ke baad success message dikhane ke liye

  // ============================================
  // 🔐 2. CONFIGURATIONS (Google Auth Keys)
  // ============================================
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5173/auth/google/callback';

  // ============================================
  // 🛠️ 3. HANDLER FUNCTIONS (Form Submissions)
  // ============================================

  // A. Normal Email Se Login Karne Ka Function
//   const handleEmailLogin = (e) => {
//     e.preventDefault(); // Page refresh hone se rokne ke liye
//     setLoading(true);   // Loader chalu karein
    
//     // Fake Server Timeout (Real API jaisa feel dene ke liye)
//     setTimeout(() => {
//       alert(`Demo Login Successful!\nWelcome back, ${email}`);
//       setLoading(false); // Loader band karein
//       window.location.href = '/'; // Login hone ke baad Home Page par bhej do
//     }, 500);
//   };
const handleEmailLogin = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {

    localStorage.setItem("userName", email.split("@")[0]);

    alert(`Demo Login Successful!\nWelcome back, ${email}`);
    setLoading(false);
    window.location.href = "/";
  }, 500);
};
  // B. Naya Account Banane (Sign Up) Ka Function
//   const handleSignup = (e) => {
//     e.preventDefault(); // Page refresh block karein
//     setLoading(true);   // Loader chalu
    
//     setTimeout(() => {
//       alert(`Demo Signup Successful!\nAccount created for ${fullName}`);
//       setLoading(false); // Loader band
//       setIsLogin(true);  // Account bante hi user ko wapas Login tab par switch kar do
//     }, 500);
//   };
const handleSignup = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {

    localStorage.setItem("userName", fullName);

    alert(`Demo Signup Successful!\nAccount created for ${fullName}`);
    setLoading(false);
    window.location.href = "/";
  }, 500);
};
  // C. Password Bholne Par Reset Link Bhejne Ka Function
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      alert('Please enter your email address first!');
      return;
    }
    setResetSent(true); // Success card/screen activate karein
  };

  // D. Google OAuth Login Function
 const handleGoogleLogin = () => {
  if (!GOOGLE_CLIENT_ID) {
    alert("Google Client ID missing!");
    return;
  }

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;

  window.location.href = googleAuthUrl;
};
  // ============================================
  // 🎨 4. JSX UI RENDERING
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center !p-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="!p-6">
          
          {showForgotPassword ? (
            /* -------------------------------------------
               🖥️ SCREEN A: FORGOT PASSWORD VIEW
               ------------------------------------------- */
            <div>
              {/* Wapas jaane ka button */}
              <button 
                onClick={() => { setShowForgotPassword(false); setResetSent(false); setForgotEmail(''); }}
                className="text-orange-600 !text-xs !mb-4 flex items-center !gap-1 hover:underline font-medium"
              >
                ← Back to Login
              </button>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Reset Password</h2>
              <p className="text-gray-500 text-xs mb-5">Enter your email and we'll send you a link.</p>

              {resetSent ? (
                /* Success Message Grid: Link jaane ke baad dikhega */
                <div className="bg-green-50 text-green-800 rounded-xl p-4 text-center border border-green-200">
                  <div className="text-3xl mb-2">✉️</div>
                  <p className="text-xs font-medium">Reset link successfully sent to:</p>
                  <b className="text-xs block text-gray-900 my-1">{forgotEmail}</b>
                  <button onClick={() => setShowForgotPassword(false)} className="mt-4 bg-white text-green-700 text-xs font-semibold px-4 py-1.5 rounded-md border border-green-300 shadow-sm hover:bg-green-100 transition">
                    Go to Login
                  </button>
                </div>
              ) : (
                /* Forgot Password Ka Input Form */
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <input 
                    type="email" 
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition"
                    required
                  />
                  <button type="submit" className="w-full bg-orange-600 text-white py-2.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-md text-sm">
                    Send Link
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* -------------------------------------------
               🖥️ SCREEN B: MAIN LOGIN / SIGNUP TABS
               ------------------------------------------- */
            <div>
              {/* TOP NAVIGATION TABS (Tab Switcher) */}
              <div className="flex gap-4 mb-6 border-b border-gray-100">
                <button 
                  onClick={() => { setIsLogin(true); setEmail(''); setPassword(''); }}
                  className={`pb-2 px-2 text-sm font-bold transition-all ${isLogin ? 'text-orange-600 border-b-2 border-orange-600Scale' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => { setIsLogin(false); setEmail(''); setPassword(''); setFullName(''); }}
                  className={`pb-2 px-2 text-sm font-bold transition-all ${!isLogin ? 'text-orange-600 border-b-2 border-orange-600Scale' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Sign Up
                </button>
              </div>

              {/* Dynamic Titles */}
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                {isLogin ? "Welcome Back!" : "Get Started"}
              </h2>
              <p className="!text-gray-500 !text-xs !mb-5">
                {isLogin ? "Login to manage your profile" : "Create a free account today"}
              </p>

              {/* MAIN CREDENTIALS INPUT FORM */}
              <form onSubmit={isLogin ? handleEmailLogin : handleSignup} className="!space-y-3.5">
                
                {/* 🪪 FULL NAME: Sirf Signup tab click hone par hi render hoga */}
                {!isLogin && (
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full !px-3.5 !py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition"
                    required
                  />
                )}
                
                {/* 📧 EMAIL FIELD */}
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full !px-3.5 !py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition"
                  required
                />
                
                {/* 🔑 PASSWORD FIELD */}
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full !px-3.5 !py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition"
                    required
                  />
                  {/* FORGOT PASSWORD LINK: Sirf Login time par help ke liye dikhega */}
                  {isLogin && (
                    <button 
                      type="button" 
                      onClick={() => setShowForgotPassword(true)} 
                      className="absolute right-3 top-3 text-[11px] text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      Forgot?
                    </button>
                  )}
                </div>

                {/* SUBMIT BUTTON (With dynamic loading text) */}
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-orange-600 text-white !py-2.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Please wait...' : (isLogin ? "Login" : "Register Account")}
                </button>
              </form>

              {/* MIDDLE DIVIDER LINE */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-white px-3 text-gray-400 tracking-wider">Or Connect With</span></div>
              </div>

              {/* GOOGLE SINGLE SIGN-ON BUTTON */}
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center !gap-2.5 border border-gray-200 !py-2.5 rounded-xl hover:bg-gray-50 transition text-xs font-semibold text-gray-700 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* BOTTOM FOOTER LINK: Tabs ko text link se badalne ke liye */}
              <p className="text-center text-gray-500 text-[11px] mt-5 font-medium">
                {isLogin ? "Don't have an account? " : "Already registered? "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-orange-600 font-bold hover:underline ml-0.5">
                  {isLogin ? "Sign Up Now" : "Login Here"}
                </button>
              </p>
            </div>
          )}

        
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;