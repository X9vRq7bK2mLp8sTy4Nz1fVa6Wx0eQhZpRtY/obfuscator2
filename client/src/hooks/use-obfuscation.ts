import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ObfuscationOptions, ObfuscationResponse } from "@shared/obfuscation-schema";
import { ObfuscationSession, DEFAULT_OBFUSCATION_OPTIONS } from "@/lib/obfuscation-types";
import { useToast } from "@/hooks/use-toast";

export function useObfuscation() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [options, setOptions] = useState<ObfuscationOptions>(DEFAULT_OBFUSCATION_OPTIONS);
  const [statistics, setStatistics] = useState<ObfuscationResponse['statistics'] | null>(null);
  const [history, setHistory] = useState<ObfuscationSession[]>([]);
  const { toast } = useToast();

  const obfuscationMutation = useMutation({
    mutationFn: async ({ code, options }: { code: string; options: ObfuscationOptions }) => {
      const response = await apiRequest("POST", "/api/obfuscate", { code, options });
      return await response.json() as ObfuscationResponse;
    },
    onSuccess: (result) => {
      if (result.success) {
        setOutputCode(result.obfuscatedCode);
        setStatistics(result.statistics);
        
        // Add to history
        const session: ObfuscationSession = {
          id: Date.now().toString(),
          name: generateSessionName(inputCode),
          timestamp: new Date(),
          originalCode: inputCode,
          obfuscatedCode: result.obfuscatedCode,
          options,
          statistics: result.statistics,
        };
        
        setHistory(prev => [session, ...prev.slice(0, 9)]); // Keep last 10 sessions
        
        toast({
          title: "Obfuscation Complete",
          description: `Code protected with ${result.statistics.complexity}% complexity`,
        });
      } else {
        toast({
          title: "Obfuscation Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Network Error",
        description: "Failed to connect to obfuscation service",
        variant: "destructive",
      });
    },
  });

  const obfuscate = useCallback(() => {
    if (!inputCode.trim()) {
      toast({
        title: "No Input Code",
        description: "Please enter some Luau code to obfuscate",
        variant: "destructive",
      });
      return;
    }

    obfuscationMutation.mutate({ code: inputCode, options });
  }, [inputCode, options, obfuscationMutation, toast]);

  const updateOption = useCallback((key: keyof ObfuscationOptions, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  const setPreset = useCallback((preset: "light" | "standard" | "signature") => {
    const { PRESET_CONFIGURATIONS } = require("@/lib/obfuscation-types");
    setOptions(PRESET_CONFIGURATIONS[preset]);
    updateOption("preset", preset);
  }, [updateOption]);

  const clearInput = useCallback(() => {
    setInputCode("");
    setOutputCode("");
    setStatistics(null);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  }, [toast]);

  return {
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
    isProcessing: obfuscationMutation.isPending,
  };
}

function generateSessionName(code: string): string {
  // Extract meaningful name from code
  const functionMatch = code.match(/function\s+(\w+)/);
  const localMatch = code.match(/local\s+(\w+)/);
  
  if (functionMatch) {
    return `${functionMatch[1]} Function`;
  } else if (localMatch) {
    return `${localMatch[1]} Script`;
  } else {
    return "Unnamed Script";
  }
}
