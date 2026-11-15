import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import AnimatedTextRoller from '@/components/ui/animated-text-04';
import { LearningInvitationCard } from '@/components/ui/learning-invitation-card';
import { TypewriterText } from '@/components/ui/typewriter-text';
import { site, type SiteActivity } from '@/data/site';
import './styles.css';

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

function BrandShapes() {
  return <div className="shapes" aria-hidden="true">
    <svg className="shape" viewBox="0 0 400 400"><circle cx="80" cy="120" r="40" fill="#538BD3" fillOpacity=".4"/><circle cx="300" cy="90" r="60" fill="#A4BFDF" fillOpacity=".3"/><circle cx="200" cy="300" r="80" fill="#981449" fillOpacity=".25"/></svg>
    <svg className="shape" viewBox="0 0 400 400" fill="none"><path d="M0 200 Q100 100 200 200T400 200" stroke="#538BD3" strokeOpacity=".4" strokeWidth="50"/><path d="M0 290 Q100 190 200 290T400 290" stroke="#A4BFDF" strokeOpacity=".3" strokeWidth="34"/></svg>
    <svg className="shape shape-book" viewBox="0 0 400 400" fill="none"><path d="M200 133c-36-24-76-29-128-21v158c49-8 91-3 128 21m0-158c36-24 76-29 128-21v158c-49-8-91-3-128 21m0-158v158" stroke="#A4BFDF" strokeOpacity=".24" strokeWidth="5" strokeLinejoin="round"/><path d="M91 151c30-4 57 0 81 11m-81 24c30-4 57 0 81 11m56-46c30-18 61-23 96-19m-96 43c30-18 61-23 96-19" stroke="#DAD8E9" strokeOpacity=".2" strokeWidth="3" strokeLinecap="round"/><path d="m323 104 5-14m15 23 14-5m-31-17 1-14" stroke="#A4BFDF" strokeOpacity=".28" strokeWidth="3" strokeLinecap="round"/></svg>
  </div>;
}

type NavigationProps = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

