export default function BaskaLogo({ className = '', size = 120, color = '#0033A0' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.15}
      viewBox="0 0 200 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tree trunk */}
      <rect x="90" y="140" width="20" height="35" rx="2" fill={color} />
      <rect x="80" y="172" width="40" height="6" rx="2" fill={color} />

      {/* Main trunk going up */}
      <path d="M100 140 L100 85" stroke={color} strokeWidth="8" strokeLinecap="round" />

      {/* Left branches */}
      <path d="M100 120 Q75 105 55 85" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M100 105 Q80 90 65 70" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M100 90 Q85 75 75 55" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Right branches */}
      <path d="M100 120 Q125 105 145 85" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M100 105 Q120 90 135 70" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M100 90 Q115 75 125 55" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Leaves / dots */}
      <circle cx="50" cy="80" r="7" fill={color} />
      <circle cx="60" cy="62" r="6" fill={color} />
      <circle cx="72" cy="48" r="5.5" fill={color} />
      <circle cx="148" cy="80" r="7" fill={color} />
      <circle cx="138" cy="62" r="6" fill={color} />
      <circle cx="128" cy="48" r="5.5" fill={color} />
      <circle cx="100" cy="42" r="6" fill={color} />

      {/* Leaf tips */}
      <path d="M45 75 Q40 65 50 60" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M155 75 Q160 65 150 60" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M55 55 Q48 45 58 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M145 55 Q152 45 142 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M68 42 Q62 32 72 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M132 42 Q138 32 128 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M96 38 Q92 28 100 25" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M104 38 Q108 28 100 25" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* BASKA text */}
      <text
        x="100"
        y="208"
        textAnchor="middle"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="12"
        fill={color}
      >
        BASKA
      </text>
    </svg>
  )
}
