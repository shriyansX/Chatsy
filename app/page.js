import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Zap, Shield, Globe, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-accent/20 to-background overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-whatsapp-green/5 via-transparent to-transparent"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-whatsapp-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-whatsapp-dark-green/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo Animation */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-whatsapp-green/10 rounded-full mb-8 animate-bounce">
              <MessageCircle className="w-12 h-12 text-whatsapp-green" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Connect with 
              <span className="bg-gradient-to-r from-whatsapp-green to-whatsapp-dark-green bg-clip-text text-transparent block">
                Everyone
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience seamless communication with our modern chat platform. Join communities, share ideas, and build connections.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/forums">
                <Button size="lg" className="bg-whatsapp-green hover:bg-whatsapp-dark-green text-white px-8 py-4 text-lg group">
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start Chatting
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/chat">
                <Button size="lg" variant="outline" className="border-whatsapp-green text-whatsapp-green hover:bg-whatsapp-green hover:text-white px-8 py-4 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Browse Communities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Chatsy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern technology and user experience in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-card border border-border rounded-2xl p-8 text-center hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-whatsapp-green/10 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-whatsapp-green" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Real-time Messaging</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience lightning-fast message delivery with our advanced real-time infrastructure. No delays, just instant communication.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-card border border-border rounded-2xl p-8 text-center hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-whatsapp-green/10 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-whatsapp-green" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Secure & Private</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy matters. All conversations are encrypted and secure with enterprise-grade security protocols.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-card border border-border rounded-2xl p-8 text-center hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-whatsapp-green/10 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-whatsapp-green" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Global Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with developers and enthusiasts from around the world. Share knowledge and learn from the best.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-16 bg-whatsapp-green/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-whatsapp-green">15k+</div>
              <div className="text-muted-foreground font-medium">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-whatsapp-green">50k+</div>
              <div className="text-muted-foreground font-medium">Messages Daily</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-whatsapp-green">99.9%</div>
              <div className="text-muted-foreground font-medium">Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-whatsapp-green">24/7</div>
              <div className="text-muted-foreground font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-whatsapp-green to-whatsapp-dark-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying seamless communication on Chatsy.
          </p>
          <Link href="/forums">
            <Button size="lg" variant="secondary" className="bg-white text-whatsapp-green hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Now - It&apos;s Free!
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
} 

export const metadata = {
  title: 'Chatsy - Connect with Everyone',
  description: 'Experience seamless communication with our modern chat platform. Join communities, share ideas, and build connections.',
}