function Navigation({ menuOpen, setMenuOpen }: NavigationProps) {
  const contactHref = assetUrl('contact.html');
  const links = [
    { href: '#about', label: site.about.menu },
    { href: '#origin', label: site.origin.label },
    ...site.activities.map((activity) => ({ href: `#${activity.id}`, label: activity.menu })),
    { href: '#join', label: site.join.menu },
    { href: contactHref, label: site.contact.menu },
  ];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setMenuOpen]);

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('#')) {
      setMenuOpen(false);
      return;
    }
    event.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      const target = document.querySelector(href) || document.querySelector('#top');
      target?.scrollIntoView({ behavior: 'smooth' });
    }, menuOpen ? 420 : 0);
  }

  function toggleMenu() {
    setMenuOpen((open) => {
      const next = !open;
      return next;
    });
  }

  return <>
    <div className="top">
      <a className="pill go" href="#top" onClick={(event) => navigate(event, '#top')}>{site.name}</a>
      <button className={`pill menu-btn ${menuOpen ? 'open' : ''}`} type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={toggleMenu}>
        <span>{menuOpen ? site.closeLabel : site.menuLabel}</span><span className="plus" aria-hidden="true" />
      </button>
    </div>
    <div className={`nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
      <button className="overlay" aria-label={site.closeLabel} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} />
      <nav className="menu" id="site-menu" aria-label={site.menuLabel}>
        <div className="layer"/><div className="layer l2"/><div className="layer l3"/><BrandShapes />
        <ul className="menu-list">{links.map((link, index) => <li key={link.href} data-shape={index % 3}><a href={link.href} style={{ '--item': index } as React.CSSProperties} tabIndex={menuOpen ? 0 : -1} onClick={(event) => navigate(event, link.href)}>{link.label}</a></li>)}</ul>
      </nav>
    </div>
  </>;
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="layers" data-layers>
        <div data-layer="1" className="hero-image-layer">
          <img className="bg hero-slide" src={assetUrl(site.hero.image)} alt="" fetchPriority="high" />
        </div>
        <div data-layer="2" className="tint" />
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 26 }, (_, index) => (
            <span
              key={index}
              style={{
                '--particle-x': `${(index * 47 + 9) % 100}%`,
                '--particle-y': `${(index * 31 + 11) % 100}%`,
                '--particle-size': `${index % 7 === 0 ? 4 : index % 3 === 0 ? 3 : 2}px`,
                '--particle-duration': `${11 + (index % 5) * 2}s`,
                '--particle-delay': `${-((index % 9) * 1.1)}s`,
                '--particle-drift-x': `${((index * 7) % 31) - 15}px`,
                '--particle-fall': `${50 + (index % 4) * 12}vh`,
                '--particle-color': index % 4 === 0 ? '#DAD8E9' : '#A4BFDF',
              } as React.CSSProperties}
            />
          ))}
        </div>
        <div data-layer="3" className="hero-title">
          <span className="chip-top">{site.hero.eyebrow}</span>
          <h1 id="h1" className="hero-title-text" data-reserve={site.hero.title}>
            <TypewriterText text={site.hero.title} typingSpeed={82} deletingSpeed={34} holdDuration={2400} restartDelay={320} />
          </h1>
          <p className="sub">{site.hero.subtitle}</p>
          <a className="btn go" href="#activities-intro">
            {site.hero.button}<span className="btn-arrow" aria-hidden="true">↓</span>
          </a>
        </div>
        <div data-layer="4" className="fore" />
      </div>
    </header>
  );
}

function HeroTicker() {
  // Keep multiple complete copies in the track so it always covers wide screens.
  const repeatedItems = Array.from({ length: 6 }, () => site.hero.tickerItems).flat();

  return <div className="hero-ticker" role="group" aria-label={`หัวข้อ: ${site.hero.tickerItems.join(' · ')}`}>
    <span className="hero-ticker-label" aria-hidden="true">HUMAN IS THE SAME</span>
    <div className="hero-ticker-window" aria-hidden="true">
      <div className="hero-ticker-track">{repeatedItems.map((item, index) => <span className={`hero-ticker-item ${index >= site.hero.tickerItems.length ? 'ticker-copy' : ''}`} key={`${item}-${index}`}>{item}</span>)}</div>
    </div>
  </div>;
}

function Activity({ activity, index }: { activity: SiteActivity; index: number }) {
  return <section id={activity.id} className={`act ${index % 2 ? 'flip activity-alt' : ''}`} style={{ '--c': activity.color } as React.CSSProperties} aria-labelledby={`${activity.id}-title`}>
    <div className="wrap grid"><div className="ph reveal"><img src={assetUrl(activity.image)} alt={activity.imageAlt} loading="lazy" /></div>
      <div className="activity-copy reveal"><div className="activity-meta"><span className="tag">{activity.tag}</span></div><h2 id={`${activity.id}-title`}>{activity.title}</h2><p className="activity-description">{activity.text}</p>
        <div className="activity-outcome"><p className="activity-outcome-label">เมื่อจบกิจกรรม ผู้เรียนจะทำได้</p><p>{activity.outcome}</p></div>
        <dl>{activity.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        {activity.topics.length > 0 && <div className="activity-timeline-wrap"><h3 className="activity-timeline-title">ตัวอย่างสิ่งที่สอน</h3><ol className="activity-timeline" aria-label="ตัวอย่างบทเรียนในกิจกรรม">{activity.topics.map((topic) => <li key={topic.title}><span className="activity-timeline-dot" aria-hidden="true" /><div><h4>{topic.title}</h4><p>{topic.description}</p></div></li>)}<li className="activity-timeline-next"><span className="activity-timeline-dot" aria-hidden="true" /><a className="activity-action" href={assetUrl('contact.html')}>สอบถามเรื่องกิจกรรม<span aria-hidden="true">↗</span></a></li></ol></div>}
      </div>
    </div>
  </section>;
}

function ActivitiesIntro() {
  return <section id="activities-intro" className="activities-intro">
    <div className="wrap activities-intro-content reveal">
      <p className="kicker">กิจกรรมของเรา</p>
      <h2 className="marker-heading"><span className="marker-highlight">ความรู้ที่ส่งต่อได้</span><br className="desktop-break" />{' '}<span className="marker-highlight">เริ่มจากเรื่องใกล้ตัว</span></h2>
      <p className="lead">จากบทเรียนพื้นฐานไปจนถึงทักษะอาชีพ ทุกคนมีสิ่งที่แบ่งปันและเรียนรู้ร่วมกันได้</p>
      <div className="activity-summary" aria-label="รูปแบบกิจกรรม">
        <span>ออกแบบตามวัยและบริบทของชุมชน</span>
        <span>ทุกวัย <i aria-hidden="true">·</i> ทุกพื้นที่</span>
      </div>
    </div>
  </section>;
}

const originWritingPath = 'M91 178c42-10 83-3 121 16m-121 7c42-10 83-3 121 16m-121 7c42-10 83-3 121 16m197-62c-42-10-83-3-121 16m121 7c-42-10-83-3-121 16m121 7c-42-10-83-3-121 16';

function OriginIllustration() {
  return <div className="origin-visual" aria-hidden="true">
    <svg viewBox="0 0 500 380" role="presentation">
      <defs>
        <linearGradient id="origin-book-page" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#DAD8E9" />
        </linearGradient>
      </defs>
      <path d="M248 170C190 129 121 120 58 140v164c63-20 132-11 190 30z" fill="#25344f" fillOpacity=".45" transform="translate(0 10)" />
      <path d="M252 170c58-41 127-50 190-30v164c-63-20-132-11-190 30z" fill="#25344f" fillOpacity=".45" transform="translate(0 10)" />
      <g className="origin-book-pages">
        <path d="M250 166c-59-40-128-48-190-28v164c62-20 131-12 190 29z" fill="url(#origin-book-page)" stroke="#A4BFDF" strokeWidth="2" />
        <path d="M250 166c59-40 128-48 190-28v164c-62-20-131-12-190 29z" fill="url(#origin-book-page)" stroke="#A4BFDF" strokeWidth="2" />
        <path d="M250 168v163" fill="none" stroke="#538BD3" strokeOpacity=".6" strokeWidth="2" />
        <path className="origin-writing-line" d={originWritingPath} pathLength="1" fill="none" stroke="#45577D" strokeOpacity=".34" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="M112 126c20 7 42 18 59 33m216-32c-20 7-42 18-59 33" fill="none" stroke="#A4BFDF" strokeOpacity=".65" strokeWidth="1.5" strokeDasharray="4 7" />
      <text className="origin-lesson-mark origin-lesson-left" x="71" y="108" fill="#DAD8E9" fontSize="25" fontWeight="700">ก ข</text>
      <text className="origin-lesson-mark origin-lesson-right" x="365" y="106" fill="#F08DB8" fontSize="27" fontWeight="700">+ − ×</text>
      <path d="M127 90l4 8 8 4-8 4-4 8-4-8-8-4 8-4zM350 288l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#A4BFDF" fillOpacity=".85" />
    </svg>
  </div>;
}

type AboutIconName = 'book' | 'bulb' | 'sprout' | 'people';

function AboutIcon({ name }: { name: AboutIconName }) {
  const iconPaths: Record<AboutIconName, React.ReactNode> = {
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8M8 11h7"/></>,
    bulb: <><path d="M9 18h6M10 21h4M8.2 14.5a6 6 0 1 1 7.6 0c-.8.6-1.3 1.4-1.5 2.5H9.7c-.2-1.1-.7-1.9-1.5-2.5Z"/><path d="M12 1v2M3.5 4.5 5 6M20.5 4.5 19 6"/></>,
    sprout: <><path d="M12 21v-9M12 15c-5 0-8-2.5-8-7 5 0 8 2.2 8 7ZM12 11c0-4 2.8-7 7-7 0 4.5-2.5 7-7 7Z"/><path d="M5 21h14"/></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.5V20"/></>,
  };

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = site.name;
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    const menuItems = [...document.querySelectorAll<HTMLLIElement>('.menu-list li')];
    const shapes = [...document.querySelectorAll('.shape')];
    const menuHandlers = menuItems.map((item) => {
      const shape = shapes[Number(item.dataset.shape)];
      const show = () => shape?.classList.add('is-visible');
      const hide = () => shape?.classList.remove('is-visible');
      item.addEventListener('mouseenter', show);
      item.addEventListener('mouseleave', hide);
      return () => { item.removeEventListener('mouseenter', show); item.removeEventListener('mouseleave', hide); };
    });

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scrollFrame = 0;
    const updateParallax = () => {
      if (motionPreference.matches || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const layers = document.querySelector('[data-layers]');
        const hero = document.querySelector<HTMLElement>('.hero');
        if (!layers || !hero) return;
        const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight));
        ([[1,70],[2,55],[3,40],[4,10]] as [number, number][]).forEach(([layer, distance]) => {
          const element = layers.querySelector<HTMLElement>(`[data-layer="${layer}"]`);
          if (element) element.style.transform = `translate3d(0, ${progress * distance}%, 0)`;
        });
      });
    };
    window.addEventListener('scroll', updateParallax, { passive: true });
    return () => { window.removeEventListener('scroll', updateParallax); revealObserver.disconnect(); menuHandlers.forEach((cleanup) => cleanup()); cancelAnimationFrame(scrollFrame); };
  }, []);

  return <>
    <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
    <HeroTicker />
    <main>
      <section id="about" className="about-section">
        <div className="about-ambient" aria-hidden="true"><img className="about-photo" src={assetUrl('/images/school.jpg')} alt=""/><span className="ambient-orb ambient-orb-blue"/><span className="ambient-orb ambient-orb-red"/><span className="ambient-grain"/></div>
        <div className="wrap reveal about-content"><div className="about-heading"><p className="kicker">{site.about.label}</p><h2><TypewriterText text={site.about.title} /></h2><p className="lead">{site.about.text}</p><AnimatedTextRoller lead="เราเชื่อว่า" phrases={site.about.movingPhrases} /></div>
          <ul className="about-details">{site.about.details.map((detail) => <li key={detail.title}><span className="about-detail-icon"><AboutIcon name={detail.icon} /></span><div><h3>{detail.title}</h3><p>{detail.text}</p></div></li>)}</ul>
        </div>
      </section>
      <section id="origin" className="origin-section">
        <div className="wrap">
          <div className="origin-content reveal">
            <div className="origin-copy"><p className="kicker">{site.origin.label}</p><h2>{site.origin.title}</h2><p>{site.origin.text}</p><a className="origin-link" href="#activities-intro">ดูตัวอย่างกิจกรรม<span aria-hidden="true">↗</span></a></div>
            <OriginIllustration />
          </div>
        </div>
      </section>
      <ActivitiesIntro />
      {site.activities.map((activity, index) => <Activity key={activity.id} activity={activity} index={index} />)}
      <section id="join" className="join-section"><div className="wrap join-card-wrap"><LearningInvitationCard eyebrow={site.name} title={site.join.title} description={site.join.text} actionLabel={site.join.actionLabel} href={assetUrl('contact.html')} quote={site.join.quote} attribution={site.join.attribution} /></div></section>
    </main>
    <footer>{site.footer}</footer>
  </>;
}

const root = document.getElementById('root');
if (!root) throw new Error('App root element was not found.');

createRoot(root).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
);
