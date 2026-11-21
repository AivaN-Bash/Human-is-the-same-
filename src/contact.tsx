import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { site } from '@/data/site';
import './styles.css';

const homeUrl = import.meta.env.BASE_URL;

function ContactPage() {
  const [mailDraftOpened, setMailDraftOpened] = useState(false);

  useEffect(() => {
    document.title = `ติดต่อเรา | ${site.name}`;
  }, []);

  function prepareEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get('name') ?? '').trim();
    const replyEmail = String(values.get('replyEmail') ?? '').trim();
    const topic = String(values.get('topic') ?? '').trim();
    const message = String(values.get('message') ?? '').trim();
    const subject = `เว็บไซต์ Human is the same: ${topic}`;
    const body = [
      `ชื่อ: ${name}`,
      `อีเมลสำหรับตอบกลับ: ${replyEmail}`,
      `หัวข้อ: ${topic}`,
      '',
      message,
    ].join('\n');

    setMailDraftOpened(true);
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return <div className="contact-page">
    <header className="contact-page-header">
      <a className="contact-brand" href={homeUrl} aria-label={`${site.name} — กลับหน้าแรก`}>
        <span className="contact-brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7.2C9.6 5.7 6.8 5.4 3.5 6v12c3.3-.6 6.1-.3 8.5 1.2m0-12c2.4-1.5 5.2-1.8 8.5-1.2v12c-3.3-.6-6.1-.3-8.5 1.2m0-12v12"/></svg>
        </span>
        <span>{site.name}</span>
      </a>
      <a className="contact-back" href={homeUrl}><span aria-hidden="true">←</span> กลับหน้าแรก</a>
    </header>

    <main className="contact-page-main">
      <div className="contact-page-content">
        <section className="wrap contact-layout">
          <div className="contact-copy contact-copy-enter">
            <p className="kicker">{site.contact.label}</p>
            <h1>{site.contact.title}</h1>
            <p className="contact-description">{site.contact.text}</p>
            <a className="contact-email" href={`mailto:${site.contact.email}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
              <span>{site.contact.email}</span>
              <span className="contact-email-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <form className="contact-form contact-form-enter" onSubmit={prepareEmail}>
            <div className="contact-fields">
              <label className="contact-field" htmlFor="contact-name">
                <span>ชื่อ</span>
                <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} placeholder="ชื่อของคุณ" required />
              </label>
              <label className="contact-field" htmlFor="contact-email">
                <span>อีเมลสำหรับตอบกลับ</span>
                <input id="contact-email" name="replyEmail" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required />
              </label>
              <label className="contact-field contact-field-wide" htmlFor="contact-topic">
                <span>หัวข้อ</span>
                <select id="contact-topic" name="topic" defaultValue="สอบถามกิจกรรม">
                  <option>สอบถามกิจกรรม</option>
                  <option>โครงการไม่แก่เกินเรียน</option>
                  <option>โครงการความรู้คู่อาชีพ</option>
                  <option>ร่วมเป็นอาสาสมัคร</option>
                  <option>ข้อเสนอแนะ</option>
                  <option>อื่น ๆ</option>
                </select>
              </label>
              <label className="contact-field contact-field-wide" htmlFor="contact-message">
                <span>ข้อความ</span>
                <textarea id="contact-message" name="message" rows={4} maxLength={2000} placeholder="พิมพ์ข้อความที่ต้องการส่ง" required />
              </label>
            </div>
            <div className="contact-form-footer">
              <p className="contact-form-note">ระบบจะเปิดแอปอีเมลพร้อมร่างข้อความ โปรดตรวจสอบแล้วกดส่งในแอป</p>
              <button className="contact-submit" type="submit">เปิดอีเมลเพื่อส่ง<span aria-hidden="true">↗</span></button>
            </div>
            <p className="contact-status" role="status" aria-live="polite">{mailDraftOpened ? 'หากแอปอีเมลไม่เปิด ส่งข้อความตรงถึงอีเมลที่แสดงไว้ได้เลย' : ''}</p>
          </form>
        </section>
      </div>
    </main>
    <footer>{site.footer}</footer>
  </div>;
}

const root = document.getElementById('root');
if (!root) throw new Error('Contact page root was not found.');

createRoot(root).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <ContactPage />
    </MotionConfig>
  </React.StrictMode>,
);
