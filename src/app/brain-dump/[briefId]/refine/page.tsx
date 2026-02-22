"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Lock, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { ProductBrief, ChatMessage } from "@/lib/types";

export default function RefinementPage({ params }: { params: Promise<{ briefId: string }> }) {
  const { briefId } = use(params);
  const router = useRouter();
  const [brief, setBrief] = useState<ProductBrief | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBrief();
  }, [briefId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchBrief = async () => {
    try {
      const res = await fetch(`/api/briefs/${briefId}`);
      const data = await res.json();
      setBrief(data.brief);
      setMessages(data.brief.chat_history || []);
      setLoading(false);

      // If no chat history, send initial message
      if (!data.brief.chat_history || data.brief.chat_history.length === 0) {
        sendMessage("Hi, I'd like to refine my product brief.", true);
      }
    } catch {
      toast.error("Failed to load brief");
      setLoading(false);
    }
  };

  const sendMessage = async (text: string, isInitial = false) => {
    if (!text.trim() || streaming) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    if (!isInitial) {
      setMessages((prev) => [...prev, userMessage]);
    }
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ briefId, message: text }),
      });

      if (!res.ok) throw new Error("Refinement failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let fullResponse = "";

      // Add placeholder assistant message
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, ...(isInitial ? [userMessage] : []), assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullResponse += chunk;

        // Update last message
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: fullResponse.replace(/<brief_update>[\s\S]*?<\/brief_update>/g, "").trim(),
          };
          return updated;
        });
      }

      // Refresh brief data
      const briefRes = await fetch(`/api/briefs/${briefId}`);
      const briefData = await briefRes.json();
      setBrief(briefData.brief);
    } catch {
      toast.error("Failed to get AI response");
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  };

  const handleLockBrief = async () => {
    try {
      await fetch(`/api/briefs/${briefId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "locked" }),
      });
      toast.success("Brief locked! Finding manufacturers...");
      router.push(`/matching/${briefId}`);
    } catch {
      toast.error("Failed to lock brief");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#757170]" />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[#156cc2] text-white"
                      : "bg-white text-[#453f3d] border border-[#e5dfda] shadow-sm"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <Sparkles className="mb-1 h-4 w-4 text-[#156cc2]" />
                  )}
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
              </div>
            ))}

            {streaming && messages[messages.length - 1]?.content === "" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-[#e5dfda] bg-white px-4 py-3 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-[#156cc2]" />
                  <span className="text-sm text-[#757170]">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Bar */}
        <div className="border-t border-[#e5dfda] bg-white p-4">
          <div className="mx-auto flex max-w-2xl gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              placeholder="Type your response..."
              disabled={streaming}
              className="border-[#e5dfda] bg-[#f9f8f8] text-[#1a1615] placeholder:text-[#757170]"
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={streaming || !input.trim()}
              size="icon"
              className="bg-[#156cc2] hover:bg-[#156cc2]/90"
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleLockBrief}
              variant="outline"
              className="gap-2 border-[#0ea158]/30 text-[#0ea158] hover:bg-[#0ea158]/10"
            >
              <Lock className="h-4 w-4" />
              Lock & Match
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Brief State */}
      <div className="hidden w-80 overflow-y-auto border-l border-[#e5dfda] bg-white p-4 lg:block">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#757170]">
          Current Brief
        </h3>

        {brief && (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#757170]">Title</p>
              <p className="text-sm font-medium text-[#1a1615]">{brief.title || "—"}</p>
            </div>

            <div>
              <p className="text-xs text-[#757170]">Category</p>
              <Badge variant="secondary" className="bg-[#f4f1ee] text-xs">
                {brief.category?.replace(/_/g, " ") || "—"}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-[#757170]">Description</p>
              <p className="text-xs text-[#453f3d]">{brief.description || "—"}</p>
            </div>

            {brief.specifications && Object.keys(brief.specifications).length > 0 && (
              <Card className="border-[#e5dfda] bg-[#f9f8f8] p-3">
                <p className="mb-2 text-xs font-semibold text-[#757170]">Specifications</p>
                {Object.entries(brief.specifications).map(([key, value]) => (
                  <div key={key} className="mb-1">
                    <span className="text-xs text-[#757170]">{key}: </span>
                    <span className="text-xs text-[#453f3d]">
                      {Array.isArray(value) ? value.join(", ") : String(value)}
                    </span>
                  </div>
                ))}
              </Card>
            )}

            <div>
              <p className="text-xs text-[#757170]">Estimated Cost</p>
              <p className="text-sm font-medium text-[#1a1615]">
                {brief.estimated_unit_cost_min && brief.estimated_unit_cost_max
                  ? `$${brief.estimated_unit_cost_min} – $${brief.estimated_unit_cost_max}`
                  : "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#757170]">Suggested MOQ</p>
              <p className="text-sm font-medium text-[#1a1615]">
                {brief.estimated_moq ? `${brief.estimated_moq} units` : "—"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
