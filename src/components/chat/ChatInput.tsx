import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  advancedMode: boolean;
  onAdvancedModeChange: (value: boolean) => void;
}

export function ChatInput({
  onSubmit,
  isLoading,
  advancedMode,
  onAdvancedModeChange,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSubmit(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-lg transition-shadow focus-within:shadow-xl">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl text-muted-foreground hover:text-foreground"
              >
                <Settings2 className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64">
              <div className="flex items-center justify-between">
                <Label htmlFor="advanced-mode" className="cursor-pointer">
                  Advanced Dev PRD
                </Label>
                <Switch
                  id="advanced-mode"
                  checked={advancedMode}
                  onCheckedChange={onAdvancedModeChange}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Includes more technical details and implementation specifics.
              </p>
            </PopoverContent>
          </Popover>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your app idea..."
            rows={1}
            className="max-h-[200px] min-h-[44px] flex-1 resize-none border-0 bg-transparent px-2 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0"
            disabled={isLoading}
          />

          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={!message.trim() || isLoading}
            className="h-10 w-10 shrink-0 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
          >
            {isLoading ? (
              <Sparkles className="h-4 w-4 animate-pulse" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          VibeSpecs generates PRDs optimized for AI coding tools like Cursor & Replit
        </p>
      </div>
    </motion.div>
  );
}
