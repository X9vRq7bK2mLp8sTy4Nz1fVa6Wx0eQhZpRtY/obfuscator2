import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Shield, Wand2, Play } from "lucide-react";
import { CodeEditor } from "@/components/obfuscator/code-editor";
import { OptionsPanel } from "@/components/obfuscator/options-panel";
import { StatisticsPanel } from "@/components/obfuscator/statistics-panel";
import { HistoryPanel } from "@/components/obfuscator/history-panel";
import { useObfuscation } from "@/hooks/use-obfuscation";
import { PRESET_CONFIGURATIONS } from "@/lib/obfuscation-types";

export default function Home() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const {
    inputCode,
    setInputCode,
    outputCode,
    options,
    updateOption,
    setPreset,
    statistics,
    history,
    obfuscate,
    clearInput,
    copyToClipboard,
    isProcessing,
  } = useObfuscation();

  const handleClearHistory = () => {
    // In a real app, this would clear history from storage
  };

  const handleLoadSession = (session: any) => {
    setInputCode(session.originalCode);
    // Load session options
    Object.entries(session.options).forEach(([key, value]) => {
      updateOption(key as any, value);
    });
  };

  const quickObfuscate = () => {
    setPreset("standard");
    obfuscate();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Luau Obfuscator Pro</h1>
                <p className="text-xs text-muted-foreground">Advanced Code Protection</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-10 h-10 p-0"
              data-testid="button-settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6 pb-24">
        
        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={quickObfuscate}
                disabled={!inputCode.trim() || isProcessing}
                className="flex-1 min-w-0 bg-primary text-primary-foreground flex items-center justify-center space-x-2"
                data-testid="button-quick-obfuscate"
              >
                <Wand2 className="w-4 h-4" />
                <span>Quick Obfuscate</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => setOptionsOpen(!optionsOpen)}
                className="flex-1 min-w-0 flex items-center justify-center space-x-2"
                data-testid="button-toggle-options"
              >
                <Settings className="w-4 h-4" />
                <span>Advanced Options</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <OptionsPanel
          options={options}
          updateOption={updateOption}
          setPreset={setPreset}
          isOpen={optionsOpen}
          onToggle={() => setOptionsOpen(!optionsOpen)}
        />

        {/* Code Editor */}
        <CodeEditor
          inputCode={inputCode}
          setInputCode={setInputCode}
          outputCode={outputCode}
          isProcessing={isProcessing}
          onClear={clearInput}
          onCopy={copyToClipboard}
        />

        {/* Statistics */}
        <StatisticsPanel statistics={statistics} />

        {/* History */}
        <HistoryPanel
          history={history}
          onClearHistory={handleClearHistory}
          onLoadSession={handleLoadSession}
        />
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={obfuscate}
          disabled={!inputCode.trim() || isProcessing}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-105 transition-transform p-0"
          data-testid="button-obfuscate-float"
        >
          <Play className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
