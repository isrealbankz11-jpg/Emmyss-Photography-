/**
 * Types for EMMYSS Photography Landing Page
 */

export interface PhotographyPackage {
  id: string;
  title: string;
  price: number;
  duration: string;
  edits: string;
  imageUrl: string;
  category: 'birthday' | 'graduation' | 'family' | 'couple' | 'branding';
  brief: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
  rating: number;
}
