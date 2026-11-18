"use client";

import { useEffect, useState } from "react";

interface Props {
  words: string[];
  /** How long each word stays before swapping. Default 2.4s. */
  intervalMs?: number;
}

// All words are rendered into a single grid cell so the container's
// width is fixed by the longest word and swapping never causes layout
// shift. The outgoing word fades out, then the next one fades in (its
// delay is the fade-out's duration), so two words never overlap.
// Inactive words are also `invisible` once faded (visibility switches at
// the end of the transition): inside a gradient heading (bg-clip-text) the
// parent's background is painted through every descendant glyph whatever
// its opacity, which left all the words showing on top of each other.
export function RotatingWord({ words, intervalMs = 2400 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words, intervalMs]);

  if (words.length === 1) {
    return <span>{words[0]}</span>;
  }

  return (
    <span
      className="relative inline-grid align-baseline"
      aria-live="polite"
    >
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i === index ? undefined : true}
          className={`col-start-1 row-start-1 transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${
            i === index ? "opacity-100 delay-300" : "invisible opacity-0"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
