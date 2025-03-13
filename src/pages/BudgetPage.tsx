
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BudgetForm from '@/components/BudgetForm';
import SpreadsheetViewer from '@/components/SpreadsheetViewer';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BudgetPage = () => {
  const [loading, setLoading] = useState(false);
  const [adviceData, setAdviceData] = useState<any>(null);
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);
  const { toast } = useToast();

  // Mocked financial advice text
  const mockAdvice = `Based on your income of $5,000 and expenses, you're allocating 30% to housing which is within the recommended range. However, your entertainment expenses are slightly high at 6% of your income. Consider reducing this to 5% to increase your savings rate.

I recommend setting up an emergency fund with 3-6 months of expenses if you haven't already. With your current saving rate, you could reach this goal in about 8 months.

For your vacation savings goal, allocating $200-300 monthly would allow you to save $2,400-3,600 annually without straining your budget.

For retirement, try to contribute at least 15% of your income, including any employer match. This will help ensure financial security in your later years.`;

  const handleSubmitBudget = async (budget: string, isVoice: boolean) => {
    setLoading(true);
    setShowSpreadsheet(false);
    setAdviceData(null);

    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      setAdviceData({
        id: 'budget-123',
        advice: mockAdvice
      });
      
      toast({
        title: "Financial advice generated!",
        description: isVoice 
          ? "Your voice input has been analyzed successfully." 
          : "Your budget details have been analyzed successfully."
      });
    } catch (error) {
      console.error('Error generating budget:', error);
      toast({
        title: "Failed to generate advice",
        description: "There was an error processing your request.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSpreadsheet = () => {
    toast({
      title: "Downloading spreadsheet",
      description: "Your budget spreadsheet is being downloaded."
    });
    
    // In a real app, this would trigger a download
    // For demo purposes, we'll just show the spreadsheet viewer
    setShowSpreadsheet(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 animate-slideDown">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Personalized Budget</h1>
            <p className="text-lg text-gray-600">
              Describe your financial situation, income, expenses, and goals. Our AI will generate a personalized budget plan and provide financial advice.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {showSpreadsheet ? (
              <Tabs defaultValue="spreadsheet" className="w-full animate-fadeIn">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="spreadsheet">Spreadsheet</TabsTrigger>
                  <TabsTrigger value="advice">Financial Advice</TabsTrigger>
                </TabsList>
                <TabsContent value="spreadsheet">
                  <SpreadsheetViewer data={adviceData} onDownload={handleDownloadSpreadsheet} />
                </TabsContent>
                <TabsContent value="advice">
                  <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Your Financial Advice</h3>
                    <div className="text-gray-700 space-y-3 whitespace-pre-line">
                      {adviceData?.advice}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <BudgetForm
                onSubmit={handleSubmitBudget}
                loading={loading}
                adviceData={adviceData}
                onDownloadSpreadsheet={adviceData ? handleDownloadSpreadsheet : undefined}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BudgetPage;
