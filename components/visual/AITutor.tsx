'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export default function AITutor() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'مرحباً! أنا معلم الكيمياء الذكي. كيف يمكنني مساعدتك في درس اليوم؟', sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simple mock AI response logic
        setTimeout(() => {
            let replyText = "سؤال ممتاز! دعني أشرح لك.";
            const lowerInput = userMsg.text.toLowerCase();

            if (lowerInput.includes('حمض') || lowerInput.includes('acid')) {
                replyText = "الحمض هو مادة تطلق أيونات الهيدروجين (H⁺) في الماء. هل تريد معرفة المزيد عن خصائص الحموض؟";
            } else if (lowerInput.includes('قاعدة') || lowerInput.includes('base')) {
                replyText = "القاعدة هي مادة تستقبل البروتونات أو تطلق أيونات الهيدروكسيد (OH⁻). القواعد لها ملمس صابوني وطعم مر.";
            } else if (lowerInput.includes('ph') || lowerInput.includes('رقم هيدروجيني')) {
                replyText = "الرقم الهيدروجيني pH هو مقياس لحموضة المحلول. من 0-7 حمضي، 7 متعادل، و 7-14 قاعدي.";
            } else if (lowerInput.includes('مرحبا') || lowerInput.includes('هلا')) {
                replyText = "أهلاً بك يا صديقي العالم! هل أنت مستعد لاستكشاف الكيمياء؟";
            } else {
                replyText = "أنا ما زلت أتعلم! لكن يمكنني مساعدتك في مفاهيم الحموض والقواعد، الـ pH، والمعايرة. جرب أن تسألني عنها.";
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: replyText,
                sender: 'ai'
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 height-500 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 flex flex-col"
                        style={{ height: '500px', maxHeight: '80vh' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">المعلم الذكي</h3>
                                    <span className="text-xs text-blue-100 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        متصل الآن
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-600 text-white'}`}>
                                        {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-indigo-600 text-white rounded-tr-none'
                                                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                                        <Bot size={16} />
                                    </div>
                                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="اكتب سؤالك هنا..."
                                    className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-right"
                                    dir="rtl"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/20"
                                >
                                    <Send size={20} className={inputValue.trim() ? 'translate-x-0' : '-translate-x-1 opacity-50'} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.button>
        </>
    );
}
