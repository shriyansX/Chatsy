import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Zap, Shield, Globe, ArrowRight, Sparkles, Smartphone, Fingerprint } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-whatsapp-green/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        {/* Dynamic Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-whatsapp-green/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[100%] h-[20%] rounded-full bg-whatsapp-dark-green/5 blur-[100px]"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
          
          <div className="inline-flex items-center space-x-2 bg-card border border-border/50 rounded-full px-4 py-2 mb-8 shadow-sm backdrop-blur-xl animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-whatsapp-green" />
            <span className="text-sm font-medium text-foreground/80">The Next Generation of Chat is Here</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tight mb-8 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Materialize Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-whatsapp-green via-[#20d489] to-blue-500">
              Conversations.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '200ms' }}>
            Experience ultra-fast, beautifully designed, and deeply integrated real-time messaging powered by Next.js 15. Your ideas, now moving at the speed of thought.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link href="/forums" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold shadow-2xl shadow-foreground/20 group">
                <MessageCircle className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Launch App
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Link href="/chat" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold border-border/50 bg-card/50 backdrop-blur-md hover:bg-card hover:border-whatsapp-green/50 hover:shadow-[0_0_2rem_-0.5rem_#00a884] transition-all duration-500 group">
                <Globe className="w-5 h-5 mr-3 text-muted-foreground group-hover:text-whatsapp-green transition-colors" />
                Explore Communities
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating App Preview */}
        <div className="container mx-auto px-4 mt-24 relative z-10 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="relative max-w-5xl mx-auto rounded-[2.5rem] border border-border/40 bg-card/40 backdrop-blur-3xl shadow-2xl shadow-whatsapp-green/10 p-2 overflow-hidden transform perspective-1000 rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] pointer-events-none"></div>
            <div className="rounded-[2rem] bg-background border border-border/50 overflow-hidden shadow-inner h-[400px] md:h-[600px] flex flex-col">
              {/* App Header Mock */}
              <div className="h-16 border-b border-border/50 flex items-center px-6 bg-card/50 backdrop-blur-md">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto w-48 h-6 bg-muted rounded-full"></div>
              </div>
              {/* App Body Mock */}
              <div className="flex-1 flex bg-whatsapp-bg/30 relative overflow-hidden">
                <div className="w-64 border-r border-border/50 hidden md:block p-4 space-y-4">
                  <div className="h-12 bg-card rounded-2xl border border-border/50"></div>
                  <div className="h-12 bg-card rounded-2xl border border-border/50"></div>
                  <div className="h-12 bg-whatsapp-green/10 rounded-2xl border border-whatsapp-green/20"></div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-end space-y-4">
                  <div className="self-start max-w-[70%] p-4 rounded-2xl rounded-tl-sm bg-card border border-border/50 shadow-sm backdrop-blur-md">
                    <div className="w-48 h-4 bg-muted rounded mb-2"></div>
                    <div className="w-32 h-4 bg-muted/60 rounded"></div>
                  </div>
                  <div className="self-end max-w-[70%] p-4 rounded-2xl rounded-tr-sm bg-whatsapp-green text-white shadow-lg shadow-whatsapp-green/20">
                    <div className="w-56 h-4 bg-white/80 rounded mb-2"></div>
                    <div className="w-40 h-4 bg-white/60 rounded"></div>
                  </div>
                  <div className="h-14 mt-4 bg-card rounded-full border border-border/50 flex items-center px-4">
                    <div className="flex-1 h-6 bg-muted/30 rounded-full"></div>
                    <div className="w-8 h-8 rounded-full bg-whatsapp-green ml-4 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bento Grid Features Section */}
      <section className="py-32 bg-background relative z-20 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Designed for the Future.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We reimagined chat from the ground up, utilizing material design principles and state-of-the-art web tech.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Card */}
            <div className="md:col-span-2 group relative overflow-hidden bg-card/30 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 hover:border-whatsapp-green/50 hover:bg-card/50 transition-all duration-500 hover:shadow-2xl hover:shadow-whatsapp-green/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform">
                <Zap className="w-48 h-48 text-whatsapp-green" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="w-16 h-16 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner backdrop-blur-md">
                  <Zap className="w-8 h-8 text-whatsapp-green" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Lightning Fast Sync</h3>
                <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                  Powered by Stream Chat, messages are delivered in milliseconds. No loading states, just pure instantaneous connection.
                </p>
              </div>
            </div>

            {/* Medium Card */}
            <div className="group relative overflow-hidden bg-gradient-to-b from-card/30 to-background backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Bank-grade Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Clerk authentication ensures your identity is verified and protected securely at all times.
              </p>
            </div>

            {/* Medium Card 2 */}
            <div className="group relative overflow-hidden bg-gradient-to-tr from-card/30 to-background backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Smartphone className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Responsive & Fluid</h3>
              <p className="text-muted-foreground leading-relaxed">
                A seamless materialistic experience across desktop, tablet, and mobile devices.
              </p>
            </div>

            {/* Large Card 2 */}
            <div className="md:col-span-2 group relative overflow-hidden bg-card/30 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 hover:border-whatsapp-green/50 hover:bg-card/50 transition-all duration-500 hover:shadow-2xl hover:shadow-whatsapp-green/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:-rotate-12 transform">
                <Fingerprint className="w-48 h-48 text-whatsapp-green" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="w-16 h-16 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner backdrop-blur-md">
                  <Fingerprint className="w-8 h-8 text-whatsapp-green" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Personalized Identity</h3>
                <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                  Rich profiles, custom avatars, and dedicated communities let you express exactly who you are to the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-whatsapp-green/10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-card/50 backdrop-blur-2xl border border-border/50 rounded-3xl mb-8 shadow-2xl">
            <MessageCircle className="w-12 h-12 text-whatsapp-green" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            Stop Waiting.<br/>Start Talking.
          </h2>
          <Link href="/forums">
            <Button size="lg" className="bg-whatsapp-green hover:bg-[#20d489] text-white px-10 py-8 text-xl rounded-full font-bold shadow-2xl shadow-whatsapp-green/30 hover:shadow-whatsapp-green/50 hover:scale-105 transition-all duration-300">
              Join the Network Free
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
} 

export const metadata = {
  title: 'Chatsy - Next-Gen Material Chat',
  description: 'A deeply integrated real-time messaging platform with modern material design.',
}
