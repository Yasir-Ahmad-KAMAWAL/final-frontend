export default function Logo({ white = false, compact = false }) {
  const brandColor = white ? 'white' : '#1D4ED8'
  const subColor = white ? 'rgba(255,255,255,0.45)' : '#9CA3AF'

  if (compact) {
    return (
      <svg width="28" height="28" viewBox="0 0 42 78" fill="none" className="shrink-0">
        <path d="M4 20 L22 39 L4 58" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.25" />
        <path d="M14 20 L32 39 L14 58" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55" />
        <path d="M24 20 L42 39 L24 58" stroke="#F97316" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  }

  return (
    <svg width="170" height="56" viewBox="0 4 192 70" fill="none" className="h-auto w-[140px] sm:w-[160px]">
      <path d="M4 20 L22 39 L4 58" stroke={brandColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.25" />
      <path d="M14 20 L32 39 L14 58" stroke={brandColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55" />
      <path d="M24 20 L42 39 L24 58" stroke="#F97316" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="58" y="36" fontFamily="-apple-system,BlinkMacSystemFont,'Inter',sans-serif" fontSize="22" fontWeight="700" fill={brandColor} letterSpacing="-0.4">
        Kabul<tspan fill="#F97316">Track</tspan>
      </text>
      <text x="59" y="53" fontFamily="-apple-system,BlinkMacSystemFont,'Inter',sans-serif" fontSize="9" fill={subColor} letterSpacing="0.2em">
        FORWARD MOTION·KT
      </text>
    </svg>
  )
}
