// Campus SOL - Professional UI/UX Transformation
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Users,
  MapPin,
  Smartphone,
  Shield,
  Activity,
  Globe
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
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-purple-500/30 font-sans">
      {/* Navbar - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight font-display">Campus<span className="text-purple-500">SOL</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-all hover:scale-105">Features</a>
            <a href="#roadmap" className="hover:text-white transition-all hover:scale-105">Roadmap</a>
            <a href="#security" className="hover:text-white transition-all hover:scale-105">Security</a>
          </div>

          <button
            onClick={() => onStart('home')}
            className="btn-primary px-8 h-12 text-sm shadow-purple-500/10"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section - Asymmetrical & Dynamic */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-8 tracking-widest uppercase"
            >
              <MapPin className="w-3.5 h-3.5" />
              Live in Nigerian Universities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] font-display"
            >
              Master Web3 on <br />
              <span className="text-gradient">Your Campus.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed font-light"
            >
              Join thousands of Nigerian students learning Solana basics, completing quests, and earning real rewards. Secure, fast, and built for the future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <button
                onClick={() => onStart('quests')}
                className="btn-primary w-full sm:w-auto h-16 px-12 text-xl group shadow-2xl"
              >
                Start Earning
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="btn-secondary w-full sm:w-auto h-16 px-12 text-xl hover:border-purple-500/50"
                onClick={() => onStart('home')}
              >
                View Leaderboard
              </button>
            </motion.div>
          </div>

          {/* 3D-like Floating Graphic */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-teal-500/20 rounded-[40px] blur-3xl" />
              <div className="relative h-full w-full bg-gradient-to-br from-purple-900/40 to-black/40 border border-white/10 rounded-[40px] backdrop-blur-3xl flex items-center justify-center p-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 blur-[80px] opacity-20" />
                  <Zap className="w-48 h-48 text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]" />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/20 rounded-2xl border border-teal-500/30 backdrop-blur-xl flex items-center justify-center animate-bounce">
                <Shield className="w-10 h-10 text-teal-400" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500/20 rounded-full border border-purple-500/30 backdrop-blur-xl flex items-center justify-center animate-pulse">
                <Activity className="w-8 h-8 text-purple-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section - Premium Upgrade */}
      <section id="security" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#1A1A22] to-[#0A0A0F] border border-white/10 p-10 md:p-20"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/5 to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-3 text-teal-400 font-bold text-sm mb-6 tracking-widest uppercase">
                  <ShieldCheck className="w-6 h-6" />
                  Security-First Platform
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-display">Your safety is <br/> our priority.</h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
                  Powered by <span className="text-white font-bold">Webacy DD.xyz</span>, we audit every student wallet and transaction. Get your "Naija Safety Score" and learn to navigate Web3 without the fear of drainers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Real-time Risk Audit",
                    "Sybil Protection",
                    "Address Screening",
                    "Verified by DD.xyz"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20 group-hover:bg-teal-500/20 transition-all">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-[40px] blur-3xl group-hover:bg-purple-500/30 transition-all" />
                  <div className="relative w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[40px] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <ShieldCheck className="w-28 h-28 md:w-40 md:h-40 text-white drop-shadow-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features - Bento Grid Layout */}
      <section id="features" className="py-32 px-6 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display">Why Nigerian Students <br/> <span className="text-gradient">Love Us</span></h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">Built for the local context, handling Naira volatility and campus life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 bento-item group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Smartphone className="w-64 h-64 -mr-20 -mt-20 rotate-12" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20">
                  <Smartphone className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Telegram Mini App</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">No new apps to download. Access directly from Telegram, optimized for low-end devices used across Nigerian campuses.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bento-item group"
            >
              <div className="h-full flex flex-col justify-end">
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-8 border border-yellow-500/20">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Solana Fast</h3>
                <p className="text-gray-400 leading-relaxed">Experience sub-second transactions and near-zero fees on the world's most performant blockchain.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bento-item group"
            >
              <div className="h-full flex flex-col justify-end">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Local Community</h3>
                <p className="text-gray-400 leading-relaxed">Connect with students from UNILAG, UI, OAU, and more. Compete on the national leaderboard.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 bento-item group bg-gradient-to-br from-purple-900/20 to-transparent"
            >
              <div className="h-full flex flex-col justify-end">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-8 border border-teal-500/20">
                  <Globe className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Global Access, Local Impact</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">We're bridging the gap between global Web3 technology and the unique needs of the Nigerian student ecosystem.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap - Vertical Stepper Upgrade */}
      <section id="roadmap" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display">Your Web3 Journey</h2>
            <p className="text-gray-400 text-xl font-light">Complete these steps to become a Campus SOL Pioneer.</p>
          </div>

          <div className="relative pl-12 md:pl-0">
            {/* Roadmap Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-teal-500 to-transparent opacity-30" />

            {[
              { id: 1, title: "Connect Wallet", status: "Level 1", desc: "Set up your first Solana wallet and link it to your student profile." },
              { id: 2, title: "Security Audit", status: "Safety First", desc: "Pass our safety check to ensure your assets are protected from day one." },
              { id: 3, title: "First Transfer", status: "On-chain", desc: "Send your first transaction and experience the speed of Solana." },
              { id: 4, title: "USDC Swap", status: "Stable Cash", desc: "Learn to swap tokens and manage stable assets effectively." },
              { id: 5, title: "Solana Pay", status: "Instant", desc: "Use crypto for real-world campus payments with lightning speed." },
              { id: 6, title: "The Grand Quiz", status: "Final Boss", desc: "Test your knowledge and earn your official Pioneer certification." }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-16 flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Connector Node */}
                <div className="absolute left-[-24px] md:left-1/2 md:ml-[-16px] w-8 h-8 rounded-full bg-[#0A0A0F] border-2 border-purple-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                </div>

                <div className="w-full md:w-[45%]">
                  <div className="glassmorphism p-8 rounded-3xl hover:border-purple-500/40 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-bold text-purple-500/20 group-hover:text-purple-500/40 transition-colors">0{step.id}</span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-widest">{step.status}</span>
                    </div>
                    <h4 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{step.title}</h4>
                    <p className="text-gray-400 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Professional & Clean */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#050508]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Campus<span className="text-purple-500">SOL</span></span>
            </div>
            
            <div className="flex gap-10 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Github</a>
            </div>

            <div className="text-gray-600 text-sm font-light">
              © 2026 Campus SOL. Built with 💜 for students.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
