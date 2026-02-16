# 🎓 Campus SOL Starter

[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?logo=solana)](https://solana.com)
[![Telegram](https://img.shields.io/badge/Telegram-Mini%20App-26A5E4?logo=telegram)](https://telegram.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Made in Nigeria](https://img.shields.io/badge/Made%20in-Nigeria-008751.svg)](https://en.wikipedia.org/wiki/Nigeria)

> 🇳🇬 A gamified Telegram Mini App for Nigerian university students to learn Solana basics, complete quests, earn real micro-rewards in SOL/USDC on devnet, and mint shareable compressed NFT badges.

![Campus SOL Starter](https://via.placeholder.com/800x400/9945FF/FFFFFF?text=Campus+SOL+Starter)

## 🚀 Features

### 5 Gamified Quests (~5-10 minutes)
1. **Connect Wallet** - Link Phantom or Solflare wallet
2. **Send Transaction** - Send 0.0001 SOL with on-chain verification
3. **Swap to USDC** - Use Jupiter aggregator to get stablecoins
4. **Solana Pay Demo** - Generate QR codes for instant payments
5. **Knowledge Quiz** - 10 Nigeria-focused questions on stablecoins & remittances

### Rewards & Badges
- 💰 Earn 0.001-0.02 SOL/USDC per quest
- 🏆 Mint compressed NFT badge: "Campus SOL Pioneer – Nigeria Level 1"
- 📱 Share achievements on X/WhatsApp
- 👥 Referral system with bonus rewards
- 🏅 Live leaderboard

## 🛠 Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Telegram SDK**: @tma.js/sdk
- **Solana**: @solana/web3.js + Wallet Adapter
- **Wallets**: Phantom, Solflare
- **NFTs**: Metaplex Bubblegum (compressed NFTs)
- **Network**: Devnet (easy switch to Mainnet)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- A Solana wallet (Phantom or Solflare)
- Telegram account (for testing Mini App)

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/campus-sol-starter.git
cd campus-sol-starter
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
VITE_SOLANA_NETWORK=devnet
VITE_RPC_ENDPOINT=https://api.devnet.solana.com
VITE_ADMIN_PRIVATE_KEY=your_admin_wallet_private_key_here
VITE_VERIFICATION_ADDRESS=your_verification_wallet_address_here
VITE_USDC_MINT=4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU
VITE_BOT_NAME=CampusSolNaijaBot
```

### 3. Run Locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 4. Test in Telegram (Optional)

For HTTPS testing with Telegram:

```bash
# Install ngrok globally
npm install -g ngrok

# Start tunnel to your local dev server
ngrok http 5173

# Use the HTTPS URL in BotFather
```

## 🤖 Telegram Bot Setup

1. **Create Bot**: Message [@BotFather](https://t.me/BotFather)
   ```
   /newbot
   Name: Campus SOL Starter
   Username: CampusSolNaijaBot
   ```

2. **Set Menu Button**:
   ```
   /setmenubutton
   Select your bot
   Enter URL: https://your-deployed-url.vercel.app
   Enter button text: Start Learning
   ```

3. **Get Bot Token**: Save the token for future API use

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for auto-deployments.

### Environment Variables on Vercel

Add these in your Vercel project settings:

- `VITE_SOLANA_NETWORK`
- `VITE_RPC_ENDPOINT`
- `VITE_ADMIN_PRIVATE_KEY` (keep secure!)
- `VITE_VERIFICATION_ADDRESS`

## 🎯 Quest Flow

```
Welcome Screen
    ↓
Quest 1: Connect Wallet → Detect publicKey → Reward: 0.001 SOL
    ↓
Quest 2: Send 0.0001 SOL → Verify tx on-chain → Reward: 0.002 SOL
    ↓
Quest 3: Swap SOL→USDC via Jupiter → Verify → Reward: 0.003 SOL
    ↓
Quest 4: Generate Solana Pay QR → Demo payment → Reward: 0.004 SOL
    ↓
Quest 5: Quiz (10 questions) → Score ≥ 5 → Reward: 0.01 SOL
    ↓
Completion: Mint NFT Badge + Share + Referral Bonus
```

## 📁 Project Structure

```
campus-sol-starter/
├── src/
│   ├── components/
│   │   ├── quests/           # Quest components
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── Quest2Send.tsx
│   │   │   ├── Quest3Swap.tsx
│   │   │   ├── Quest4Pay.tsx
│   │   │   ├── Quest5Quiz.tsx
│   │   │   ├── CompletionBadge.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── QuestNavigator.tsx
│   │   └── ui/               # shadcn/ui components
│   ├── data/
│   │   ├── quests.ts         # Quest definitions
│   │   └── quizQuestions.ts  # Nigeria-themed quiz
│   ├── hooks/
│   │   └── useUserProgress.ts # User progress management
│   ├── lib/
│   │   ├── solana.ts         # Solana utilities
│   │   └── telegram.ts       # Telegram SDK helpers
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point with providers
│   └── App.css               # Custom styles
├── .env.example              # Environment template
├── package.json
├── vite.config.ts
└── README.md
```

## 🔐 Security Notes

- **Never commit** your `.env` file with real private keys
- Admin private key should be stored securely (use Vercel env vars)
- All transactions are on devnet - no real money at risk
- Frontend never exposes sensitive keys

## 🧪 Testing

### Test Wallets (Devnet)

Create a test wallet for development:

```bash
# Using Solana CLI
solana-keygen new --outfile ./test-wallet.json
solana airdrop 2 $(solana-keygen pubkey ./test-wallet.json) --url devnet
```

### Run Tests

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## 🌍 Nigeria-Specific Features

- 🇳🇬 Local context: Naira volatility, campus life, remittances
- 📚 Quiz questions focus on Nigerian use cases
- 💬 Pidgin-friendly UI (optional localization)
- 🎓 University-focused badge naming
- 📱 WhatsApp sharing (most popular in Nigeria)

## 🎨 Customization

### Add More Quests

Edit `src/data/quests.ts`:

```typescript
{
  id: 6,
  title: "Your New Quest",
  description: "Description here",
  reward: 0.005,
  rewardToken: 'SOL',
  completed: false,
  icon: "YourIcon"
}
```

### Add Quiz Questions

Edit `src/data/quizQuestions.ts`:

```typescript
{
  id: 13,
  question: "Your question?",
  options: ["A", "B", "C", "D"],
  correctAnswer: 0,
  explanation: "Why this is correct"
}
```

## 📈 Analytics & Monitoring

Track key metrics:
- Quest completion rates
- Wallet connection conversion
- Quiz scores distribution
- NFT mints
- Referral usage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- [Solana Foundation](https://solana.org) for grants support
- [Metaplex](https://metaplex.com) for NFT tooling
- [Jupiter](https://jup.ag) for swap aggregation
- [Telegram](https://telegram.org) for Mini Apps platform

## 📞 Support

- Telegram: [@CampusSolNaijaBot](https://t.me/CampusSolNaijaBot)
- Twitter: [@CampusSOL](https://twitter.com/CampusSOL)
- Email: support@campussolstarter.com

---

<p align="center">
  <strong>Built with 💜 for Nigerian Students</strong><br>
  <sub>Powered by Solana • Made in Nigeria 🇳🇬</sub>
</p>
