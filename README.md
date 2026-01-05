# ConnecTok - B2B Marketplace Platform

A comprehensive B2B marketplace platform connecting suppliers with institutional buyers in Zimbabwe. Built with modern web technologies and designed for scalability, security, and exceptional user experience.

## 🚀 Features

### Core Platform Features
- **Multi-Role Authentication**: Buyers, Suppliers, Logistics, and Admin roles
- **Product Catalog**: Advanced CRUD operations with bulk upload support
- **Smart Search & Discovery**: Text and semantic search with advanced filters
- **RFQ System**: Request for Quotation workflow with negotiation capabilities
- **Order Management**: Full lifecycle tracking with escrow payments
- **Real-time Messaging**: In-app communication between buyers and suppliers
- **Analytics Dashboard**: Business intelligence and performance metrics
- **Mobile Responsive**: Optimized for all device sizes

### Advanced Features
- **Escrow Payment System**: Secure transaction management
- **Order Tracking**: Uber-like real-time delivery tracking
- **Supplier Verification**: KYC process with document management
- **Notification System**: Multi-channel alerts (Email, SMS, Push)
- **Admin Panel**: Comprehensive management and dispute resolution
- **AI Integration**: Smart recommendations and automation

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom components
- **Icons**: Lucide React
- **State Management**: React Hooks (to be extended with Zustand/Redux)

### Backend (Planned)
- **Runtime**: Node.js
- **Database**: MongoDB with replica sets
- **Authentication**: JWT with refresh tokens
- **File Storage**: AWS S3
- **Payments**: Stripe, Flutterwave, EcoCash, OneMoney integration
- **Real-time**: WebSockets for messaging

### Infrastructure
- **Cloud**: AWS (ECS/Fargate, Lambda, S3, CloudFront)
- **CI/CD**: GitHub Actions
- **Monitoring**: CloudWatch, Prometheus, Grafana
- **Containerization**: Docker

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-org/connec-tok.git
cd connec-tok
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure environment variables**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/connec-tok

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Payment Gateways - Zimbabwe Systems
ECOCASH_MERCHANT_CODE=your-ecocash-merchant-code
ECOCASH_MERCHANT_PIN=your-ecocash-pin
CABS_PAY_API_KEY=your-cabs-pay-api-key
PAYNOW_INTEGRATION_ID=your-paynow-integration-id
PAYNOW_INTEGRATION_KEY=your-paynow-integration-key

# File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=connec-tok-uploads

# Email Service
RESEND_API_KEY=re_...

# SMS Service
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=your-auth-token
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Role-specific dashboards
│   ├── messages/          # Messaging system
│   ├── orders/            # Order management
│   ├── profile/           # User profiles
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── forms/            # Form components
├── lib/                  # Utility functions
│   ├── utils.ts          # Helper functions
│   ├── auth.ts           # Authentication utilities
│   └── api.ts            # API client
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── styles/               # Additional styles
```

## 🎯 User Roles & Permissions

### Buyer
- Browse and search products
- Place orders and make payments
- Track deliveries
- Communicate with suppliers
- Manage business profile

### Supplier
- Manage product listings
- Process and fulfill orders
- Receive payments via escrow
- Analyze sales performance
- Verify business credentials

### Logistics Partner
- Manage delivery assignments
- Update shipment status
- Optimize delivery routes
- Handle proof of delivery

### Admin
- User management and verification
- Dispute resolution
- Platform analytics
- System configuration

## 🔐 Security Features

- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: Field-level encryption for sensitive data
- **Payment Security**: PCI DSS compliant payment processing
- **API Security**: Rate limiting and input validation
- **Audit Logging**: Comprehensive activity tracking

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker build -t connec-tok .
docker run -p 3000:3000 connec-tok
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 📊 Monitoring & Analytics

- **Application Monitoring**: Sentry for error tracking
- **Performance Monitoring**: Web Vitals and custom metrics
- **User Analytics**: Custom dashboard for business metrics
- **Infrastructure Monitoring**: CloudWatch alerts and dashboards

## 🔄 CI/CD Pipeline

1. **Code Push** → GitHub
2. **Automated Tests** → Jest, Cypress
3. **Build & Lint** → ESLint, TypeScript
4. **Security Scan** → Snyk, Dependabot
5. **Deploy to Staging** → AWS ECS
6. **Integration Tests** → API testing
7. **Deploy to Production** → Blue-green deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.connec-tok.com](https://docs.connec-tok.com)
- **Support Email**: support@connec-tok.com
- **Discord Community**: [Join our Discord](https://discord.gg/connec-tok)

## 🗺 Roadmap

### Phase 1 - MVP (Current)
- ✅ Basic authentication and user management
- ✅ Product catalog and search
- ✅ Order management system
- ✅ Messaging platform
- ✅ Mobile responsive design

### Phase 2 - Advanced Features (Q2 2024)
- 🔄 Payment gateway integrations
- 🔄 Escrow system implementation
- 🔄 Advanced analytics dashboard
- 🔄 Supplier verification system
- 🔄 Real-time order tracking

### Phase 3 - Scale & AI (Q3 2024)
- 📋 AI-powered recommendations
- 📋 Predictive analytics
- 📋 Automated dispute resolution
- 📋 Multi-currency support
- 📋 Regional expansion

### Phase 4 - Enterprise (Q4 2024)
- 📋 API for third-party integrations
- 📋 Advanced reporting tools
- 📋 Custom workflow automation
- 📋 White-label options
- 📋 Enterprise SLAs

## 📈 Performance Metrics

- **Page Load Time**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **API Response Time**: < 300ms (cached), < 1s (uncached)
- **Uptime**: 99.9%
- **Mobile Performance**: 95+ Lighthouse score

## 🌍 Localization

Currently supporting:
- English (primary)
- Shona (planned)
- Ndebele (planned)

## 🏢 Business Model

- **Transaction Fees**: 2-5% per successful transaction
- **Subscription Plans**: Premium features for suppliers
- **Verification Services**: KYC and business verification
- **Advertising**: Promoted listings and features

---

Built with ❤️ for African businesses
