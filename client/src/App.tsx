import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Layout from "@/components/layout/layout";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import MoodTracker from "@/pages/mood-tracker";
import NewMood from "@/pages/new-mood";
import Journal from "@/pages/journal";
import TherapyTools from "@/pages/therapy-tools";
import AICompanion from "@/pages/ai-companion";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Layout>
      <Switch>
        <ProtectedRoute path="/" component={Dashboard} />
        <ProtectedRoute path="/mood-tracker" component={MoodTracker} />
        <ProtectedRoute path="/mood-tracker/new" component={NewMood} />
        <ProtectedRoute path="/journal" component={Journal} />
        <ProtectedRoute path="/therapy-tools" component={TherapyTools} />
        <ProtectedRoute path="/ai-companion" component={AICompanion} />
        <ProtectedRoute path="/settings" component={Settings} />
        <Route path="/auth" component={AuthPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
