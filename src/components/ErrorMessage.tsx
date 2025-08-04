import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage = ({ message, onRetry, className = '' }: ErrorMessageProps) => {
  return (
    <Alert className={`border-destructive/20 bg-destructive/10 ${className}`}>
      <AlertCircle className="h-4 w-4 text-destructive" />
      <AlertDescription className="text-destructive">
        <div className="flex items-center justify-between">
          <span>{message}</span>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="ml-4 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;