import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ObfuscationStatistics } from "@shared/obfuscation-schema";

interface StatisticsPanelProps {
  statistics: ObfuscationStatistics | null;
}

export function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <h3 className="text-md font-semibold text-foreground">Obfuscation Statistics</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary" data-testid="stat-complexity">
              {statistics?.complexity || 0}%
            </div>
            <div className="text-xs text-muted-foreground">Complexity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent" data-testid="stat-protection">
              {statistics?.protection || 0}%
            </div>
            <div className="text-xs text-muted-foreground">Protection</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground" data-testid="stat-size">
              {statistics?.sizeIncrease || 1}x
            </div>
            <div className="text-xs text-muted-foreground">Size Increase</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground" data-testid="stat-time">
              {statistics?.processTime || 0}s
            </div>
            <div className="text-xs text-muted-foreground">Process Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
