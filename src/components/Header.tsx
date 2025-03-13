
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-semibold"
          >
            <span className="text-gradient">KappaBudgetAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-budget-600"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium transition-colors hover:text-budget-600"
            >
              Features
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-budget-600 hover:bg-budget-700 text-white hover-lift"
                >
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Get Started with KappaBudgetAI</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col sm:flex-row gap-4 py-4">
                  <Button asChild className="bg-budget-600 hover:bg-budget-700 text-white hover-lift w-full">
                    <Link to="/budget" className="flex items-center justify-center">
                      <User className="mr-2 h-4 w-4" />
                      Try as a Guest
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="group hover-lift w-full">
                    <Link to="/register" className="flex items-center justify-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create an Account
                    </Link>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-5 pb-3 space-y-3 animate-slideDown">
            <Link
              to="/"
              className="block py-2 text-sm font-medium transition-colors hover:text-budget-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block py-2 text-sm font-medium transition-colors hover:text-budget-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Button asChild className="w-full bg-budget-600 hover:bg-budget-700 text-white">
                <Link to="/budget" className="flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                  <User className="mr-2 h-4 w-4" />
                  Try as a Guest
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/register" className="flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create an Account
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
