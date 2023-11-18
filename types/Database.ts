export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          artist_id: number;
          artist_name: string;
          biography: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          discography: Json | null;
          genres: Json[] | null;
          id: string;
          image_url: string | null;
          social_media_links: Json | null;
        };
        Insert: {
          artist_id?: number;
          artist_name: string;
          biography?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          discography?: Json | null;
          genres?: Json[] | null;
          id: string;
          image_url?: string | null;
          social_media_links?: Json | null;
        };
        Update: {
          artist_id?: number;
          artist_name?: string;
          biography?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          discography?: Json | null;
          genres?: Json[] | null;
          id?: string;
          image_url?: string | null;
          social_media_links?: Json | null;
        };
        Relationships: [];
      };
      bookmarked_courses: {
        Row: {
          course_id: string | null;
          created_at: string;
          id: string;
          student_id: string | null;
        };
        Insert: {
          course_id?: string | null;
          created_at?: string;
          id?: string;
          student_id?: string | null;
        };
        Update: {
          course_id?: string | null;
          created_at?: string;
          id?: string;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarked_courses_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookmarked_courses_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      courses: {
        Row: {
          categories: string[] | null;
          created_at: string;
          id: string;
          image: string | null;
          lessons: string[] | null;
          title: string | null;
          total_lessons: number;
          total_modules: number;
        };
        Insert: {
          categories?: string[] | null;
          created_at?: string;
          id: string;
          image?: string | null;
          lessons?: string[] | null;
          title?: string | null;
          total_lessons?: number;
          total_modules?: number;
        };
        Update: {
          categories?: string[] | null;
          created_at?: string;
          id?: string;
          image?: string | null;
          lessons?: string[] | null;
          title?: string | null;
          total_lessons?: number;
          total_modules?: number;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      enrollment_status: {
        Row: {
          id: string;
          status: string;
        };
        Insert: {
          id?: string;
          status: string;
        };
        Update: {
          id?: string;
          status?: string;
        };
        Relationships: [];
      };
      form_submissions: {
        Row: {
          city: string | null;
          company_name: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          form_questions: Json | null;
          form_type: string;
          id: string;
          last_name: string | null;
          linkedin_profile: string | null;
          message: string | null;
          phone_number: string | null;
          song_id: number | null;
          song_title: string | null;
          state: string | null;
          subject: string | null;
          website: string | null;
          zip_code: string | null;
          submission_search: string | null;
        };
        Insert: {
          city?: string | null;
          company_name?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          form_questions?: Json | null;
          form_type: string;
          id?: string;
          last_name?: string | null;
          linkedin_profile?: string | null;
          message?: string | null;
          phone_number?: string | null;
          song_id?: number | null;
          song_title?: string | null;
          state?: string | null;
          subject?: string | null;
          website?: string | null;
          zip_code?: string | null;
        };
        Update: {
          city?: string | null;
          company_name?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          form_questions?: Json | null;
          form_type?: string;
          id?: string;
          last_name?: string | null;
          linkedin_profile?: string | null;
          message?: string | null;
          phone_number?: string | null;
          song_id?: number | null;
          song_title?: string | null;
          state?: string | null;
          subject?: string | null;
          website?: string | null;
          zip_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_type_fkey";
            columns: ["form_type"];
            isOneToOne: false;
            referencedRelation: "form_types";
            referencedColumns: ["type"];
          },
        ];
      };
      form_types: {
        Row: {
          id: number;
          internal: boolean | null;
          type: string | null;
        };
        Insert: {
          id?: number;
          internal?: boolean | null;
          type?: string | null;
        };
        Update: {
          id?: number;
          internal?: boolean | null;
          type?: string | null;
        };
        Relationships: [];
      };
      lessons: {
        Row: {
          course_id: string | null;
          created_at: string;
          id: number;
          title: string | null;
        };
        Insert: {
          course_id?: string | null;
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Update: {
          course_id?: string | null;
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      license_orders: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "license_orders_price_id_fkey";
            columns: ["price_id"];
            isOneToOne: false;
            referencedRelation: "prices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "license_orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      license_prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "license_prices_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      licenses: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      licensing_agreements: {
        Row: {
          agreement_id: number;
          license_price: number | null;
          license_terms: string | null;
          user_id: number | null;
        };
        Insert: {
          agreement_id?: number;
          license_price?: number | null;
          license_terms?: string | null;
          user_id?: number | null;
        };
        Update: {
          agreement_id?: number;
          license_price?: number | null;
          license_terms?: string | null;
          user_id?: number | null;
        };
        Relationships: [];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      songs: {
        Row: {
          album: string | null;
          artist_id: string | null;
          artist_id_old: number | null;
          artist_name: string | null;
          cover_art_url: string | null;
          duration: unknown | null;
          genres: string[] | null;
          has_lyrics: boolean | null;
          id: string;
          instrumental: boolean | null;
          lyrics: string | null;
          moods: string[] | null;
          music_file_url: string | null;
          release_year: string | null;
          song_id: number;
          title: string;
        };
        Insert: {
          album?: string | null;
          artist_id?: string | null;
          artist_id_old?: number | null;
          artist_name?: string | null;
          cover_art_url?: string | null;
          duration?: unknown | null;
          genres?: string[] | null;
          has_lyrics?: boolean | null;
          id: string;
          instrumental?: boolean | null;
          lyrics?: string | null;
          moods?: string[] | null;
          music_file_url?: string | null;
          release_year?: string | null;
          song_id?: number;
          title: string;
        };
        Update: {
          album?: string | null;
          artist_id?: string | null;
          artist_id_old?: number | null;
          artist_name?: string | null;
          cover_art_url?: string | null;
          duration?: unknown | null;
          genres?: string[] | null;
          has_lyrics?: boolean | null;
          id?: string;
          instrumental?: boolean | null;
          lyrics?: string | null;
          moods?: string[] | null;
          music_file_url?: string | null;
          release_year?: string | null;
          song_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_artist";
            columns: ["artist_id_old"];
            isOneToOne: false;
            referencedRelation: "artists";
            referencedColumns: ["artist_id"];
          },
          {
            foreignKeyName: "songs_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "artists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "songs_artist_id_old_fkey";
            columns: ["artist_id_old"];
            isOneToOne: false;
            referencedRelation: "artists";
            referencedColumns: ["artist_id"];
          },
        ];
      };
      student_enrollments: {
        Row: {
          completed_lessons: number;
          completed_modules: number;
          course_id: string | null;
          created_at: string;
          enrollment_status: string;
          id: string;
          student_id: string | null;
        };
        Insert: {
          completed_lessons?: number;
          completed_modules?: number;
          course_id?: string | null;
          created_at?: string;
          enrollment_status: string;
          id?: string;
          student_id?: string | null;
        };
        Update: {
          completed_lessons?: number;
          completed_modules?: number;
          course_id?: string | null;
          created_at?: string;
          enrollment_status?: string;
          id?: string;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "student_enrollments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_enrollments_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey";
            columns: ["price_id"];
            isOneToOne: false;
            referencedRelation: "prices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          id: number;
          role: string;
        };
        Insert: {
          id?: number;
          role?: string;
        };
        Update: {
          id?: number;
          role?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          avatar_url: string | null;
          billing_address: Json | null;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
          updated_at: string | null;
          user_role: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
          updated_at?: string | null;
          user_role?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
          updated_at?: string | null;
          user_role?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_user_role_fkey";
            columns: ["user_role"];
            isOneToOne: false;
            referencedRelation: "user_roles";
            referencedColumns: ["role"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      gtrgm_compress: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      gtrgm_decompress: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      gtrgm_in: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      gtrgm_options: {
        Args: {
          "": unknown;
        };
        Returns: undefined;
      };
      gtrgm_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      set_limit: {
        Args: {
          "": number;
        };
        Returns: number;
      };
      show_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      show_trgm: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      submission_search: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
    };
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year";
      pricing_type: "one_time" | "recurring";
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
