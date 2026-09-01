import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        // Start random glitch effect
        const glitchInterval = setInterval(() => {
          setIsGlitching(true);
          const glitchText = text
            .split('')
            .map(char => Math.random() < 0.1 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
            .join('');
          setDisplayText(glitchText);
          
          setTimeout(() => {
            setDisplayText(text);
            setIsGlitching(false);
          }, 50);
        }, 3000);

        return () => clearInterval(glitchInterval);
      }
    };

    typeText();
  }, [text]);

  return (
    <div className={`relative ${className}`}>
      <span
        className={`${isGlitching ? 'animate-pulse text-red-500' : ''} transition-colors duration-100`}
        style={{
          textShadow: isGlitching
            ? '2px 0 #ff0080, -2px 0 #00ffff, 0 2px #9d00ff'
            : '0 0 10px rgba(0, 255, 255, 0.5)',
        }}
      >
        {displayText}
      </span>
    </div>
  );
};

export default GlitchText;