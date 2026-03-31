import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Zap, Check, AlertTriangle } from 'lucide-react';

export default function AICrab({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedTag, setSelectedTag] = useState("");
  const [showHint, setShowHint] = useState(false);
  
  const [clickCount, setClickCount] = useState(0);
  const [isGodMode, setIsGodMode] = useState(false);
  const clickTimer = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !isGodMode) setShowHint(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, isGodMode]);

  const playSound = (freq1 = 600, freq2 = 900, type = 'sine', duration = 0.1) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(freq1, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(freq2, audioCtx.currentTime + duration);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); 
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  };

  const playSiren = () => {
    playSound(400, 800, 'square', 0.5);
    setTimeout(() => playSound(800, 400, 'square', 0.5), 500);
  };

  const handleCrabClick = () => {
    if (isGodMode) return; 

    setClickCount(prev => prev + 1);
    
    if (clickTimer.current) clearTimeout(clickTimer.current);
    
    clickTimer.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    if (clickCount + 1 >= 3) {
      setIsGodMode(true);
      setIsOpen(true);
      setShowHint(false);
      playSiren();
      return; 
    }

    playSound();
    setIsOpen(!isOpen);
    setShowHint(false); 
    if (!isOpen) setStep(0);
  };

  const nextStep = () => {
    playSound();
    setStep(step + 1);
  };

  const playRevealSound = () => {
    playSound(800, 1200);
  };

  const pickProblem = (tag) => {
    setSelectedTag(tag);
    playRevealSound();
    setStep(3); 
  };

  const handleReveal = () => {
    if (onComplete) {
      onComplete(selectedTag);
    }
    setIsOpen(false);
    setStep(0);
  };

  const handleGodModeReveal = () => {
    if (onComplete) onComplete("godmode"); 
    setIsOpen(false);
    setTimeout(() => setIsGodMode(false), 1000); 
  };

  const btnStyle = {
    width: '100%', padding: '14px 16px', marginTop: '8px',
    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#e5e7eb', borderRadius: '12px', cursor: 'pointer',
    fontSize: '14px', textAlign: 'left', transition: 'all 0.2s ease',
    fontFamily: 'inherit', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px'
  };

  return (
    <>
      <style>{`
        .crab-wrapper { position: fixed; bottom: 25px; right: 25px; z-index: 1000; }
        .chat-bubble { width: 320px; margin-bottom: 24px; }
        .hint-bubble { bottom: 95px; right: 10px; }
        .crab-svg { width: 90px; height: 90px; transition: all 0.3s ease; }
        
        @media (max-width: 768px) {
          .crab-wrapper { bottom: 15px; right: 15px; }
          .chat-bubble { width: calc(100vw - 30px); max-width: 320px; margin-bottom: 15px; }
          .hint-bubble { bottom: 75px; right: 0px; }
          .crab-svg { width: 65px; height: 65px; }
        }

        @keyframes godShake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .god-mode-active { animation: godShake 0.5s; animation-iteration-count: infinite; }
      `}</style>

      <div className="crab-wrapper">
        
        <AnimatePresence>
          {showHint && !isOpen && !isGodMode && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="hint-bubble"
              style={{ position: 'absolute', background: '#ff6600', color: '#000', padding: '10px 14px', borderRadius: '12px', fontWeight: '900', fontSize: '13px', boxShadow: '0 4px 15px rgba(255,102,0,0.4)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
              Psst... want a cheat code? ⚡
              <div style={{ position: 'absolute', bottom: '-6px', right: '35px', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #ff6600' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="chat-bubble"
              style={{
                background: isGodMode ? 'rgba(20, 0, 0, 0.95)' : 'rgba(15, 15, 15, 0.85)', 
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                border: isGodMode ? '1px solid rgba(255, 0, 0, 0.5)' : '1px solid rgba(255, 102, 0, 0.3)',
                borderRadius: '24px', color: 'white', 
                boxShadow: isGodMode ? '0px 20px 50px rgba(255, 0, 0, 0.3), 0px 0px 30px rgba(255, 0, 0, 0.2)' : '0px 20px 50px rgba(0, 0, 0, 0.5), 0px 0px 20px rgba(255, 102, 0, 0.1)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column'
              }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: isGodMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 102, 0, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isGodMode ? '#ff0000' : '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    🦀
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: isGodMode ? '#ff4444' : '#fff' }}>{isGodMode ? "System Override" : "Toolsy AI"}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isGodMode ? '#ff0000' : '#10b981' }} />
                      <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600' }}>{isGodMode ? "GOD MODE" : "Online"}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => {setIsOpen(false); setIsGodMode(false);}} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px', display: 'flex' }} onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='#9ca3af'}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ padding: '24px 20px' }}>
                
                {isGodMode ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(255, 0, 0, 0.15)', borderRadius: '99px', color: '#ff4444', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                      <AlertTriangle size={14} strokeWidth={3} /> Developer Secret Found
                    </div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' }}>You found the God-Tier Stack.</h4>
                    <p style={{ margin: '0 0 24px 0', fontSize: '14px', fontWeight: '500', color: '#9ca3af', lineHeight: '1.6' }}>Unlock the secret tools the 1% use to build startups in hours.</p>
                    
                    <button onClick={handleGodModeReveal} style={{ width: '100%', padding: '16px', background: '#ff0000', color: '#fff', fontWeight: '900', border: 'none', borderRadius: '12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 25px rgba(255, 0, 0, 0.4)' }} onMouseDown={e=>e.currentTarget.style.transform='scale(0.96)'} onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>
                      <Zap size={18} fill="#fff" /> Activate God Mode
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {step === 0 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                        <p style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#f3f4f6', lineHeight: '1.4' }}>Yo! 👋 What are we building today?</p>
                        <button style={btnStyle} onClick={nextStep} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>🚀</span> A Tech Startup</button>
                        <button style={btnStyle} onClick={nextStep} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>📱</span> A Personal Brand</button>
                        <button style={btnStyle} onClick={nextStep} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>🛠️</span> Just messing around</button>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                        <p style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#f3f4f6', lineHeight: '1.4' }}>Got it. And who are you? 👤</p>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                          <button style={btnStyle} onClick={nextStep} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>🎥</span> Content Creator</button>
                          <button style={btnStyle} onClick={nextStep} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>💻</span> Developer / Student</button>
                          <button style={btnStyle} onClick={nextStep} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>🏢</span> Business Owner</button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                        <p style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#f3f4f6', lineHeight: '1.4' }}>Awesome. What is the hardest part for you right now?</p>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                          {/* CTO FIX: Updated tags to exactly match the database categories */}
                          <button style={btnStyle} onClick={() => pickProblem("writing")} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>✍️</span> Writing Content</button>
                          <button style={btnStyle} onClick={() => pickProblem("coding")} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>💻</span> Coding the App</button>
                          <button style={btnStyle} onClick={() => pickProblem("video")} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>🎥</span> Making Videos</button>
                          <button style={btnStyle} onClick={() => pickProblem("image")} onMouseOver={e=>{e.currentTarget.style.background='rgba(255, 102, 0, 0.1)'; e.currentTarget.style.borderColor='rgba(255, 102, 0, 0.5)'}} onMouseOut={e=>{e.currentTarget.style.background='rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)'}}><span style={{ fontSize: '18px' }}>🎨</span> Designing things</button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '99px', color: '#10b981', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                          <Check size={14} strokeWidth={3} /> Profile Analyzed
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' }}>Your stack is ready.</h4>
                        <p style={{ margin: '0 0 24px 0', fontSize: '14px', fontWeight: '500', color: '#9ca3af', lineHeight: '1.6' }}>I scanned the directory and pulled the exact AI tools you need to bypass the hard work.</p>
                        <button onClick={handleReveal} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #ff6600 0%, #ff8833 100%)', color: '#000', fontWeight: '900', border: 'none', borderRadius: '12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 25px rgba(255, 102, 0, 0.4)' }} onMouseDown={e=>e.currentTarget.style.transform='scale(0.96)'} onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>
                          <Zap size={18} fill="#000" /> Reveal My Unfair Advantage
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          onClick={handleCrabClick} 
          className={isGodMode ? "god-mode-active" : ""}
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', position: 'relative' }} 
          animate={isGodMode ? {} : { y: [0, -8, 0] }} 
          transition={isGodMode ? {} : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', background: isGodMode ? '#ff0000' : '#ff6600', filter: 'blur(30px)', opacity: isGodMode ? 0.6 : 0.3, pointerEvents: 'none', transition: 'background 0.3s' }} />

          <svg viewBox="0 0 100 100" className="crab-svg" style={{ filter: isGodMode ? "drop-shadow(0px 8px 12px rgba(255, 0, 0, 0.6))" : "drop-shadow(0px 8px 12px rgba(255, 102, 0, 0.4))", position: 'relative', zIndex: 2 }}>
            <path d="M 25 60 L 10 75 M 35 65 L 20 85 M 75 60 L 90 75 M 65 65 L 80 85" stroke={isGodMode ? "#aa0000" : "#cc5200"} strokeWidth="8" strokeLinecap="round" style={{transition: 'stroke 0.3s'}} />
            <motion.g animate={{ rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: isGodMode ? 0.5 : 1.5 }} style={{ transformOrigin: '25px 45px' }}><path d="M 30 50 C 10 40 10 20 25 15 C 35 30 20 40 30 50" fill={isGodMode ? "#cc0000" : "#ff5500"} stroke={isGodMode ? "#aa0000" : "#cc5200"} strokeWidth="2" style={{transition: 'all 0.3s'}}/></motion.g>
            <motion.g animate={{ rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: isGodMode ? 0.5 : 1.5, delay: 0.2 }} style={{ transformOrigin: '75px 45px' }}><path d="M 70 50 C 90 40 90 20 75 15 C 65 30 80 40 70 50" fill={isGodMode ? "#cc0000" : "#ff5500"} stroke={isGodMode ? "#aa0000" : "#cc5200"} strokeWidth="2" style={{transition: 'all 0.3s'}}/></motion.g>
            <ellipse cx="50" cy="65" rx="35" ry="25" fill={isGodMode ? "#ff0000" : "#ff6600"} style={{transition: 'fill 0.3s'}} />
            <ellipse cx="50" cy="70" rx="25" ry="12" fill={isGodMode ? "#ff3333" : "#ff8833"} opacity="0.6" style={{transition: 'fill 0.3s'}} />
            <path d={isGodMode ? "M 35 75 Q 50 65 65 75" : "M 40 68 Q 50 78 60 68"} fill="none" stroke="#662200" strokeWidth="4" strokeLinecap="round" style={{transition: 'd 0.3s'}}/>
            <motion.g animate={isGodMode ? {} : { scaleY: [1, 0.1, 1, 1, 1, 1, 1] }} transition={isGodMode ? {} : { repeat: Infinity, duration: 3.5 }} style={{ transformOrigin: '50px 40px' }}>
              <path d="M 40 45 L 35 25 M 60 45 L 65 25" stroke={isGodMode ? "#ff0000" : "#ff6600"} strokeWidth="8" strokeLinecap="round" style={{transition: 'stroke 0.3s'}} />
              <circle cx="35" cy="25" r="10" fill={isGodMode ? "#ff0000" : "white"} style={{transition: 'fill 0.3s'}} /><circle cx="65" cy="25" r="10" fill={isGodMode ? "#ff0000" : "white"} style={{transition: 'fill 0.3s'}} />
              <circle cx="35" cy="25" r="5" fill={isGodMode ? "white" : "#111"} style={{transition: 'fill 0.3s'}} /><circle cx="65" cy="25" r="5" fill={isGodMode ? "white" : "#111"} style={{transition: 'fill 0.3s'}} />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </>
  );
}