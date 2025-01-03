import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Github, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          Welcome to <span className="text-primary">RepoBot AI</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
          Your intelligent companion for repository management and team
          collaboration
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/sign-in">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<Bot className="h-8 w-8" />}
          title="AI-Powered Analysis"
          description="Intelligent code analysis and suggestions to improve your repository"
        />
        <FeatureCard
          icon={<Github className="h-8 w-8" />}
          title="GitHub Integration"
          description="Seamless connection with your GitHub repositories"
        />
        <FeatureCard
          icon={<MessageSquare className="h-8 w-8" />}
          title="Team Collaboration"
          description="Enhanced communication and project management tools"
        />
      </div>
    </main>
  );
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="rounded-lg border p-6 transition-all hover:shadow-lg">
    <div className="text-primary">{icon}</div>
    <h2 className="mt-4 text-xl font-semibold">{title}</h2>
    <p className="mt-2 text-muted-foreground">{description}</p>
  </div>
);
