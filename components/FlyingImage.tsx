"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FlyingImageProps {
  src: string;
  startRect: DOMRect;
  targetSelector: string;
  onComplete: () => void;
}

import Image from "next/image";

export function FlyingImage({ src, startRect, targetSelector, onComplete }: FlyingImageProps) {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: startRect.top,
    left: startRect.left,
    width: startRect.width,
    height: startRect.height,
    zIndex: 9999,
    pointerEvents: 'none',
    transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
    opacity: 1,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Start animation on next frame
    const animationFrame = requestAnimationFrame(() => {
      const target = document.querySelector(targetSelector);
      if (target) {
        const targetRect = target.getBoundingClientRect();
        
        setStyle(prev => ({
          ...prev,
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.left + targetRect.width / 2,
          width: 20,
          height: 20,
          opacity: 0, // Fade out completely at destination
          borderRadius: '50%'
        }));
      }
    });

    // Complete after transition
    timer = setTimeout(() => {
      onComplete();
    }, 850); // Slightly longer than transition

    return () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(timer);
    };
  }, [targetSelector, onComplete]);

  // Use portal to be safe against overflow:hidden parents
  return createPortal(
    <div style={style} className="shadow-xl overflow-hidden">
        <Image 
            src={src} 
            alt="Product animation" 
            fill 
            className="object-cover"
            priority // Load fast for animation
        />
    </div>,
    document.body
  );
}
