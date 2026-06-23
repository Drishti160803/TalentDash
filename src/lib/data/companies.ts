// ============================================
// src/lib/data/companies.ts — SEED: COMPANIES
// ============================================

import { Company } from '@/types/salary';

export const companies: Company[] = [
  { id: 'c1', slug: 'google', name: 'Google', industry: 'Internet & Search', foundedYear: 1998, headquarters: 'Mountain View, CA', headcountRange: '150,000+', logoInitial: 'G' },
  { id: 'c2', slug: 'microsoft', name: 'Microsoft', industry: 'Enterprise Software', foundedYear: 1975, headquarters: 'Redmond, WA', headcountRange: '220,000+', logoInitial: 'M' },
  { id: 'c3', slug: 'amazon', name: 'Amazon', industry: 'E-commerce & Cloud', foundedYear: 1994, headquarters: 'Seattle, WA', headcountRange: '1,500,000+', logoInitial: 'A' },
  { id: 'c4', slug: 'meta', name: 'Meta', industry: 'Social Media', foundedYear: 2004, headquarters: 'Menlo Park, CA', headcountRange: '65,000+', logoInitial: 'M' },
  { id: 'c5', slug: 'flipkart', name: 'Flipkart', industry: 'E-commerce', foundedYear: 2007, headquarters: 'Bengaluru, India', headcountRange: '30,000+', logoInitial: 'F' },
  { id: 'c6', slug: 'tcs', name: 'Tata Consultancy Services', industry: 'IT Services', foundedYear: 1968, headquarters: 'Mumbai, India', headcountRange: '600,000+', logoInitial: 'T' },
  { id: 'c7', slug: 'wipro', name: 'Wipro', industry: 'IT Services', foundedYear: 1945, headquarters: 'Bengaluru, India', headcountRange: '230,000+', logoInitial: 'W' },
  { id: 'c8', slug: 'swiggy', name: 'Swiggy', industry: 'Food Delivery', foundedYear: 2014, headquarters: 'Bengaluru, India', headcountRange: '5,000–10,000', logoInitial: 'S' },
  { id: 'c9', slug: 'meesho', name: 'Meesho', industry: 'Social Commerce', foundedYear: 2015, headquarters: 'Bengaluru, India', headcountRange: '1,000–5,000', logoInitial: 'M' },
  { id: 'c10', slug: 'razorpay', name: 'Razorpay', industry: 'Fintech', foundedYear: 2014, headquarters: 'Bengaluru, India', headcountRange: '2,000–5,000', logoInitial: 'R' },
  { id: 'c11', slug: 'zomato', name: 'Zomato', industry: 'Food Delivery', foundedYear: 2008, headquarters: 'Gurugram, India', headcountRange: '5,000–10,000', logoInitial: 'Z' },
  { id: 'c12', slug: 'freshworks', name: 'Freshworks', industry: 'SaaS', foundedYear: 2010, headquarters: 'Chennai, India', headcountRange: '5,000–7,000', logoInitial: 'F' },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
