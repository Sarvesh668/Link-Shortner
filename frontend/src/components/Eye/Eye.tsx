import React from 'react';

type EyeProps = {
  open: boolean;
  size?: number;
};

export default function Eye({ open, size = 220 }: EyeProps) {
  // Geometric constants
  const eyeWidth = 260;
  const eyeHeight = 120;
  
  // Center X is now exactly half of eyeWidth to fix the "rightwards" look
  const cx = 130; 
  const cy = 75;
  const irisR = 32;

  return (
    <svg
      width={size}
      height={size * (eyeHeight / eyeWidth)}
      viewBox={`0 0 ${eyeWidth} ${eyeHeight}`}
    >
      <defs>
        {/* Eye aperture clip path 
          Adjusted control points (cx) to 130 for perfect symmetry.
          Top Curve: lowered slightly to make the iris "fit" under the lid.
        */}
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

        {/* Iris radial gradient */}
        <radialGradient id="iris-grad" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#ff4b4b" />
          <stop offset="55%" stopColor="#c9152b" />
          <stop offset="100%" stopColor="#6e0a14" />
        </radialGradient>

        {/* Subtle iris shadow from upper lid */}
        <linearGradient id="iris-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="40%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>

      {/* Eye sclera (The White Part) 
        Must match the clipPath d exactly to prevent gaps 
      */}
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
          {/* Iris base */}
          <circle
            cx={cx}
            cy={cy}
            r={irisR}
            fill="url(#iris-grad)"
          />

          {/* Dark outer iris ring */}
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

          {/* Iris shadow (top) - Blends the iris into the upper lid */}
          <rect
            x={cx - irisR}
            y={cy - irisR}
            width={irisR * 2}
            height={irisR * 2}
            fill="url(#iris-shadow)"
          />

          {/* Pupil */}
          <circle cx={cx} cy={cy} r={6} fill="#050505" />

          {/* Specular highlight */}
          <circle
            cx={cx - irisR * 0.35}
            cy={cy - irisR * 0.35}
            r={2.2}
            fill="#ffffff"
            opacity="0.7"
          />
        </g>
      ) : (
        // Closed eye state
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
 * 3-tomoe Sharingan Geometry
 */
function generateTomoe(
  cx: number,
  cy: number,
  r: number
) {
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
        <circle
          cx={hx}
          cy={hy}
          r={headR}
          fill="#111"
          key={`head-${i}`}
        />

        <path
          d={`
            M ${hx} ${hy}
            Q ${tx} ${ty}
              ${hx + Math.cos(a) * headR * 0.6}
              ${hy + Math.sin(a) * headR * 0.6}
          `}
          fill="none"
          stroke="#111"
          strokeWidth={headR}
          strokeLinecap="round"
          key={`tail-${i}`}
        />
      </React.Fragment>
    );
  }

  return tomoe;
}