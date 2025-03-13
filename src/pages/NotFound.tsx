
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center animate-fadeIn">
        <div>
          <h1 className="text-6xl md:text-9xl font-extrabold text-budget-600">404</h1>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">Page not found</h2>
          <p className="mt-2 text-gray-500">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="mt-8">
          <Button asChild className="bg-budget-600 hover:bg-budget-700 text-white hover-lift">
            <Link to="/" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
