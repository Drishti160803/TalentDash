// ============================================
// src/lib/data/salaries.ts — SEED: SALARY RECORDS
// ============================================
// 65+ records, 12 companies, all levels, multiple cities, INR + USD,
// and the documented edge cases (zero bonus, zero stock, very high equity).

import { SalaryRecord } from '@/types/salary';
import { computeTotalComp } from '@/lib/salary';

type RawRecord = Omit<SalaryRecord, 'id' | 'totalComp'>;

const raw: RawRecord[] = [
  // ---- Google ----
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 2200000, bonus: 300000, stock: 1500000, source: 'VERIFIED', confidenceScore: 0.92, submittedAt: '2026-04-12' },
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experienceYears: 3, baseSalary: 3400000, bonus: 600000, stock: 3200000, source: 'VERIFIED', confidenceScore: 0.95, submittedAt: '2026-03-02' },
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Software Engineer', level: 'L5', location: 'Hyderabad', currency: 'INR', experienceYears: 6, baseSalary: 4600000, bonus: 900000, stock: 6800000, source: 'CONTRIBUTOR', confidenceScore: 0.85, submittedAt: '2026-05-19' },
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Senior Software Engineer', level: 'L6', location: 'Bengaluru', currency: 'INR', experienceYears: 9, baseSalary: 6200000, bonus: 1400000, stock: 12500000, source: 'VERIFIED', confidenceScore: 0.9, submittedAt: '2026-02-14' },
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Principal Engineer', level: 'PRINCIPAL', location: 'Bengaluru', currency: 'INR', experienceYears: 14, baseSalary: 9800000, bonus: 3200000, stock: 28000000, source: 'CONTRIBUTOR', confidenceScore: 0.78, submittedAt: '2026-01-22' },
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Software Engineer', level: 'L4', location: 'Mountain View', currency: 'USD', experienceYears: 4, baseSalary: 165000, bonus: 25000, stock: 95000, source: 'PUBLIC_FILING', confidenceScore: 0.97, submittedAt: '2026-03-29' },

  // ---- Microsoft ----
  { companyId: 'c2', companySlug: 'microsoft', companyName: 'Microsoft', role: 'SWE II', level: 'SDE_II', location: 'Hyderabad', currency: 'INR', experienceYears: 4, baseSalary: 2900000, bonus: 400000, stock: 2600000, source: 'VERIFIED', confidenceScore: 0.91, submittedAt: '2026-04-03' },
  { companyId: 'c2', companySlug: 'microsoft', companyName: 'Microsoft', role: 'SWE', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 2100000, bonus: 200000, stock: 1200000, source: 'CONTRIBUTOR', confidenceScore: 0.82, submittedAt: '2026-05-01' },
  { companyId: 'c2', companySlug: 'microsoft', companyName: 'Microsoft', role: 'Senior SWE', level: 'SENIOR', location: 'Noida', currency: 'INR', experienceYears: 7, baseSalary: 4100000, bonus: 700000, stock: 5400000, source: 'VERIFIED', confidenceScore: 0.88, submittedAt: '2026-02-27' },
  { companyId: 'c2', companySlug: 'microsoft', companyName: 'Microsoft', role: 'Principal SWE', level: 'PRINCIPAL', location: 'Hyderabad', currency: 'INR', experienceYears: 13, baseSalary: 8900000, bonus: 2100000, stock: 19500000, source: 'CONTRIBUTOR', confidenceScore: 0.76, submittedAt: '2026-01-09' },
  { companyId: 'c2', companySlug: 'microsoft', companyName: 'Microsoft', role: 'SWE II', level: 'SDE_II', location: 'Redmond', currency: 'USD', experienceYears: 3, baseSalary: 145000, bonus: 18000, stock: 62000, source: 'PUBLIC_FILING', confidenceScore: 0.94, submittedAt: '2026-03-15' },

  // ---- Amazon ----
  { companyId: 'c3', companySlug: 'amazon', companyName: 'Amazon', role: 'SDE I', level: 'SDE_I', location: 'Pune', currency: 'INR', experienceYears: 1, baseSalary: 1900000, bonus: 0, stock: 800000, source: 'CONTRIBUTOR', confidenceScore: 0.8, submittedAt: '2026-05-05' }, // edge case: zero bonus
  { companyId: 'c3', companySlug: 'amazon', companyName: 'Amazon', role: 'SDE II', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 5, baseSalary: 3200000, bonus: 500000, stock: 3600000, source: 'VERIFIED', confidenceScore: 0.93, submittedAt: '2026-04-17' },
  { companyId: 'c3', companySlug: 'amazon', companyName: 'Amazon', role: 'SDE III', level: 'SDE_III', location: 'Chennai', currency: 'INR', experienceYears: 8, baseSalary: 4400000, bonus: 800000, stock: 7200000, source: 'VERIFIED', confidenceScore: 0.89, submittedAt: '2026-03-08' },
  { companyId: 'c3', companySlug: 'amazon', companyName: 'Amazon', role: 'Principal Engineer', level: 'PRINCIPAL', location: 'Bengaluru', currency: 'INR', experienceYears: 15, baseSalary: 9200000, bonus: 1800000, stock: 24000000, source: 'CONTRIBUTOR', confidenceScore: 0.74, submittedAt: '2026-02-02' },
  { companyId: 'c3', companySlug: 'amazon', companyName: 'Amazon', role: 'SDE II', level: 'SDE_II', location: 'Seattle', currency: 'USD', experienceYears: 4, baseSalary: 138000, bonus: 8000, stock: 58000, source: 'PUBLIC_FILING', confidenceScore: 0.95, submittedAt: '2026-04-21' },

  // ---- Meta ----
  { companyId: 'c4', companySlug: 'meta', companyName: 'Meta', role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experienceYears: 3, baseSalary: 3600000, bonus: 600000, stock: 4200000, source: 'VERIFIED', confidenceScore: 0.9, submittedAt: '2026-05-11' },
  { companyId: 'c4', companySlug: 'meta', companyName: 'Meta', role: 'Software Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experienceYears: 6, baseSalary: 5100000, bonus: 1100000, stock: 9800000, source: 'VERIFIED', confidenceScore: 0.87, submittedAt: '2026-03-25' },
  { companyId: 'c4', companySlug: 'meta', companyName: 'Meta', role: 'Distinguished Engineer', level: 'DISTINGUISHED', location: 'Menlo Park', currency: 'USD', experienceYears: 18, baseSalary: 235000, bonus: 45000, stock: 800000, source: 'PUBLIC_FILING', confidenceScore: 0.81, submittedAt: '2026-01-30' }, // edge case: very high equity
  { companyId: 'c4', companySlug: 'meta', companyName: 'Meta', role: 'Software Engineer', level: 'L4', location: 'London', currency: 'USD', experienceYears: 4, baseSalary: 142000, bonus: 20000, stock: 71000, source: 'CONTRIBUTOR', confidenceScore: 0.83, submittedAt: '2026-04-09' },

  // ---- Flipkart ----
  { companyId: 'c5', companySlug: 'flipkart', companyName: 'Flipkart', role: 'SDE I', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 1800000, bonus: 150000, stock: 600000, source: 'CONTRIBUTOR', confidenceScore: 0.79, submittedAt: '2026-05-14' },
  { companyId: 'c5', companySlug: 'flipkart', companyName: 'Flipkart', role: 'SDE II', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 2700000, bonus: 350000, stock: 1800000, source: 'VERIFIED', confidenceScore: 0.88, submittedAt: '2026-03-19' },
  { companyId: 'c5', companySlug: 'flipkart', companyName: 'Flipkart', role: 'Senior SDE', level: 'SENIOR', location: 'Bengaluru', currency: 'INR', experienceYears: 7, baseSalary: 3800000, bonus: 550000, stock: 3400000, source: 'VERIFIED', confidenceScore: 0.86, submittedAt: '2026-02-11' },
  { companyId: 'c5', companySlug: 'flipkart', companyName: 'Flipkart', role: 'Staff Engineer', level: 'STAFF', location: 'Bengaluru', currency: 'INR', experienceYears: 10, baseSalary: 5400000, bonus: 900000, stock: 6200000, source: 'CONTRIBUTOR', confidenceScore: 0.77, submittedAt: '2026-01-17' },

  // ---- TCS ----
  { companyId: 'c6', companySlug: 'tcs', companyName: 'Tata Consultancy Services', role: 'Assistant System Engineer', level: 'L3', location: 'Chennai', currency: 'INR', experienceYears: 0, baseSalary: 420000, bonus: 20000, stock: 0, source: 'VERIFIED', confidenceScore: 0.9, submittedAt: '2026-05-22' },
  { companyId: 'c6', companySlug: 'tcs', companyName: 'Tata Consultancy Services', role: 'System Engineer', level: 'L4', location: 'Pune', currency: 'INR', experienceYears: 2, baseSalary: 650000, bonus: 40000, stock: 0, source: 'VERIFIED', confidenceScore: 0.91, submittedAt: '2026-04-04' },
  { companyId: 'c6', companySlug: 'tcs', companyName: 'Tata Consultancy Services', role: 'IT Analyst', level: 'L5', location: 'Mumbai', currency: 'INR', experienceYears: 5, baseSalary: 1100000, bonus: 90000, stock: 0, source: 'CONTRIBUTOR', confidenceScore: 0.82, submittedAt: '2026-03-12' },
  { companyId: 'c6', companySlug: 'tcs', companyName: 'Tata Consultancy Services', role: 'Senior IT Analyst', level: 'SENIOR', location: 'Chennai', currency: 'INR', experienceYears: 9, baseSalary: 1800000, bonus: 150000, stock: 0, source: 'CONTRIBUTOR', confidenceScore: 0.8, submittedAt: '2026-02-19' },

  // ---- Wipro ----
  { companyId: 'c7', companySlug: 'wipro', companyName: 'Wipro', role: 'Project Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experienceYears: 0, baseSalary: 380000, bonus: 15000, stock: 0, source: 'VERIFIED', confidenceScore: 0.89, submittedAt: '2026-05-08' },
  { companyId: 'c7', companySlug: 'wipro', companyName: 'Wipro', role: 'Senior Engineer', level: 'L4', location: 'Pune', currency: 'INR', experienceYears: 3, baseSalary: 720000, bonus: 50000, stock: 0, source: 'VERIFIED', confidenceScore: 0.87, submittedAt: '2026-04-25' },
  { companyId: 'c7', companySlug: 'wipro', companyName: 'Wipro', role: 'Technical Lead', level: 'L5', location: 'Hyderabad', currency: 'INR', experienceYears: 6, baseSalary: 1300000, bonus: 110000, stock: 0, source: 'CONTRIBUTOR', confidenceScore: 0.81, submittedAt: '2026-03-06' },
  { companyId: 'c7', companySlug: 'wipro', companyName: 'Wipro', role: 'Principal Consultant', level: 'PRINCIPAL', location: 'Bengaluru', currency: 'INR', experienceYears: 12, baseSalary: 2600000, bonus: 320000, stock: 200000, source: 'CONTRIBUTOR', confidenceScore: 0.73, submittedAt: '2026-01-13' },

  // ---- Swiggy ----
  { companyId: 'c8', companySlug: 'swiggy', companyName: 'Swiggy', role: 'SDE I', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 1700000, bonus: 100000, stock: 500000, source: 'CONTRIBUTOR', confidenceScore: 0.78, submittedAt: '2026-05-16' },
  { companyId: 'c8', companySlug: 'swiggy', companyName: 'Swiggy', role: 'SDE II', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 2600000, bonus: 280000, stock: 1500000, source: 'VERIFIED', confidenceScore: 0.85, submittedAt: '2026-04-01' },
  { companyId: 'c8', companySlug: 'swiggy', companyName: 'Swiggy', role: 'Senior SDE', level: 'SENIOR', location: 'Bengaluru', currency: 'INR', experienceYears: 7, baseSalary: 3700000, bonus: 480000, stock: 2900000, source: 'VERIFIED', confidenceScore: 0.84, submittedAt: '2026-02-22' },

  // ---- Meesho ----
  { companyId: 'c9', companySlug: 'meesho', companyName: 'Meesho', role: 'Data Analyst', level: 'L4', location: 'Bengaluru', currency: 'INR', experienceYears: 2, baseSalary: 1500000, bonus: 120000, stock: 0, source: 'CONTRIBUTOR', confidenceScore: 0.76, submittedAt: '2026-05-20' }, // edge case: zero stock
  { companyId: 'c9', companySlug: 'meesho', companyName: 'Meesho', role: 'SDE II', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 2500000, bonus: 250000, stock: 1100000, source: 'VERIFIED', confidenceScore: 0.83, submittedAt: '2026-03-27' },
  { companyId: 'c9', companySlug: 'meesho', companyName: 'Meesho', role: 'Senior SDE', level: 'SENIOR', location: 'Bengaluru', currency: 'INR', experienceYears: 7, baseSalary: 3500000, bonus: 420000, stock: 2100000, source: 'CONTRIBUTOR', confidenceScore: 0.79, submittedAt: '2026-02-05' },

  // ---- Razorpay ----
  { companyId: 'c10', companySlug: 'razorpay', companyName: 'Razorpay', role: 'SDE I', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 1900000, bonus: 130000, stock: 700000, source: 'CONTRIBUTOR', confidenceScore: 0.8, submittedAt: '2026-05-09' },
  { companyId: 'c10', companySlug: 'razorpay', companyName: 'Razorpay', role: 'SDE II', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 2900000, bonus: 320000, stock: 1900000, source: 'VERIFIED', confidenceScore: 0.86, submittedAt: '2026-04-13' },
  { companyId: 'c10', companySlug: 'razorpay', companyName: 'Razorpay', role: 'Staff Engineer', level: 'STAFF', location: 'Bengaluru', currency: 'INR', experienceYears: 9, baseSalary: 4900000, bonus: 780000, stock: 4600000, source: 'CONTRIBUTOR', confidenceScore: 0.75, submittedAt: '2026-01-28' },

  // ---- Zomato ----
  { companyId: 'c11', companySlug: 'zomato', companyName: 'Zomato', role: 'SDE I', level: 'SDE_I', location: 'Gurugram', currency: 'INR', experienceYears: 1, baseSalary: 1750000, bonus: 110000, stock: 550000, source: 'CONTRIBUTOR', confidenceScore: 0.77, submittedAt: '2026-05-17' },
  { companyId: 'c11', companySlug: 'zomato', companyName: 'Zomato', role: 'SDE II', level: 'SDE_II', location: 'Gurugram', currency: 'INR', experienceYears: 4, baseSalary: 2650000, bonus: 290000, stock: 1450000, source: 'VERIFIED', confidenceScore: 0.84, submittedAt: '2026-03-21' },
  { companyId: 'c11', companySlug: 'zomato', companyName: 'Zomato', role: 'Senior SDE', level: 'SENIOR', location: 'Gurugram', currency: 'INR', experienceYears: 6, baseSalary: 3600000, bonus: 440000, stock: 2700000, source: 'VERIFIED', confidenceScore: 0.82, submittedAt: '2026-02-08' },

  // ---- Freshworks ----
  { companyId: 'c12', companySlug: 'freshworks', companyName: 'Freshworks', role: 'SDE I', level: 'SDE_I', location: 'Chennai', currency: 'INR', experienceYears: 1, baseSalary: 1600000, bonus: 90000, stock: 450000, source: 'CONTRIBUTOR', confidenceScore: 0.78, submittedAt: '2026-05-12' },
  { companyId: 'c12', companySlug: 'freshworks', companyName: 'Freshworks', role: 'SDE II', level: 'SDE_II', location: 'Chennai', currency: 'INR', experienceYears: 4, baseSalary: 2400000, bonus: 240000, stock: 1300000, source: 'VERIFIED', confidenceScore: 0.85, submittedAt: '2026-04-06' },
  { companyId: 'c12', companySlug: 'freshworks', companyName: 'Freshworks', role: 'Senior SDE', level: 'SENIOR', location: 'Chennai', currency: 'INR', experienceYears: 7, baseSalary: 3300000, bonus: 380000, stock: 2400000, source: 'CONTRIBUTOR', confidenceScore: 0.79, submittedAt: '2026-01-24' },

  // ---- Additional records across companies for density (more cities/levels) ----
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Software Engineer', level: 'L4', location: 'Hyderabad', currency: 'INR', experienceYears: 3, baseSalary: 3300000, bonus: 580000, stock: 3000000, source: 'CONTRIBUTOR', confidenceScore: 0.81, submittedAt: '2026-05-02' },
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Senior Software Engineer', level: 'L6', location: 'Hyderabad', currency: 'INR', experienceYears: 10, baseSalary: 6500000, bonus: 1500000, stock: 13200000, source: 'CONTRIBUTOR', confidenceScore: 0.79, submittedAt: '2026-02-16' },
  { companyId: 'c2', companySlug: 'microsoft', companyName: 'Microsoft', role: 'SWE', level: 'SDE_I', location: 'Noida', currency: 'INR', experienceYears: 2, baseSalary: 2300000, bonus: 250000, stock: 1400000, source: 'VERIFIED', confidenceScore: 0.88, submittedAt: '2026-03-31' },
  { companyId: 'c2', companySlug: 'microsoft', companyName: 'Microsoft', role: 'Staff SWE', level: 'STAFF', location: 'Hyderabad', currency: 'INR', experienceYears: 11, baseSalary: 6800000, bonus: 1600000, stock: 9200000, source: 'CONTRIBUTOR', confidenceScore: 0.77, submittedAt: '2026-01-19' },
  { companyId: 'c3', companySlug: 'amazon', companyName: 'Amazon', role: 'SDE I', level: 'SDE_I', location: 'Hyderabad', currency: 'INR', experienceYears: 1, baseSalary: 2000000, bonus: 180000, stock: 950000, source: 'VERIFIED', confidenceScore: 0.89, submittedAt: '2026-04-29' },
  { companyId: 'c3', companySlug: 'amazon', companyName: 'Amazon', role: 'SDE III', level: 'SDE_III', location: 'Delhi', currency: 'INR', experienceYears: 8, baseSalary: 4600000, bonus: 850000, stock: 7800000, source: 'CONTRIBUTOR', confidenceScore: 0.8, submittedAt: '2026-03-10' },
  { companyId: 'c4', companySlug: 'meta', companyName: 'Meta', role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 2500000, bonus: 350000, stock: 1800000, source: 'CONTRIBUTOR', confidenceScore: 0.78, submittedAt: '2026-05-23' },
  { companyId: 'c5', companySlug: 'flipkart', companyName: 'Flipkart', role: 'SDE III', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experienceYears: 8, baseSalary: 4700000, bonus: 720000, stock: 4800000, source: 'VERIFIED', confidenceScore: 0.83, submittedAt: '2026-02-28' },
  { companyId: 'c6', companySlug: 'tcs', companyName: 'Tata Consultancy Services', role: 'IT Analyst', level: 'L5', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 980000, bonus: 75000, stock: 0, source: 'CONTRIBUTOR', confidenceScore: 0.76, submittedAt: '2026-04-16' },
  { companyId: 'c7', companySlug: 'wipro', companyName: 'Wipro', role: 'Senior Engineer', level: 'L4', location: 'Chennai', currency: 'INR', experienceYears: 3, baseSalary: 690000, bonus: 45000, stock: 0, source: 'VERIFIED', confidenceScore: 0.85, submittedAt: '2026-03-04' },
  { companyId: 'c8', companySlug: 'swiggy', companyName: 'Swiggy', role: 'SDE III', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experienceYears: 8, baseSalary: 4500000, bonus: 680000, stock: 4100000, source: 'CONTRIBUTOR', confidenceScore: 0.74, submittedAt: '2026-01-15' },
  { companyId: 'c9', companySlug: 'meesho', companyName: 'Meesho', role: 'SDE I', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 1650000, bonus: 95000, stock: 480000, source: 'CONTRIBUTOR', confidenceScore: 0.75, submittedAt: '2026-05-25' },
  { companyId: 'c10', companySlug: 'razorpay', companyName: 'Razorpay', role: 'Senior SDE', level: 'SENIOR', location: 'Bengaluru', currency: 'INR', experienceYears: 6, baseSalary: 3700000, bonus: 510000, stock: 3300000, source: 'VERIFIED', confidenceScore: 0.84, submittedAt: '2026-02-24' },
  { companyId: 'c11', companySlug: 'zomato', companyName: 'Zomato', role: 'Staff Engineer', level: 'STAFF', location: 'Gurugram', currency: 'INR', experienceYears: 10, baseSalary: 5300000, bonus: 940000, stock: 5900000, source: 'CONTRIBUTOR', confidenceScore: 0.73, submittedAt: '2026-01-11' },
  { companyId: 'c12', companySlug: 'freshworks', companyName: 'Freshworks', role: 'Staff SDE', level: 'STAFF', location: 'Chennai', currency: 'INR', experienceYears: 10, baseSalary: 5100000, bonus: 870000, stock: 5400000, source: 'CONTRIBUTOR', confidenceScore: 0.72, submittedAt: '2026-01-06' },
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Software Engineer', level: 'L3', location: 'Mountain View', currency: 'USD', experienceYears: 0, baseSalary: 152000, bonus: 15000, stock: 70000, source: 'PUBLIC_FILING', confidenceScore: 0.96, submittedAt: '2026-04-27' },
  { companyId: 'c4', companySlug: 'meta', companyName: 'Meta', role: 'Software Engineer', level: 'L5', location: 'London', currency: 'USD', experienceYears: 6, baseSalary: 168000, bonus: 30000, stock: 145000, source: 'PUBLIC_FILING', confidenceScore: 0.86, submittedAt: '2026-03-17' },
  { companyId: 'c3', companySlug: 'amazon', companyName: 'Amazon', role: 'Principal Engineer', level: 'PRINCIPAL', location: 'Seattle', currency: 'USD', experienceYears: 16, baseSalary: 215000, bonus: 12000, stock: 380000, source: 'PUBLIC_FILING', confidenceScore: 0.79, submittedAt: '2026-02-01' },
  { companyId: 'c2', companySlug: 'microsoft', companyName: 'Microsoft', role: 'Principal SWE', level: 'PRINCIPAL', location: 'San Francisco', currency: 'USD', experienceYears: 14, baseSalary: 205000, bonus: 22000, stock: 310000, source: 'CONTRIBUTOR', confidenceScore: 0.76, submittedAt: '2026-01-26' },
  { companyId: 'c1', companySlug: 'google', companyName: 'Google', role: 'Software Engineer', level: 'SDE_II', location: 'Pune', currency: 'INR', experienceYears: 5, baseSalary: 4000000, bonus: 750000, stock: 5600000, source: 'CONTRIBUTOR', confidenceScore: 0.81, submittedAt: '2026-05-28' },
  { companyId: 'c5', companySlug: 'flipkart', companyName: 'Flipkart', role: 'Data Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 2800000, bonus: 360000, stock: 1900000, source: 'VERIFIED', confidenceScore: 0.87, submittedAt: '2026-04-19' },
  { companyId: 'c8', companySlug: 'swiggy', companyName: 'Swiggy', role: 'Data Scientist', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 3, baseSalary: 2550000, bonus: 270000, stock: 1400000, source: 'CONTRIBUTOR', confidenceScore: 0.78, submittedAt: '2026-03-23' },
  { companyId: 'c10', companySlug: 'razorpay', companyName: 'Razorpay', role: 'DevOps Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 2750000, bonus: 300000, stock: 1700000, source: 'VERIFIED', confidenceScore: 0.85, submittedAt: '2026-04-23' },
];

export const salaries: SalaryRecord[] = raw.map((r, i) => ({
  ...r,
  id: `sal_${(i + 1).toString().padStart(3, '0')}`,
  totalComp: computeTotalComp(r.baseSalary, r.bonus, r.stock),
}));

export function getSalaryById(id: string): SalaryRecord | undefined {
  return salaries.find((s) => s.id === id);
}

export function getSalariesByCompanySlug(slug: string): SalaryRecord[] {
  return salaries.filter((s) => s.companySlug === slug);
}
