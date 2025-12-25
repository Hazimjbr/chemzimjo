'use client';

import { useState, useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';

export default function LessonNotes({ lessonId }: { lessonId: string }) {
    const [note, setNote] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedNote = localStorage.getItem(`lesson-note-${lessonId}`);
        if (savedNote) setNote(savedNote);
    }, [lessonId]);

    const handleSave = () => {
        localStorage.setItem(`lesson-note-${lessonId}`, note);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleClear = () => {
        if (confirm('هل أنت متأكد من مسح الملاحظات؟')) {
            setNote('');
            localStorage.removeItem(`lesson-note-${lessonId}`);
        }
    };

    return (
        <div>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="اكتب ملاحظاتك هنا..."
                style={{
                    width: '100%',
                    minHeight: '150px',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'inherit',
                    marginBottom: '1rem',
                    resize: 'vertical'
                }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={handleSave}
                    className="btn btn-primary"
                    disabled={!note}
                >
                    <Save size={18} />
                    {saved ? 'تم الحفظ!' : 'حفظ الملاحظات'}
                </button>
                {note && (
                    <button onClick={handleClear} className="btn btn-outline" style={{ borderColor: 'var(--color-acid)', color: 'var(--color-acid)' }}>
                        <Trash2 size={18} />
                        مسح
                    </button>
                )}
            </div>
        </div>
    );
}
