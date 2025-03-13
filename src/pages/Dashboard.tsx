
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  FileText, 
  Download, 
  ExternalLink,
  Trash2,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BudgetItem {
  id: string;
  date: string;
  description: string;
}

const Dashboard = () => {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock fetching budget data
    const fetchBudgets = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockBudgets = [
          {
            id: 'budget-123',
            date: '2023-06-15',
            description: 'Monthly budget with focus on retirement savings'
          },
          {
            id: 'budget-456',
            date: '2023-05-20',
            description: 'Vacation planning budget'
          },
          {
            id: 'budget-789',
            date: '2023-04-10',
            description: 'Emergency fund setup'
          }
        ];
        
        setBudgets(mockBudgets);
      } catch (error) {
        console.error('Error fetching budgets:', error);
        toast({
          title: "Error",
          description: "Failed to load your budgets",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchBudgets();
  }, [toast]);
  
  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
    toast({
      title: "Budget deleted",
      description: "The budget has been deleted successfully"
    });
  };
  
  const handleDownloadBudget = (id: string) => {
    toast({
      title: "Downloading spreadsheet",
      description: "Your budget spreadsheet is being downloaded"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-slideDown">
            <div>
              <h1 className="text-3xl font-bold">Your Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Manage your budgets and financial plans
              </p>
            </div>
            <Button asChild className="mt-4 md:mt-0 bg-budget-600 hover:bg-budget-700 text-white hover-lift">
              <Link to="/budget" className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Budget
              </Link>
            </Button>
          </div>
          
          <div className="relative mb-6 animate-fadeIn">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:ring-budget-500 focus:border-budget-500 input-animation"
              placeholder="Search your budgets..."
            />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-medium">Your Budget Plans</h2>
            </div>
            
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="w-12 h-12 border-4 border-budget-200 border-t-budget-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading your budgets...</p>
              </div>
            ) : budgets.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {budgets.map((budget) => (
                  <div key={budget.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-budget-600 mr-2" />
                          <h3 className="font-medium">{budget.description}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Created on {new Date(budget.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadBudget(budget.id)}
                          className="text-xs flex items-center hover-lift"
                        >
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                          className="text-xs flex items-center hover-lift"
                        >
                          <Link to={`/view-budget/${budget.id}`}>
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteBudget(budget.id)}
                          className="text-xs flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100 hover-lift"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No budgets yet</h3>
                <p className="text-gray-500 mb-4">
                  Create your first budget plan to get started
                </p>
                <Button asChild className="bg-budget-600 hover:bg-budget-700 text-white hover-lift">
                  <Link to="/budget">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Budget
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
