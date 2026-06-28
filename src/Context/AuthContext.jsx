// src/Context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  
  // ✅ For password reset
  const [resetData, setResetData] = useState({
    email: '',
    otp: '',
    isVerified: false
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('velora_user');
        const token = localStorage.getItem('velora_token');
        
        if (storedUser && token) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('userName', userData.name);
          localStorage.setItem('userEmail', userData.email);
        } else {
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('velora_user');
        localStorage.removeItem('velora_token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    const handleStorageChange = (e) => {
      if (e.key === 'velora_user' || e.key === 'velora_token') {
        checkAuthStatus();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // ✅ Login function
  const login = async (email, password) => {
    try {
      // 🔥 Simulate API call
      const users = JSON.parse(localStorage.getItem('velora_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        isVerified: foundUser.isVerified || false,
        createdAt: foundUser.createdAt,
        provider: 'email'
      };
      
      localStorage.setItem('velora_user', JSON.stringify(userData));
      localStorage.setItem('velora_token', 'velora_token_' + Date.now());
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
      
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Signup function
  const signup = async (name, email, password) => {
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('velora_users') || '[]');
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        return { success: false, error: 'User already exists with this email' };
      }

      const newUser = {
        id: 'user_' + Date.now(),
        name: name,
        email: email,
        password: password, // In real app, this would be hashed
        isVerified: false,
        createdAt: new Date().toISOString(),
        provider: 'email'
      };
      
      // Save to users list
      users.push(newUser);
      localStorage.setItem('velora_users', JSON.stringify(users));
      
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isVerified: false,
        createdAt: newUser.createdAt,
        provider: 'email'
      };
      
      localStorage.setItem('velora_user', JSON.stringify(userData));
      localStorage.setItem('velora_token', 'velora_token_' + Date.now());
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
      
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Google Login function
  const googleLogin = async (userData) => {
    try {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('velora_users') || '[]');
      let existingUser = users.find(u => u.email === userData.email);
      
      if (!existingUser) {
        // Create new user
        const newUser = {
          id: 'google_' + userData.sub,
          name: userData.name,
          email: userData.email,
          password: 'google_oauth_' + Date.now(),
          isVerified: true,
          picture: userData.picture,
          createdAt: new Date().toISOString(),
          provider: 'google'
        };
        users.push(newUser);
        localStorage.setItem('velora_users', JSON.stringify(users));
        existingUser = newUser;
      }

      const newUser = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        isVerified: existingUser.isVerified || true,
        picture: userData.picture,
        createdAt: existingUser.createdAt,
        provider: 'google'
      };
      
      localStorage.setItem('velora_user', JSON.stringify(newUser));
      localStorage.setItem('velora_token', 'google_token_' + Date.now());
      localStorage.setItem('userName', newUser.name);
      localStorage.setItem('userEmail', newUser.email);
      
      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ FORGOT PASSWORD - Send OTP
  const sendPasswordResetOTP = async (email) => {
    try {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('velora_users') || '[]');
      const existingUser = users.find(u => u.email === email);
      
      if (!existingUser) {
        return { success: false, error: 'No user found with this email' };
      }

      // ✅ Generate dummy OTP (6 digits)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // ✅ Store OTP in localStorage with timestamp
      const resetData = {
        email: email,
        otp: otp,
        timestamp: Date.now(),
        attempts: 0
      };
      localStorage.setItem('velora_reset_data', JSON.stringify(resetData));

      // ✅ Show OTP in console (for testing)
      console.log('🔐 Your Password Reset OTP:', otp);
      console.log('📧 For email:', email);

      // ✅ Store in state
      setResetData({
        email: email,
        otp: otp,
        isVerified: false
      });

      return { 
        success: true, 
        message: 'OTP sent to your email',
        otp: otp // In production, remove this
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ VERIFY OTP
  const verifyOTP = async (email, otp) => {
    try {
      const storedData = JSON.parse(localStorage.getItem('velora_reset_data'));
      
      if (!storedData) {
        return { success: false, error: 'No OTP request found' };
      }

      // Check if OTP expired (10 minutes)
      const timeElapsed = Date.now() - storedData.timestamp;
      if (timeElapsed > 10 * 60 * 1000) {
        localStorage.removeItem('velora_reset_data');
        return { success: false, error: 'OTP has expired. Please request a new one.' };
      }

      // Check attempts
      if (storedData.attempts >= 3) {
        localStorage.removeItem('velora_reset_data');
        return { success: false, error: 'Too many attempts. Please request a new OTP.' };
      }

      // Verify OTP
      if (storedData.otp !== otp) {
        storedData.attempts += 1;
        localStorage.setItem('velora_reset_data', JSON.stringify(storedData));
        return { success: false, error: 'Invalid OTP. Please try again.' };
      }

      // OTP verified successfully
      setResetData({
        ...resetData,
        isVerified: true
      });

      // Store verification status
      localStorage.setItem('velora_reset_verified', 'true');
      localStorage.removeItem('velora_reset_data');

      return { success: true, message: 'OTP verified successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ RESET PASSWORD
  const resetPassword = async (email, newPassword) => {
    try {
      // Check if verified
      const isVerified = localStorage.getItem('velora_reset_verified');
      if (!isVerified) {
        return { success: false, error: 'Please verify OTP first' };
      }

      // Update user password
      const users = JSON.parse(localStorage.getItem('velora_users') || '[]');
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      users[userIndex].password = newPassword;
      localStorage.setItem('velora_users', JSON.stringify(users));
      
      // Clear reset data
      localStorage.removeItem('velora_reset_verified');
      localStorage.removeItem('velora_reset_data');
      
      // Reset state
      setResetData({
        email: '',
        otp: '',
        isVerified: false
      });

      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Change password (for logged in users)
  const changePassword = async (email, oldPassword, newPassword) => {
    try {
      const users = JSON.parse(localStorage.getItem('velora_users') || '[]');
      const userIndex = users.findIndex(u => u.email === email && u.password === oldPassword);
      
      if (userIndex === -1) {
        return { success: false, error: 'Current password is incorrect' };
      }

      users[userIndex].password = newPassword;
      localStorage.setItem('velora_users', JSON.stringify(users));
      
      return { success: true, message: 'Password changed successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem('velora_user');
    localStorage.removeItem('velora_token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('velora_reset_verified');
    localStorage.removeItem('velora_reset_data');
    
    setUser(null);
    setIsAuthenticated(false);
    setResetData({
      email: '',
      otp: '',
      isVerified: false
    });
  };

  const updateProfile = async (updatedData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('velora_user'));
      const updatedUser = { ...currentUser, ...updatedData };
      localStorage.setItem('velora_user', JSON.stringify(updatedUser));
      localStorage.setItem('userName', updatedUser.name);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    googleLogin,
    logout,
    updateProfile,
    changePassword,
    sendPasswordResetOTP,
    verifyOTP,
    resetPassword,
    resetData,
    authModal,
    openAuthModal,
    closeAuthModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}