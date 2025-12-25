import Link from 'next/link';
import { FlaskConical, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link href="/" className="navbar-logo" style={{ marginBottom: '0.5rem' }}>
                            <FlaskConical />
                            <span>الكيمياء التفاعلية</span>
                        </Link>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
                            موقع تعليمي لمادة الحموض والقواعد - المنهاج الأردني 2025
                        </p>
                    </div>

                    <ul className="footer-links">
                        <li><Link href="/lessons">الدروس</Link></li>
                        <li><Link href="/simulations">المحاكاة</Link></li>
                        <li><Link href="/quizzes">الاختبارات</Link></li>
                        <li><Link href="/glossary">المصطلحات</Link></li>
                    </ul>
                </div>

                <div style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    صُنع بـ <Heart size={16} style={{ color: 'var(--color-acid)' }} /> لطلاب الأردن 2025
                </div>
            </div>
        </footer>
    );
}
