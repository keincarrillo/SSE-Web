const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/smilestudioexperts?igsh=Y241YjJqcTJrNm15&utm_source=qr'
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr'
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/message/3AXNNBK5CECNO1'
  }
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <span className="text-gold">✦</span>
          <span className="display-name text-white text-lg tracking-wide">
            Smile Studio Experts
          </span>
        </div>

        <p className="text-white/30 text-xs text-center">
          © {year} Smile Studio Experts · Todos los derechos reservados
        </p>

        <div className="flex gap-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-xs hover:text-gold transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
