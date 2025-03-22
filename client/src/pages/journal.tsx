import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Journal } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import JournalEntry from "@/components/journal/journal-entry";
import { formatRelativeTime } from "@/lib/utils";
import { Link } from "wouter";

export default function JournalPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: journals = [], isLoading } = useQuery<Journal[]>({
    queryKey: ["/api/journals"],
    enabled: !!user
  });
  
  // Filter journals based on search query
  const filteredJournals = searchQuery 
    ? journals.filter(journal => 
        journal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        journal.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : journals;
  
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Journal</h1>
          <p className="text-slate-500 dark:text-slate-400">Document your thoughts and feelings</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link href="/journal/new">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input
            type="search"
            placeholder="Search journal entries..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Journal Entries</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredJournals.length > 0 ? (
              <div className="space-y-3">
                {filteredJournals.map((journal) => (
                  <JournalEntry
                    key={journal.id}
                    title={journal.title}
                    content={journal.content}
                    mood={journal.mood || ""}
                    time={formatRelativeTime(journal.timestamp)}
                    onClick={() => window.location.href = `/journal/${journal.id}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                {searchQuery ? (
                  <p>No journal entries match your search</p>
                ) : (
                  <>
                    <p>You haven't created any journal entries yet</p>
                    <p className="mt-2">
                      <Link href="/journal/new">
                        <Button variant="outline" size="sm">Create your first entry</Button>
                      </Link>
                    </p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
