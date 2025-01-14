export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      customer: {
        Row: {
          closed_notes: string | null
          contact_method: string | null
          created_at: string
          expected_travel_date: string | null
          id: number
          name: string
          notes: string | null
          number_of_adults: number | null
          number_of_kids: number | null
          phone_number: string
          status: string
          tour_id: number | null
        }
        Insert: {
          closed_notes?: string | null
          contact_method?: string | null
          created_at?: string
          expected_travel_date?: string | null
          id?: number
          name: string
          notes?: string | null
          number_of_adults?: number | null
          number_of_kids?: number | null
          phone_number: string
          status: string
          tour_id?: number | null
        }
        Update: {
          closed_notes?: string | null
          contact_method?: string | null
          created_at?: string
          expected_travel_date?: string | null
          id?: number
          name?: string
          notes?: string | null
          number_of_adults?: number | null
          number_of_kids?: number | null
          phone_number?: string
          status?: string
          tour_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'customer_tour_id_fkey'
            columns: ['tour_id']
            isOneToOne: false
            referencedRelation: 'tour'
            referencedColumns: ['id']
          },
        ]
      }
      hotel: {
        Row: {
          created_at: string
          hotel_logo: string | null
          id: number
          images: string[] | null
          name: string | null
          place: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string
          hotel_logo?: string | null
          id?: number
          images?: string[] | null
          name?: string | null
          place?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string
          hotel_logo?: string | null
          id?: number
          images?: string[] | null
          name?: string | null
          place?: string | null
          rating?: number | null
        }
        Relationships: []
      }
      location: {
        Row: {
          created_at: string
          id: number
          image: Json | null
          is_active: boolean | null
          name: string
          seo: Json | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image?: Json | null
          is_active?: boolean | null
          name: string
          seo?: Json | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: Json | null
          is_active?: boolean | null
          name?: string
          seo?: Json | null
          slug?: string | null
        }
        Relationships: []
      }
      article: {
        Row: {
          id: number
          image: string
          title: string
          content: string
          author: string
          tag: string
          is_active: boolean
          seo: Json
          created_at: string
          slug: string
        }
        Insert: {
          id?: number
          image?: string
          title?: string
          content?: string
          author?: string
          tag?: string
          is_active?: boolean
          seo?: Json
          created_at?: string
          slug?: string
        }
        Update: {
          id?: number
          image?: string
          title?: string
          content?: string
          author?: string
          tag?: string
          is_active?: boolean
          seo?: Json
          created_at?: string
          slug?: string
        }
        Relationships: []
      }
      location_attributes: {
        Row: {
          created_at: string
          id: number
          location_id: number | null
          order: number | null
          seo: Json | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          location_id?: number | null
          order?: number | null
          seo?: Json | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          location_id?: number | null
          order?: number | null
          seo?: Json | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'location_attributes_location_id_fkey'
            columns: ['location_id']
            isOneToOne: false
            referencedRelation: 'location'
            referencedColumns: ['id']
          },
        ]
      }
      location_tours: {
        Row: {
          created_at: string
          id: number
          location_attr_id: number
          location_id: number
          tour_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          location_attr_id: number
          location_id: number
          tour_id: number
        }
        Update: {
          created_at?: string
          id?: number
          location_attr_id?: number
          location_id?: number
          tour_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'location_tours_location_attr_id_fkey'
            columns: ['location_attr_id']
            isOneToOne: false
            referencedRelation: 'location_attributes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'location_tours_location_id_fkey'
            columns: ['location_id']
            isOneToOne: false
            referencedRelation: 'location'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'location_tours_tour_id_fkey'
            columns: ['tour_id']
            isOneToOne: false
            referencedRelation: 'tour'
            referencedColumns: ['id']
          },
        ]
      }
      newsletter: {
        Row: {
          created_at: string
          email: string | null
          id: number
          phone_number: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          phone_number?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          phone_number?: string | null
        }
        Relationships: []
      }
      tour: {
        Row: {
          additional_Info: string | null
          additional_service: Json[] | null
          airpot_coming: string | null
          airpot_going: string | null
          code: string | null
          created_at: string
          external_file: Json | null
          id: number
          images: string[] | null
          is_active: boolean | null
          is_ticket_included: boolean | null
          name: string
          number_of_days: number
          price: number | null
          price_child: number | null
          price_child_no_bed: number | null
          price_infant: number | null
          seo: Json | null
          slug: string | null
          start_day: string[] | null
          tour_countries: string[] | null
          tour_excludes: Json[] | null
          tour_includes: Json[] | null
          tour_sections: Json[] | null
          type_id: number | null
        }
        Insert: {
          additional_Info?: string | null
          additional_service?: Json[] | null
          airpot_coming?: string | null
          airpot_going?: string | null
          code?: string | null
          created_at?: string
          external_file?: Json | null
          id?: number
          images?: string[] | null
          is_active?: boolean | null
          is_ticket_included?: boolean | null
          name: string
          number_of_days: number
          price?: number | null
          price_child?: number | null
          price_child_no_bed?: number | null
          price_infant?: number | null
          seo?: Json | null
          slug?: string | null
          start_day?: string[] | null
          tour_countries?: string[] | null
          tour_excludes?: Json[] | null
          tour_includes?: Json[] | null
          tour_sections?: Json[] | null
          type_id?: number | null
        }
        Update: {
          additional_Info?: string | null
          additional_service?: Json[] | null
          airpot_coming?: string | null
          airpot_going?: string | null
          code?: string | null
          created_at?: string
          external_file?: Json | null
          id?: number
          images?: string[] | null
          is_active?: boolean | null
          is_ticket_included?: boolean | null
          name?: string
          number_of_days?: number
          price?: number | null
          price_child?: number | null
          price_child_no_bed?: number | null
          price_infant?: number | null
          seo?: Json | null
          slug?: string | null
          start_day?: string[] | null
          tour_countries?: string[] | null
          tour_excludes?: Json[] | null
          tour_includes?: Json[] | null
          tour_sections?: Json[] | null
          type_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'tour_type_id_fkey'
            columns: ['type_id']
            isOneToOne: false
            referencedRelation: 'tour_type'
            referencedColumns: ['id']
          },
        ]
      }
      tour_hotels: {
        Row: {
          created_at: string
          hotel_id: number
          tour_id: number
        }
        Insert: {
          created_at?: string
          hotel_id: number
          tour_id: number
        }
        Update: {
          created_at?: string
          hotel_id?: number
          tour_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'tour_hotels_hotel_id_fkey'
            columns: ['hotel_id']
            isOneToOne: false
            referencedRelation: 'hotel'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tour_hotels_tour_id_fkey'
            columns: ['tour_id']
            isOneToOne: false
            referencedRelation: 'tour'
            referencedColumns: ['id']
          },
        ]
      }
      tour_type: {
        Row: {
          created_at: string
          id: number
          image: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
