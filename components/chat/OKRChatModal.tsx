"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Target,
  Zap,
  Users,
  MessageSquare,
  Star,
  AlertTriangle,
} from "lucide-react";

interface ChatItem {
  id: string;
  title: string;
  type: "objective" | "keyresult";
}

interface OKRChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeChatItem: ChatItem | null;
}

export default function OKRChatModal({
  isOpen,
  onClose,
  activeChatItem,
}: OKRChatModalProps) {
  const [chatMessage, setChatMessage] = useState("");

  const participants = [
    {
      name: "Sarah Johnson",
      role: "Branch Manager",
      avatar: "SJ",
      color: "bg-[#00adef]",
      isOnline: false,
    },
    {
      name: "Mike Davis",
      role: "Team Lead",
      avatar: "MD",
      color: "bg-green-500",
      isOnline: true,
    },
    {
      name: "Emily Chen",
      role: "Analyst",
      avatar: "EC",
      color: "bg-purple-500",
      isOnline: false,
    },
    {
      name: "John Smith",
      role: "Manager",
      avatar: "JS",
      color: "bg-orange-500",
      isOnline: false,
    },
  ];

  const messages = [
    {
      id: "1",
      author: "Sarah Johnson",
      role: "Branch Manager",
      avatar: "SJ",
      color: "bg-[#00adef]",
      timestamp: "2h ago",
      content:
        "Great progress on this objective! The digital transformation is really picking up momentum.",
      reactions: [{ emoji: "👍", count: 2 }],
    },
    {
      id: "2",
      author: "System",
      role: "System",
      avatar: "SY",
      color: "bg-slate-400",
      timestamp: "1h ago",
      content:
        "Progress updated: Digital Banking Platform deployment reached 85%",
      isSystem: true,
    },
    {
      id: "3",
      author: "Mike Davis",
      role: "Team Lead",
      avatar: "MD",
      color: "bg-green-500",
      timestamp: "52m ago",
      content:
        "I've completed the staff training module. All team members are now certified on the new platform! 🎉",
      reactions: [{ emoji: "🎉", count: 3 }],
      isSuccess: true,
    },
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle send message logic here
      setChatMessage("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[1200px] !max-w-[95vw] max-h-[95vh] overflow-hidden">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {activeChatItem?.type === "objective" ? (
                <Target className="w-6 h-6 text-[#e48525]" />
              ) : (
                <Zap className="w-6 h-6 text-[#00adef]" />
              )}
              <div>
                <DialogTitle className="text-lg">
                  Discussion: {activeChatItem?.title || "Team Communication"}
                </DialogTitle>
                <p className="text-xs text-slate-600">
                  {participants.length} participants • {messages.length}{" "}
                  messages
                </p>
              </div>
            </div>
            <Badge
              className={`${
                activeChatItem?.type === "objective"
                  ? "bg-[#e48525]/10 text-[#e48525] border-[#e48525]/20"
                  : "bg-[#00adef]/10 text-[#00adef] border-[#00adef]/20"
              } px-4 py-2 text-sm`}
            >
              {activeChatItem?.type === "objective"
                ? "Objective"
                : "Key Result"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex h-[750px]">
          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback
                      className={`${message.color} text-white text-sm`}
                    >
                      {message.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-slate-900">
                        {message.author}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {message.role}
                      </Badge>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        {message.author === "Mike Davis" && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                        {message.timestamp}
                      </span>
                    </div>

                    {message.isSystem ? (
                      <div className="bg-[#00adef]/10 border border-[#00adef]/20 rounded-lg p-4">
                        <p className="text-slate-700">{message.content}</p>
                      </div>
                    ) : message.isSuccess ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-slate-700">{message.content}</p>
                      </div>
                    ) : (
                      <p className="text-slate-700">{message.content}</p>
                    )}

                    {message.reactions && (
                      <div className="flex items-center gap-2 mt-3">
                        {message.reactions.map((reaction, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-sm hover:bg-slate-100"
                          >
                            {reaction.emoji} {reaction.count}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-slate-500">Quick reactions:</span>
                <div className="flex items-center gap-2">
                  {["👍", "🎉", "❤️", "🚀", "💡", "✅"].map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-slate-100 text-base"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="pr-32 h-12 text-base"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-base"
                    >
                      📎
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-base"
                    >
                      😊
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-base"
                    >
                      @
                    </Button>
                  </div>
                </div>
                <Button
                  className="bg-[#00adef] hover:bg-[#0099d4] text-white h-12 px-6"
                  onClick={handleSendMessage}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l bg-slate-50 flex flex-col">
            {/* Participants */}
            <div className="p-6 border-b">
              <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Participants ({participants.length})
              </h3>
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div
                    key={participant.name}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback
                        className={`${participant.color} text-white text-sm`}
                      >
                        {participant.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {participant.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {participant.role}
                      </p>
                    </div>
                    {participant.isOnline && (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-6">
              <h3 className="font-medium text-slate-900 mb-4">Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm h-12 hover:bg-white"
                >
                  <Star className="w-5 h-5 mr-3" />
                  Pin Message
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm h-12 hover:bg-white"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Create Thread
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm h-12 hover:bg-white"
                >
                  <AlertTriangle className="w-5 h-5 mr-3" />
                  Report Issue
                </Button>
              </div>
            </div>

            {/* OKR Context */}
            <div className="p-6 border-t bg-white">
              <h3 className="font-medium text-slate-900 mb-4">OKR Context</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {activeChatItem?.type === "objective" ? (
                      <Target className="w-4 h-4 text-[#e48525]" />
                    ) : (
                      <Zap className="w-4 h-4 text-[#00adef]" />
                    )}
                    <span className="text-sm font-medium">Progress</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900 mb-1">
                    78%
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-[#00adef] h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Due Date</div>
                  <div className="font-medium text-slate-900">Dec 31, 2024</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Priority</div>
                  <Badge className="bg-red-100 text-red-800">Critical</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
