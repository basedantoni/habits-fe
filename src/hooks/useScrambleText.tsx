import { useState, useEffect } from "react";
import { clsx } from "clsx";

type Props = {
  title: string;
  animationDelay: number;
  exit?: boolean;
  cb?: (val: boolean) => void;
  isScrambling?: boolean;
  isSubNav?: boolean;
  paused?: boolean;
  once?: boolean;
};

const useScrambleText = ({ title, animationDelay, paused, once }: Props) => {
  const [letters, setLetters] = useState(Array(title.length).fill(" "));
  const [run, setRun] = useState(false);

  const possibleLetters = "!@#$%^&*()_=+[{]}|;:<>?/";

  // function getRandomColor() {
  //   var letters = "0123456789ABCDEF";
  //   var color = "#";
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  useEffect(() => {
    if (paused) return;
    if (once && run) return;

    const staggerDelay = 20; // Delay between each letter starting to scramble
    const scrambleDuration = 400; // Duration for which each letter scrambles before settling
    const start = Date.now();
    const interval = setInterval(() => {
      setLetters(() => {
        const timeElapsed = Date.now() - start;

        const newLetters = title.split("").map((finalLetter, index) => {
          // Determine the time to start and stop scrambling this letter
          const scrambleStartTime = animationDelay + index * staggerDelay;
          const scrambleEndTime = scrambleStartTime + scrambleDuration;

          if (timeElapsed >= scrambleEndTime) {
            // If the scrambling duration has passed, show the final letter
            return finalLetter;
          } else if (timeElapsed >= scrambleStartTime) {
            // If it's time to scramble this letter, do so
            return (
              <span
                className={clsx(
                  "inline-block text-sm bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50"
                )}
                style={{
                  color: "#c3c3c3",
                }}
                key={index}
              >
                {
                  possibleLetters[
                    Math.floor(Math.random() * possibleLetters.length)
                  ]
                }
              </span>
            );
          } else {
            // Otherwise, keep the letter as invisible
            return " ";
          }
        });
        // Check if the whole text has been revealed
        if (newLetters.join("") === title) {
          clearInterval(interval);
          setRun(true);
        }
        return newLetters;
      });
    }, 15);
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, possibleLetters, animationDelay, paused]);
  return letters;
};

export default useScrambleText;
