'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FlaskConical, BookOpen, TestTube, GraduationCap, Sparkles, ChevronLeft, Beaker } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { lessons } from '@/lib/lessons-data';

const features = [
  {
    icon: BookOpen,
    title: '8 دروس شاملة',
    description: 'محتوى تعليمي متكامل يغطي كامل منهاج الحموض والقواعد',
    color: 'var(--color-primary)'
  },
  {
    icon: TestTube,
    title: 'محاكاة تفاعلية',
    description: 'تجارب افتراضية تفاعلية لفهم المفاهيم العملية',
    color: 'var(--color-acid)'
  },
  {
    icon: GraduationCap,
    title: 'اختبارات ذاتية',
    description: 'اختبر معلوماتك مع أسئلة متنوعة وشروحات مفصلة',
    color: 'var(--color-base)'
  },
  {
    icon: Sparkles,
    title: 'تصميم عصري',
    description: 'واجهة مستخدم حديثة وسهلة الاستخدام باللغة العربية',
    color: 'var(--color-neutral)'
  }
];

function BubbleBackground() {
  return (
    <div className="bubble-container">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: Math.random() * 60 + 20 + 'px',
            height: Math.random() * 60 + 20 + 'px',
            left: Math.random() * 100 + '%',
            background: i % 3 === 0
              ? 'var(--color-acid)'
              : i % 3 === 1
                ? 'var(--color-base)'
                : 'var(--color-primary)',
            animationDelay: Math.random() * 10 + 's',
            animationDuration: Math.random() * 10 + 15 + 's'
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <BubbleBackground />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-decoration" />
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{ marginBottom: '1.5rem' }}
            >
              <Beaker size={64} style={{ color: 'var(--color-primary)' }} />
            </motion.div>

            <h1>
              <span className="gradient-text">الحموض والقواعد</span>
              <br />
              المنهاج الأردني 2025
            </h1>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>
              اكتشف عالم الكيمياء من خلال دروس تفاعلية ومحاكاة مختبرية
              وتجارب افتراضية تجعل التعلم ممتعاً وفعالاً
            </p>

            <div className="hero-buttons">
              <Link href="/lessons" className="btn btn-primary btn-lg">
                ابدأ التعلم
                <ChevronLeft size={20} />
              </Link>
              <Link href="/simulations" className="btn btn-outline btn-lg">
                جرب المحاكاة
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>لماذا <span className="gradient-text">الكيمياء التفاعلية</span>؟</h2>
            <p>منصة تعليمية متكاملة تجمع بين المحتوى العلمي الدقيق والتجربة التفاعلية</p>
          </div>

          <div className="grid-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 'var(--radius-lg)',
                  background: `${feature.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <feature.icon size={28} style={{ color: feature.color }} />
                </div>
                <h4>{feature.title}</h4>
                <p style={{ marginBottom: 0 }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lessons Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>الدروس <span className="gradient-text-base">التعليمية</span></h2>
            <p>8 دروس شاملة تغطي جميع مواضيع الحموض والقواعد</p>
          </div>

          <div className="grid-2">
            {lessons.slice(0, 4).map((lesson, index) => (
              <motion.div
                key={lesson.id}
                className="glass-card lesson-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="lesson-card-header">
                  <div className="lesson-card-number">{lesson.number}</div>
                  <div>
                    <h3 style={{ marginBottom: '0.25rem' }}>{lesson.title}</h3>
                    <span className={`badge ${lesson.difficulty === 'سهل' ? 'badge-neutral' : lesson.difficulty === 'متوسط' ? 'badge-base' : 'badge-acid'}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                </div>
                <p>{lesson.description}</p>
                <div className="lesson-card-footer">
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    {lesson.duration}
                  </span>
                  <Link href={`/lessons/${lesson.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    ابدأ الدرس
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <Link href="/lessons" className="btn btn-outline btn-lg">
              عرض جميع الدروس
              <ChevronLeft size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* pH Scale Preview */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>مقياس <span className="gradient-text">الرقم الهيدروجيني</span></h2>
            <p>تعرف على مقياس pH وكيفية تحديد حموضة وقاعدية المحاليل</p>
          </div>

          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            <div className="ph-meter">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                <span className="badge badge-acid">حمضي</span>
                <span className="badge badge-neutral">متعادل</span>
                <span className="badge badge-base">قاعدي</span>
              </div>
              <div className="ph-scale-bar" style={{ marginBottom: 'var(--spacing-sm)' }} />
              <div className="ph-labels">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(n => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: 'var(--spacing-xl)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--spacing-md)',
              textAlign: 'center'
            }}>
              <div>
                <FlaskConical size={32} style={{ color: 'var(--color-acid)' }} />
                <p style={{ margin: '0.5rem 0 0', fontWeight: 600 }}>الليمون</p>
                <span style={{ color: 'var(--color-acid)' }}>pH = 2</span>
              </div>
              <div>
                <FlaskConical size={32} style={{ color: 'var(--color-neutral)' }} />
                <p style={{ margin: '0.5rem 0 0', fontWeight: 600 }}>الماء النقي</p>
                <span style={{ color: 'var(--color-neutral)' }}>pH = 7</span>
              </div>
              <div>
                <FlaskConical size={32} style={{ color: 'var(--color-base)' }} />
                <p style={{ margin: '0.5rem 0 0', fontWeight: 600 }}>الصابون</p>
                <span style={{ color: 'var(--color-base)' }}>pH = 10</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
              <Link href="/simulations/ph-scale" className="btn btn-primary">
                جرب محاكاة pH التفاعلية
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
              border: '1px solid var(--color-primary)'
            }}
          >
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>
              🧪 ابدأ رحلتك في عالم الكيمياء
            </h2>
            <p style={{ maxWidth: 600, margin: '0 auto var(--spacing-xl)' }}>
              انطلق في تجربة تعليمية فريدة مع دروس تفاعلية ومحاكاة مختبرية
              تجعل فهم الحموض والقواعد أسهل وأمتع
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/lessons" className="btn btn-primary btn-lg">
                ابدأ التعلم الآن
              </Link>
              <Link href="/quizzes" className="btn btn-outline btn-lg">
                اختبر معلوماتك
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
