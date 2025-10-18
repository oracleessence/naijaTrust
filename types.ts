export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'customer' | 'business_owner';
  created_at: string;
}

export interface Business {
  id: string;
  owner_id: string | null;
  name: string;
  category: string;
  phone: string;
  email:string;
  address: string;
  website: string;
  verified: boolean;
  avg_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  logo_url: string;
  bio: string;
}

export interface Review {
  id: string;
  business_id: string;
  user_id: string;
  customer_name: string;
  customer_phone?: string;
  order_id?: string;
  rating: number;
  comment: string;
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  created_at: string;
  moderation_score?: number;
}

export interface Reply {
  id: string;
  review_id: string;
  business_id: string;
  message: string;
  created_at: string;
}