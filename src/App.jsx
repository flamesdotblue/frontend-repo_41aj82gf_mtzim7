import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Wizard from "./components/Wizard";
import TemplatesGrid from "./components/TemplatesGrid";

function App() {
  const wizardRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleComplete = (data) => {
    setUserData(data);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Navbar onStart={handleStart} />
      <Hero onStart={handleStart} />
      <div ref={wizardRef}>{started && <Wizard onComplete={handleComplete} />}</div>
      <TemplatesGrid userData={userData} />
      <footer className="py-10 text-center text-sm text-black/60 dark:text-white/60">
        Built with love by ResumeCraft AI • Generate ATS-ready resumes in minutes
      </footer>
    </div>
  );
}

export default App;
