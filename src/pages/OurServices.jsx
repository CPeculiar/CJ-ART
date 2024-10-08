import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Twitter, Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa'; 

const OurServices = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const sections = [
    {
      title: "SIGNAGE",
      theme: "",
      description: "Here are few of our previous works.",
      startIndex: 0,
      endIndex: 6,
    },
    {
        title: "CLADDING",
        theme: "",
        description: "Here are few of our previous works.",
        startIndex: 6,
        endIndex: 12,
      },
      {
        title: "BRANDING",
        theme: "",
        description: "Here are few of our previous works.",
        startIndex: 12,
        endIndex: 18,
      },
      {
        title: "FURNITURE",
        theme: "",
        description: "Here are few of our previous furniture works.",
        startIndex: 18,
        endIndex: 24,
      },
      {
        title: "CLUB LIGHTENING",
        theme: "",
        description: "Here are few of our previous works.",
        startIndex: 24,
        endIndex: 30,
      },
  ];

  // Generate image paths directly
  const generateImagePaths = () => {
    const paths = [];
    for (let i = 1; i <= 48; i++) {
      paths.push(`/images/image${i}.jpeg`);
    }
    return paths;
  };

  const allImages = generateImagePaths();

  const openPreview = (sectionIndex, imageIndex) => {
    if (window.innerWidth > 768) {
      setCurrentSection(sectionIndex);
      setCurrentImageIndex(imageIndex);
      setPreviewVisible(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closePreview = () => {
    setPreviewVisible(false);
    document.body.style.overflow = 'scroll';
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < sections[currentSection].endIndex - sections[currentSection].startIndex - 1
        ? prevIndex + 1
        : prevIndex
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  
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

  return (
    <>
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
            <li><a href="/#about" className="hover:text-teal-400">ABOUT US</a></li>
            <li><a href="/services" className="hover:text-teal-400">OUR SERVICES</a></li>
            <li><a href="/#contact" className="hover:text-teal-400">CONTACT US</a></li>
          </ul>
        </nav>
      </header>

    <div className="max-w-[1750px] mx-auto p-5">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-10 text-center">
          <h3 className="text-3xl mb-2.5">{section.title}</h3>
          <h4 className="text-lg mb-2.5"> <span className="text-red-600">{section.theme}</span></h4>
          <p className="text-base mb-5 whitespace-pre-line">{section.description}</p>
          <div className="grid gap-5 md:grid-cols-auto-fill">
            {allImages.slice(section.startIndex, section.endIndex).map((imagePath, imageIndex) => (
              <div 
                key={imageIndex} 
                className="relative overflow-hidden rounded-lg shadow-md cursor-pointer md:hover:scale-105 transition-transform duration-300 active:scale-98"
                onClick={() => openPreview(sectionIndex, imageIndex)}
              >
                <img 
                  src={imagePath} 
                  alt={`${section.title} Image ${imageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

        {previewVisible && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={closePreview}
          >
            <div 
              className="relative max-w-[90%] max-h-[90%]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <img 
                  src={allImages[sections[currentSection].startIndex + currentImageIndex]}
                  alt={`${sections[currentSection].title} Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                <div className="flex justify-between w-full p-2.5 bg-black bg-opacity-70 text-white">
                  <span>Image {currentImageIndex + 1} of {sections[currentSection].endIndex - sections[currentSection].startIndex}</span>
                  <button className="bg-transparent border-none text-white text-lg cursor-pointer" onClick={closePreview}>
                    X Close
                  </button>
                </div>
                <button 
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-2xl p-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                >
                  &lt;
                </button>
                <button 
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-2xl p-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={nextImage}
                  disabled={currentImageIndex === sections[currentSection].endIndex - sections[currentSection].startIndex - 1}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
{/* Footer */}
<footer className="bg-gray-900 pt-12 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0 text-white">CJ ART</h2>
            <div className="flex space-x-4 text-white">
            <SocialIcon href="https://www.facebook.com/share/1XGrPAxi4u/" icon={<Facebook size={18} />} />
                  <SocialIcon href="https://www.instagram.com/cjar_t?igsh=b3d2YWZjeGF6bG45" icon={<Instagram size={18} />} />
                  <SocialIcon href="https://www.tiktok.com/@cj.jonas0?_t=8qNgGzPAlqI&_r=1" icon={<FaTiktok size={18} />} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-white">
            <div>
              <h5 className="text-lg font-semibold mb-4 text-white">Links</h5>
              <ul className="space-y-2 text-white">
                <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
                <li><Link to="#" className="hover:text-teal-400">About us</Link></li>
                <li><Link to="#" className="hover:text-teal-400">Our Services</Link></li>
                <li><Link to="#" className="hover:text-teal-400">Contact us</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Have any question?</h5>
              <div className="space-y-2">
                <a href="tel:0913-444-5037" className="flex items-center hover:text-teal-400">
                  <Phone size={18} className="mr-2" />
                  0812-811-2674
                </a>
                <a href="mailto:info@thelordsbrethrenchurch.org" className="flex items-center hover:text-teal-400">
                  <Mail size={18} className="mr-2" />
                  cjart2024@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4 ">Location</h5>
              <p className="flex items-center">
                <MapPin size={18} className="mr-2" />
                Miracle Junction Ifite-Awka, Awka, Anambra state.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 text-white">
            <p className="text-center text-sm">Copyright © 2024 || CJ ART </p>
          </div>
        </div>
      </footer>


    </>
  );
};

export default OurServices;