import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { PRDResponse } from "@/components/chat/PRDResponse";
import { EmptyState } from "@/components/chat/EmptyState";
import { type PRDData } from "@/lib/prdGenerator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  prd?: PRDData;
}

export default function Generate() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSubmit = async (idea: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: idea,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-prd", {
        body: { idea, advancedMode },
      });

      if (error) {
        console.error("Error generating PRD:", error);
        toast.error(error.message || "Failed to generate PRD");
        setIsGenerating(false);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        setIsGenerating(false);
        return;
      }

      if (data?.prd) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: "Here's your PRD based on your idea:",
          prd: data.prd,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        toast.success("PRD generated successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSubmit(suggestion);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />

      <main className="flex flex-1 flex-col overflow-hidden pt-16">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl">
            {messages.length === 0 && !isGenerating ? (
              <EmptyState onSuggestionClick={handleSuggestionClick} />
            ) : (
              <div className="divide-y divide-border">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      type={message.type}
                      content={
                        message.prd ? (
                          <PRDResponse prd={message.prd} />
                        ) : (
                          <p>{message.content}</p>
                        )
                      }
                    />
                  ))}
                </AnimatePresence>

                {isGenerating && (
                  <ChatMessage type="assistant" content="" isLoading />
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <ChatInput
          onSubmit={handleSubmit}
          isLoading={isGenerating}
          advancedMode={advancedMode}
          onAdvancedModeChange={setAdvancedMode}
        />
      </main>
    </div>
  );
}
