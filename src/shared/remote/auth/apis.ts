import { createClient } from '@/src/shared/lib/supabase/client';

export const authApi = {
  getUser: async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }
    
    return data.user;
  },
  
  signOut: async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
  },
};