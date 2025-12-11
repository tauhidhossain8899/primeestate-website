import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string, role: 'buyer' | 'seller' | 'admin') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If profile doesn't exist yet (during registration), just log it
        if (error.code === 'PGRST116') {
          console.log('User profile not found yet, this is normal during registration');
          setUser(null);
          setLoading(false);
          return;
        }
        throw error;
      }
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string, role: 'buyer' | 'seller' | 'admin') => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
            role: role,
          },
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account');

      // Create user profile in the database immediately
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          phone: phone,
          role: role,
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        
        // If it's a duplicate key error, the profile already exists (which is fine)
        if (profileError.code !== '23505') {
          throw new Error('Failed to complete registration. Please try again or contact support.');
        }
      }

      // Sign out the user so they can log in properly
      await supabase.auth.signOut();

    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to create account. Please try again.');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // First, sign out any existing session
      await supabase.auth.signOut();
      
      // Then sign in with new credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Verify user profile exists and get role
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError || !userData) {
          await supabase.auth.signOut();
          throw new Error('User profile not found. Please contact support.');
        }
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Sign out any existing session first
      await supabase.auth.signOut();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  const signInWithFacebook = async () => {
    try {
      // Sign out any existing session first
      await supabase.auth.signOut();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Facebook');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSupabaseUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, supabaseUser, loading, signUp, signIn, signInWithGoogle, signInWithFacebook, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
