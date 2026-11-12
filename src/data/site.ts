// Single source of truth for brand-wide details.
// All values come from the current live site (irahospitality.co.in).

export const site = {
  name: 'IRA Hospitality',
  shortName: 'IRA',
  url: 'https://www.irahospitality.co.in',
  defaultTitle: 'IRA Hospitality - Premium Hotel & Restaurant Management Services',
  defaultDescription:
    'Hyderabad hospitality studio for hotels and restaurants: consulting, branding & marketing, operations and digital. Designed for the guest, built for the brand.',
  email: 'studio@irahospitality.co.in',
  policyEmail: 'info@irahospitality.co.in',
  phone: '+91 9966556007',
  phoneHref: 'tel:+919966556007',
  address: {
    lines: ['Ira Hospitality', '15 Golf Pride Homes', 'Yapral, Hyderabad'],
    street: '15 Golf Pride Homes, Yapral',
    locality: 'Hyderabad',
    region: 'Telangana',
    country: 'IN',
  },
  geo: { lat: 17.544889, lng: 78.557389 },
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=17.544889%2C78.557389',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.8956537!2d78.5574!3d17.5449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMyJzQxLjYiTiA3OMKwMzMnMjYuNiJF!5e0!3m2!1sen!2sin!4v1234567890',
  social: {
    instagram: 'https://www.instagram.com/ira.hospitality/',
    facebook: 'https://www.facebook.com/profile.php?id=61972653785981',
  },
  apiBase: import.meta.env.PUBLIC_API_BASE || 'https://ira-zkxr.onrender.com/api',
};

export const mainNav = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blogs/' },
];

export const menuNav = [
  { label: 'Homepage', href: '/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Services', href: '/services/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Blog', href: '/blogs/' },
  { label: 'Contact Us', href: '/contact/' },
];

export const usefulLinks = [
  { label: 'Careers', href: '/careers/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms & Conditions', href: '/terms-conditions/' },
];

export const footerNav = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/projects/' },
  { label: 'Services', href: '/services/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Blog', href: '/blogs/' },
];
