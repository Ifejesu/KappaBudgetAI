
import { ArrowRight, Zap, LineChart, Calendar, Lock, Clock, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Zap className="h-5 w-5 text-budget-600" />,
    title: 'AI-Powered Budgeting',
    description: 'Simply describe your financial situation and let our AI create a personalized budget plan for you'
  },
  {
    icon: <LineChart className="h-5 w-5 text-budget-600" />,
    title: 'Financial Insights',
    description: 'Get expert financial advice and personalized recommendations to optimize your spending'
  },
  {
    icon: <Calendar className="h-5 w-5 text-budget-600" />,
    title: 'Downloadable Spreadsheets',
    description: 'Export your budget as a beautifully formatted spreadsheet that you can use anywhere'
  },
  {
    icon: <Lock className="h-5 w-5 text-budget-600" />,
    title: 'Secure & Private',
    description: 'Your financial data never leaves your device unless you choose to save it to your account'
  },
  {
    icon: <Clock className="h-5 w-5 text-budget-600" />,
    title: 'Save Time',
    description: 'Create detailed budgets in seconds instead of hours of manual planning and calculation'
  },
  {
    icon: <Music className="h-5 w-5 text-budget-600" />,
    title: 'Voice Input',
    description: 'Describe your budget needs using voice input for a hands-free experience'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-slideUp">
          <h2 className="text-3xl md:text-4xl font-bold">
            Transform How You Manage Money
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our AI-powered platform makes budgeting simple, accessible, and actually enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-budget-200 animate-slideUp" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-budget-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-slideUp">
          <Button asChild className="bg-budget-600 hover:bg-budget-700 text-white hover-lift">
            <Link to="/budget" className="flex items-center justify-center">
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
