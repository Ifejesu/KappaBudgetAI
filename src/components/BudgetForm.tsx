
import { useState, useRef } from 'react';
import { Mic, Loader2, Send, StopCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BudgetFormProps {
  isAuthenticated?: boolean;
  onSubmit: (budget: string, isVoice: boolean) => Promise<void>;
  loading: boolean;
  adviceData?: any;
  onDownloadSpreadsheet?: () => void;
}

const BudgetForm = ({ 
  isAuthenticated = false, 
  onSubmit, 
  loading, 
  adviceData, 
  onDownloadSpreadsheet 
}: BudgetFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        
        // Here you would normally send the audio to a speech-to-text service
        // For demo purposes, we'll just set a placeholder transcript
        setTimeout(() => {
          const demoTranscript = "I earn $5,000 monthly with fixed expenses of $2,000 for rent and utilities. I spend about $800 on groceries, $400 on transportation, and $300 on entertainment. I'm looking to save for a vacation and retirement.";
          setTranscript(demoTranscript);
          setPrompt(demoTranscript);
          toast({
            title: "Voice captured!",
            description: "Your voice input has been transcribed. Review and submit."
          });
        }, 1500);
        
        // Release the microphone
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak clearly about your income, expenses, and financial goals."
      });
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive"
      });
    }
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your financial situation.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await onSubmit(prompt, !!transcript);
    } catch (error) {
      console.error('Error submitting budget:', error);
      toast({
        title: "Error",
        description: "Failed to process your budget. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="premium-card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="budget-input" className="block text-sm font-medium text-gray-700">
              Describe your financial situation
            </label>
            <Textarea
              id="budget-input"
              placeholder="Include your income, expenses, financial goals, and concerns..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full min-h-[150px] rounded-lg border-gray-300 shadow-sm focus:border-budget-500 focus:ring focus:ring-budget-500 focus:ring-opacity-50 input-animation"
              disabled={loading || isRecording}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`flex items-center gap-2 hover-lift ${isRecording ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
              disabled={loading}
            >
              {isRecording ? (
                <>
                  <StopCircle className="h-4 w-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Voice Input
                </>
              )}
            </Button>
            
            <Button
              type="submit"
              className="bg-budget-600 hover:bg-budget-700 text-white flex-1 hover-lift flex items-center justify-center gap-2"
              disabled={loading || !prompt.trim() || isRecording}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Generate Budget Plan
                </>
              )}
            </Button>
          </div>
        </form>

        {adviceData && (
          <div className="mt-8 space-y-4 animate-fadeIn">
            <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Financial Advice</h3>
              <div className="text-gray-700 space-y-2">
                {adviceData.advice}
              </div>
            </div>
            
            {onDownloadSpreadsheet && (
              <Button 
                onClick={onDownloadSpreadsheet}
                className="w-full bg-budget-600 hover:bg-budget-700 text-white hover-lift flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Budget Spreadsheet
              </Button>
            )}
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500 flex items-start gap-2">
          <div className="min-w-[20px] text-budget-600 mt-0.5">ℹ️</div>
          <div>
            {isAuthenticated ? (
              "Your budget plans are saved to your account. You can access them anytime from your dashboard."
            ) : (
              "You're using the app as a guest. To save your budget plans and access more features, consider creating an account."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetForm;
