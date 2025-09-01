import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Feather, Shield, Skull } from "lucide-react";
import { ObfuscationOptions } from "@shared/obfuscation-schema";
import { useState } from "react";

interface OptionsPanelProps {
  options: ObfuscationOptions;
  updateOption: (key: keyof ObfuscationOptions, value: any) => void;
  setPreset: (preset: "light" | "standard" | "signature") => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function OptionsPanel({ options, updateOption, setPreset, isOpen, onToggle }: OptionsPanelProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <Card className="bg-card border-border">
        <CollapsibleContent>
          <CardContent className="p-4 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Obfuscation Settings</h3>
              <span className="text-sm text-muted-foreground">15+ Advanced Options</span>
            </div>

            {/* Preset Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Obfuscation Preset</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant={options.preset === "light" ? "default" : "secondary"}
                  onClick={() => setPreset("light")}
                  className="flex items-center space-x-2"
                  data-testid="button-preset-light"
                >
                  <Feather className="w-4 h-4" />
                  <span>Light</span>
                </Button>
                <Button
                  variant={options.preset === "standard" ? "default" : "secondary"}
                  onClick={() => setPreset("standard")}
                  className="flex items-center space-x-2"
                  data-testid="button-preset-standard"
                >
                  <Shield className="w-4 h-4" />
                  <span>Standard</span>
                </Button>
                <Button
                  variant={options.preset === "signature" ? "destructive" : "secondary"}
                  onClick={() => setPreset("signature")}
                  className="flex items-center space-x-2"
                  data-testid="button-preset-signature"
                >
                  <Skull className="w-4 h-4" />
                  <span>Signature</span>
                </Button>
              </div>
            </div>

            {/* Variable & Function Protection */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
                Variable & Function Protection
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Variable Name Scrambling</span>
                  <ToggleSwitch
                    checked={options.variableNameScrambling}
                    onCheckedChange={(checked) => updateOption("variableNameScrambling", checked)}
                    data-testid="toggle-variable-scrambling"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Function Wrapping</span>
                  <ToggleSwitch
                    checked={options.functionWrapping}
                    onCheckedChange={(checked) => updateOption("functionWrapping", checked)}
                    data-testid="toggle-function-wrapping"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Indirect Function Calls</span>
                  <ToggleSwitch
                    checked={options.indirectFunctionCalls}
                    onCheckedChange={(checked) => updateOption("indirectFunctionCalls", checked)}
                    data-testid="toggle-indirect-calls"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Custom Name Patterns</span>
                  <ToggleSwitch
                    checked={options.customNamePatterns}
                    onCheckedChange={(checked) => updateOption("customNamePatterns", checked)}
                    data-testid="toggle-name-patterns"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Variable Complexity</label>
                <Slider
                  value={[options.variableComplexity]}
                  onValueChange={([value]) => updateOption("variableComplexity", value)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                  data-testid="slider-variable-complexity"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Simple</span>
                  <span>Complex</span>
                </div>
              </div>
            </div>

            {/* String & Constant Protection */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
                String & Constant Protection
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">String Encryption</span>
                  <ToggleSwitch
                    checked={options.stringEncryption}
                    onCheckedChange={(checked) => updateOption("stringEncryption", checked)}
                    data-testid="toggle-string-encryption"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Base64 Encoding</span>
                  <ToggleSwitch
                    checked={options.base64Encoding}
                    onCheckedChange={(checked) => updateOption("base64Encoding", checked)}
                    data-testid="toggle-base64-encoding"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Hex Encoding</span>
                  <ToggleSwitch
                    checked={options.hexEncoding}
                    onCheckedChange={(checked) => updateOption("hexEncoding", checked)}
                    data-testid="toggle-hex-encoding"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Mathematical Expressions</span>
                  <ToggleSwitch
                    checked={options.mathematicalExpressions}
                    onCheckedChange={(checked) => updateOption("mathematicalExpressions", checked)}
                    data-testid="toggle-math-expressions"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">String Concealment Level</label>
                <Slider
                  value={[options.stringConcealmentLevel]}
                  onValueChange={([value]) => updateOption("stringConcealmentLevel", value)}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                  data-testid="slider-string-concealment"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Basic</span>
                  <span>Advanced</span>
                </div>
              </div>
            </div>

            {/* Control Flow & Structure */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
                Control Flow & Structure
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Dead Code Injection</span>
                  <ToggleSwitch
                    checked={options.deadCodeInjection}
                    onCheckedChange={(checked) => updateOption("deadCodeInjection", checked)}
                    data-testid="toggle-dead-code"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Control Flow Flattening</span>
                  <ToggleSwitch
                    checked={options.controlFlowFlattening}
                    onCheckedChange={(checked) => updateOption("controlFlowFlattening", checked)}
                    data-testid="toggle-control-flow"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Code Splitting</span>
                  <ToggleSwitch
                    checked={options.codeSplitting}
                    onCheckedChange={(checked) => updateOption("codeSplitting", checked)}
                    data-testid="toggle-code-splitting"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Syntax Tree Manipulation</span>
                  <ToggleSwitch
                    checked={options.syntaxTreeManipulation}
                    onCheckedChange={(checked) => updateOption("syntaxTreeManipulation", checked)}
                    data-testid="toggle-syntax-tree"
                  />
                </div>
              </div>
            </div>

            {/* Anti-Analysis Protection */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
                Anti-Analysis Protection
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Anti-Debugging</span>
                  <ToggleSwitch
                    checked={options.antiDebugging}
                    onCheckedChange={(checked) => updateOption("antiDebugging", checked)}
                    data-testid="toggle-anti-debugging"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Dynamic Evaluation</span>
                  <ToggleSwitch
                    checked={options.dynamicEvaluation}
                    onCheckedChange={(checked) => updateOption("dynamicEvaluation", checked)}
                    data-testid="toggle-dynamic-eval"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Watermarking</span>
                  <ToggleSwitch
                    checked={options.watermarking}
                    onCheckedChange={(checked) => updateOption("watermarking", checked)}
                    data-testid="toggle-watermarking"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Signature Embedding</span>
                  <ToggleSwitch
                    checked={options.signatureEmbedding}
                    onCheckedChange={(checked) => updateOption("signatureEmbedding", checked)}
                    data-testid="toggle-signature-embedding"
                  />
                </div>
              </div>
            </div>

            {/* Performance & Compatibility */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
                Performance & Compatibility
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Preserve Comments</span>
                  <ToggleSwitch
                    checked={options.preserveComments}
                    onCheckedChange={(checked) => updateOption("preserveComments", checked)}
                    data-testid="toggle-preserve-comments"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Optimize Performance</span>
                  <ToggleSwitch
                    checked={options.optimizePerformance}
                    onCheckedChange={(checked) => updateOption("optimizePerformance", checked)}
                    data-testid="toggle-optimize-performance"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Processing Intensity</label>
                <Slider
                  value={[options.processingIntensity]}
                  onValueChange={([value]) => updateOption("processingIntensity", value)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                  data-testid="slider-processing-intensity"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Fast</span>
                  <span>Maximum</span>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
