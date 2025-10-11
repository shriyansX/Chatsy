# 🚀 Chatsy - Modern WhatsApp-like Chat Application

A modern, feature-rich chat application built with Next.js 15, Stream Chat, and Clerk authentication. Designed to provide a WhatsApp-like experience with real-time messaging, beautiful UI, and seamless user experience.

## ✨ Features

### 🎨 Modern UI/UX
- **WhatsApp-inspired Design** - Clean, modern interface with WhatsApp's color scheme
- **Dark/Light Mode Support** - Automatic theme detection with manual toggle
- **Responsive Design** - Perfect experience on mobile, tablet, and desktop
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Glass Morphism Effects** - Modern blur effects and gradients

### 💬 Chat Features
- **Real-time Messaging** - Instant message delivery with Stream Chat
- **Message Status Indicators** - Sent, delivered, and read receipts
- **Typing Indicators** - See when someone is typing
- **Message Timestamps** - Clear time indicators for all messages
- **Thread Support** - Reply to specific messages
- **Custom Message Bubbles** - WhatsApp-like message styling
- **Emoji Support** - Rich emoji integration
- **File Sharing** - Send images, documents, and more

### 🏠 Community Features
- **Discussion Forums** - Topic-based chat rooms
- **Member Management** - See online users and member counts
- **Channel Creation** - Create custom discussion channels
- **Public/Private Rooms** - Control room visibility
- **Moderation Tools** - Admin controls for channel management

### 🔐 Authentication & Security
- **Clerk Integration** - Secure user authentication
- **JWT Tokens** - Secure API communication
- **Email Verification** - Verified user accounts
- **Profile Management** - User profiles with avatars
- **Privacy Controls** - User privacy settings

### ⚡ Performance
- **Next.js 15** - Latest React framework with App Router
- **Server Components** - Optimized server-side rendering
- **Lazy Loading** - Efficient resource loading
- **Caching Strategy** - Optimized data fetching
- **Progressive Web App** - PWA capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Chat Engine**: Stream Chat React
- **Authentication**: Clerk
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with Radix UI
- **Icons**: Lucide React
- **Animations**: CSS animations + transitions
- **TypeScript**: Full type safety

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stream Chat account
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chatsy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # Clerk Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Stream Chat Keys
   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   ```

4. **Configure Clerk Webhooks**
   - Go to your Clerk Dashboard
   - Set up webhook endpoint: `your-domain.com/api/create`
   - Enable `user.created` event

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 What's Been Improved

### ✅ Design Enhancements
- Modern WhatsApp-like color scheme (#00a884 green theme)
- Professional gradient backgrounds and hover effects
- Responsive navigation with mobile optimization
- Beautiful card layouts with smooth animations
- Custom message bubbles with proper styling
- Loading states and error handling

### ✅ User Experience
- Intuitive homepage with clear CTAs
- Enhanced forums page with member counts and activity indicators
- Real-time chat with proper message formatting
- Smooth page transitions and micro-interactions
- Better mobile responsiveness
- Professional typography using Geist fonts

### ✅ Technical Improvements
- Enhanced error handling in API routes
- Better Stream Chat integration with custom components
- Improved security with environment variables
- Optimized performance with lazy loading
- Custom CSS with WhatsApp-like styling
- Better SEO with proper metadata

---

Made with ❤️ for a better chat experience

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
