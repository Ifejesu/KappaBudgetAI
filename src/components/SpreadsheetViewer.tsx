
import { useState, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpreadsheetViewerProps {
  data: any;
  onDownload: () => void;
}

const SpreadsheetViewer = ({ data, onDownload }: SpreadsheetViewerProps) => {
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
        <Button 
          onClick={onDownload}
          size="sm"
          className="bg-budget-600 hover:bg-budget-700 text-white hover-lift flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="bg-green-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Income</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$5,000.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$5,000.00</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rent</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,500.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,500.00</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Utilities</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Groceries</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$200.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Weekly</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$800.00</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Transportation</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$400.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$400.00</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Entertainment</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$300.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$300.00</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Savings</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,000.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,000.00</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Miscellaneous</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500.00</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Remaining</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-budget-600">$0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpreadsheetViewer;
