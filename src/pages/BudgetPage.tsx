
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BudgetForm from '@/components/BudgetForm';
import SpreadsheetViewer from '@/components/SpreadsheetViewer';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBudget } from '@/hooks/use-budget';

const BudgetPage = () => {
  const [loading, setLoading] = useState(false);
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);
  const { toast } = useToast();
  const {downloadBudgetSpreadsheet, getBudgetAdvice, setAdvice, advice, downloadUrl, sheetData, setSheetData, setDownloadUrl} = useBudget();
  const [prompt, setPrompt] = useState('');

  const handleSubmitBudget = async (budget: string, isVoice: boolean) => {
    setLoading(true);
    setShowSpreadsheet(false);
    setAdvice(null);
    setPrompt(budget);
    setDownloadUrl('');
    setSheetData([]);
    try {
      await getBudgetAdvice(budget);
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

  const handleDownloadSpreadsheet = async () => {
    toast({
      title: "Downloading spreadsheet",
      description: "Your budget spreadsheet is being downloaded."
    });
    try{
      setLoading(true);
      await downloadBudgetSpreadsheet(prompt);
      setShowSpreadsheet(true);
    }catch(error){
      console.error('Error downloading spreadsheet:', error);
      toast({
        title: "Failed to download spreadsheet",
        description: "There was an error downloading the spreadsheet.",
        variant: "destructive"
      });
    }finally{
      setLoading(false);
    }
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
                  <SpreadsheetViewer data={sheetData} url={downloadUrl} />
                </TabsContent>
                <TabsContent value="advice">
                  <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Your Financial Advice</h3>
                    <div className="text-gray-700 space-y-3 whitespace-pre-line" dangerouslySetInnerHTML={{__html: advice?.advice}}></div>
                  </div>
                  <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100 mt-5">
                    <h3 className="text-lg font-semibold mb-4">Your Budget Summary</h3>
                    <div className="text-gray-700 space-y-3 whitespace-pre-line" dangerouslySetInnerHTML={{__html: advice?.budgetSummary}}></div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <BudgetForm
                onSubmit={handleSubmitBudget}
                loading={loading}
                adviceData={advice}
                onDownloadSpreadsheet={advice ? handleDownloadSpreadsheet : undefined}
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
