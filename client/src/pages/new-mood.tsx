import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertMood, insertMoodSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";

// Extended schema with stricter validation
const moodFormSchema = insertMoodSchema.extend({
  mood: insertMoodSchema.shape.mood,
  stress: insertMoodSchema.shape.stress.default(null),
  sleep: insertMoodSchema.shape.sleep.default(null),
  sleepDuration: insertMoodSchema.shape.sleepDuration.default(null),
  notes: insertMoodSchema.shape.notes.default(null)
});

type MoodFormValues = InsertMood;

export default function NewMood() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<MoodFormValues>({
    resolver: zodResolver(moodFormSchema),
    defaultValues: {
      mood: "Okay",
      stress: "Medium",
      sleep: "Fair",
      sleepDuration: null,
      notes: null
    }
  });
  
  const createMoodMutation = useMutation({
    mutationFn: async (data: MoodFormValues) => {
      const response = await apiRequest("POST", "/api/moods", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mood tracked successfully",
        description: "Your mood entry has been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/moods"] });
      navigate("/mood-tracker");
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to track mood",
        description: error.message,
        variant: "destructive",
      });
      setSubmitting(false);
    }
  });
  
  function onSubmit(data: MoodFormValues) {
    setSubmitting(true);
    createMoodMutation.mutate(data);
  }
  
  // Auth check is handled by ProtectedRoute, so we don't need to check again
  
  return (
    <>
      <div className="flex items-center mb-6">
        <Link href="/mood-tracker" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-bold">Track New Mood</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Record how you're feeling right now
          </p>
        </div>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Mood Entry</CardTitle>
          <CardDescription>
            Tracking your mood regularly can help you identify patterns and triggers.
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How are you feeling?</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your mood" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Great">Great 😄</SelectItem>
                        <SelectItem value="Good">Good 🙂</SelectItem>
                        <SelectItem value="Okay">Okay 😐</SelectItem>
                        <SelectItem value="Bad">Bad 😔</SelectItem>
                        <SelectItem value="Terrible">Terrible 😢</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stress Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your stress level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sleep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Quality</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sleep quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                          <SelectItem value="Terrible">Terrible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sleepDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 7 hours"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes about how you're feeling..."
                        className="min-h-[120px]"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Link href="/mood-tracker">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Mood Entry"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}