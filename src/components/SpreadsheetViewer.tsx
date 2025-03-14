
import { useState, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import Spreadsheet from 'react-spreadsheet';
import { Button } from '@/components/ui/button';

interface SpreadsheetViewerProps {
  data: Array<any>;
  url?: string
}

const SpreadsheetViewer = ({ data, ...props }: SpreadsheetViewerProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the spreadsheet data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [data]);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <Loader2 className="h-8 w-8 animate-spin text-budget-600" />
          <p>Loading spreadsheet...</p>
        </div>
      </div>
    );
  }

  // Mock spreadsheet rendering - in a real app, you'd use a library like react-spreadsheet
  return (
    <div className="w-full rounded-lg border border-gray-200 overflow-hidden bg-white animate-fadeIn">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium">Your Budget Spreadsheet</h3>
        <a
          download="budget.xlsx"
          href={props.url}
        >
          <Button
            size="sm"
            className="bg-budget-600 hover:bg-budget-700 text-white hover-lift flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Complete File
          </Button>
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <Spreadsheet data={data}/>
      </div>
    </div>
  );
};

export default SpreadsheetViewer;
