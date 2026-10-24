const Logo = ({ variant = 'dark', size = 42 }) => {
  const colors = {
    dark: { primary: '#292925', accent: '#B87355' },
    light: { primary: '#FFFFFF', accent: '#B87355' },
  }

  const { primary, accent } = colors[variant] || colors.dark

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FurniSphere logo"
    >
      <circle cx="50" cy="50" r="45" stroke={accent} strokeWidth="3" fill="none" />
      <ellipse
        cx="50"
        cy="50"
        rx="30"
        ry="45"
        stroke={accent}
        strokeWidth="2.5"
        fill="none"
        transform="rotate(30 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="30"
        ry="45"
        stroke={primary}
        strokeWidth="2.5"
        fill="none"
        transform="rotate(-30 50 50)"
      />
      <circle cx="50" cy="50" r="8" fill={accent} opacity="0.9" />
    </svg>
  )
}

export default Logo
