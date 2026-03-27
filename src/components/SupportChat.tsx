"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Loader2, Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Message = { role: 'user' | 'assistant'; content: string };

const LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'العربية', flag: '🇸🇴' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  zh: { name: '中文', flag: '🇨🇳' },
};

export const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const greetingMessage: Message = { 
        role: 'assistant', 
        content: 'Hi, How can I help you? If you need to speak with a human agent, just let me know!' 
      };
      setMessages([greetingMessage]);
      setHasGreeted(true);
      setShowGreetingBubble(false);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    // Show greeting bubble after 1 second on page load
    const timer = setTimeout(() => {
      setShowGreetingBubble(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const redirectToWhatsApp = () => {
    const phoneNumber = '16784961792'; // +1 (678) 496-1792
    const message = encodeURIComponent('Hello, I need assistance from a human agent.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Check if user wants human support
    const humanKeywords = ['human', 'agent', 'person', 'representative', 'talk to someone', 'speak to human', 'real person'];
    const userInput = input.trim().toLowerCase();
    const wantsHuman = humanKeywords.some(keyword => userInput.includes(keyword));

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // If user wants human support, show WhatsApp redirect
    if (wantsHuman) {
      setIsLoading(false);
      setTimeout(() => {
        const humanResponse: Message = {
          role: 'assistant',
          content: 'I understand you\'d like to speak with a human agent. Click the button below to connect with us on WhatsApp!'
        };
        setMessages(prev => [...prev, humanResponse]);
      }, 500);
      return;
    }
    
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content:
          "Thanks for your message. Tap the button below to chat with us on WhatsApp—we'll get back to you there.",
      },
    ]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Greeting Bubble - Mobile Responsive */}
      {showGreetingBubble && !isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-28 z-50 animate-fade-in">
          <div className="relative">
            <div className="bg-card border-2 border-accent/30 rounded-2xl p-3 sm:p-4 shadow-2xl max-w-[240px] sm:max-w-[280px]">
              <button 
                onClick={() => setShowGreetingBubble(false)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted hover:bg-accent/20 flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-xs sm:text-sm mb-1">Hi, How can I help you?</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Click the chat button to start</p>
                </div>
              </div>
            </div>
            {/* Arrow pointing to chat button */}
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-card border-r-2 border-b-2 border-accent/30 transform rotate-45 -translate-y-1/2"></div>
          </div>
        </div>
      )}

      {/* Enhanced Chat Toggle Button - Mobile Responsive */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-center gap-2">
        {!isOpen && (
          <div className="animate-bounce">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/50 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          </div>
        )}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-2xl bg-gradient-to-br from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-primary transition-all duration-300 hover:scale-110 group overflow-hidden"
          size="icon"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Icon */}
          <div className="relative z-10">
            {isOpen ? (
              <X className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:rotate-90" />
            ) : (
              <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110" />
            )}
          </div>
          
          {/* Notification dot */}
          {!isOpen && messages.length === 0 && (
            <div className="absolute top-1 right-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </div>
          )}
        </Button>
      </div>

      {/* Enhanced Chat Window - Mobile Responsive */}
      {isOpen && (
        <Card className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 z-40 w-[calc(100vw-1rem)] sm:w-[400px] max-w-[400px] h-[500px] sm:h-[550px] flex flex-col shadow-2xl border-2 border-accent/30 overflow-hidden animate-scale-in bg-card backdrop-blur-xl">
          {/* Enhanced Header with Language Selector */}
          <div className="relative bg-gradient-to-r from-primary via-primary/95 to-primary/90 p-5 border-b border-accent/20 overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
                animation: 'gridMove 20s linear infinite'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-6 h-6 text-primary animate-pulse" style={{ animationDuration: '2s' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Support Chat</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <p className="text-xs text-white/70">Online • Ready to help</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/70" />
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-8 bg-white/10 border-white/20 text-white text-xs hover:bg-white/20 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(LANGUAGES).map(([code, { name, flag }]) => (
                      <SelectItem key={code} value={code}>
                        <span className="flex items-center gap-2">
                          <span>{flag}</span>
                          <span>{name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Enhanced Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-background to-background-secondary">
            {messages.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto animate-pulse">
                  <MessageCircle className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">👋 {language === 'ar' ? 'مرحبا! كيف يمكننا مساعدتك اليوم؟' : language === 'es' ? '¡Hola! ¿Cómo podemos ayudarte hoy?' : language === 'fr' ? 'Bonjour! Comment pouvons-nous vous aider aujourd\'hui?' : language === 'zh' ? '您好！我们今天能为您做些什么？' : 'Hello! How can we help you today?'}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'اسأل عن خدماتنا أو منتجاتنا أو حلولنا' : language === 'es' ? 'Pregunta sobre nuestros servicios, productos o soluciones' : language === 'fr' ? 'Posez des questions sur nos services, produits ou solutions' : language === 'zh' ? '询问我们的服务、产品或解决方案' : 'Ask about our services, products, or solutions'}
                  </p>
                </div>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md transition-all duration-200 hover:shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-accent to-accent-hover text-primary'
                        : 'bg-card border border-border text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
                
                {/* WhatsApp Button for Human Support */}
                {msg.role === 'assistant' && /button below/i.test(msg.content) && (
                  <div className="flex justify-start mt-2 animate-fade-in">
                    <Button
                      onClick={redirectToWhatsApp}
                      className="bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center gap-2 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Connect on WhatsApp
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-2xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="border-t border-border p-4 bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-accent hover:bg-accent-hover text-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Messages are answered by our team on WhatsApp
            </p>
          </div>
        </Card>
      )}
    </>
  );
};
