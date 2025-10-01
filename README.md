# NakedTruth - Nigeria 2027 Election Forecasting Platform

A secure, anonymous polling application for forecasting voter sentiment ahead of Nigeria's 2027 presidential elections. Built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## 🚀 Features

- **Anonymous Polling**: Secure, privacy-focused voter sentiment collection
- **Real-time Analytics**: Interactive dashboards with regional and demographic breakdowns
- **Voter Education**: Comprehensive election information and fact-checking resources
- **Transparent Methodology**: Full disclosure of polling methods and limitations
- **Mobile-First Design**: Responsive design optimized for all devices
- **Legal Compliance**: Built to comply with Nigeria's Electoral Act 2022 and Data Protection Act 2023

## 🛠 Tech Stack

- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (anonymous and admin)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier available)
- Vercel account for deployment (optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nakedtruth-polling-app.git
cd nakedtruth-polling-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Set Up Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the following schema:

```sql
-- Create polls table
CREATE TABLE polls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create responses table
CREATE TABLE responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id),
  selected_option TEXT NOT NULL,
  demographics JSONB,
  ip_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create results cache table for performance
CREATE TABLE results_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id),
  results JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE results_cache ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anonymous inserts" ON responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read access to polls" ON polls
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow read access to results" ON results_cache
  FOR SELECT USING (true);
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── poll/              # Polling interface
│   ├── dashboard/         # Results dashboard
│   ├── education/         # Voter education
│   ├── methodology/       # Transparency & methodology
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── ...                # Other components
└── lib/                   # Utility functions
    ├── supabase.ts        # Supabase client
    └── db.ts              # Database functions
```

## 🔧 Development Roadmap

### Step 1: ✅ Project Setup
- [x] Next.js project initialization
- [x] Dependencies installation
- [x] Basic folder structure
- [x] Landing page creation
- [x] Responsive header and footer

### Step 2: Database & Authentication
- [ ] Supabase integration
- [ ] Database schema setup
- [ ] Authentication setup
- [ ] Anonymous response system

### Step 3: Poll Interface
- [ ] Poll form creation
- [ ] Form validation
- [ ] Demographics collection
- [ ] Anonymous submission

### Step 4: Results Dashboard
- [ ] Real-time data visualization
- [ ] Regional breakdown charts
- [ ] Demographic analysis
- [ ] Historical comparisons

### Step 5: Education & Transparency
- [ ] Voter education portal
- [ ] Methodology documentation
- [ ] Fact-checking resources
- [ ] Legal compliance pages

### Step 6: Security & Performance
- [ ] Rate limiting
- [ ] CAPTCHA integration
- [ ] Admin dashboard
- [ ] Data export functionality

### Step 7: Analytics & Forecasting
- [ ] Statistical analysis
- [ ] Forecasting algorithms
- [ ] Turnout predictions
- [ ] Trend analysis

### Step 8: Optimization
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] PWA features
- [ ] SEO optimization

### Step 9: Deployment
- [ ] Vercel deployment
- [ ] Domain configuration
- [ ] Environment setup
- [ ] SSL certification

### Step 10: Testing & Launch
- [ ] End-to-end testing
- [ ] User acceptance testing
- [ ] Performance monitoring
- [ ] Launch preparation

## ⚖️ Legal Compliance

This application is designed to comply with:

- **Nigeria's Electoral Act 2022**: No campaigning or voter influence
- **Nigeria Data Protection Act 2023**: Anonymous data collection
- **INEC Regulations**: Educational and forecasting purposes only

### Important Disclaimers

- This app is for forecasting and educational purposes only
- Results are non-binding and may not represent the full electorate
- May under-represent rural voters and older demographics
- Always consult INEC for official election information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@nakedtruth.com or create an issue in this repository.

## 🙏 Acknowledgments

- Inspired by Stears' 2019 Election Tracker
- Built for transparency and civic engagement
- Dedicated to democratic participation in Nigeria

---

**Disclaimer**: This is an independent forecasting platform, not affiliated with INEC or any political party. Results are for educational and analytical purposes only.
# Force rebuild
