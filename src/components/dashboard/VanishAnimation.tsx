"use client";

import React, { useRef, useCallback, useEffect } from "react";

interface VanishAnimationProps {
  value: string;
  trigger: boolean;
  inputElement: HTMLInputElement | null;
  onAnimationComplete: () => void;
}

const VanishAnimation: React.FC<VanishAnimationProps> = ({
  value,
  trigger,
  inputElement,
  onAnimationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<
    {
      x: number;
      y: number;
      r: number;
      color: string;
    }[]
  >([]);

  const draw = useCallback(() => {
    if (!inputElement || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const computedStyles = getComputedStyle(inputElement);
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#000";
    ctx.fillText(value, 16, canvas.height / 2 + fontSize / 2 - 4);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    const newData: typeof newDataRef.current = [];

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        if (pixelData[index + 3] !== 0) {
          newData.push({
            x,
            y,
            r: 2,
            color: `rgba(${pixelData[index]}, ${pixelData[index + 1]}, ${pixelData[index + 2]}, ${
              pixelData[index + 3] / 255
            })`,
          });
        }
      }
    }
    newDataRef.current = newData;
  }, [value, inputElement]);

  const animate = (start: number) => {
    const animateFrame = (pos: number) => {
      requestAnimationFrame(() => {
        const newArr: typeof newDataRef.current = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) continue;
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.5 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;

        const ctx = canvasRef.current?.getContext("2d");
        if (ctx && canvasRef.current) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          newDataRef.current.forEach((t) => {
            const { x, y, r, color } = t;
            ctx.beginPath();
            ctx.rect(x, y, r, r);
            ctx.fillStyle = color;
            ctx.fill();
          });
        }
        if (newDataRef.current.some((pixel) => pixel.r > 0)) {
          animateFrame(pos - 8);
        } else {
          onAnimationComplete();
        }
      });
    };
    animateFrame(start);
  };

  useEffect(() => {
    if (trigger && inputElement) {
      draw();
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  }, [trigger, draw, inputElement]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default VanishAnimation;
