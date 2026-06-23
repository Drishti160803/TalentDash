# TalentDash — Frontend Engineering Trial

A modern compensation intelligence platform for India's tech industry.

TalentDash helps engineers compare salaries, explore compensation trends, benchmark offers, and understand company-level compensation data through an intuitive, data-driven interface.

Built as a **Frontend Engineering Trial Project** using **Next.js, TypeScript, Tailwind CSS, React Server Components, Static Generation, Recharts, and Local Storage Persistence**.

---

## 🚀 Live Demo

**Live URL:**  
👉 https://talent-dash-ruddy.vercel.app/

---

# 📸 Screenshots

## Landing Page

<img width="1000" height="500" alt="Screenshot 2026-06-23 220328" src="https://github.com/user-attachments/assets/1321d619-c9dd-4236-86fb-a381aa2cb62a" />


---

## Salary Heatmap

<img width="1000" height="500" alt="Screenshot 2026-06-23 220530" src="https://github.com/user-attachments/assets/129ffef8-ace4-4667-b5d3-2c13a1561da1" />


## Compare Offers

<img width="1000" height="500" alt="Screenshot 2026-06-23 220555" src="https://github.com/user-attachments/assets/5a442ff3-bf44-4959-9055-6b9af950d6ff" />

---

## Submit Compensation

<img width="1000" height="500" alt="Screenshot 2026-06-23 220725" src="https://github.com/user-attachments/assets/b110fcba-7456-410b-b9fb-6548f127d4f8" />


---

## Saved Dashboard

<img width="1000" height="500" alt="Screenshot 2026-06-23 220741" src="https://github.com/user-attachments/assets/21f01c1e-a2ad-4334-8af2-0fbf07fdfb2c" />


---

## Company Profile
<img width="1000" height="500" alt="Screenshot 2026-06-23 220807" src="https://github.com/user-attachments/assets/e0a72be6-aadc-488b-ae95-b5bc270f205f" />



---

# ✨ Features

### Compensation Dashboard

- Filter by company
- Filter by level
- Filter by city
- Filter by currency
- Pagination support
- URL-synced filters
- Compensation ranking by total pay
- Responsive salary table

### Salary Heatmap

- City × Level compensation matrix
- Median salary visualization
- Color-coded compensation ranges
- Interactive hover states
- Compensation benchmarking

### Company Intelligence

- Company profile pages
- Compensation distribution analysis
- Level-wise breakdown charts
- Range and median statistics

### Offer Comparison Engine

- Compare any two salary records
- Base salary comparison
- Bonus comparison
- Stock comparison
- Total compensation delta calculation
- Experience comparison

### Compensation Submission

- Salary contribution flow
- Real-time validation
- Total compensation calculation
- Structured data collection

### Saved Workspace

- Bookmark companies
- Save compensation comparisons
- Local persistence via localStorage
- Personal dashboard experience

---

# 🎯 What Goes Beyond The Trial Requirements

While the assignment primarily focused on a compensation dashboard, TalentDash includes several additional product features:

### Interactive Salary Heatmap

A dedicated city × level compensation heatmap allowing users to quickly identify where compensation opportunities exist across India's tech ecosystem.


### Company Analytics Pages

Each company has its own profile page featuring:

- Compensation statistics
- Compensation range analysis
- Level distribution charts
- Detailed salary submissions
 
 
### Offer Comparison Tool

Users can compare two compensation records side-by-side and understand exactly how compensation differs across:

- Base Salary
- Bonus
- Equity / Stock
- Total Compensation
- Experience



### Saved Items Dashboard

A personal dashboard allowing users to:

- Bookmark companies
- Save offer comparisons
- Persist preferences locally

### Production-Style Architecture

Although the project uses seeded mock data, the application structure mirrors a production implementation, making future backend integration straightforward.

---

# 🛠 Tech Stack

| Layer | Technology |
|---------|------------|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Validation | Zod |
| Charts | Recharts |
| State Management | React Context |
| Persistence | localStorage |
| Deployment | Vercel |

---

# 🏗 Architecture Decisions

## React Server Components First

Most pages are implemented using Server Components to reduce client-side JavaScript and improve rendering performance.

## Static Generation

Company pages are statically generated to provide:

- Faster loading
- Better SEO
- Reduced runtime computation

## URL-Based State

Filters and comparisons are synchronized with URL parameters, making pages:

- Shareable
- Bookmarkable
- Search-engine friendly

## Frontend-Only Design

The application intentionally avoids database dependencies while preserving realistic application architecture.

This allows backend APIs or databases to be introduced later without requiring major UI changes.

---

# 🎨 Design System

### Colors

| Purpose | Value |
|----------|---------|
| Primary Accent | #FF5A5F |
| Primary Text | #222222 |
| Secondary Text | #484848 |
| Muted Text | #717171 |
| Background | #F7F7F7 |
| Border | #EBEBEB |
| Success | #008A05 |
| Error | #D93025 |

### Typography

- Inter Font Family
- Consistent spacing system
- Accessible contrast ratios
- Tabular salary figures
- Responsive typography scale

---

# 📊 Dataset

The application includes:

- 70 compensation records
- 12 companies
- Multiple Indian cities
- INR and USD compensation records
- L3 to Principal levels
- Compensation edge cases
- Salary, bonus, and stock breakdowns

---

# 📂 Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── salaries/
│   │   ├── page.tsx
│   │   └── heatmap/page.tsx
│   ├── companies/[slug]/page.tsx
│   ├── compare/page.tsx
│   ├── submit/page.tsx
│   ├── saved/page.tsx
│   └── api/
│       └── ingest-salary/route.ts
│
├── components/
│   ├── ui/
│   └── features/
│
├── lib/
│   ├── data/
│   ├── heatmap.ts
│   ├── salary.ts
│   ├── validation.ts
│   ├── normalise.ts
│   ├── format.ts
│   └── store/
│
└── types/
```

---

# ⚡ Performance Considerations

- React Server Components by default
- Static generation where appropriate
- Minimal client-side hydration
- URL-driven state management
- Skeleton loading states
- Responsive rendering
- Local persistence without backend overhead

---

# 🔮 Future Improvements

Given additional development time, the platform could be extended with:

- PostgreSQL database integration
- Authentication and user profiles
- Advanced company search
- Salary trend analytics
- Compensation prediction models
- Community salary submissions
- Real-time data ingestion pipeline
- Compensation negotiation insights
- AI-powered salary recommendations

---

# 🚀 Running Locally

### Clone Repository

```bash
git clone <repository-url>
cd talentdash
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 📌 Key Highlights

- Modern compensation intelligence platform
- Fully responsive design
- Interactive salary heatmap
- Company analytics pages
- Offer comparison engine
- Saved items dashboard
- URL-synced application state
- Production-ready architecture
- Static generation and Server Components
- Built with Next.js, TypeScript, and Tailwind CSS

---

## 👨‍💻 Trial Deliverables Covered

✅ Compensation Dashboard  
✅ Salary Heatmap  
✅ Company Profile Pages  
✅ Offer Comparison Tool  
✅ Compensation Submission Flow  
✅ Saved Items Dashboard  
✅ URL-Synced State  
✅ Responsive Design  
✅ Data Visualization with Charts  
✅ Local Persistence Layer  

---

**TalentDash** was built to help engineers make better career decisions using structured compensation data rather than anecdotal information or recruiter estimates.
