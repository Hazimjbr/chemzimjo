'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, StopCircle, Pause, Play, AlertCircle } from 'lucide-react';

interface Props {
    text: string;
    title?: string;
}

export default function TextToSpeech({ text, title }: Props) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [hasArabicVoice, setHasArabicVoice] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setIsSupported(true);

            // Load voices
            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);

                // Check for Arabic voice
                const arabicVoice = availableVoices.find(v =>
                    v.lang.includes('ar') ||
                    v.name.includes('Arabic') ||
                    v.name.includes('العربية')
                );
                setHasArabicVoice(!!arabicVoice);
            };

            loadVoices();

            // Voices might load async
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        }
    }, []);

    const getArabicVoice = (): SpeechSynthesisVoice | undefined => {
        // Priority order for Arabic voices
        const arabicVoice = voices.find(v => v.lang === 'ar-SA') ||
            voices.find(v => v.lang === 'ar-EG') ||
            voices.find(v => v.lang.startsWith('ar')) ||
            voices.find(v => v.name.includes('Arabic'));
        return arabicVoice;
    };

    const handlePlay = () => {
        if (!isSupported) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsSpeaking(true);
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsSpeaking(false);
            return;
        }

        // Cancel any existing speech
        window.speechSynthesis.cancel();

        const fullText = title ? `${title}. ${text}` : text;
        const utterance = new SpeechSynthesisUtterance(fullText);

        // Try to select an Arabic voice
        const arabicVoice = getArabicVoice();
        if (arabicVoice) {
            utterance.voice = arabicVoice;
            utterance.lang = arabicVoice.lang;
        } else {
            utterance.lang = 'ar-SA';
        }

        utterance.rate = 0.85; // Slower for clarity
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        utterance.onerror = (e) => {
            console.error('Speech error:', e);
            setIsSpeaking(false);
            setIsPaused(false);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const handleStop = () => {
        if (!isSupported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    if (!isSupported) return null;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.75rem',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '20px',
            width: 'fit-content'
        }}>
            <button
                onClick={handlePlay}
                style={{
                    padding: '0.5rem',
                    borderRadius: '50%',
                    background: isSpeaking ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8b5cf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                }}
                title={isSpeaking ? "إيقاف مؤقت" : "استمع للدرس"}
            >
                {isSpeaking ? <Pause size={20} /> : <Volume2 size={20} />}
            </button>

            {!hasArabicVoice && (
                <span style={{
                    fontSize: '0.7rem',
                    color: 'var(--color-warning)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    <AlertCircle size={12} />
                    لا يتوفر صوت عربي
                </span>
            )}

            {(isSpeaking || isPaused) && (
                <button
                    onClick={handleStop}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '50%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="إيقاف القراءة"
                >
                    <StopCircle size={20} />
                </button>
            )}
        </div>
    );
}
