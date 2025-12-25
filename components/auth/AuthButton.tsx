"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut, User, Shield } from "lucide-react";
import Link from "next/link";
import { isAdmin } from "@/lib/admin-config";

export default function AuthButton() {
    const { data: session, status } = useSession();
    const userIsAdmin = isAdmin(session?.user?.email);

    if (status === "loading") {
        return (
            <div className="auth-loading">
                <div className="auth-loading-avatar"></div>
                <div className="auth-loading-text"></div>
                <style jsx>{`
                    .auth-loading {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.5rem 1rem;
                        border-radius: 12px;
                        background: rgba(255, 255, 255, 0.1);
                    }
                    .auth-loading-avatar {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.2);
                        animation: pulse 1.5s ease-in-out infinite;
                    }
                    .auth-loading-text {
                        width: 60px;
                        height: 14px;
                        border-radius: 4px;
                        background: rgba(255, 255, 255, 0.2);
                        animation: pulse 1.5s ease-in-out infinite;
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
            </div>
        );
    }

    if (session) {
        return (
            <div className="auth-container">
                {/* Admin Link */}
                {userIsAdmin && (
                    <Link href="/admin" className="admin-link">
                        <Shield size={16} />
                        <span className="admin-link-text">الإدارة</span>
                    </Link>
                )}

                {/* User Info Card */}
                <div className="user-card">
                    <div className="user-avatar-wrapper">
                        {session.user?.image ? (
                            <img
                                src={session.user.image}
                                alt={session.user.name || "User"}
                                className="user-avatar"
                            />
                        ) : (
                            <div className="user-avatar-placeholder">
                                <User size={16} />
                            </div>
                        )}
                        {userIsAdmin && <span className="admin-badge">👑</span>}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{session.user?.name?.split(" ")[0]}</span>
                        {userIsAdmin && <span className="user-role">مشرف</span>}
                    </div>
                </div>

                {/* Logout Button */}
                <button onClick={() => signOut()} className="logout-btn">
                    <LogOut size={16} />
                    <span className="logout-text">خروج</span>
                </button>

                <style jsx>{`
                    .auth-container {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                    }
                    
                    .admin-link {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.5rem 0.875rem;
                        border-radius: 10px;
                        background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
                        border: 1px solid rgba(139, 92, 246, 0.3);
                        color: #a78bfa;
                        font-size: 0.8rem;
                        font-weight: 600;
                        text-decoration: none;
                        transition: all 0.3s ease;
                    }
                    
                    .admin-link:hover {
                        background: linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%);
                        border-color: rgba(139, 92, 246, 0.5);
                        transform: translateY(-1px);
                    }
                    
                    .admin-link-text {
                        display: none;
                    }
                    
                    @media (min-width: 640px) {
                        .admin-link-text {
                            display: inline;
                        }
                    }
                    
                    .user-card {
                        display: flex;
                        align-items: center;
                        gap: 0.625rem;
                        padding: 0.375rem 0.75rem 0.375rem 0.375rem;
                        border-radius: 50px;
                        background: rgba(255, 255, 255, 0.08);
                        border: 1px solid rgba(255, 255, 255, 0.12);
                        backdrop-filter: blur(10px);
                    }
                    
                    .user-avatar-wrapper {
                        position: relative;
                    }
                    
                    .user-avatar {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        border: 2px solid rgba(139, 92, 246, 0.4);
                        object-fit: cover;
                    }
                    
                    .user-avatar-placeholder {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                    }
                    
                    .admin-badge {
                        position: absolute;
                        bottom: -2px;
                        right: -2px;
                        font-size: 10px;
                        line-height: 1;
                    }
                    
                    .user-info {
                        display: none;
                        flex-direction: column;
                        gap: 0;
                        line-height: 1.2;
                    }
                    
                    @media (min-width: 640px) {
                        .user-info {
                            display: flex;
                        }
                    }
                    
                    .user-name {
                        color: white;
                        font-size: 0.8rem;
                        font-weight: 600;
                    }
                    
                    .user-role {
                        color: #a78bfa;
                        font-size: 0.65rem;
                        font-weight: 500;
                    }
                    
                    .logout-btn {
                        display: flex;
                        align-items: center;
                        gap: 0.375rem;
                        padding: 0.5rem 0.75rem;
                        border-radius: 10px;
                        background: rgba(239, 68, 68, 0.1);
                        border: 1px solid rgba(239, 68, 68, 0.25);
                        color: #f87171;
                        font-size: 0.8rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .logout-btn:hover {
                        background: rgba(239, 68, 68, 0.2);
                        border-color: rgba(239, 68, 68, 0.4);
                        transform: translateY(-1px);
                    }
                    
                    .logout-text {
                        display: none;
                    }
                    
                    @media (min-width: 640px) {
                        .logout-text {
                            display: inline;
                        }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <button onClick={() => signIn("google")} className="login-btn">
            <svg className="google-icon" viewBox="0 0 24 24">
                <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
            </svg>
            <span>تسجيل الدخول</span>
            <style jsx>{`
                .login-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.625rem 1rem;
                    border-radius: 12px;
                    background: white;
                    border: none;
                    color: #374151;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                }
                
                .login-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
                
                .google-icon {
                    width: 18px;
                    height: 18px;
                }
            `}</style>
        </button>
    );
}
