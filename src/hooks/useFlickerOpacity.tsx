import { useState, useEffect } from "react";

type Props = {
  phrase: string;
  maxFlickerTimes?: number;
  minFlickerTimes?: number;
  baseDelay?: number;
  finalOpacity?: number;
  focusOpacity?: number;
  paused?: boolean;
};

const useFlickerOpacity = ({
  phrase,
  maxFlickerTimes = 6,
  minFlickerTimes = 1,
  baseDelay = 500,
  finalOpacity = 1,
  paused = false,
}: Props) => {
  const words = phrase.split(" ");
  const [opacities, setOpacities] = useState(Array(words.length).fill(0));

  useEffect(() => {
    if (paused) return;
    const baseDelayUpdated = baseDelay;
    words.forEach((_, index) => {
      const flickerTimes =
        Math.floor(Math.random() * (maxFlickerTimes - minFlickerTimes + 1)) +
        minFlickerTimes;
      let flickerCount = 0;
      const delay = baseDelayUpdated + index * baseDelayUpdated;

      const interval = setInterval(() => {
        setOpacities((currentOpacities) => {
          const newOpacities = [...currentOpacities];
          newOpacities[index] = flickerCount % 2 === 0 ? 0.25 : 0;
          return newOpacities;
        });

        flickerCount++;

        if (flickerCount >= flickerTimes * 2) {
          clearInterval(interval);
          setOpacities((currentOpacities) => {
            const newOpacities = [...currentOpacities];
            // Determine final opacity based on focus state
            newOpacities[index] = finalOpacity;
            return newOpacities;
          });
        }
      }, 100);

      const totalDuration = delay + flickerTimes * 2 * 100;
      setTimeout(() => clearInterval(interval), totalDuration);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrase, maxFlickerTimes, baseDelay, finalOpacity, paused]);

  return words.map((word, index) => ({
    word,
    opacity: opacities[index],
  }));
};

export default useFlickerOpacity;
