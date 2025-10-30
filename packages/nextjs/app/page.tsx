"use client";

import { useEffect } from "react";

import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAccount } from "wagmi";
import ChainConnect from "../components/ChainConnect";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  //const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    /*if (isConnected && address && !isRedirecting) {
      setIsRedirecting(true);
      //router.push("/app");
    }*/
  }, [
    isConnected,
    address,
    router,
    // , isRedirecting
  ]);

  const redirectToApp = () => {
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={96} height={96} />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#projects"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#security"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Security
            </a>
            <a
              href="#roadmap"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Roadmap
            </a>
          </nav>
          <ChainConnect />
        </div>
      </header>
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMjJDNTVFIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-40" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-heading text-5xl md:text-7xl font-semibold tracking-tight text-foreground">
              Invest in Real Agriculture.
              <br />
              <span className="text-primary">On-Chain.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tokenized farming projects powered by smart-contract escrow, insurance options, and transparent on-chain
              reporting. Start small. Track everything.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <ChainConnect />
              <div className="flex items-center gap-3">
                <button className="px-8 py-3 border border-border bg-background text-foreground text-lg font-semibold rounded-lg hover:bg-card transition-colors flex items-center gap-2">
                  👁️ Explore Projects
                </button>
                <button className="px-8 py-3 text-foreground text-lg font-semibold hover:bg-muted/10 rounded-lg transition-colors flex items-center gap-2">
                  How It Works →
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card border border-border">
                <span className="text-accent text-lg">🛡️</span>
                <span className="text-sm font-medium text-foreground">RWA</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card border border-border">
                <span className="text-secondary text-lg">🔒</span>
                <span className="text-sm font-medium text-foreground">Smart Escrow</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card border border-border">
                <span className="text-primary text-lg">🛡️</span>
                <span className="text-sm font-medium text-foreground">Insurance</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card border border-border">
                <span className="text-accent text-lg">📊</span>
                <span className="text-sm font-medium text-foreground">Diversified</span>
              </div>
            </div>
            <div className="pt-8 space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground">ℹ️</span>
                <span>KYC/AML required. Returns not guaranteed.</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
                Backed by a network of 100+ vetted partner farms in the Kyrgyz Republic.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">Why Agriculture?</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Agriculture is a real, essential industry with consistent global demand—making it one of the most stable
                real-world asset classes.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center space-y-4 p-6 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Real Yield</h3>
                <p className="text-muted-foreground">Returns backed by real production, not speculation.</p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Evergreen Demand</h3>
                <p className="text-muted-foreground">Food demand grows every year—independent of crypto cycles.</p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Hard Asset Protection</h3>
                <p className="text-muted-foreground">
                  Agriculture historically outperforms during inflation and market volatility.
                </p>
              </div>
            </div>
            <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-lg text-foreground max-w-3xl mx-auto text-center">
                Umay connects capital to real farming projects in a transparent on-chain way—opening agriculture access
                to investors worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">How Umay Works</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                From real farms to real yield—in 5 simple steps.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">We Analyze Agricultural Markets</h3>
                  <p className="text-muted-foreground">
                    Our team identifies profitable farming opportunities like wheat, barley, and livestock projects.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">We Partner With Verified Farms</h3>
                  <p className="text-muted-foreground">
                    Each project is assigned to top-performing farms from our vetted network of 100+ partners.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <span className="text-secondary text-xl font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Project Gets Tokenized</h3>
                  <p className="text-muted-foreground">
                    Each investment is split into project tokens, making it accessible starting from low entry amounts.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center">
                  <span className="text-chart-4 text-xl font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Funds Locked in Smart-Contract Escrow</h3>
                  <p className="text-muted-foreground">
                    Investor capital is secured and only released based on project milestones.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-chart-5/10 rounded-full flex items-center justify-center">
                  <span className="text-chart-5 text-xl font-bold">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Harvest → Revenue → Payouts</h3>
                  <p className="text-muted-foreground">
                    After production and sale, returns are distributed proportionally to investors.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <button className="px-8 py-3 border border-border bg-background text-foreground text-lg font-semibold rounded-lg hover:bg-card transition-colors flex items-center gap-2 mx-auto">
                See Example Projects →
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="security" className="py-20 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
                Why Investors Choose Umay
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">Designed for trust. Built for performance.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Transparent by Design</h3>
                <p className="text-muted-foreground">
                  Every project is on-chain. Track funding, milestones, and returns in real time.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-secondary text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Protected Capital</h3>
                <p className="text-muted-foreground">
                  Smart-contract escrow ensures funds are released only when project milestones are delivered.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-accent text-2xl">⚖️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Risk-Managed Yield</h3>
                <p className="text-muted-foreground">
                  Projects are diversified across partner farms and include optional insurance protection.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-4/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-chart-4 text-2xl">🌾</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Real-World Results</h3>
                <p className="text-muted-foreground">Backed by real agricultural production—not market speculation.</p>
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
              <p className="text-lg text-foreground font-medium">
                Umay is where Web3 meets real assets—making agriculture investments simple and secure.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="projects" className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
                Live & Upcoming Projects
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Real agricultural assets—fractional, transparent, and on-chain.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">🌾</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      ✓ Live
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Wheat Harvest 2025</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="text-foreground font-medium">Naryn Valley, Kyrgyz Republic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Term:</span>
                    <span className="text-foreground font-medium">12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Return:</span>
                    <span className="text-primary font-semibold">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="text-accent font-medium">Low</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <span className="text-primary text-sm">✔</span>
                    <span className="text-xs text-muted-foreground">Escrow</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary text-sm">✔</span>
                    <span className="text-xs text-muted-foreground">Insurance</span>
                  </div>
                </div>
                <div className="mt-4">
                  <ChainConnect size="sm" fullWidth />
                </div>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent text-xl">🍯</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">✓ Live</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Organic Honey Expansion</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="text-foreground font-medium">Issyk-Kul Highlands</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Term:</span>
                    <span className="text-foreground font-medium">10 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Return:</span>
                    <span className="text-primary font-semibold">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="text-secondary font-medium">Medium</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <span className="text-primary text-sm">✔</span>
                    <span className="text-xs text-muted-foreground">Escrow</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary text-sm">✔</span>
                    <span className="text-xs text-muted-foreground">Insurance</span>
                  </div>
                </div>
                <div className="mt-4">
                  <ChainConnect size="sm" fullWidth />
                </div>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary text-xl">🐄</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                      ✓ Live
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Pasture-Fed Cattle Breeding</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="text-foreground font-medium">Talas Valley</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Term:</span>
                    <span className="text-foreground font-medium">14 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Return:</span>
                    <span className="text-primary font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="text-secondary font-medium">Medium</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <span className="text-primary text-sm">✔</span>
                    <span className="text-xs text-muted-foreground">Escrow</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary text-sm">✔</span>
                    <span className="text-xs text-muted-foreground">Insurance</span>
                  </div>
                </div>
                <div className="mt-4">
                  <ChainConnect />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="px-8 py-3 border border-border bg-background text-foreground text-lg font-semibold rounded-lg hover:bg-card transition-colors flex items-center gap-2 mx-auto">
                View All Projects →
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
                Built for Trust. Secured by Technology.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">Your investment is protected at every stage.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Smart-Contract Escrow</h3>
                <p className="text-muted-foreground">
                  Funds are locked on-chain and released only when verified milestones are met.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-secondary text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Insurance Coverage</h3>
                <p className="text-muted-foreground">
                  Optional project insurance protects against natural loss and farm failure.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-accent text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">On-Chain Transparency</h3>
                <p className="text-muted-foreground">
                  Every transaction and payout is visible on the blockchain—no hidden flows.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-4/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-chart-4 text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Farm Verification</h3>
                <p className="text-muted-foreground">
                  Each partner farm goes through identity, land ownership, and production history checks.
                </p>
              </div>
              <div className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-5/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-chart-5 text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Diversified Allocation</h3>
                <p className="text-muted-foreground">
                  Your investment is allocated across multiple farms to minimize risk exposure.
                </p>
              </div>
            </div>
            <div className="text-center p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-xl text-foreground font-semibold">
                Real assets + blockchain security + professional risk control = confident investing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
                Real Yield from Real Production
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Returns are generated from agricultural output—not speculation.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Invest</h3>
                <p className="text-muted-foreground">
                  Choose a farming project and invest using cryptocurrency via your wallet.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-secondary text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Production & Monitoring</h3>
                <p className="text-muted-foreground">
                  Farms execute the project. Progress and milestones are tracked openly.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-accent text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Harvest & Sale</h3>
                <p className="text-muted-foreground">Crops or livestock are sold on the market.</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-chart-4/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-chart-4 text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Profit Distribution</h3>
                <p className="text-muted-foreground">
                  Revenue is converted and distributed proportionally to investors on-chain.
                </p>
              </div>
            </div>
            <div className="max-w-2xl mx-auto mb-12">
              <div className="p-8 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Example:</h3>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investment:</span>
                        <span className="text-foreground font-semibold">$1,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Project Term:</span>
                        <span className="text-foreground font-semibold">12 Months</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Projected Return:</span>
                        <span className="text-primary font-bold">+20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expected Total:</span>
                        <span className="text-primary font-bold text-lg">$1,200</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Returns vary by project and market conditions.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="px-8 py-3 border border-border bg-background text-foreground text-lg font-semibold rounded-lg hover:bg-card transition-colors flex items-center gap-2 mx-auto">
                View Return Calculator →
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="roadmap" className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">Roadmap</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Growing real-world adoption through secure tokenized agriculture.
              </p>
            </div>
            <div className="space-y-8 mb-12">
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">✅</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-primary">Q1 2026</div>
                    <div className="text-lg font-semibold text-foreground">Prototype</div>
                    <div className="text-xs text-primary font-medium">In progress</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">Farm network setup • RWA model • Smart contract escrow</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary text-xl">🔄</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-accent">Q2 2026</div>
                    <div className="text-lg font-semibold text-foreground">MVP Launch</div>
                    <div className="text-xs text-accent font-medium">Planned</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">First tokenized farm projects • Investor dashboard</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent text-xl">⏳</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-chart-4">Q3 2026</div>
                    <div className="text-lg font-semibold text-foreground">Scale Regionally</div>
                    <div className="text-xs text-chart-4 font-medium">Planned</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">50+ projects • Insurance rollout • USDT/USDC support</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 flex items-center gap-4">
                  <div className="w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center">
                    <span className="text-chart-4 text-xl">⏳</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-chart-4">Q4 2026</div>
                    <div className="text-lg font-semibold text-foreground">RWA Expansion</div>
                    <div className="text-xs text-chart-4 font-medium">Planned</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">Secondary marketplace • Automated yield payouts</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 flex items-center gap-4">
                  <div className="w-12 h-12 bg-chart-5/10 rounded-full flex items-center justify-center">
                    <span className="text-chart-5 text-xl">⏳</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-chart-5">2028</div>
                    <div className="text-lg font-semibold text-foreground">Global Growth</div>
                    <div className="text-xs text-chart-5 font-medium">Planned</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">Cross-border agriculture RWA marketplace</p>
                </div>
              </div>
            </div>
            <div className="text-center p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-xl text-foreground font-semibold">
                We're building the future of real-world asset investing—starting from the ground up.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h2 className="font-heading text-4xl md:text-6xl font-semibold text-foreground">
                Own Real-World Yield Assets
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join Umay and start investing in tokenized agriculture projects.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <ChainConnect />
              <button className="px-10 py-4 border border-border bg-background text-foreground text-xl font-semibold rounded-lg hover:bg-card transition-colors flex items-center gap-3">
                👁️ Explore Projects →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card/80 border border-border/50 backdrop-blur-sm">
                <span className="text-primary text-lg">🔒</span>
                <span className="text-sm font-medium text-foreground">On-Chain Escrow</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card/80 border border-border/50 backdrop-blur-sm">
                <span className="text-secondary text-lg">🛡️</span>
                <span className="text-sm font-medium text-foreground">Insurance Options</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card/80 border border-border/50 backdrop-blur-sm">
                <span className="text-accent text-lg">🔍</span>
                <span className="text-sm font-medium text-foreground">RWA Transparency</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card/80 border border-border/50 backdrop-blur-sm">
                <span className="text-chart-4 text-lg">💰</span>
                <span className="text-sm font-medium text-foreground">Secure Yield</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> Umay is a technology platform providing access to
              tokenized agricultural projects. Investments involve risk, including possible loss of capital. Returns are
              not guaranteed. All investors must complete identity verification (KYC/AML).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
