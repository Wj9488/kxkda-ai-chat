"use client"

import { useEffect, useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Array of color options
    const colors = ['#d90429', '#70e000', '#fb8500', '#52b788', '#ee6c4d', "#38a3a5", "#9d4edd"];

    // Randomly select a color from the array
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.935;

    if(window.innerWidth < 800 ) {
        canvas.height = window.innerHeight * 0.925;
    }

    const letters = [ ":",'.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'];
    const fontSize = 15;
    context.font = `${fontSize}px monospace`;

    const columns = canvas.width / fontSize;
    const rows = canvas.height / fontSize;

    const draw = () => {
      // Get the color of the body
      const bodyColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

      context.fillStyle = bodyColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.fillStyle = randomColor;

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const letter = letters[Math.floor(Math.random() * letters.length)];
          context.fillText(letter, i * fontSize, j * fontSize);
        }
      }
    };

    setInterval(draw, 250);
  }, []);

  return ( 
    <div className='mt-1'>
        <canvas ref={canvasRef} /> 
    </div>
  );
}
