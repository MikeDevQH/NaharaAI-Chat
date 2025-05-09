"use client";

import type React from "react";
import type { Message } from "@/types/chat";
import ChatMessage from "./chat-message";
import { WelcomeGuide } from "./welcome-guide";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({
  messages,
  isLoading,
  messagesEndRef,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const iconAI = (
    <img
      src="/NaharaAI.png"
      alt="Logo Nahara AI"
      className="w-7 h-7 rounded-full"
    />
  );

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, messagesEndRef]);

  const showMessages = messages.length > 0;

  return (
    <div
      ref={containerRef}
      className={`h-full space-y-4 md:space-y-6 scrollbar-custom transition-all duration-300 ${
        showMessages
          ? "overflow-auto p-2 md:px-2 md:py-4 pt-24 md:pt-28 pb-16"
          : "overflow-hidden p-0"
      }`}
    >
      {showMessages ? (
        messages.map((message, index) => (
          <ChatMessage key={message.id} message={message} index={index} />
        ))
      ) : (
        <div className="flex h-full p-6 items-center justify-center">
          <WelcomeGuide />
        </div>
      )}

      {isLoading && (
        <motion.div
          className="flex items-start gap-3 mx-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-blue-900 text-blue-300 border-blue-800 shadow-sm">
            {iconAI}
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              <div className="h-4 w-1/2 animate-pulse rounded bg-blue-900"></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reference point for auto-scroll */}
      <div ref={messagesEndRef} />
    </div>
  );
}
