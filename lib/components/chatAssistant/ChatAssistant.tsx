"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Bot,
    MessageCircle,
    Send,
    X,
    Package,
    Truck,
    Pill,
    CreditCard,
} from "lucide-react";

type Message = {
    role: "user" | "assistant";
    text: string;
};

export default function ChatAssistant() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            text: "👋 Welcome to MediStore!\n\nI'm your AI shopping assistant.\n\nI can help you find medicines, answer product questions, explain shipping, payments and more.",
        },
    ]);

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const quickActions = [
        {
            label: "Find Medicine",
            icon: <Pill size={16} />,
            prompt: "Help me find a medicine",
        },
        {
            label: "Track Order",
            icon: <Package size={16} />,
            prompt: "Track my order",
        },
        {
            label: "Shipping",
            icon: <Truck size={16} />,
            prompt: "Tell me about shipping",
        },
        {
            label: "Payment",
            icon: <CreditCard size={16} />,
            prompt: "Payment methods",
        },
    ];

    // Part 2 will replace this with the Gemini API call.
    const sendMessage = async (text?: string) => {
        const message = text || input;

        if (!message.trim() || loading) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: message,
            },
        ]);

        setInput("");
        setLoading(true);

        try {
            const res = await fetch(
                `/api/ai/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message,
                    }),
                }
            );

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text:
                        data.reply ||
                        "Sorry, I couldn't generate a response.",
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "⚠️ Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}

            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setOpen((prev) => !prev)}
                className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
            >
                {open ? (
                    <X className="mx-auto" />
                ) : (
                    <MessageCircle className="mx-auto" />
                )}
            </motion.button>

            {/* Chat Window */}

            <AnimatePresence>

                {open && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 40,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 30,
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="fixed bottom-24 right-6 z-50 flex h-162.5 w-97.5 max-w-[95vw] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
                    >

                        {/* Header */}

                        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-4 text-white">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                                    <Bot size={22} />
                                </div>

                                <div>

                                    <h2 className="font-semibold text-lg">
                                        MediStore AI
                                    </h2>

                                    <div className="flex items-center gap-2 text-xs">

                                        <span className="h-2 w-2 rounded-full bg-green-400"></span>

                                        <span>Online • Usually replies instantly</span>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Quick Actions */}

                        <div className="grid grid-cols-2 gap-2 border-b p-3">

                            {quickActions.map((item) => (

                                <button
                                    key={item.label}
                                    onClick={() => sendMessage(item.prompt)}
                                    className="flex items-center justify-center gap-2 rounded-xl border p-2 text-sm transition hover:border-blue-500 hover:bg-blue-50"
                                >
                                    {item.icon}

                                    {item.label}

                                </button>

                            ))}

                        </div>

                        {/* Messages */}

                        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">

                            <div className="space-y-4">

                                {messages.map((msg, index) => (

                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className={`flex ${msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >

                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 whitespace-pre-wrap ${msg.role === "user"
                                                ? "bg-blue-600 text-white"
                                                : "bg-white shadow"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>

                                    </motion.div>

                                ))}

                                {loading && (

                                    <div className="flex items-center gap-2">

                                        <div className="rounded-full bg-blue-600 p-2 text-white">
                                            <Bot size={15} />
                                        </div>

                                        <div className="flex gap-1 rounded-full bg-white px-4 py-3 shadow">

                                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>

                                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]"></span>

                                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]"></span>

                                        </div>

                                    </div>

                                )}

                                <div ref={bottomRef} />

                            </div>

                        </div>

                        {/* ---------- PART 2 CONTINUES HERE ---------- */}
                        <div className="border-t bg-white p-3">

                            <div className="mb-2 flex flex-wrap gap-2 text-xs">

                                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                                    💊 Medicines
                                </span>

                                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                                    📦 Orders
                                </span>

                                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                                    🚚 Shipping
                                </span>

                                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                                    💳 Payment
                                </span>

                            </div>

                            <div className="flex items-center gap-2">

                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            sendMessage();
                                        }
                                    }}
                                    placeholder="Ask anything..."
                                    className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => sendMessage()}
                                    disabled={loading}
                                    className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-3 text-white disabled:opacity-50"
                                >
                                    <Send size={20} />
                                </motion.button>

                            </div>

                            <p className="mt-2 text-center text-[11px] text-gray-500">
                                AI can make mistakes. Always consult a doctor for medical advice.
                            </p>

                        </div>

                    </motion.div>
                )}

            </AnimatePresence>

        </>
    );
}