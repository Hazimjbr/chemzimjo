"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import AchievementToast from "@/components/ui/AchievementToast";
import Confetti from "@/components/ui/Confetti";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <GamificationProvider>
                    {children}
                    <AchievementToast />
                    <Confetti />
                </GamificationProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
