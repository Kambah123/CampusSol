// Campus SOL v2.0 - Professional Landing Page

import { motion } from 'framer-motion';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Target,
  Trophy,
  Users,
  ArrowRight,
  MapPin,
  Lock,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import type { TabType } from '@/App';

interface LandingPageProps {
  onStart: (tab: TabType) => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0F0F1E] text-white selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F1E]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Campus<span className="text-purple-500">SOL</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>
          <button
            onClick={() => onStart('home')}
            className="btn-primary h-10 px-6 text-sm"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-8"
          >
            <MapPin className="w-3 h-3" />
            LIVE IN NIGERIAN UNIVERSITIES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Master Web3 on <br />
            <span className="text-gradient">Your Campus.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Join thousands of Nigerian students learning Solana basics, completing quests, and earning real rewards. Secure, fast, and built for the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onStart('quests')}
              className="btn-primary w-full sm:w-auto h-14 px-10 text-lg group"
            >
              Start Earning
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="btn-secondary w-full sm:w-auto h-14 px-10 text-lg"
              onClick={() => onStart('home')}
            >
              View Leaderboard
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trust Shield (Webacy) */}
      <section id="security" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card-heavy p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
          >
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[#10B981] font-bold text-sm mb-4">
                <ShieldCheck className="w-5 h-5" />
                SECURITY-FIRST PLATFORM
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your safety is our priority.</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Powered by <span className="text-white font-bold">Webacy DD.xyz</span>, we audit every student wallet and transaction. Get your "Naija Safety Score" and learn to navigate Web3 without the fear of drainers.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Real-time Risk Audit</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Sybil Protection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Address Screening</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Verified by DD.xyz</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-purple-500/20 animate-pulse absolute-center blur-3xl" />
              <div className="relative w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl flex-center shadow-2xl rotate-3">
                <ShieldCheck className="w-20 h-20 md:w-28 md:h-28 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Nigerian Students Love Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Built for the local context, handling Naira volatility and campus life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Smartphone className="w-8 h-8 text-blue-400" />,
                title: "Telegram Mini App",
                desc: "No new apps to download. Access directly from Telegram, optimized for low-end devices."
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                title: "Solana Fast",
                desc: "Experience sub-second transactions and near-zero fees on the world's most performant blockchain."
              },
              {
                icon: <Users className="w-8 h-8 text-purple-400" />,
                title: "Local Community",
                desc: "Connect with students from UNILAG, UI, OAU, and more. Compete on the national leaderboard."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex-center mb-6 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap / Quests Preview */}
      <section id="roadmap" className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Your Web3 Journey</h2>
            <p className="text-gray-400">Complete these steps to become a Campus SOL Pioneer.</p>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, title: "Connect Wallet", status: "Level 1" },
              { id: 2, title: "Security Audit", status: "Safety First" },
              { id: 3, title: "First Transfer", status: "On-chain" },
              { id: 4, title: "USDC Swap", status: "Stable Cash" },
              { id: 5, title: "Solana Pay", status: "Instant" },
              { id: 6, title: "The Grand Quiz", status: "Final Boss" }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex-center font-bold text-purple-400">
                  {step.id}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{step.title}</h4>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{step.status}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex-center group-hover:bg-purple-500/20 transition-colors">
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex-center gap-2">
              <Zap className="w-6 h-6" />
              <span className="font-bold">SOLANA</span>
            </div>
            <div className="flex-center gap-2">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-bold">WEBACY</span>
            </div>
            <div className="flex-center gap-2">
              < Smartphone className="w-6 h-6" />
              <span className="font-bold">TELEGRAM</span>
            </div>
            <div className="flex-center gap-2">
              <Target className="w-6 h-6" />
              <span className="font-bold">JUPITER</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[40px] bg-gradient-to-br from-purple-600 to-indigo-700 p-10 md:p-20 overflow-hidden text-center">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

            <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10">Ready to join Nigeria&apos;s <br /> Web3 Revolution?</h2>
            <p className="text-purple-100 text-lg mb-10 max-w-xl mx-auto relative z-10">Start your first quest today and join the elite Campus SOL Pioneers.</p>

            <button
              onClick={() => onStart('home')}
              className="bg-white text-purple-700 h-16 px-12 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl relative z-10"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <span className="font-bold">Campus SOL Nigeria</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              Github <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="text-gray-500 text-sm">
            © 2026 Campus SOL. Built with 💜 for students.
          </div>
        </div>
      </footer>
    </div>
  );
};
