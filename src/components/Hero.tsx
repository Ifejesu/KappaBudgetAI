
import { ArrowRight, UserPlus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-lg animate-slideUp">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-budget-100 text-budget-800 mb-4 animate-pulse">
                Smart Budgeting Made Simple
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Transform Your Finance With <span className="text-gradient">AI-Powered</span> Budget Plans
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Describe your finances, and let our AI create a personalized budget plan with tailored financial advice in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-budget-600 hover:bg-budget-700 text-white hover-lift">
                <Link to="/budget" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Try as a Guest
                </Link>
              </Button>
              <Button asChild variant="outline" className="group hover-lift">
                <Link to="/register" className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create an Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-slideUp">
            <div className="premium-card hover-lift animate-float">
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-budget-500 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-budget-300 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80" 
                alt="Budget Dashboard Preview" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
