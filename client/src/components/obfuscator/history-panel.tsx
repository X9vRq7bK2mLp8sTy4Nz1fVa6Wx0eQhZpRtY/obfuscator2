import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileCode } from "lucide-react";
import { ObfuscationSession } from "@/lib/obfuscation-types";
import { formatDistanceToNow } from "date-fns";

interface HistoryPanelProps {
  history: ObfuscationSession[];
  onClearHistory: () => void;
  onLoadSession: (session: ObfuscationSession) => void;
}

export function HistoryPanel({ history, onClearHistory, onLoadSession }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <h3 className="text-md font-semibold text-foreground">Recent Sessions</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileCode className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No recent sessions</p>
            <p className="text-xs text-muted-foreground mt-1">Start obfuscating code to see history</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <h3 className="text-md font-semibold text-foreground">Recent Sessions</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="text-primary hover:text-primary/80"
          data-testid="button-clear-history"
        >
          Clear History
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 bg-secondary rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <FileCode className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground" data-testid={`text-session-name-${session.id}`}>
                    {session.name}
                  </div>
                  <div className="text-xs text-muted-foreground" data-testid={`text-session-time-${session.id}`}>
                    {formatDistanceToNow(session.timestamp, { addSuffix: true })}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLoadSession(session)}
                className="w-8 h-8 p-0 hover:bg-accent"
                data-testid={`button-load-session-${session.id}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
