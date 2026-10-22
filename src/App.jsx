import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import InvitationScene from "./scenes/InvitationScene";
import BirthdayWorldScene from "./scenes/BirthdayWorldScene";
import MemoryMuseumScene from "./scenes/MemoryMuseumScene";
import BestFriendAwardsScene from "./scenes/BestFriendAwardsScene";
import BirthdayChallengeScene from "./scenes/BirthdayChallengeScene";
import PersonalLetterScene from "./scenes/PersonalLetterScene";
import BirthdayFinaleScene from "./scenes/BirthdayFinaleScene";

// 7 Discrete Scenes
const SCENES = {
  INVITATION: 0,
  BIRTHDAY_WORLD: 1,
  MEMORY_MUSEUM: 2,
  AWARDS: 3,
  CAKE_CHALLENGE: 4,
  PERSONAL_LETTER: 5,
  FINALE: 6,
};

export default function App() {
  const [currentScene, setCurrentScene] = useState(SCENES.INVITATION);
  const [instanceKey, setInstanceKey] = useState(0);

  // Scroll to top upon every discrete scene transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScene]);

  const goTo = useCallback((scene) => {
    setCurrentScene(scene);
  }, []);

  const handleRestart = useCallback(() => {
    setInstanceKey((k) => k + 1);
    setCurrentScene(SCENES.INVITATION);
  }, []);

  const renderScene = () => {
    switch (currentScene) {
      case SCENES.INVITATION:
        return (
          <InvitationScene
            key={`invitation-${instanceKey}`}
            onNext={() => goTo(SCENES.BIRTHDAY_WORLD)}
          />
        );
      case SCENES.BIRTHDAY_WORLD:
        return (
          <BirthdayWorldScene
            key="birthday-world"
            onNext={() => goTo(SCENES.MEMORY_MUSEUM)}
          />
        );
      case SCENES.MEMORY_MUSEUM:
        return (
          <MemoryMuseumScene
            key="memory-museum"
            onNext={() => goTo(SCENES.AWARDS)}
          />
        );
      case SCENES.AWARDS:
        return (
          <BestFriendAwardsScene
            key="awards"
            onNext={() => goTo(SCENES.CAKE_CHALLENGE)}
          />
        );
      case SCENES.CAKE_CHALLENGE:
        return (
          <BirthdayChallengeScene
            key={`challenge-${instanceKey}`}
            onNext={() => goTo(SCENES.PERSONAL_LETTER)}
          />
        );
      case SCENES.PERSONAL_LETTER:
        return (
          <PersonalLetterScene
            key={`letter-${instanceKey}`}
            onNext={() => goTo(SCENES.FINALE)}
          />
        );
      case SCENES.FINALE:
        return (
          <BirthdayFinaleScene
            key={`finale-${instanceKey}`}
            onRestart={handleRestart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grain-overlay min-h-[100svh] min-h-screen w-full relative overflow-x-hidden">
      {/* Discrete Scene Transitions with smooth fade and slight scale */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="w-full min-h-[100svh] min-h-screen flex flex-col"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
