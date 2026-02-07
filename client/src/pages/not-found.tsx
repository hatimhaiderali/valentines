import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto border-2 border-primary/20 shadow-xl bg-white/80 backdrop-blur">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-16 w-16 text-primary animate-bounce" />
          </div>
          
          <h1 className="text-3xl font-display text-foreground mb-4">
            Oh no! 404
          </h1>
          
          <p className="text-muted-foreground mb-8 font-body">
            This page seems to be lost, just like I'd be without you! 💔
          </p>

          <Link href="/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl">
              Return to Love
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
