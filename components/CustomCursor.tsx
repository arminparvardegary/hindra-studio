"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
        const text = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
        if (text) setCursorText(text);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide on mobile/touch devices
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot - always visible */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-black"
          animate={{
            width: isClicking ? 6 : 8,
            height: isClicking ? 6 : 8,
          }}
          style={{
            boxShadow: "0 0 0 2px white, 0 0 0 3px rgba(0,0,0,0.3)",
          }}
        />
      </motion.div>
      
      {/* Cursor ring - follows with delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isHovering ? "#DCDFFF" : "rgba(0, 0, 0, 0.3)",
          backgroundColor: isHovering ? "rgba(220, 223, 255, 0.2)" : "transparent",
        }}
        animate={{
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {cursorText && (
          <span className="text-xs font-medium text-black">{cursorText}</span>
        )}
      </motion.div>
    </>
  );
}
