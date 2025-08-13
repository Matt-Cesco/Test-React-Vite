import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ErrorState = () => (
    <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Try again.</AlertDescription>
    </Alert>
);

export default ErrorState;
