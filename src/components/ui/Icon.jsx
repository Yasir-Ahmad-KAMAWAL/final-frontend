const paths = {
  inbox: 'M3 8.5h4.5l1.2 2.5h6.6l1.2-2.5H21M3 8.5 5 4h14l2 4.5M3 8.5V18a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.5',
  issues: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2',
  projects: 'M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z',
  views: 'M4 6h16M4 12h16M4 18h10',
  settings: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm8 3a8 8 0 0 0-.2-1.7l2-1.4-2-3.4-2.3.7a8 8 0 0 0-2.9-1.7L14.2 2H9.8l-.4 2.5a8 8 0 0 0-2.9 1.7l-2.3-.7-2 3.4 2 1.4A8 8 0 0 0 4 12a8 8 0 0 0 .2 1.7l-2 1.4 2 3.4 2.3-.7a8 8 0 0 0 2.9 1.7l.4 2.5h4.4l.4-2.5a8 8 0 0 0 2.9-1.7l2.3.7 2-3.4-2-1.4A8 8 0 0 0 20 12Z',
  user: 'M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  lock: 'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5V11Z',
  search: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm11 4-5.6-5.6',
  plus: 'M12 5v14M5 12h14',
  bell: 'M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 6.5H4.5C4.5 13.5 6 12 6 8Zm4.5 10.5a1.5 1.5 0 0 0 3 0',
  chevDown: 'm6 9 6 6 6-6',
  chevRight: 'm9 6 6 6-6 6',
  filter: 'M4 6h16M7 12h10M10 18h4',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M18 6 6 18',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  circle: 'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0',
  grip: 'M9 5v14M15 5v14',
  check: 'M5 12l4 4L19 6',
  board: 'M4 4h16v16H4V4Zm4 0v16M14 4v8',
  list: 'M4 6h16M4 12h16M4 18h16',
}

export default function Icon({ name, className = 'w-[18px] h-[18px]' }) {
  const d = paths[name]
  if (!d) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
