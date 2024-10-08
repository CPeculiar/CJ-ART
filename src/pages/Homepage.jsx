import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Twitter, Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa'; 

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ContactForm');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    church: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormErrors({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.church.trim()) errors.church = 'Name of Church is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      errors.phone = 'Phone number is invalid';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Handle form submission logic here
      alert('Form submitted successfully!');
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center z-20 relative">
        <div className="flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden mr-4 text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img src="/CJ-ART-Logo1.png" alt="CJ ART" className="w-32 h-12 object-contain" />
        </div>
        <nav className={`absolute left-0 right-0 top-full bg-gray-900 md:bg-transparent ${isMenuOpen ? 'block' : 'hidden'} md:relative md:block`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm p-4 md:p-0">
            <li><a href="/" className="hover:text-teal-400">HOME</a></li>
            <li><a href="#about" className="hover:text-teal-400">ABOUT US</a></li>
            <li><a href="/services" className="hover:text-teal-400">OUR SERVICES</a></li>
            <li><a href="#contact" className="hover:text-teal-400">CONTACT US</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
        
          {/* <video autoPlay loop muted className="object-cover w-full h-full">
            <source src="/vids.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}

          <img
      src="/SOTE.webp"
      alt="Hero Image"
      className="object-cover w-full h-full"
    />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col">
          <div className={`flex-grow flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out ${isMenuOpen ? 'mt-40 md:mt-0' : ''}`}>
            <p className="text-sm uppercase mb-2"></p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4"> WELCOME TO CJ ART</h1>
            <h2 className="text-2xl md:text-3xl text-teal-400 mb-6">signage | interior decoration | cladding</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <h5 className="text-lg">Miracle Junction Ifite-Awka, Awka, Anambra state.</h5>
              </div>
              
              <div className="flex items-center space-x-4">
                <span>Socials:</span>
                <div className="flex space-x-2">
                  <SocialIcon href="https://www.facebook.com/share/1XGrPAxi4u/" icon={<Facebook size={18} />} />
                  <SocialIcon href="https://www.instagram.com/cjar_t?igsh=b3d2YWZjeGF6bG45" icon={<Instagram size={18} />} />
                  <SocialIcon href="https://www.tiktok.com/@cj.jonas0?_t=8qNgGzPAlqI&_r=1" icon={<FaTiktok size={18} />} />
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
              {/* <Link to="/register">
                <button className="w-full md:w-auto mb-3 md:mb-0 bg-transparent border-2 border-teal-400 text-teal-400 px-6 py-2 rounded-full hover:bg-teal-400 hover:text-white transition duration-300">
                  REGISTER
                </button>
              </Link>
              <Link to="/login">
                <button className="w-full md:w-auto bg-teal-400 text-white px-6 py-2 rounded-full hover:bg-teal-500 transition duration-300">
                  LOGIN
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 flex items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
                <p className="mb-4">
                  With over 5 years of industry experience, we are proud to be a leading provider of innovative and visually captivating
                  signages for businesses of all sizes within Nigeria.
                </p>
                <p className="mb-4">
                  At CJ ART, we understand the power of effective signange to make a lasting impression on your target audience.
                  
                </p>
                <p className="mb-4">
                We specialize in creating custom signanage that not grabs attention but also communicates your brand's unique identity and message.
                </p>
                <h4 className="text-3xl md:text3xl font-bold mb-4 mt-6">Our Ability</h4>
                <p className="mb-4">
                At CJ Art, we take pride in our ability to deliver signange, cladding and branding solutions that go beyond aesthetics.
                We understand the importance of signs in driving brand awareness, increasing foot traffic and boosting sales.
                Our team combines artistic flair with strategic thinking to create impactful signage that helps you achieve your business goals.
                </p>
                <h4 className="text-3xl md:text3xl font-bold mb-4 mt-6">Our Uniqueness</h4>
                <p>
                Our unwavering commitment to quality and craftmanship. ewe utilize state-of-the-art technology and premium materials to ensure that 
                every service we render is of the highest standard. Our attention to detail, precision construction processes and rigorous quality control
                measures guarantee that our products not only looks stunning but also stands the test of time.
                </p>
                
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <img src="/aboutus.jpg" alt="About TLBC" className="rounded-lg w-full h-auto" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/75 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center mr-4 text-white">
                    👥
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Our People </h4>
                    <p className="text-gray-700">Trained, Talented, Skilled and Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-gray-900" id="expect">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ExpectCard image="/use-1.jpeg" title="Branding" />
              <ExpectCard image="/use-2.jpeg" title="Signage" />
            </div>
            <div className="space-y-8">
              <ExpectCard image="/use-5.jpeg" title="Cladding" />
              <ExpectCard image="/use-4.jpeg" title="Signage" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-800" id="contact">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Have any questions? Let's talk</h2>
            
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setActiveTab('ContactForm')}
                className={`px-4 py-2 mr-4 ${activeTab === 'ContactForm' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
              >
                Contact Form
              </button>
              <button
                onClick={() => setActiveTab('ContactMap')}
                className={`px-4 py-2 ${activeTab === 'ContactMap' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
              >
                Google Maps
              </button>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
              {activeTab === 'ContactForm' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        className="w-full bg-gray-800 rounded-lg px-4 py-2"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        className="w-full bg-gray-800 rounded-lg px-4 py-2"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="w-full bg-gray-800 rounded-lg px-4 py-2"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="church"
                        placeholder="Address"
                        className="w-full bg-gray-800 rounded-lg px-4 py-2"
                        value={formData.church}
                        onChange={handleChange}
                      />
                      {formErrors.church && <p className="text-red-500 text-sm mt-1">{formErrors.church}</p>}
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="3"
                      className="w-full bg-gray-800 rounded-lg px-4 py-2"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>
                  <div className="text-center">
                    <button type="submit" className="bg-teal-400 text-white px-8 py-2 rounded-full hover:bg-teal-500 transition duration-300">
                      Send message
                    </button>
                  </div>
                </form>
              ) : (
                <iframe
                  className="w-full h-96 rounded-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3456853358566!2d7.056821773041316!3d6.218063326641412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043830c5d178e93%3A0x3305b6015697a207!2sThe%20Lords%20Brethren%20Place%2C%20Awka!5e0!3m2!1sen!2sng!4v1703920380110!5m2!1sen!2sng"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 pt-12 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">CJ ART</h2>
            <div className="flex space-x-4">
            <SocialIcon href="https://www.facebook.com/share/1XGrPAxi4u/" icon={<Facebook size={18} />} />
                  <SocialIcon href="https://www.instagram.com/cjar_t?igsh=b3d2YWZjeGF6bG45" icon={<Instagram size={18} />} />
                  <SocialIcon href="https://www.tiktok.com/@cj.jonas0?_t=8qNgGzPAlqI&_r=1" icon={<FaTiktok size={18} />} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">Links</h5>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
                <li><Link to="#about" className="hover:text-teal-400">About us</Link></li>
                <li><Link to="/services" className="hover:text-teal-400">Our Services</Link></li>
                <li><Link to="#contact" className="hover:text-teal-400">Contact us</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Have any question?</h5>
              <div className="space-y-2">
                <a href="tel:0812-811-2674" className="flex items-center hover:text-teal-400">
                  <Phone size={18} className="mr-2" />
                  0812-811-2674
                </a>
                <a href="mailto:cjart2024@gmail.com" className="flex items-center hover:text-teal-400">
                  <Mail size={18} className="mr-2" />
                  cjart2024@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Location</h5>
              <p className="flex items-center">
                <MapPin size={18} className="mr-2" />
                Miracle Junction Ifite-Awka, Awka, Anambra state.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-center text-sm">Copyright © 2024 || CJ ART </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Utility Components
const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-teal-400 transition-colors"
  >
    {icon}
  </a>
);

const ExpectCard = ({ image, title }) => (
  <div className="relative group overflow-hidden rounded-lg">
    <img src={image} alt={title} className="w-full h-64 object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-xl font-bold">{title}</p>
    </div>
  </div>
);
