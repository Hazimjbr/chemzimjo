"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import AchievementToast from "@/components/ui/AchievementToast";
import Confetti from "@/components/ui/Confetti";
import ServiceWorkerRegistration from "@/components/pwa/ServiceWorkerRegistration";
import InstallPrompt from "@/components/pwa/InstallPrompt";

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
                    <ServiceWorkerRegistration />
                    <InstallPrompt />
                </GamificationProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
