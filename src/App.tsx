/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, SyntheticEvent, MouseEvent, TouchEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Sliders, 
  Sparkles, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  X, 
  ArrowRight, 
  Award, 
  Shield, 
  Heart,
  User, 
  Clock, 
  Compass,
  Zap,
  Star,
  Instagram,
  Facebook
} from 'lucide-react';

// Import Types
import { PhotographyPackage } from './types';

// Import Data
import { PACKAGES, TESTIMONIALS, FAQ } from './data';

// Import Generated Images
import HeroSummerDealImg from './assets/images/hero_summer_deal_1781620492468.jpg';
import BirthdayPortraitImg from './assets/images/birthday_portrait_1781620508397.jpg';
import GradPortraitImg from './assets/images/grad_portrait_1781620525140.jpg';
import FamilyPortraitImg from './assets/images/family_portrait_1781620542187.jpg';
import BrandingHeadshotImg from './assets/images/branding_headshot_1781620557251.jpg';
import CouplePortraitImg from './assets/images/couple_portrait_1781620575733.jpg';
import HeroRealisticSummerImg from './assets/images/hero_realistic_summer_1781621797481.jpg';
import CaricatureExampleImg from './assets/images/caricature_example_1781621816838.jpg';

// Image mapping helper
const imageMap: Record<string, string> = {
  hero_summer_deal: HeroSummerDealImg,
  birthday_portrait: "https://imgur.com/w82HJTU.png",
  grad_portrait: GradPortraitImg,
  family_portrait: FamilyPortraitImg,
  branding_headshot: BrandingHeadshotImg,
  couple_portrait: CouplePortraitImg,
  hero_realistic_summer: HeroRealisticSummerImg,
  caricature_example: CaricatureExampleImg,
};

