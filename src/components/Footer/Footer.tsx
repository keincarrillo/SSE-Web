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
          © {year} Smile Studio Experts· Todos los derechos reservados
        </p>

        <div className="flex gap-6">
          {['Instagram', 'Facebook', 'WhatsApp'].map(s => (
            <a
              key={s}
              href="#"
              className="text-white/30 text-xs hover:text-gold transition-colors duration-200"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
