# 🌍 PeaceCredit Platform

**Empowering Financial Inclusion Through AI-Powered Community-Based Credit Scoring for Conflict-Affected Regions**

[![Demo](https://img.shields.io/badge/🎥_Live_Demo-Watch_Now-blue?style=for-the-badge)](https://www.loom.com/share/e9e2db0fe2df4cc689b875db2a3f27f9?sid=bd7c0ec6-75e4-43dd-b775-df042e0776bf)
[![Pitch Deck](https://img.shields.io/badge/📊_Pitch_Deck-View_Slides-green?style=for-the-badge)](YOUR_PITCH_DECK_LINK_HERE)
[![Live App](https://img.shields.io/badge/🚀_Try_App-Live_Version-orange?style=for-the-badge)](https://peace-credit.vercel.app/)

---

## 🧨 Problem Statement

Millions of people in conflict-affected regions—especially refugees, internally displaced persons (IDPs), and informal workers—are financially invisible.

They lack:
- **Recognized identity documents** to open bank accounts or apply for loans
- **Formal credit histories** despite active participation in informal economies
- **Access to cooperatives** or structured community support
- **Protection from misinformation**, scams, and financial abuse
- **Trust in centralized systems** that often fail or exclude them

As a result, these individuals can't access basic financial services, can't prove their trustworthiness, and remain stuck in cycles of poverty and exploitation.

## 🚀 Solution

**PeaceCredit Agent** is an AI-powered, multilingual mobile platform that helps people in fragile or underserved regions build verifiable identities, trust-based credit scores, and community-driven cooperatives—without needing formal banks or paperwork.

Using AI, mobile data, decentralized identity (DID), and community contributions, it empowers users to:
- **Build an alternative credit profile** using behavior, community inputs, and transaction data
- **Join or form cooperatives** that pool resources and share responsibilities
- **Interact in their language** with an AI guide for finance, identity, and protection
- **Prevent misinformation, fraud, and coercion** via AI-powered alerts and education
- **Prove trustworthiness** to NGOs, local lenders, or employers using verifiable credentials

## 📱 Key App Features

### 🤖 **AI Credit Scoring Engine**
- Uses behavioral data (mobile usage, payments, community contributions) to build trust-based scores
- Explains what affects your score and how to improve it
- Community participation metrics
- Payment history tracking
- Financial stability assessment
- Social trust indicators
- Economic activity analysis

### 🤝 **Community Cooperatives (DAO-inspired)**
- Users form or join digital cooperatives
- Pool resources (money, tools, support) and vote on decisions
- Record contribution history for future scoring
- Community-based lending pools
- Peer-to-peer financial support
- Collective credit building
- Social accountability mechanisms

### 💬 **AI PeaceFinance Chat Agent**
- Guides users in their native language
- Helps with budgeting, loan questions, coop setup, and scam detection
- Scans and helps verify IDs or documents
- **6 Languages**: English, French, Swahili, Hausa, Yoruba, Igbo
- Localized currency support
- Cultural adaptation for different regions

### 🆔 **Decentralized Identity (DID) Wallet**
- Users store verifiable credentials: work done, coop activity, ID documents
- Builds digital reputation without requiring a government ID
- Blockchain-based identity verification using DIDs (Decentralized Identifiers)
- Secure, user-controlled identity management
- Privacy-preserving credit assessments

### 🛡️ **Financial Education & Alerts**
- Personalized training: "How to manage money," "How to grow a coop," etc.
- Warns users about scams, misinformation, and risky actors
- Real-time fraud detection and prevention
- Community-verified information sharing

### 💰 **Microloan & Grant Matching**
- Connects verified users and coops to financing from NGOs, donors, or local lenders
- Displays available opportunities based on location, score, and status
- Intuitive dashboard with real-time insights
- Mobile-responsive design
- Progressive Web App capabilities
- Offline functionality support

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **Recharts** - Data visualization

### **Backend**
- **Next.js API Routes** - Serverless backend
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication system

### **Blockchain & Identity**
- **Decentralized Identifiers (DIDs)** - Self-sovereign identity
- **Verifiable Credentials** - Tamper-proof attestations
- **IPFS** - Decentralized file storage

### **AI & Machine Learning**
- **Natural Language Processing** - Multi-language chat agent
- **Behavioral Analytics** - Credit scoring from mobile data
- **Fraud Detection** - Real-time scam and misinformation alerts
- **Document Verification** - AI-powered ID scanning and validation

### **Internationalization**
- **next-intl** - Multi-language support
- **ICU Message Format** - Advanced text formatting
- **Dynamic locale switching**

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/peacecredit-platform.git
cd peacecredit-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/peacecredit"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: External APIs
BLOCKCHAIN_RPC_URL="your-blockchain-rpc"
IPFS_GATEWAY="your-ipfs-gateway"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database with sample data
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application running!

## 📋 Test Accounts

For judges to easily test the platform:

| Email | Password | Role | Features |
|-------|----------|------|----------|
| `test@example.com` | `password123` | User | Complete financial profile, credit score: 720 |
| `admin@peacecredit.com` | `password123` | Admin | Full platform access |

## 🎥 Demo & Resources

### 📹 **Video Demo**
[🎬 Watch 3-minute Demo](YOUR_DEMO_LINK_HERE)
- Platform walkthrough
- Key features demonstration
- User journey showcase

### 📊 **Pitch Deck**
[📈 View Presentation](YOUR_PITCH_DECK_LINK_HERE)
- Problem & solution overview
- Market opportunity
- Technical architecture
- Business model
- Impact metrics

### 🌐 **Live Application**
[🚀 Try PeaceCredit](YOUR_LIVE_APP_LINK_HERE)
- Fully functional demo
- Sample data included
- All features available

## 🏗️ Project Structure

```
peacecredit-platform/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Main application pages
│   ├── api/              # Backend API routes
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── lib/                 # Utility functions
├── messages/            # Internationalization files
├── prisma/             # Database schema & migrations
├── public/             # Static assets
└── types/              # TypeScript definitions
```

## 🌍 Internationalization

The platform supports 6 languages with complete translations:

- **English** (`en`) - Primary language
- **Hausa** (`ha`) - Northern Nigeria/Niger
- **Yoruba** (`yo`) - Southwest Nigeria
- **Igbo** (`ig`) - Southeast Nigeria
- **French** (`fr`) - West/Central Africa
- **Swahili** (`sw`) - East Africa  


### Language Switching
Users can switch languages dynamically through the settings page, with all content including:
- UI text and labels
- Error messages
- Currency formatting
- Date/time formats

## 📊 Credit Scoring Algorithm

Our proprietary algorithm considers:

1. **Payment History (35%)** - Track record of timely payments
2. **Community Trust (25%)** - Peer endorsements and social proof
3. **Financial Stability (20%)** - Income consistency and asset ownership
4. **Economic Activity (15%)** - Business engagement and transactions
5. **Identity Verification (5%)** - Document authenticity and completeness

## 🔒 Security & Privacy

- **End-to-end encryption** for sensitive data
- **Zero-knowledge proofs** for privacy-preserving verification
- **GDPR compliant** data handling
- **Decentralized storage** for user control
- **Multi-factor authentication** support

## 🎯 Impact & Metrics

### Target Audience
- **100+ million** refugees and IDPs globally
- **Conflict-affected populations** in fragile states
- **Informal workers** without traditional banking access
- **Rural communities** displaced by conflict or climate change
- **Women and marginalized groups** excluded from formal finance

### Expected Outcomes
- **Increased financial inclusion** for displaced populations by 60%
- **Reduced vulnerability** to financial scams and exploitation by 75%
- **Enhanced community resilience** through cooperative formation
- **Improved access to microfinance** and humanitarian aid
- **Strengthened digital identity** for future integration

### Key Performance Indicators
- Number of verified digital identities created
- Cooperative formation and success rates
- Credit score improvements over time
- Fraud prevention and user protection metrics
- Financial service access and utilization rates

## 🚀 Future Roadmap

### Phase 1 (Current)
- ✅ Core platform development
- ✅ Multi-language support
- ✅ Basic credit scoring
- ✅ Cooperative integration

### Phase 2 (Next 3 months)
- 🔄 Mobile app development
- 🔄 Advanced AI credit models
- 🔄 Blockchain integration
- 🔄 Partner bank integrations

### Phase 3 (6-12 months)
- 📋 Microfinance partnerships
- 📋 Cross-border payments
- 📋 Insurance products
- 📋 Investment opportunities


## 🏆 Hackathon Submission

### Innovation Highlights
1. **Novel Credit Scoring** - Community-based alternative to traditional FICO
2. **Decentralized Identity** - User-controlled, privacy-preserving verification
3. **Cultural Adaptation** - Deep localization for African markets
4. **Cooperative Integration** - Leveraging existing community structures

### Technical Excellence
- **Scalable Architecture** - Built for millions of users
- **Modern Tech Stack** - Latest frameworks and best practices
- **Comprehensive Testing** - Unit, integration, and E2E tests
- **Performance Optimized** - Fast loading, efficient algorithms

### Social Impact
- **Financial Inclusion** - Serving the underbanked population
- **Community Empowerment** - Strengthening local economies
- **Economic Growth** - Enabling entrepreneurship and investment
- **Sustainable Development** - Supporting UN SDGs

---

## 🙏 Acknowledgments

Special thanks to:
- **Hackathon Organizers** for the opportunity
- **Open Source Community** for amazing tools
- **Beta Testers** for valuable feedback

---

**Built with ❤️ for financial inclusion and community empowerment**
