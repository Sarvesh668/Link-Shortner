import React, { useEffect, useRef, useState } from 'react';

type EyeProps = {
  open: boolean;
  size?: number;
};

export default function Eye({ open, size = 220 }: EyeProps) {
  // --- STATIC GEOMETRY (Do not touch) ---
  const eyeWidth = 260;
  const eyeHeight = 120;
  const cx = 130; // Center X
  const cy = 75;  // Center Y
  const irisR = 32;
  
  // --- MOUSE TRACKING LOGIC ---
  const svgRef = useRef<SVGSVGElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // If eye is closed, don't waste resources tracking
    if (!open) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;

      // 1. Get the exact position of this eye on the screen
      const rect = svgRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      // 2. Calculate distance from mouse to eye center
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;

      // 3. Calculate the angle
      const angle = Math.atan2(dy, dx);

      // 4. Cap the movement distance so the pupil stays "in" the socket
      // Max distance = 30px feels natural without hitting the corners
      const maxDistance = 30; 
      const distance = Math.min(maxDistance, Math.hypot(dx, dy));

      // 5. Convert polar coordinates (angle/distance) back to X/Y
      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      setPupilPos({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [open]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size * (eyeHeight / eyeWidth)}
      viewBox={`0 0 ${eyeWidth} ${eyeHeight}`}
    >
      <defs>
        {/* CLIP PATH: Keeps the iris inside the eye shape */}
        <clipPath id="eye-clip">
          <path
            d={`
              M 20 ${cy}
              Q ${cx} 25 ${eyeWidth - 20} ${cy}
              Q ${cx} ${eyeHeight - 5} 20 ${cy}
              Z
            `}
          />
        </clipPath>

        <radialGradient id="iris-grad" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#ff4b4b" />
          <stop offset="55%" stopColor="#c9152b" />
          <stop offset="100%" stopColor="#6e0a14" />
        </radialGradient>

        <linearGradient id="iris-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="40%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>

      {/* SCLERA (White part) - Static */}
      <path
        d={`
          M 20 ${cy}
          Q ${cx} 25 ${eyeWidth - 20} ${cy}
          Q ${cx} ${eyeHeight - 5} 20 ${cy}
          Z
        `}
        fill="#f4f4f4"
        stroke="#111"
        strokeWidth="4"
      />

      {open ? (
        <g clipPath="url(#eye-clip)">
          {/* THE MOVING GROUP 
            Everything related to the Iris is inside this group.
            We shift the whole group using CSS transform.
          */}
          <g style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`, transition: 'transform 0.1s ease-out' }}>
            
            {/* Iris base */}
            <circle cx={cx} cy={cy} r={irisR} fill="url(#iris-grad)" />

            {/* Dark outer ring */}
            <circle
              cx={cx}
              cy={cy}
              r={irisR}
              fill="none"
              stroke="#3a060c"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Tomoe Pattern */}
            {generateTomoe(cx, cy, irisR)}

            {/* Iris shadow */}
            <rect
              x={cx - irisR}
              y={cy - irisR}
              width={irisR * 2}
              height={irisR * 2}
              fill="url(#iris-shadow)"
            />

            {/* Pupil */}
            <circle cx={cx} cy={cy} r={6} fill="#050505" />

            {/* Highlight */}
            <circle
              cx={cx - irisR * 0.35}
              cy={cy - irisR * 0.35}
              r={2.2}
              fill="#ffffff"
              opacity="0.7"
            />
          </g>
        </g>
      ) : (
        <path
          d={`M 30 ${cy} Q ${cx} ${cy + 15} ${eyeWidth - 30} ${cy}`}
          stroke="#111"
          strokeWidth="4"
          fill="none"
        />
      )}
    </svg>
  );
}

/**
 * 3-tomoe Sharingan Geometry (Unchanged)
 */
function generateTomoe(cx: number, cy: number, r: number) {
  const tomoe = [];
  const orbitR = r * 0.6;
  const headR = r * 0.16;

  for (let i = 0; i < 3; i++) {
    const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
    const hx = cx + Math.cos(a) * orbitR;
    const hy = cy + Math.sin(a) * orbitR;
    const tailAngle = a + Math.PI / 3;
    const tx = hx + Math.cos(tailAngle) * headR * 1.8;
    const ty = hy + Math.sin(tailAngle) * headR * 1.8;

    tomoe.push(
      <React.Fragment key={i}>
        <circle cx={hx} cy={hy} r={headR} fill="#111" />
        <path
          d={`M ${hx} ${hy} Q ${tx} ${ty} ${hx + Math.cos(a) * headR * 0.6} ${hy + Math.sin(a) * headR * 0.6}`}
          fill="none"
          stroke="#111"
          strokeWidth={headR}
          strokeLinecap="round"
        />
      </React.Fragment>
    );
  }
  return tomoe;
}