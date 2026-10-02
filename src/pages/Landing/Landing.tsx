import React, { useEffect, useRef, useState } from 'react';
import './Landing.css';

const TOTAL_FRAMES = 292;
const MAX_CONCURRENT = 8;

export const Landing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const howItWorksOverlayRef = useRef<HTMLDivElement | null>(null);
  const liveResponseOverlayRef = useRef<HTMLDivElement | null>(null);
  const finalLandingOverlayRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);

  const [activeMapMode, setActiveMapMode] = useState<'map' | 'satellite'>('map');

  useEffect(() => {
    window.scrollTo(0, 0);

    let isMounted = true;
    let animId: number | null = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Generate frame paths: /landing-frames/ezgif-frame-001.jpg -> ezgif-frame-292.jpg
    const frameFilenames: string[] = [];
    const frames: (HTMLImageElement | null)[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const padded = String(i).padStart(3, '0');
      frameFilenames.push(`/landing-frames/ezgif-frame-${padded}.jpg`);
      frames.push(null);
    }

    let currentProgress = 0;
    let targetProgress = 0;

    const loadImage = (index: number, onComplete?: (img: HTMLImageElement | null) => void) => {
      if (frames[index] && frames[index]?.complete && (frames[index]?.naturalWidth ?? 0) > 0) {
        if (onComplete) onComplete(frames[index]);
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (!isMounted) return;
        frames[index] = img;
        if (onComplete) onComplete(img);
      };
      img.onerror = () => {
        if (!isMounted) return;
        if (onComplete) onComplete(null);
      };
      img.src = frameFilenames[index];
    };

    const renderFrame = (frameIndex: number) => {
      if (!ctx || !canvas) return;

      const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));

      let img = frames[safeIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < 50; offset++) {
          const prev = frames[safeIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = frames[safeIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const imgW = img.naturalWidth || 1920;
      const imgH = img.naturalHeight || 1080;

      const imgAspect = imgW / imgH;
      const canvasAspect = cw / ch;

      let drawW: number;
      let drawH: number;
      let offsetX: number;
      let offsetY: number;

      if (canvasAspect > imgAspect) {
        drawW = cw;
        drawH = cw / imgAspect;
        offsetX = 0;
        offsetY = (ch - drawH) / 2;
      } else {
        drawH = ch;
        drawW = ch * imgAspect;
        offsetX = (cw - drawW) / 2;
        offsetY = 0;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const frameIndex = Math.round(currentProgress * (TOTAL_FRAMES - 1));
      renderFrame(frameIndex);
    };

    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        targetProgress = 0;
        return;
      }
      const rawProgress = window.scrollY / maxScroll;
      targetProgress = Math.max(0, Math.min(1, rawProgress));
    };

    const preloadAllSequenceFrames = () => {
      loadImage(0, (img0) => {
        if (!isMounted) return;
        if (img0) {
          renderFrame(0);
        }

        let queueIndex = 1;
        let activeCount = 0;

        const processQueue = () => {
          if (!isMounted) return;
          while (activeCount < MAX_CONCURRENT && queueIndex < TOTAL_FRAMES) {
            const idx = queueIndex++;
            activeCount++;
            loadImage(idx, () => {
              activeCount--;
              if (!isMounted) return;
              const activeFrameIndex = Math.round(currentProgress * (TOTAL_FRAMES - 1));
              if (activeFrameIndex === idx) {
                renderFrame(activeFrameIndex);
              }
              processQueue();
            });
          }
        };

        processQueue();
      });
    };

    const animate = () => {
      if (!isMounted) return;

      const ease = 0.15;
      const diff = targetProgress - currentProgress;

      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * ease;
      } else {
        currentProgress = targetProgress;
      }

      const frameIndex = Math.round(currentProgress * (TOTAL_FRAMES - 1));
      renderFrame(frameIndex);

      // 1. Hero Overlay: Visible for Frame 001 -> Frame 039 (frameIndex 0..38)
      if (heroOverlayRef.current) {
        if (frameIndex <= 38) {
          heroOverlayRef.current.classList.remove('hidden');
        } else {
          heroOverlayRef.current.classList.add('hidden');
        }
      }

      // 2. How LifeLane Works Overlay: Visible for Frame 040 -> Frame 112 (frameIndex 39..111)
      if (howItWorksOverlayRef.current) {
        if (frameIndex >= 39 && frameIndex <= 111) {
          howItWorksOverlayRef.current.classList.remove('hidden');

          // Progressive One-by-One Card Reveals:
          // Card 01 (Ambulance): Starts appearing at Frame 040 (idx 39), full by Frame 060 (idx 59)
          if (card1Ref.current) {
            const p1 = Math.min(1, Math.max(0, (frameIndex - 39) / 15));
            card1Ref.current.style.opacity = p1.toFixed(3);
            card1Ref.current.style.transform = `translateY(${(20 * (1 - p1)).toFixed(1)}px)`;
          }

          // Card 02 (Hospital): Starts appearing at Frame 060 (idx 59), full by Frame 085 (idx 84)
          if (card2Ref.current) {
            if (frameIndex < 59) {
              card2Ref.current.style.opacity = '0';
              card2Ref.current.style.transform = 'translateY(20px)';
            } else {
              const p2 = Math.min(1, Math.max(0, (frameIndex - 59) / 15));
              card2Ref.current.style.opacity = p2.toFixed(3);
              card2Ref.current.style.transform = `translateY(${(20 * (1 - p2)).toFixed(1)}px)`;
            }
          }

          // Card 03 (Traffic): Starts appearing at Frame 085 (idx 84), full by Frame 112 (idx 111)
          if (card3Ref.current) {
            if (frameIndex < 84) {
              card3Ref.current.style.opacity = '0';
              card3Ref.current.style.transform = 'translateY(20px)';
            } else {
              const p3 = Math.min(1, Math.max(0, (frameIndex - 84) / 15));
              card3Ref.current.style.opacity = p3.toFixed(3);
              card3Ref.current.style.transform = `translateY(${(20 * (1 - p3)).toFixed(1)}px)`;
            }
          }
        } else {
          howItWorksOverlayRef.current.classList.add('hidden');
        }
      }

      // 3. Live Response Centerpiece Overlay: Visible for Frame 160 -> Frame 180 (frameIndex 159..179)
      if (liveResponseOverlayRef.current) {
        if (frameIndex >= 159 && frameIndex <= 179) {
          liveResponseOverlayRef.current.classList.remove('hidden');
          const fadeProgress = Math.min(1, Math.max(0, (frameIndex - 159) / 5));
          liveResponseOverlayRef.current.style.opacity = fadeProgress.toFixed(3);
        } else {
          liveResponseOverlayRef.current.classList.add('hidden');
          liveResponseOverlayRef.current.style.opacity = '0';
        }
      }

      // 4. Final Landing State Overlay: Triggered when progress reaches final ~3.5% (progress >= 0.965) OR frameIndex >= 282
      if (finalLandingOverlayRef.current) {
        const isFinalLanding = currentProgress >= 0.965 || targetProgress >= 0.965 || frameIndex >= 282;
        if (isFinalLanding) {
          finalLandingOverlayRef.current.classList.remove('hidden');
          finalLandingOverlayRef.current.style.opacity = '1';
          finalLandingOverlayRef.current.style.visibility = 'visible';
        } else {
          finalLandingOverlayRef.current.classList.add('hidden');
          finalLandingOverlayRef.current.style.opacity = '0';
          finalLandingOverlayRef.current.style.visibility = 'hidden';
        }
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    preloadAllSequenceFrames();
    resizeCanvas();
    updateScrollProgress();

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(animate);
    } else {
      renderFrame(0);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', resizeCanvas);
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  return (
    <div className="lifelane-landing-root">
      {/* Fixed Fullscreen Cinematic Canvas */}
      <canvas id="lifelane-canvas" ref={canvasRef} />

      {/* 1. Hero UI Overlay Layer (Visible Frame 001 -> Frame 039) */}
      <div className="hero-overlay-layer" id="heroOverlay" ref={heroOverlayRef}>
        <div className="hero-content-grid">
          {/* Left Column */}
          <div className="hero-left">
            <div className="eyebrow-badge">
              <span className="pulse-dot" />
              REAL-TIME EMERGENCY COORDINATION
            </div>
            <h1 className="hero-headline">
              Every Second<br />
              <span className="accent-text">Has a Destination.</span>
            </h1>
            <p className="hero-description">
              LifeLane connects ambulances, hospitals and traffic command in real time — helping emergency teams find available care, secure resources and reach the right hospital faster.
            </p>
            <div>
              <a href="#home" className="btn-cta-gold">
                GET STARTED &rarr;
              </a>
            </div>
          </div>

          {/* Right Column Info Card */}
          <div className="hero-right">
            <div className="glass-card">
              <div className="hospital-card-header">
                <div className="hospital-title-wrap">
                  <div className="hospital-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 14c1.49 0 2.87.47 4 1.26V8c0-1.1-.9-2-2-2h-4V3c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12.3c-.8-1.16-1.3-2.52-1.3-4zm-8-7h2v3h3v2h-3v3h-2v-3H8v-2h3V7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="hospital-name">City Care Hospital</div>
                    <div className="freshness-tag">Updated 42 sec ago</div>
                  </div>
                </div>
                <span className="status-badge badge-green">&#10003; Bed Held</span>
              </div>

              <div className="resource-grid">
                <div className="resource-item">
                  <div className="resource-label">ICU</div>
                  <div className="resource-val">1</div>
                </div>
                <div className="resource-item">
                  <div className="resource-label">Ventilator</div>
                  <div className="resource-val">1</div>
                </div>
                <div className="resource-item">
                  <div className="resource-label">Oxygen</div>
                  <div className="resource-val">2</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards Strip */}
        <div className="bottom-features-strip">
          <div className="feature-card">
            <div className="feature-card-top">
              <div className="feature-icon">01</div>
              <div className="feature-arrow">&rarr;</div>
            </div>
            <div className="feature-title">Live Bed Availability</div>
            <div className="feature-desc">Know which hospitals have the required resources — and how fresh that data is.</div>
          </div>

          <div className="feature-card">
            <div className="feature-card-top">
              <div className="feature-icon">02</div>
              <div className="feature-arrow">&rarr;</div>
            </div>
            <div className="feature-title">Smart Hospital Matching</div>
            <div className="feature-desc">Match emergency cases with suitable hospitals based on requirements, location and availability.</div>
          </div>

          <div className="feature-card">
            <div className="feature-card-top">
              <div className="feature-icon">03</div>
              <div className="feature-arrow">&rarr;</div>
            </div>
            <div className="feature-title">Bed Confirmation</div>
            <div className="feature-desc">Confirm and hold a suitable bed before the ambulance commits to the destination.</div>
          </div>

          <div className="feature-card">
            <div className="feature-card-top">
              <div className="feature-icon">04</div>
              <div className="feature-arrow">&rarr;</div>
            </div>
            <div className="feature-title">Emergency Green Corridor</div>
            <div className="feature-desc">Coordinate the ambulance route with traffic control to reduce unnecessary delay.</div>
          </div>
        </div>
      </div>

      {/* 2. "How LifeLane Works" UI Overlay Layer (Visible Frame 040 -> Frame 112) */}
      <div className="how-it-works-overlay hidden" id="howItWorksOverlay" ref={howItWorksOverlayRef}>
        <div className="hiw-container">
          {/* Upper Section Header */}
          <div className="hiw-header">
            <div className="hiw-eyebrow">
              <span className="hiw-line" />
              <span>HOW LIFELANE WORKS</span>
              <span className="hiw-line" />
            </div>
            <h2 className="hiw-heading">
              One Emergency.<br />
              <span className="accent-text">One Connected Response.</span>
            </h2>
            <p className="hiw-description">
              From the first telemetry ping to the trauma bay intake, every participant moves in unison from an integrated real-time picture.
            </p>
          </div>

          {/* Lower Compact 3-Card Grid (Progressive One-by-One Reveal) */}
          <div className="hiw-cards-wrapper">
            {/* Card 01: AMBULANCE (Revealed Frame 040 -> 060) */}
            <div className="hiw-card" id="hiwCard1" ref={card1Ref}>
              <div className="card-header-row">
                <div className="card-num-badge">01</div>
                <div className="card-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                    <path d="M7 8h4M9 6v4" />
                  </svg>
                </div>
              </div>
              <h3 className="hiw-card-title">AMBULANCE</h3>
              <ul className="hiw-feature-list">
                <li><span className="check-icon">✓</span> Live Patient Vitals</li>
                <li><span className="check-icon">✓</span> Automated Triage Protocol</li>
                <li><span className="check-icon">✓</span> Synchronized Arrival ETA</li>
              </ul>
            </div>

            {/* Card 02: HOSPITAL (Revealed Frame 060 -> 085) */}
            <div className="hiw-card card-featured" id="hiwCard2" ref={card2Ref}>
              <div className="card-header-row">
                <div className="card-num-badge">02</div>
                <div className="card-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14c1.49 0 2.87.47 4 1.26V8c0-1.1-.9-2-2-2h-4V3c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12.3c-.8-1.16-1.3-2.52-1.3-4zm-8-7h2v3h3v2h-3v3h-2v-3H8v-2h3V7z" />
                  </svg>
                </div>
              </div>
              <h3 className="hiw-card-title">HOSPITAL</h3>
              <ul className="hiw-feature-list">
                <li><span className="check-icon">✓</span> Real-Time Bay Allocation</li>
                <li><span className="check-icon">✓</span> One-Click Patient Acceptance</li>
                <li><span className="check-icon">✓</span> Cath Lab Staging Pre-Arrival</li>
              </ul>
            </div>

            {/* Card 03: TRAFFIC (Revealed Frame 085 -> 112) */}
            <div className="hiw-card" id="hiwCard3" ref={card3Ref}>
              <div className="card-header-row">
                <div className="card-num-badge">03</div>
                <div className="card-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="2" width="12" height="20" rx="6" />
                    <circle cx="12" cy="7" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="17" r="2" />
                  </svg>
                </div>
              </div>
              <h3 className="hiw-card-title">TRAFFIC</h3>
              <ul className="hiw-feature-list">
                <li><span className="check-icon">✓</span> Dynamic Wave Signal Control</li>
                <li><span className="check-icon">✓</span> 2+ Minutes Transit Cut</li>
                <li><span className="check-icon">✓</span> Autonomous Preemption Link</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "Live Response Centerpiece" UI Overlay Layer (Visible Frame 160 -> Frame 180) */}
      <div className="live-response-overlay hidden" id="liveResponseOverlay" ref={liveResponseOverlayRef}>
        <div className="lrc-container">
          {/* Top Section Header */}
          <div className="lrc-header">
            <div className="lrc-header-left">
              <div className="lrc-eyebrow">
                <span className="lrc-dot" />
                <span>LIVE RESPONSE CENTERPIECE</span>
              </div>
              <h2 className="lrc-heading">
                See the Response <span className="accent-text">Come Together.</span>
              </h2>
            </div>
            <div className="lrc-mission-badge">
              <span className="badge-label">MISSION ID:</span>
              <span className="badge-val">LL-2024-0718</span>
            </div>
          </div>

          {/* Main Dashboard Grid (LEFT Info Panel ~32%, RIGHT Map Viewport ~66%) */}
          <div className="lrc-dashboard-grid">
            {/* LEFT: Information Panel Console */}
            <div className="lrc-info-panel">
              {/* Active Corridor Header */}
              <div className="info-card active-corridor-card">
                <div className="corridor-header">
                  <div className="corridor-title-row">
                    <span className="pulse-emerald-dot" />
                    <span className="corridor-title">ACTIVE CORRIDOR</span>
                  </div>
                  <span className="status-pill-emerald">GREEN WAVE ACTIVE</span>
                </div>
              </div>

              {/* Patient Assessment Card */}
              <div className="info-card patient-card">
                <div className="info-card-header">
                  <div className="info-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div className="info-card-label">PATIENT ASSESSMENT</div>
                </div>
                <div className="patient-status-row">
                  <span className="patient-severity">Critical</span>
                  <span className="dot-separator">&bull;</span>
                  <span className="patient-condition">Cardiac STEMI</span>
                </div>
                <div className="patient-details">
                  <p>ECG transmitted 90s ago.</p>
                  <p>Heparin bolus administered.</p>
                </div>
              </div>

              {/* Metrics Row: 2 Compact Cards */}
              <div className="metrics-grid">
                <div className="info-card metric-card">
                  <div className="metric-label">SYNCHRONOUS ETA</div>
                  <div className="metric-val gold-val">
                    06 <span className="metric-unit">MIN</span>
                  </div>
                </div>
                <div className="info-card metric-card">
                  <div className="metric-label">TIME DELTA SAVED</div>
                  <div className="metric-val emerald-val">
                    02 <span className="metric-unit">MIN</span>
                  </div>
                </div>
              </div>

              {/* Bed Assignment Card */}
              <div className="info-card bed-card">
                <div className="bed-header">
                  <div className="bed-icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                    </svg>
                  </div>
                  <div>
                    <div className="bed-label">Target Bay Assigned</div>
                    <div className="bed-value">BAY 02 (ICU)</div>
                  </div>
                </div>
              </div>

              {/* Bottom Button */}
              <a href="#" onClick={(e) => e.preventDefault()} className="btn-log-cta">
                <span>View Full Transmission Log</span>
                <span className="btn-arrow">&rarr;</span>
              </a>
            </div>

            {/* RIGHT: Large Cinematic Map Viewport Panel */}
            <div className="lrc-map-viewport">
              {/* Top HUD Overlay Status Bar */}
              <div className="map-hud-top">
                <div className="hud-status-chip">
                  <span className="chip-num">01</span>
                  <span className="chip-title">AMBULANCE</span>
                  <span className="chip-badge badge-warning">EN ROUTE</span>
                  <span className="chip-arrow">&rsaquo;</span>
                </div>
                <div className="hud-status-chip">
                  <span className="chip-num">02</span>
                  <span className="chip-title">HOSPITAL</span>
                  <span className="chip-badge badge-success">PREPARED</span>
                  <span className="chip-arrow">&rsaquo;</span>
                </div>
                <div className="hud-status-chip active-chip">
                  <span className="chip-num">03</span>
                  <span className="chip-title">TRAFFIC</span>
                  <span className="chip-badge badge-emerald">CORRIDOR ACTIVE</span>
                </div>
              </div>

              {/* Bottom Left HUD Map Controls */}
              <div className="map-hud-bottom">
                <div className="map-mode-toggle">
                  <button
                    type="button"
                    className={`map-toggle-btn ${activeMapMode === 'map' ? 'active' : ''}`}
                    onClick={() => setActiveMapMode('map')}
                  >
                    Map
                  </button>
                  <button
                    type="button"
                    className={`map-toggle-btn ${activeMapMode === 'satellite' ? 'active' : ''}`}
                    onClick={() => setActiveMapMode('satellite')}
                  >
                    Satellite
                  </button>
                </div>
                <div className="map-brand-attribution">
                  <span className="map-logo-text">Google</span>
                  <span className="map-copyright-text">Map data &copy;2026 LifeLane Response Grid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. "Final Landing State" UI Overlay Layer (Visible Frame 285 -> Frame 292) */}
      <div className="final-landing-overlay hidden" id="finalLandingOverlay" ref={finalLandingOverlayRef}>
        <div className="fl-container">
          {/* Top Eyebrow Pill */}
          <div className="fl-eyebrow-pill">
            <span className="fl-infinity-symbol">&infin;</span>
            <span>THE UNIFIED EMERGENCY INFRASTRUCTURE</span>
          </div>

          {/* Main Headline */}
          <h1 className="fl-heading">
            Every Second Should<br />
            <span className="accent-text-italic">Move You Closer.</span>
          </h1>

          {/* Description */}
          <p className="fl-description">
            LifeLane orchestrates hospitals, first responders, and municipal signal systems into one effortless, life-preserving flow.
          </p>

          {/* CTA Button */}
          <div className="fl-cta-wrap">
            <a href="#home" className="btn-final-cta">
              <span>Enter LifeLane</span>
              <span className="btn-final-arrow">&rarr;</span>
            </a>
          </div>

          {/* Bottom Technical Label */}
          <div className="fl-bottom-label">
            <span className="fl-divider-line" />
            <span>EMERGENCY COORDINATION NETWORK &nbsp;&mdash;&nbsp; AUTONOMOUS SIGNAL &amp; CAPACITY MESH</span>
            <span className="fl-divider-line" />
          </div>
        </div>
      </div>

      {/* Document Scroll Height Provider */}
      <div className="lifelane-scroll-space" />
    </div>
  );
};

export default Landing;
