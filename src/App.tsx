import { useCallback, useEffect, useState } from 'react';
import { Countdown } from './components/countdown/Countdown';
import { EventDetails } from './components/event/EventDetails';
import { Footer } from './components/footer/Footer';
import { PhotoGallery } from './components/gallery/PhotoGallery';
import { Hero } from './components/hero/Hero';
import { Intro } from './components/intro/Intro';
import { RSVPSection } from './components/rsvp/RSVPSection';
import { OurStory } from './components/story/OurStory';
import { BackToTop } from './components/ui/BackToTop';
import { CustomCursor } from './components/ui/CustomCursor';
import { Loader } from './components/ui/Loader';
import { SectionNav } from './components/ui/SectionNav';
import { useGuestName } from './hooks/useGuestName';

export default function App() {
  const guestName = useGuestName();
  const [loaded, setLoaded] = useState(false);
  const onLoaderDone = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    document.body.classList.toggle('has-custom-cursor', true);
    return () => document.body.classList.remove('has-custom-cursor');
  }, []);

  return (
    <>
      {!loaded && <Loader onDone={onLoaderDone} />}
      <div className={`app ${loaded ? 'is-ready' : ''}`}>
        <SectionNav />
        <Hero guestName={guestName} />
        <main>
          <Intro />
          <OurStory />
          <Countdown />
          <EventDetails />
          <PhotoGallery />
          <RSVPSection guestName={guestName} />
        </main>
        <Footer />
        <BackToTop />
        <CustomCursor />
      </div>
    </>
  );
}