// Customized Logo Brand component that handles imgur loading or offers high-fidelity visual fallback
function BrandLogo({ isDarkFooter = false }: { isDarkFooter?: boolean }) {
  const [loadError, setLoadError] = useState(false);
  const imageUrl = "https://imgur.com/QJUuu1H.png";

  if (loadError || imageUrl.includes('undefined')) {
    return (
      <div className="flex items-center gap-3 group">
        <div className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-[#14a39a]/40 bg-[#12141C] text-[#14a39a] group-hover:scale-105 shadow-[0_0_15px_rgba(20,163,154,0.2)] transition-all duration-300">
          <svg className="w-5.5 h-5.5 text-[#14a39a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <div className="absolute inset-0 bg-[#14a39a]/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="flex flex-col items-start leading-none mt-0.5">
          <span className="font-display font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#14a39a] transition-all">
            EMMYSS<span className="text-[#14a39a]">.</span>
          </span>
          <span className="font-serif italic text-[10px] tracking-widest mt-0.5 uppercase text-[#14a39a]">
            Shoot. Create. Inspire.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 group">
      <img 
        src={imageUrl} 
        alt="EMMYSS Logo" 
        onError={() => setLoadError(true)}
        className="h-10 w-auto object-contain rounded-lg border-2 border-[#14a39a] shadow-[0_0_15px_rgba(20,163,154,0.3)] group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
      <div className="flex flex-col items-start leading-none mt-0.5">
        <span className="font-display font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#14a39a] transition-all">
          EMMYSS<span className="text-[#14a39a]">.</span>
        </span>
        <span className="font-serif italic text-[10px] tracking-widest mt-0.5 uppercase text-[#14a39a]">
          Shoot. Create. Inspire.
        </span>
      </div>
    </div>
  );
}

interface ConfettiParticle {
  id: number;
  initialX: number;
  initialY: number;
  destX: number;
  destY: number;
  rotate: number;
  color: string;
  size: number;
}

function ConfettiEmitter() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const colors = ['#14a39a', '#FF9F29', '#EFECE6', '#22C55E', '#3B82F6', '#EC4899'];
    const newParticles: ConfettiParticle[] = Array.from({ length: 45 }).map((_, i) => {
      const angle = (Math.random() * 120 + 30) * (Math.PI / 180); // Upward arc between 30 and 150 deg
      const velocity = Math.random() * 200 + 150;
      const destX = Math.cos(angle) * velocity;
      const destY = -Math.sin(angle) * velocity - (Math.random() * 50);

      return {
        id: i,
        initialX: 0,
        initialY: 0,
        destX,
        destY,
        rotate: Math.random() * 720 - 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            opacity: 1, 
            x: 0, 
            y: 50,
            scale: 1,
            rotate: 0 
          }}
          animate={{ 
            opacity: [1, 1, 0.8, 0],
            x: p.destX,
            y: [50, p.destY * 0.8, p.destY, p.destY + 185], // High-fidelity parabolic loop
            scale: [1, 1.2, 0.8, 0.3],
            rotate: p.rotate 
          }}
          transition={{ 
            duration: Math.random() * 1.5 + 1.2,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.4 ? '2px' : '50%',
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gallery Filter State
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'birthday' | 'graduation' | 'family' | 'couple' | 'branding'>('all');
  
  // Lightbox State
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Before & After Slider State
  const [beforeAfterPosition, setBeforeAfterPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [isSliding, setIsSliding] = useState(false);
  const [sliderMode, setSliderMode] = useState<'raw-vs-retouch' | 'retouch-vs-caricature'>('retouch-vs-caricature');

  // Selected Booking State
  const [selectedPackage, setSelectedPackage] = useState<PhotographyPackage>(PACKAGES[0]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    packageId: PACKAGES[0].id,
    datePreference: '',
    timePreference: 'golden-hour',
    message: '',
    creativeGoal: 'natural-posing'
  });

  // Client Side UI Feedback States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic remaining slots simulated values
  const [slotsRemaining, setSlotsRemaining] = useState(4);
  const [usersViewing, setUsersViewing] = useState(3);

  // Trigger simulated state updates for social proof
  useEffect(() => {
    const slotInterval = setInterval(() => {
      setSlotsRemaining(prev => (prev > 1 ? prev - (Math.random() > 0.85 ? 1 : 0) : 2));
    }, 45000);

    const viewingInterval = setInterval(() => {
      setUsersViewing(() => Math.floor(Math.random() * 5) + 3);
    }, 15000);

    return () => {
      clearInterval(slotInterval);
      clearInterval(viewingInterval);
    };
  }, []);

  // Before & After Mouse/Touch Move Handlers
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setBeforeAfterPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSliding) return;
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSliding) return;
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsSliding(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    
    // Set initial width
    setSliderWidth(sliderRef.current.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSliderWidth(entry.contentRect.width);
      }
    });

    observer.observe(sliderRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle Package Click - Smooth scroll and Auto select
  const selectAndScrollToPackage = (pkg: PhotographyPackage) => {
    setSelectedPackage(pkg);
    setFormData(prev => ({
      ...prev,
      packageId: pkg.id
    }));
    
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form Submission
  const handleSubmitBooking = async (e: FormEvent) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      const response = await fetch("https://formspree.io/f/mwvjzqbw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          packageId: formData.packageId,
          packageName: selectedPackage.title,
          packagePrice: selectedPackage.price,
          datePreference: formData.datePreference,
          creativeGoal: formData.creativeGoal,
          message: formData.message,
        })
      });

      if (response.ok) {
        setBookingConfirmed(true);
        // Track remaining slots drop
        setSlotsRemaining(prev => Math.max(1, prev - 1));
        
        // Auto-scroll to confirmation ticket
        const element = document.getElementById('booking-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        const data = await response.json().catch(() => ({}));
        setFormError(data.error || "There was an issue sending your request. Please try again or contact us directly at info@emmyss.com.");
      }
    } catch (err) {
      console.error(err);
      setFormError("A connection error occurred. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset booking form state
  const handleResetForm = () => {
    setBookingConfirmed(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      packageId: PACKAGES[0].id,
      datePreference: '',
      timePreference: 'golden-hour',
      message: '',
      creativeGoal: 'natural-posing'
    });
    setSelectedPackage(PACKAGES[0]);
  };

  // Filter packages or full photos list
  const filteredPhotos = PACKAGES.filter(
    p => galleryFilter === 'all' || p.category === galleryFilter
  );

  return (
    <div id="app-root" className="min-h-screen bg-[#07090E] text-stone-100 font-sans antialiased selection:bg-[#14a39a]/30 selection:text-white pb-10">
      
      {/* GLOBAL BANNER / LIMITED OFFERS */}
      <div id="promo-banner" className="bg-[#0D0F16] border-b border-[#14a39a]/20 text-stone-200 py-2.5 text-xs font-mono tracking-wider flex justify-center items-center px-4 md:px-6 relative overflow-hidden z-40">
        <div className="flex items-center gap-2 justify-center flex-wrap text-center relative z-10">
          <span className="bg-[#14a39a] border border-black text-black px-2 py-0.5 rounded text-[10px] font-extrabold uppercase animate-pulse shadow-[1px_1px_0px_0px_#FF9F29]">Live Deal</span>
          <span>Summer Portrait Slots: Euclid Outdoor specials starting at <strong className="text-amber-400">$170</strong></span>
          <span className="hidden md:inline text-stone-600">|</span>
          <span className="text-[#14a39a] flex items-center gap-1 font-bold">
            <Zap className="w-3 animate-bounce text-amber-400" /> Only {slotsRemaining} Slots Remaining!
          </span>
          <span className="text-stone-400 text-[10px] ml-1">({usersViewing} photography enthusiasts booking right now)</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#14a39a]/5 to-transparent pointer-events-none"></div>
      </div>

      {/* HEADER / NAVIGATION */}
      <nav id="navbar" className="sticky top-0 bg-[#07090E]/90 backdrop-blur-md border-b border-[#14a39a]/20 z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-22">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-start outline-none">
                <BrandLogo />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#gallery" className="font-mono text-xs uppercase tracking-widest text-[#E2E8F0] hover:text-[#14a39a] transition-all">Gallery</a>
              <a href="#before-after" className="font-mono text-xs uppercase tracking-widest text-[#E2E8F0] hover:text-[#14a39a] transition-all">Interactive Slider</a>
              <a href="#services" className="font-mono text-xs uppercase tracking-widest text-[#E2E8F0] hover:text-[#14a39a] transition-all">Rates & Packages</a>
              <a href="#why-us" className="font-mono text-xs uppercase tracking-widest text-[#E2E8F0] hover:text-[#14a39a] transition-all">Why EMMYSS</a>
              <a href="#faq" className="font-mono text-xs uppercase tracking-widest text-[#E2E8F0] hover:text-[#14a39a] transition-all">FAQ</a>
            </div>

            {/* Desktop Action Trigger */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="#booking-section" 
                className="bg-[#14a39a] hover:bg-[#FF9F29] border-2 border-black text-black font-black px-6 py-2.5 rounded-xl inline-flex items-center gap-2 text-xs uppercase tracking-wider transition-all duration-300 transform shadow-[3px_3px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <span>Book Your Slot</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="inline-flex items-center justify-center p-2 rounded-xl text-stone-200 hover:text-[#14a39a] bg-stone-900 border border-stone-800 focus:outline-none transition-all"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Camera className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu container */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-[#14a39a]/20 bg-[#07090E] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 text-center">
                <a 
                  href="#gallery" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-base font-mono text-stone-300 hover:bg-stone-900 hover:text-[#14a39a]"
                >
                  Gallery
                </a>
                <a 
                  href="#before-after" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-base font-mono text-stone-300 hover:bg-stone-900 hover:text-[#14a39a]"
                >
                  Before & After
                </a>
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-base font-mono text-stone-300 hover:bg-stone-900 hover:text-[#14a39a]"
                >
                  Packages & Rates
                </a>
                <a 
                  href="#why-us" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-base font-mono text-stone-300 hover:bg-stone-900 hover:text-[#14a39a]"
                >
                  Why EMMYSS
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-base font-mono text-stone-300 hover:bg-stone-900 hover:text-[#14a39a]"
                >
                  FAQ
                </a>
                <div className="pt-4">
                  <a 
                    href="#booking-section" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full bg-[#14a39a] hover:bg-[#FF9F29] border-2 border-black text-black py-3.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 font-black text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_#000000]"
                  >
                    <span>Book Summer Portrait</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <header id="hero" className="relative pt-16 pb-26 md:py-36 overflow-hidden bg-gradient-to-b from-[#0D0F17] to-[#07090E] border-b border-[#14a39a]/10">
        {/* Subtle decorative background sunburst elements to emulate flyer style */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#14a39a]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero text branding information */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-8 z-10 text-center lg:text-left"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-500/20 bg-[#13151D] text-amber-400 font-mono text-xs font-semibold tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                <span>LIMITED CAPACITY SUMMER PORTRAIT EVENT</span>
              </motion.div>

              {/* Campaign Title */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className="space-y-4"
              >
                <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-none text-white tracking-tight">
                  Summer Portrait <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14a39a] to-amber-400 animate-pulse">
                    Deals 2026
                  </span>
                </h1>
                
                <p className="font-serif italic text-lg sm:text-2xl text-stone-300 tracking-wide">
                  "Shoot. Create. Inspire." — EMMYSS Portrait Studio
                </p>
              </motion.div>

              {/* Main Description directly from Flyer */}
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className="text-stone-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                This summer deserves better than phone pictures. Get professional portraits with clean, vibrant editing, creative posing guides, and beautiful hand-picked outdoor backdrops in Euclid & greater Cleveland area.
              </motion.p>

              {/* Interactive Pricing and CTAs */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <a 
                  href="#booking-section" 
                  className="w-full sm:w-auto text-center bg-[#14a39a] hover:bg-[#FF9F29] border-2 border-black text-black hover:text-black px-8 py-4.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 shadow-[5px_5px_0px_0px_#000000] hover:shadow-[7px_7px_0px_0px_#000000] inline-flex items-center justify-center gap-3 group"
                >
                  <span>Book Your Session Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a 
                  href="#services" 
                  className="w-full sm:w-auto text-center border-2 border-stone-700 hover:border-[#14a39a] text-stone-300 hover:text-white px-8 py-4.5 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 bg-[#12141C]/80 hover:bg-[#12141C]"
                >
                  <span>Explore Rates & Styles</span>
                </a>
              </motion.div>

              {/* Highlight starting price & Limited spots badges */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className="pt-6 border-t border-stone-800 max-w-lg mx-auto lg:mx-0"
              >
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#13151D] border border-[#14a39a]/20 shadow-[3px_3px_0px_0px_rgba(20,163,154,0.15)]">
                    <div className="p-2 rounded-lg bg-[#14a39a]/10 text-[#14a39a] mt-1 shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase text-stone-400 tracking-widest leading-none">STARTING AT</p>
                      <p className="font-display font-black text-2xl text-white mt-1" id="hero-package-price">$170</p>
                      <p className="text-[10px] text-stone-400">Complete service inclusive</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#13151D] border border-red-500/20 shadow-[3px_3px_0px_0px_rgba(239,68,68,0.15)]">
                    <div className="p-2 rounded-lg bg-red-950/40 text-red-400 mt-1 shrink-0">
                      <Calendar className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase text-red-400 tracking-widest leading-none">SLOTS COUNT</p>
                      <p className="font-display font-black text-xl text-white mt-1 shrink-0">{slotsRemaining} available</p>
                      <p className="text-[10px] text-stone-400">Summer Booking Deals</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Hero Image Showcase with camera overlay aesthetic */}
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.4 }}
              className="lg:col-span-5 relative flex justify-center z-10 mt-6 lg:mt-0"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 6, 
                  ease: "easeInOut" 
                }}
                className="relative w-full max-w-sm sm:max-w-md lg:max-w-none"
              >
                
                {/* Vintage camera focus bracket boundaries */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#14a39a] rounded-tl-xl pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#14a39a] rounded-tr-xl pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-[#14a39a] rounded-bl-xl pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#14a39a] rounded-br-xl pointer-events-none" />
                
                {/* Simulated Lens Viewfinder coordinates */}
                <div className="absolute top-2 left-6 text-[10px] font-mono text-white bg-[#07090E]/85 px-2.5 py-1 rounded-md border border-[#14a39a]/30 shadow backdrop-blur-sm tracking-wider">
                  ISO 100 &nbsp; 85mm &nbsp; f/1.4 &nbsp; 1/200s
                </div>
                
                {/* Location Pin overlay */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs font-mono text-white bg-[#07090E]/90 px-3 py-1.5 rounded-full border border-stone-800 backdrop-blur-sm font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#14a39a]" />
                  <span>Euclid Lakeshore Reserve</span>
                </div>

                {/* Main Hero Image in a gorgeous tilted polaroid caricature border */}
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="overflow-hidden rounded-2xl shadow-[8px_8px_0px_0px_#14a39a] bg-[#12141C] aspect-[3/4] border-4 border-black rotate-2 cursor-zoom-in" 
                  onClick={() => setActiveLightboxImage(imageMap.hero_realistic_summer)}
                >
                  <img 
                    src={imageMap.hero_realistic_summer} 
                    alt="EMMYSS Summer Portrait" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[1.1] contrast-[1.02]"
                  />
                </motion.div>

                {/* Aesthetic flyer text decoration */}
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: -3, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.8 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="absolute -bottom-6 -left-6 bg-[#FF9F29] text-black px-5 py-4.5 rounded-xl shadow-[5px_5px_0px_0px_#000000] border-2 border-black max-w-[210px] hidden sm:block z-20 cursor-default"
                >
                  <p className="font-serif italic text-xs leading-tight text-black font-semibold">"This summer deserves better than phone pictures!"</p>
                  <p className="font-display font-black text-sm mt-2 tracking-tight">Full Editing Guarantee</p>
                </motion.div>

              </motion.div>
            </motion.div>

          </div>
        </div>
      </header>

      {/* DYNAMIC SHOWCASE / BEFORE & AFTER EDITING SLIDER */}
      <section id="before-after" className="py-20 md:py-28 bg-[#0D0F16] border-b border-[#14a39a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 text-[#14a39a] font-mono text-xs font-bold tracking-widest uppercase">
              <Sliders className="w-4 h-4 text-[#14a39a]" />
              <span>EXPERIENCE THE EMMYSS ADVANTAGE</span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
              Interactive Design Studio Comparisons
            </h2>
            
            <p className="text-stone-300 text-base sm:text-lg">
              We specialize in two high-end creative styles. Toggle between the modes below to compare a raw camera capture to our hyper-realistic Signature edit, or see how we transform realistic photos into digital watercolor caricatures!
            </p>

            {/* Premium Interactive Mode Toggle */}
            <div className="pt-6 flex justify-center">
              <div className="inline-flex p-1.5 rounded-2xl bg-[#13151D] border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(20,163,154,0.2)]">
                <button
                  onClick={() => setSliderMode('raw-vs-retouch')}
                  className={`px-5 py-2.5 rounded-xl font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    sliderMode === 'raw-vs-retouch'
                      ? 'bg-[#14a39a] text-black shadow-inner border border-black'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Reality Polish (RAW vs Pro Edit)</span>
                </button>
                <button
                  onClick={() => setSliderMode('retouch-vs-caricature')}
                  className={`px-5 py-2.5 rounded-xl font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    sliderMode === 'retouch-vs-caricature'
                      ? 'bg-amber-400 text-black shadow-inner border border-black'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Caricature Art (Pro vs Drawing)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* The main slider component */}
            <div 
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsSliding(true)}
              onTouchStart={() => setIsSliding(true)}
              className="relative aspect-[4/3] sm:aspect-[16/9] w-full select-none overflow-hidden rounded-2xl border-4 border-[#12141C] shadow-[0_0_25px_rgba(20,163,154,0.15)] cursor-ew-resize bg-neutral-900"
              id="before-after-slider"
            >
              
              {/* After: Edited Image - Full View */}
              <img 
                src={sliderMode === 'raw-vs-retouch' ? imageMap.hero_realistic_summer : imageMap.caricature_example} 
                alt="After Professional EMMYSS Edit" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute right-6 top-6 bg-[#07090E]/90 text-[#14a39a] font-mono text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-xl border border-[#14a39a]/30 shadow backdrop-blur-sm tracking-widest uppercase z-10">
                {sliderMode === 'raw-vs-retouch' ? '⭐ Signature Reality Edit' : '🎨 Watercolor Caricature Art'}
              </div>

              {/* Before: Raw Original Image - Styled with filters to look unedited, clipped based on beforeAfterPosition */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${beforeAfterPosition}%` }}
              >
                <div className="absolute inset-0 select-none" style={{ width: sliderWidth || '100%' }}>
                  <img 
                    src={imageMap.hero_realistic_summer} 
                    alt="Before: Unedited camera raw photo" 
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover ${sliderMode === 'raw-vs-retouch' ? 'filter saturate-[0.55] sepia-[0.10] brightness-[0.80] contrast-[0.90]' : ''}`}
                  />
                </div>
                <div className="absolute left-6 top-6 bg-black/80 text-stone-300 font-mono text-[10px] md:text-xs px-3 py-1.5 rounded-xl border border-stone-800 shadow backdrop-blur-sm tracking-widest uppercase z-10">
                  {sliderMode === 'raw-vs-retouch' ? '📷 Raw Cam Capture' : '✨ Signature Reality Portrait'}
                </div>
              </div>

              {/* Vertical Slider Handle line */}
              <div 
                className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none z-20"
                style={{ left: `${beforeAfterPosition}%` }}
              >
                {/* Horizontal slider cursor grab bubble */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#12141C] text-[#14a39a] w-11 h-11 rounded-full shadow-2xl flex items-center justify-center border-2 border-[#14a39a] cursor-ew-resize">
                  <Sliders className="w-4 h-4 text-[#14a39a] transform rotate-90" />
                </div>
              </div>

              {/* Slider hints */}
              <div className="absolute bottom-4 left-4 md:left-6 text-white text-[10px] md:text-xs font-medium tracking-wide bg-black/65 backdrop-blur-sm rounded-lg py-1 px-3 pointer-events-none z-10 font-mono">
                ◄ Slide for {sliderMode === 'raw-vs-retouch' ? 'Original RAW' : 'Realistic Photo'}
              </div>
              <div className="absolute bottom-4 right-4 md:right-6 text-[#14a39a] text-[10px] md:text-xs font-semibold tracking-wide bg-black/65 backdrop-blur-sm rounded-lg py-1 px-3 pointer-events-none z-10 font-mono">
                Slide for {sliderMode === 'raw-vs-retouch' ? 'EMMYSS Detail Edit' : 'Caricature Sketch Edit'} ►
              </div>

            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-stone-300 text-sm font-mono px-4">
              <div className="flex items-center gap-1.5 bg-[#13151D] px-4 py-2 rounded-xl border border-stone-800 shadow-sm">
                <Check className="w-4 h-4 text-[#14a39a]" /> 
                <span>Advanced Color Match</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#13151D] px-4 py-2 rounded-xl border border-stone-800 shadow-sm">
                <Check className="w-4 h-4 text-[#14a39a]" /> 
                <span>Fine Caricature Details</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#13151D] px-4 py-2 rounded-xl border border-stone-800 shadow-sm">
                <Check className="w-4 h-4 text-[#14a39a]" /> 
                <span>Balanced Contrast and Shadows</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PORTFOLIO LIGHTBOX GALLERY SECTION */}
      <section id="gallery" className="py-20 md:py-28 bg-[#07090E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-xl">
              <p className="text-[#14a39a] font-mono text-xs font-bold tracking-widest uppercase">
                EMMYSS PORTFOLIO SHOWCASE
              </p>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                Our Summer Vignettes
              </h2>
              <p className="text-stone-400">
                Click any portrait photo to view blemish-detail zoom framing and see editing resolutions.
              </p>
            </div>

            {/* Aesthetic Filters - Dark theme styled */}
            <div className="flex flex-wrap items-center gap-2" id="gallery-filters">
              {(['all', 'birthday', 'graduation', 'family', 'couple', 'branding'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border cursor-pointer overflow-hidden ${
                    galleryFilter === cat 
                      ? 'text-black border-black shadow-[2px_2px_0px_0px_rgba(255,159,41,1)] scale-[1.02]' 
                      : 'bg-[#13151D] border-stone-800 text-stone-400 hover:text-white hover:bg-[#1C1F2B]'
                  }`}
                >
                  {galleryFilter === cat && (
                    <motion.div 
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-[#14a39a] z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{cat === 'all' ? 'Show All' : cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Responsive Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            id="gallery-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 90, damping: 18, delay: (index % 3) * 0.06 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  key={item.id}
                  className={`group relative bg-[#13151D] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(20,163,154,0.15)] hover:shadow-[8px_8px_0px_0px_rgba(20,163,154,0.4)] border-2 border-stone-800 hover:border-[#14a39a] transition-all cursor-pointer ${
                    index % 2 === 0 ? 'rotate-[-1deg] hover:rotate-0' : 'rotate-[1deg] hover:rotate-0'
                  }`}
                  onClick={() => setActiveLightboxImage(imageMap[item.imageUrl])}
                >
                  {/* Photo container */}
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-900 relative">
                    <img 
                      src={imageMap[item.imageUrl]} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 brightness-[1.03]"
                    />
                    
                    {/* Dark gradient blur highlight on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                    
                    {/* Zoom / Lightbox Prompt Icon overlay */}
                    <div className="absolute top-4 right-4 bg-black/60 text-[#14a39a] p-2.5 rounded-full border border-stone-800 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      <Camera className="w-4 h-4" />
                    </div>

                    {/* Meta labels */}
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-10">
                      <p className="font-mono text-[10px] text-[#14a39a] uppercase tracking-widest font-bold">{item.duration}</p>
                      <h3 className="font-display font-black text-xl tracking-tight mt-0.5">{item.title}</h3>
                      <p className="text-xs text-stone-300 line-clamp-2 mt-1 font-serif italic">"{item.brief}"</p>
                    </div>
                  </div>

                  {/* Standard Static labels for mobile visibility */}
                  <div className="p-5 bg-[#171a24] border-t border-stone-800 flex items-center justify-between group-hover:bg-[#14a39a]/5 transition-colors">
                    <div>
                      <h3 className="font-display font-black text-white text-base group-hover:text-[#14a39a] transition-all">{item.title}</h3>
                      <p className="text-xs text-stone-400 font-mono mt-0.5">{item.edits}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] text-[#14a39a] font-bold">RATE</span>
                      <p className="font-display font-black text-white text-lg">${item.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* PORTFOLIO INTUITIVE SERVICES PACKAGE CARDS */}
      <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-[#07090E] to-[#0A0D15] border-b border-[#14a39a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <div className="inline-flex items-center gap-1.5 text-amber-500 font-mono text-xs font-bold tracking-widest uppercase">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Photography Packages & Summer Pricing</span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
              Invest In Everlasting Memories
            </h2>
            
            <p className="text-stone-300 text-base sm:text-lg">
              Below are the specific photography offerings available for our Summer Portrait Deals. Standard transparent pricing, no hidden desk fees. Ready to shoot?
            </p>
          </div>

          {/* List layout of photography packages shown on the flyer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" id="packages-cards">
            {PACKAGES.map((pkg, pIdx) => (
              <motion.div 
                key={pkg.id} 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 85, damping: 15, delay: pIdx * 0.08 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0px 20px 30px rgba(20,163,154,0.06)",
                  transition: { type: "spring", stiffness: 300, damping: 12 }
                }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between border-2 ${
                  selectedPackage.id === pkg.id 
                    ? 'border-[#14a39a] shadow-[6px_6px_0px_0px_rgba(20,163,154,0.35)] bg-[#161a25] scale-[1.01]' 
                    : 'bg-[#13151D] border-stone-800 hover:border-stone-700 shadow-sm hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Photo and category sticker */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900 pointer-events-none">
                    <img 
                      src={imageMap[pkg.imageUrl]} 
                      alt={pkg.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover contrast-[1.02] brightness-95" 
                    />
                    <div className="absolute top-4 left-4 bg-[#07090E]/90 text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded-lg border border-stone-800 uppercase tracking-wider">
                      {pkg.duration}
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display font-black text-xl text-white tracking-tight">
                        {pkg.title}
                      </h3>
                      <div className="text-right">
                        <span className="font-mono text-[9px] text-stone-400 block leading-none">SUMMER DEALS</span>
                        <span className="font-display font-black text-2xl text-[#14a39a]">${pkg.price}</span>
                      </div>
                    </div>

                    <p className="text-sm text-stone-300 leading-relaxed font-sans">{pkg.brief}</p>
                    
                    <div className="pt-4 border-t border-stone-800 space-y-3">
                      <p className="font-mono text-[9px] text-stone-400 uppercase tracking-widest leading-none">Included features:</p>
                      
                      <div className="space-y-2.5">
                        {pkg.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                            <Check className="w-4 h-4 text-[#14a39a] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Button footer selection action trigger */}
                <div className="p-6 md:px-8 md:pb-8 border-t border-stone-850 bg-[#161823]">
                  <button
                    onClick={() => selectAndScrollToPackage(pkg)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer ${
                      selectedPackage.id === pkg.id 
                        ? 'bg-[#14a39a] text-black shadow-lg border-2 border-black shadow-[#14a39a]/10 hover:bg-[#FF9F29]' 
                        : 'bg-[#07090E] text-stone-200 hover:text-black hover:bg-[#14a39a] border-2 border-stone-800 hover:border-black'
                    }`}
                  >
                    <span>{selectedPackage.id === pkg.id ? 'Selected / Pre-configured' : 'Choose This & Configure'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY US - EXTRA VALUE ADD DIRECTLY ROOTED IN THE FLYER DETAILS */}
      <section id="why-us" className="py-20 md:py-28 bg-[#07090E] border-b border-[#14a39a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column visual collage */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[#14a39a] font-mono text-xs font-bold tracking-widest uppercase">
                <Compass className="w-4 h-4 text-[#14a39a]" />
                <span>Our photography philosophy</span>
              </div>
              
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight leading-none">
                Because Summer <br />Deserves Better.
              </h2>
              
              <p className="text-stone-300 text-lg leading-relaxed font-sans max-w-lg">
                Your summer stories are milestones. Smartphone cameras degrade skin colors and blur backgrounds artificiality. Standard photo setups feel robotic. Together, we build a signature cinematic catalog.
              </p>

              {/* Flyer elements highlighted */}
              <div className="space-y-4 pt-6 max-w-lg">
                <div className="flex gap-4 p-4 rounded-xl bg-[#13151D] border border-stone-800">
                  <div className="p-3 bg-stone-900 border border-stone-800 text-[#14a39a] rounded-xl shadow-sm h-12 w-12 flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-base">Clean Signature Editing</h4>
                    <p className="text-xs text-stone-300 mt-1">Every portrait undergoes meticulous shadow balancing, selective sharpening, and organic summer sky color grades.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-[#13151D] border border-stone-800">
                  <div className="p-3 bg-stone-900 border border-stone-800 text-[#14a39a] rounded-xl shadow-sm h-12 w-12 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-base">Relaxed, Creative Posing</h4>
                    <p className="text-xs text-stone-300 mt-1">No fake smiles or stiff postures here. We guide your gaze, hand paths, and movements so you feel naturally cinematic.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-[#13151D] border border-stone-800">
                  <div className="p-3 bg-stone-900 border border-stone-800 text-[#14a39a] rounded-xl shadow-sm h-12 w-12 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-base">Beautiful Outdoor Locations</h4>
                    <p className="text-xs text-stone-300 mt-1">We utilize hidden sunset-beaches, sun-bursting groves, and elegant architecture backdrops around Euclid, OH.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column statistics and customer testimonials */}
            <div className="space-y-8 bg-[#13151D] p-8 md:p-12 rounded-3xl border border-stone-800 shadow-sm relative">
              <div className="absolute top-6 right-6 text-stone-800">
                <Star className="w-16 h-16 fill-current opacity-20" />
              </div>

              <h3 className="font-display font-black text-2xl text-white tracking-tight">
                Euclid Client Chronicles
              </h3>

              {/* Loop testimonials slider */}
              <div className="space-y-6">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="bg-[#171a25] p-6 rounded-2xl shadow-sm border border-stone-850 relative">
                    <div className="flex items-center gap-1 text-amber-500 mb-3 text-xs">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-stone-300 italic font-serif">"{t.quote}"</p>
                    <div className="mt-4 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-display font-black text-white">{t.name}</span>
                        <span className="text-stone-400 font-mono text-[10px] uppercase ml-2">| {t.role}</span>
                      </div>
                      <span className="font-mono text-[9px] text-[#14a39a] tracking-wider uppercase bg-[#14a39a]/10 px-2.5 py-1 rounded-full border border-[#14a39a]/20">
                        Verified Studio Booking
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Experience metrics badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 text-center border-t border-stone-800">
                <div>
                  <p className="font-display font-black text-3xl text-[#14a39a]" id="exp-metric-satisfaction">100%</p>
                  <p className="text-[10px] text-stone-400 font-mono uppercase mt-0.5">Satisfaction</p>
                </div>
                <div>
                  <p className="font-display font-black text-3xl text-[#14a39a]" id="exp-metric-photos">3,500+</p>
                  <p className="text-[10px] text-stone-400 font-mono uppercase mt-0.5">Edits Delivered</p>
                </div>
                <div>
                  <p className="font-display font-black text-3xl text-[#14a39a]" id="exp-metric-years">8+ Yrs</p>
                  <p className="text-[10px] text-stone-400 font-mono uppercase mt-0.5">Pro Experience</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CORE CONTACT & BOOKING FORM SECTION */}
      <section id="booking-section" className="py-20 md:py-32 bg-[#07090E] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form configuration header instructions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-amber-500 bg-[#13151D] border border-amber-500/20 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>EASY STEP ONLINE DEPOSIT RESERVATION</span>
              </div>
              
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                Secure Your Date & Time
              </h2>
              
              <p className="text-stone-300 leading-relaxed font-sans text-base">
                To secure one of our remaining <strong>{slotsRemaining} summer slots</strong>, fill out our sleek interactive request. Upon submission, a customized studio receipt is compiled automatically, and direct contact details are channeled to the EMMYSS director at <strong>info@emmyss.com</strong>.
              </p>

              {/* Pre-purchase list */}
              <div className="space-y-4 pt-4 font-sans text-sm">
                <div className="flex items-center gap-3 text-stone-350">
                  <div className="p-1.5 rounded-lg bg-[#14a39a]/10 text-[#14a39a]">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Standard 48-Hour Online Proofing Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-stone-350">
                  <div className="p-1.5 rounded-lg bg-[#14a39a]/10 text-[#14a39a]">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Complimentary Summer Wardrobe Styling Guide</span>
                </div>
                <div className="flex items-center gap-3 text-stone-350">
                  <div className="p-1.5 rounded-lg bg-[#14a39a]/10 text-[#14a39a]">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Full Commercial & Social Print Authorization Rights</span>
                </div>
              </div>

              {/* Euclid Studio Coordinates Pin Card */}
              <div className="p-6 bg-[#13151D] rounded-2xl border border-stone-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                <h4 className="font-display font-black text-sm text-white tracking-wide uppercase font-mono">
                  EMMYSS Euclid Studio HQ
                </h4>
                
                <div className="mt-3 space-y-2 text-xs text-stone-400 font-sans">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#14a39a]" />
                    <span>25701 N Lakeland Blvd, Suite 312, Euclid, OH 44132</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#14a39a]" />
                    <span>(216) 440-0155</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#14a39a]" />
                    <span>info@emmyss.com</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Form Display Side */}
            <div className="lg:col-span-7 bg-[#13151D] p-6 md:p-10 rounded-3xl border border-stone-800 shadow-[0_0_25px_rgba(20,163,154,0.05)] z-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!bookingConfirmed ? (
                  /* Sleek, interactive contact form */
                  <motion.form 
                    key="booking-form-element"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitBooking(e);
                    }}
                    action="https://formspree.io/f/mwvjzqbw" // Live Formspree Integration
                    method="POST"
                    className="space-y-6"
                    id="booking-form"
                  >
                  <div className="flex justify-between items-center pb-4 border-b border-stone-850">
                    <div>
                      <h3 className="font-display font-black text-xl text-white">
                        Summer Slot Request
                      </h3>
                      <p className="text-xs text-stone-400 font-mono mt-0.5">DIRECT ROUTING TO FORMSPREE INBOX</p>
                    </div>
                    <div className="bg-[#14a39a]/10 text-[#14a39a] px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border border-[#14a39a]/20">
                      SECURED CONNECTION
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">
                        Full Name *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-500">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full pl-10 pr-4 py-3 bg-[#07090E] border border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a39a] focus:bg-[#0C0E17] transition-all text-white font-medium"
                        />
                      </div>
                    </div>

                    {/* Email address */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">
                        Email Address *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-500">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-[#07090E] border border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a39a] focus:bg-[#0C0E17] transition-all text-white font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone number */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-500">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(216) 440-0155"
                          className="w-full pl-10 pr-4 py-3 bg-[#07090E] border border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a39a] focus:bg-[#0C0E17] transition-all text-white font-medium"
                        />
                      </div>
                    </div>

                    {/* Selected Service dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="packageId" className="block text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">
                        Selected Service Package *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-500">
                          <Sliders className="w-4 h-4" />
                        </span>
                        <select
                          id="packageId"
                          name="packageId"
                          value={formData.packageId}
                          onChange={(e) => {
                            const newPkg = PACKAGES.find(p => p.id === e.target.value) || PACKAGES[0];
                            setSelectedPackage(newPkg);
                            setFormData({ ...formData, packageId: e.target.value });
                          }}
                          className="w-full pl-10 pr-8 py-3 bg-[#07090E] border border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a39a] focus:bg-[#0C0E17] transition-all text-white font-medium appearance-none"
                        >
                          {PACKAGES.map(p => (
                            <option key={p.id} value={p.id} className="bg-[#13151D] text-white">
                              {p.title} (${p.price})
                            </option>
                          ))}
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#14a39a]">
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date selection and creative goal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="datePreference" className="block text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">
                        Date Preference (June / July) *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-500">
                          <Calendar className="w-4 h-4" />
                        </span>
                        <input
                          type="date"
                          id="datePreference"
                          name="datePreference"
                          required
                          value={formData.datePreference}
                          onChange={(e) => setFormData({ ...formData, datePreference: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#07090E] border border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a39a] focus:bg-[#0C0E17] transition-all text-white font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="creativeGoal" className="block text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">
                        Primary Creative Goal
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-500">
                          <Compass className="w-4 h-4" />
                        </span>
                        <select
                          id="creativeGoal"
                          name="creativeGoal"
                          value={formData.creativeGoal}
                          onChange={(e) => setFormData({ ...formData, creativeGoal: e.target.value })}
                          className="w-full pl-10 pr-8 py-3 bg-[#07090E] border border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a39a] focus:bg-[#0C0E17] transition-all text-white font-medium appearance-none"
                        >
                          <option value="natural-posing" className="bg-[#13151D] text-white">Relaxed Candid Posing</option>
                          <option value="dramatic-lighting" className="bg-[#13151D] text-white">Sunset/Golden Hour Dramatics</option>
                          <option value="corporate-clean" className="bg-[#13151D] text-white">Commercial Clean Studio Look</option>
                          <option value="festive-balloon" className="bg-[#13151D] text-white">Festive Balloons & Props</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#14a39a]">
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">
                      Special Requests / Creative Visions
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share elements of your outfit, mood boards, family size, or special concerns..."
                      className="w-full p-4 bg-[#07090E] border border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a39a] focus:bg-[#0C0E17] transition-all text-white font-medium"
                    ></textarea>
                  </div>

                  {/* Dynamically configured price calculation panel */}
                  <div className="bg-[#181a25] p-5 rounded-2xl border border-stone-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-400 font-mono font-bold uppercase">Package Pricing Breakdown:</span>
                      <span className="bg-[#14a39a]/10 text-[#14a39a] font-mono px-2 py-0.5 rounded text-[10px] uppercase font-semibold border border-[#14a39a]/20">Pre-Calculated Rate</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-display font-black text-white text-sm leading-tight">{selectedPackage.title}</p>
                        <p className="text-xs text-stone-400 font-mono">{selectedPackage.duration} · {selectedPackage.edits}</p>
                      </div>
                      <span className="font-display font-black text-lg text-[#14a39a]">${selectedPackage.price}</span>
                    </div>
                  </div>
                  
                  {formError && (
                    <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 rounded-xl text-xs font-mono space-y-1">
                      <p className="font-bold flex items-center gap-1.5 text-red-400">
                        <span>⚠️ SUBMISSION ERROR</span>
                      </p>
                      <p className="font-sans text-[11px] leading-relaxed text-stone-300">{formError}</p>
                    </div>
                  )}

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer border-2 border-black ${
                      isSubmitting 
                        ? 'bg-stone-800 text-stone-500 cursor-not-allowed border-stone-700' 
                        : 'bg-[#14a39a] hover:bg-[#FF9F29] text-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-stone-500 border-t-transparent" />
                        <span>Formulating Booking Ticket...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Submit Session Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-stone-500 leading-normal">
                    * By submitting, your parameters are generated into a native mail dispatch. Direct correspondence is handled directly through info@emmyss.com. EMMYSS respects your data privacy.
                  </p>

                </motion.form>
              ) : (
                /* Sleek confirmation receipt layout */
                <motion.div 
                  key="confirmation-ticket-element"
                  initial={{ opacity: 0, scale: 0.92, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="space-y-6 text-center py-8 relative"
                  id="booking-confirmation-ticket"
                >
                  <ConfettiEmitter />
                  <div className="mx-auto bg-[#14a39a]/10 border border-[#14a39a]/30 text-[#14a39a] p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    <Check className="w-8 h-8 font-black" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-black text-3xl text-white tracking-tight">
                      Booking Ticket Issued!
                    </h3>
                    <p className="text-sm text-stone-300 max-w-md mx-auto">
                      Congratulations <strong>{formData.fullName}</strong>. Your summer portrait request has been compiled and routed directly to the EMMYSS Director inbox at <strong>info@emmyss.com</strong>.
                    </p>
                  </div>

                  {/* Custom confirmation card */}
                  <div className="max-w-md mx-auto bg-[#181a26] rounded-2xl border-2 border-dashed border-stone-800 p-6 text-left relative overflow-hidden">
                    {/* Artistic ticket notches */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#13151D] border-r border-stone-850 rounded-full -translate-y-1/2" />
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#13151D] border-l border-stone-850 rounded-full -translate-y-1/2" />
                    
                    <div className="flex justify-between items-center pb-4 border-b border-stone-800">
                      <div>
                        <span className="font-mono text-[9px] text-[#14a39a] uppercase tracking-wider block leading-none">OFFICIAL TICKET ID</span>
                        <span className="font-mono text-xs font-bold text-white">EMMYSS-SUMMER-{Math.floor(Math.random() * 8999) + 1000}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[9px] text-stone-500 uppercase tracking-wider block">STATUS</span>
                        <span className="text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">PENDING DEPOSIT</span>
                      </div>
                    </div>

                    <div className="py-4 space-y-3.5 text-xs text-stone-300 font-mono">
                      <div className="flex justify-between">
                        <span>CLIENT NAME:</span>
                        <strong className="text-white">{formData.fullName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>EMAIL ADDRESS:</span>
                        <strong className="text-white">{formData.email}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>PHONE DETAILS:</span>
                        <strong className="text-white">{formData.phone}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>SELECTED SESSION:</span>
                        <strong className="text-white">{selectedPackage.title}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>DATE PREFERENCE:</span>
                        <strong className="text-white">{formData.datePreference}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>STYLE CODES:</span>
                        <strong className="text-white">
                          {formData.creativeGoal === 'natural-posing' ? 'Relaxed Candid' : formData.creativeGoal === 'dramatic-lighting' ? 'Dramatic Golden' : 'Commercial clean'}
                        </strong>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-800 flex justify-between items-end">
                      <div>
                        <span className="font-mono text-[9px] text-stone-500 block leading-none">TOTAL SUM DUE:</span>
                        <span className="font-display font-black text-2xl text-[#14a39a] block">${selectedPackage.price}</span>
                      </div>
                      <span className="bg-[#07090E] border border-stone-800 text-[#14a39a] font-mono text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider block">
                        No taxes added
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4 max-w-sm mx-auto">
                    <p className="text-xs text-stone-400">
                      The director will contact you via phone or email within <strong>24 business hours</strong> to finalize the location park address, deposit instructions, and clothing color coordinating guide.
                    </p>
                    
                    <button
                      onClick={handleResetForm}
                      className="text-xs text-stone-400 hover:text-[#14a39a] font-mono underline block mx-auto cursor-pointer"
                    >
                      Want to modify parameters or submit another ticket?
                    </button>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* EXTENSIVE FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 md:py-28 bg-[#0D0F16] border-t border-[#14a39a]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 text-[#14a39a] font-mono text-xs font-bold tracking-widest uppercase">
              <Compass className="w-4 h-4 text-[#14a39a]" />
              <span>KNOWLEDGE RETRIEVAL PANEL</span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
              Pre-shoot Queries Answered
            </h2>
            
            <p className="text-stone-300">
              Clear standard information on logistics, editing, copyright rights, and inclement weather.
            </p>
          </div>

          <div className="space-y-4" id="faq-accordions">
            {FAQ.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#13151D] rounded-2xl border border-stone-800 overflow-hidden shadow-sm hover:shadow hover:border-stone-700 transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none cursor-pointer"
                >
                  <span className="font-display font-black text-white md:text-lg">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg border border-stone-800 transition-transform duration-300 ${
                    activeFaq === idx ? 'transform rotate-180 bg-[#14a39a] text-black border-black' : 'text-stone-400 bg-stone-900'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-stone-850 bg-[#171a25]"
                    >
                      <div className="p-6 text-sm text-stone-300 leading-relaxed font-sans">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer id="footer" className="bg-[#0F1115] text-white pt-20 pb-12 relative overflow-hidden">
        {/* Absolute design aesthetic background grid lines */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
            
            {/* Column 1 Logo details */}
            <div className="md:col-span-4 space-y-6">
              <a href="#" className="flex items-start outline-none">
                <BrandLogo isDarkFooter={true} />
              </a>

              <p className="text-stone-400 text-sm leading-relaxed font-sans max-w-sm">
                Euclid & greater Cleveland's premier portrait studio event. Dedicated to delivering high-end catalog quality editing and relaxed posing loops at transparent summer rates.
              </p>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-2 text-xs font-mono text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-[#14a39a]" />
                <span>Verified Portrait Studio 2026</span>
              </div>
            </div>

            {/* Column 2 Direct Anchors */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-mono text-xs uppercase text-neutral-400 tracking-wider">Quick Direct Pathways</h4>
              <ul className="space-y-2.5 text-sm text-stone-300 font-sans">
                <li><a href="#gallery" className="hover:text-[#14a39a] transition-colors">Vignettes Gallery</a></li>
                <li><a href="#before-after" className="hover:text-[#14a39a] transition-colors">Interactive Slider</a></li>
                <li><a href="#services" className="hover:text-[#14a39a] transition-colors">Rates & Features</a></li>
                <li><a href="#why-us" className="hover:text-[#14a39a] transition-colors">Philosophy & Reviews</a></li>
                <li><a href="#booking-section" className="hover:text-[#14a39a] transition-colors">Instant Booking Form</a></li>
              </ul>
            </div>

            {/* Column 3 Contact Information from the flyer */}
            <div className="md:col-span-5 space-y-4" id="footer-contact-info">
              <h4 className="font-mono text-xs uppercase text-neutral-400 tracking-wider">Euclid HQ Communication Coordinates</h4>
              
              <div className="space-y-3 text-sm text-stone-300 font-sans">
                <p className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#14a39a] shrink-0 mt-0.5" />
                  <span>25701 N Lakeland Blvd, Suite 312, Euclid, OH 44132 United States</span>
                </p>

                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#14a39a] shrink-0" />
                  <a href="tel:2164400155" className="hover:text-[#14a39a] hover:underline transition-all">2164400155</a>
                </p>

                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#14a39a] shrink-0" />
                  <a href="mailto:info@emmyss.com" className="hover:text-[#14a39a] hover:underline transition-all">info@emmyss.com</a>
                </p>

                <div className="pt-2 flex gap-4 text-stone-400">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#14a39a] transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#14a39a] transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-mono gap-4">
            <div>
              <p>© 2026 EMMYSS. All rights reserved.</p>
              <p className="text-[9px] mt-1 text-stone-600">Euclid Heights Portrait Division · Cleveland Area Outdoor Campaign</p>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="hover:text-stone-300">Privacy Protocol</a>
              <span>·</span>
              <a href="#" className="hover:text-stone-300">Service Terms</a>
              <span>·</span>
              <a href="#promo-banner" className="text-[#14a39a] flex items-center gap-1">
                <Zap className="w-3" /> Back to top
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* PORTFOLIO ACCESSIBLE LIGHTBOX COMPONENT */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setActiveLightboxImage(null)}
          >
            <button 
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer"
              onClick={() => setActiveLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeLightboxImage} 
                alt="EMMYSS Portrait zoom resolution" 
                referrerPolicy="no-referrer"
                className="w-full max-h-[85vh] object-contain"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white backdrop-blur-md p-3 rounded-lg text-xs font-mono flex items-center justify-between mx-auto max-w-sm">
                <span>⭐ EMMYSS Portrait Studio</span>
                <span>Zoom Level: Native Focus</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
