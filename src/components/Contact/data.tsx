import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa6'

export const LOCATIONS = [
  {
    munucipality: 'Chimalhuacan',
    state: 'EDOMEX',
    address: 'C. 16 de Septiembre, Chimalhuacán, Estado de México',
    whatsapp: 'https://wa.me/message/3AXNNBK5CECNO1',
    whatsappDisplay: '+52 55 4502 1633',
    email: 'smilestudioexperts@outlook.com',
    horario: '7:00 a 19:00 de Lun a Dom',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.885824363715!2d-98.98411995776843!3d19.402947118852673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e33713944d9f%3A0x3252260afa632afc!2sSmile%20Studio%20Experts!5e0!3m2!1ses-419!2smx!4v1777084851360!5m2!1ses-419!2smx'
  },
  {
    munucipality: 'Polanco',
    state: 'CDMX',
    address: 'Av. Homero 1425, Polanco II Secc, Miguel Hidalgo, CDMX',
    whatsapp: 'https://wa.me/message/3AXNNBK5CECNO1',
    whatsappDisplay: '+52 55 4502 1633',
    email: 'smilestudioexperts@outlook.com',
    horario: '7:00 a 19:00 de Lun a Dom',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.4452483689947!2d-99.2041844!3d19.4363609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d203f2b6a2ddf1%3A0x8968f1746245a39a!2sSmile%20Studio%20Experts%20(Polanco)!5e0!3m2!1ses-419!2smx!4v1783576250138!5m2!1ses-419!2smx'
  }
]

export const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr',
    color: '#1877F2',
    gradient: undefined as string | undefined,
    icon: <FaFacebook className="w-7 h-7" />
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/smilestudioexperts?igsh=Y241YjJqcTJrNm15&utm_source=qr',
    color: '#E1306C',
    gradient:
      'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    icon: <FaInstagram className="w-7 h-7" />
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@jesusodontotrembo?_r=1&_t=ZS-971u0nhdxBQ',
    color: '#010101',
    gradient: undefined as string | undefined,
    icon: <FaTiktok className="w-7 h-7" />
  }
]
