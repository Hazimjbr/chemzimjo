'use client';

import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
    className?: string;
}

export default function YouTubeEmbed({ videoId, title = 'فيديو تعليمي', className = '' }: YouTubeEmbedProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

    if (!isLoaded) {
        return (
            <div
                className={`youtube-container ${className}`}
                onClick={() => setIsLoaded(true)}
            >
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="youtube-thumbnail"
                />
                <div className="youtube-overlay">
                    <button className="youtube-play-btn">
                        <Play size={32} fill="white" />
                    </button>
                    <p className="youtube-title">{title}</p>
                </div>
                <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-external"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ExternalLink size={16} />
                </a>
                <style jsx>{`
                    .youtube-container {
                        position: relative;
                        width: 100%;
                        aspect-ratio: 16 / 9;
                        border-radius: 12px;
                        overflow: hidden;
                        cursor: pointer;
                        background: var(--color-bg-tertiary);
                    }
                    
                    .youtube-thumbnail {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.3s;
                    }
                    
                    .youtube-container:hover .youtube-thumbnail {
                        transform: scale(1.05);
                    }
                    
                    .youtube-overlay {
                        position: absolute;
                        inset: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: rgba(0, 0, 0, 0.4);
                        transition: background 0.3s;
                    }
                    
                    .youtube-container:hover .youtube-overlay {
                        background: rgba(0, 0, 0, 0.3);
                    }
                    
                    .youtube-play-btn {
                        width: 72px;
                        height: 72px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                        border: none;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-right: 4px;
                        cursor: pointer;
                        transition: transform 0.3s, box-shadow 0.3s;
                        box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
                    }
                    
                    .youtube-container:hover .youtube-play-btn {
                        transform: scale(1.1);
                        box-shadow: 0 6px 30px rgba(239, 68, 68, 0.6);
                    }
                    
                    .youtube-title {
                        margin-top: 1rem;
                        color: white;
                        font-weight: 600;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                    }
                    
                    .youtube-external {
                        position: absolute;
                        top: 12px;
                        left: 12px;
                        padding: 8px;
                        background: rgba(0, 0, 0, 0.6);
                        border-radius: 8px;
                        color: white;
                        transition: background 0.2s;
                    }
                    
                    .youtube-external:hover {
                        background: rgba(0, 0, 0, 0.8);
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className={`youtube-container ${className}`}>
            <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-iframe"
            />
            <style jsx>{`
                .youtube-container {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    border-radius: 12px;
                    overflow: hidden;
                }
                
                .youtube-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            `}</style>
        </div>
    );
}
