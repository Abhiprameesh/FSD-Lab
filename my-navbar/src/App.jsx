import { useState } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Info } from 'lucide-react';

// Sample page components
const HomePage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Home Page</h1>
    <p className="text-gray-600">Welcome to our website! This is the homepage content.</p>
  </div>
);

const AboutPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">About Us</h1>
    <p className="text-gray-600">Learn more about our company and mission.</p>
  </div>
);

const ServicesPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Services</h1>
    <p className="text-gray-600">Explore our professional services and offerings.</p>
  </div>
);

const PortfolioPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
    <p className="text-gray-600">Check out our latest work and projects.</p>
  </div>
);

const ContactPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
    <p className="text-gray-600">Get in touch with our team today.</p>
  </div>
);

// Custom NavLink Component
const NavLink = ({ to, children, isActive, onClick, icon: Icon }) => {
  return (
    <button
      onClick={() => onClick(to)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
        isActive
          ? 'bg-white text-blue-600 shadow-md'
          : 'text-white hover:bg-blue-700 hover:shadow-md'
      }`}
    >
      <Icon size={18} />
      {children}
    </button>
  );
};

// NavBar Component
const NavBar = ({ activePage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: 'home', label: 'Home', icon: Home },
    { path: 'about', label: 'About', icon: Info },
    { path: 'services', label: 'Services', icon: Briefcase },
    { path: 'portfolio', label: 'Portfolio', icon: User },
    { path: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold cursor-pointer" onClick={() => onNavigate('home')}>
              MyBrand
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  icon={item.icon}
                  isActive={activePage === item.path}
                  onClick={handleNavClick}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-blue-700 p-2 rounded-md transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-2 ${
                    activePage === item.path
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-blue-600'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

// Main App Component
export default function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar activePage={activePage} onNavigate={setActivePage} />
      <div className="max-w-7xl mx-auto">
        {renderPage()}
      </div>
    </div>
  );
}