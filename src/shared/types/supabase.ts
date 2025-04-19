export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          content: string;
          published: boolean;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          content: string;
          published?: boolean;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          content?: string;
          published?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'posts_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      articles: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          content: string;
          link: string;
          user_id: string;
          slug: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          content: string;
          link: string;
          user_id: string;
          slug?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          content?: string;
          link?: string;
          user_id?: string;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'articles_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      article_reading_progress: {
        Row: {
          id: string;
          user_id: string;
          article_id: string;
          section_index: number;
          note: string;
          is_note_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          article_id: string;
          section_index: number;
          note: string;
          is_note_public?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          article_id?: string;
          section_index?: number;
          note?: string;
          is_note_public?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'article_reading_progress_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'article_reading_progress_article_id_fkey';
            columns: ['article_id'];
            referencedRelation: 'articles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
