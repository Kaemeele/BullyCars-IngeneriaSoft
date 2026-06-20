import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingView from './components/LandingView';
import GalleryView from './components/GalleryView';
import AccessoriesView from './components/AccessoriesView';
import CommunityView from './components/CommunityView';
import ScheduleView from './components/ScheduleView';
import BullyConnectView from './components/BullyConnectView';
import CertificationsView from './components/CertificationsView';
import EasyModeAssistant from './components/EasyModeAssistant';
import { CartItem } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bullycars_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeSubtab, setActiveSubtab] = useState<'bot' | 'insumos' | 'herramientas' | 'repuestos' | 'detaling' | 'presupuesto'>('bot');

  // Accessibility states
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    return localStorage.getItem('bullycars_large_text') === 'true';
  });
  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('bullycars_high_contrast') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('bullycars_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bullycars_large_text', String(isLargeText));
  }, [isLargeText]);

  useEffect(() => {
    localStorage.setItem('bullycars_high_contrast', String(isHighContrast));
  }, [isHighContrast]);

  // Automatically scroll to the top of the screen when the active view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentTab]);

  // Multi view rendering matching current state
  const renderCurrentView = () => {
    switch (currentTab) {
      case 'landing':
        return <LandingView setTab={setCurrentTab} />;
      case 'gallery':
        return <GalleryView setTab={setCurrentTab} />;
      case 'accessories':
        return (
          <AccessoriesView
            cart={cart}
            setCart={setCart}
            activeSubtab={activeSubtab}
            setActiveSubtab={setActiveSubtab}
          />
        );
      case 'community':
        return <CommunityView setTab={setCurrentTab} />;
      case 'schedule':
        return <ScheduleView setTab={setCurrentTab} />;
      case 'connect':
        return <BullyConnectView />;
      case 'certifications':
        return <CertificationsView setTab={setCurrentTab} />;
      default:
        return <LandingView setTab={setCurrentTab} />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen bg-[#0b0c0e] text-white selection:bg-amber-brand selection:text-black font-sans leading-normal tracking-normal overflow-x-hidden ${
      isLargeText ? 'accessibility-large-text' : ''
    } ${isHighContrast ? 'accessibility-high-contrast' : ''}`}>
      {/* Dynamic Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setTab={setCurrentTab}
        cart={cart}
        setActiveSubtab={setActiveSubtab}
      />

      {/* Main Core Section Content With Fade Keyframe Animation */}
      <main className="flex-1 transition-opacity duration-300 animate-[fadeIn_0.5s_ease-out]">
        {renderCurrentView()}
      </main>

      {/* Shared Persistent Footer */}
      <Footer setTab={setCurrentTab} />

      {/* Accessibility assistance panel */}
      <EasyModeAssistant
        currentTab={currentTab}
        setTab={setCurrentTab}
        isLargeText={isLargeText}
        setIsLargeText={setIsLargeText}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        setActiveSubtab={setActiveSubtab}
      />
    </div>
  );
}
