import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Clipboard, Trash2, Copy, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CodeEditorProps {
  inputCode: string;
  setInputCode: (code: string) => void;
  outputCode: string;
  isProcessing: boolean;
  onClear: () => void;
  onCopy: (text: string) => void;
}

export function CodeEditor({ 
  inputCode, 
  setInputCode, 
  outputCode, 
  isProcessing, 
  onClear, 
  onCopy 
}: CodeEditorProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputCode(text);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  const handleDownload = () => {
    if (!outputCode) return;
    
    const blob = new Blob([outputCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'obfuscated_script.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-md font-semibold text-foreground">Input Code</h3>
            <Badge variant="secondary" className="text-xs">Luau</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePaste}
              className="w-8 h-8 p-0"
              title="Paste from clipboard"
              data-testid="button-paste"
            >
              <Clipboard className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClear}
              className="w-8 h-8 p-0"
              title="Clear"
              data-testid="button-clear"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="min-h-[300px] font-mono text-sm resize-none"
            placeholder="-- Paste your Luau code here
local function greetPlayer(player)
    print('Hello, ' .. player.Name .. '!')
    return true
end

game.Players.PlayerAdded:Connect(greetPlayer)"
            data-testid="textarea-input"
          />
        </CardContent>
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground">Processing obfuscation...</span>
            </div>
            <Progress value={75} className="mt-3" data-testid="progress-obfuscation" />
          </CardContent>
        </Card>
      )}

      {/* Output Section */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-md font-semibold text-foreground">Obfuscated Output</h3>
            <Badge variant="default" className="text-xs bg-accent text-accent-foreground">Protected</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onCopy(outputCode)}
              className="w-8 h-8 p-0"
              title="Copy to clipboard"
              disabled={!outputCode}
              data-testid="button-copy"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownload}
              className="w-8 h-8 p-0"
              title="Download"
              disabled={!outputCode}
              data-testid="button-download"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={outputCode}
            readOnly
            className="min-h-[300px] font-mono text-sm resize-none"
            placeholder="Obfuscated code will appear here..."
            data-testid="textarea-output"
          />
        </CardContent>
      </Card>
    </div>
  );
}
