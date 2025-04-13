
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Financial Tracker</CardTitle>
          <CardDescription className="text-center">Your personal finance management solution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Welcome to your financial tracker! This application helps you monitor your expenses,
            track income, and gain insights about your financial habits.
          </p>
          <div className="flex justify-center">
            <Button>Get Started</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
