import { useState } from "react";
import Envelope from "./components/Envelope";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import MusicPlayer from "./components/common/MusicPlayer";
import Hero from "./components/sections/Hero";
import Invitation from "./components/sections/Invitation";
import OurStory from "./components/sections/OurStory";
import WeddingDetails from "./components/sections/WeddingDetails";
import Countdown from "./components/sections/Countdown";
import DressCode from "./components/sections/DressCode";
import GiftInfo from "./components/sections/GiftInfo";
import Closing from "./components/sections/Closing";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {!opened && <Envelope onOpen={() => setOpened(true)} />}

      {opened && (
        <div className="min-h-screen bg-ivory">
          <Navigation />
          <main>
            <Hero />
            <Invitation />
            <OurStory />
            <WeddingDetails />
            <Countdown />
            <DressCode />
            <GiftInfo />
            <Closing />
          </main>
          <Footer />
          <MusicPlayer />
        </div>
      )}
    </>
  );
}
