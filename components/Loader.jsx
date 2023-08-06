"use client";

import { useEffect, useState } from "react";

const getRandomSymbol = () => {
  const symbols = "!@#$%^&*()_+-=[]{};':\"\\|,<.>/?";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const getRandomDigit = () => Math.floor(Math.random() * 10);

const scramble = (text) => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += Math.random() > 0.5 ? getRandomSymbol() : getRandomDigit();
  }
  return result;
};

const Loader = () => {
  const [scrambledText, setScrambledText] = useState("KXKDA");

  useEffect(() => {
    const scrambleInterval = setInterval(() => {
      setScrambledText(scramble("KXKDA"));
    }, 100);

    return () => {
      clearInterval(scrambleInterval);
    };
  }, []);

  return (
    <section className="min-h-[100dvh] flex items-center justify-center">
      <p className="text-xl font-mono">{scrambledText}</p>
    </section>
  );
};

export default Loader;
