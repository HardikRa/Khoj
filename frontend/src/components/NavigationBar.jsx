import React, { useState } from 'react';

const NavigationBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analytics', href: '/analytics' },
    // {name:'Terminal', href: '/terminal'}
  ];

    return (
      <div className="w-full bg-white shadow-sm">
        <nav className="px-6 py-4 border-b border-blue-100">
          <div className="pl-2 mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <div className="flex items-center">
                <img 
                  src="/logo.webp" 
                  alt="Logo" 
                  className={`h-12 w-auto transition-colors duration-200 ${hoveredItem === 'logo' ? 'opacity-60' : 'opacity-100'}`}
                  onClick={() => window.location.href = '/'}
                  onMouseEnter={() => setHoveredItem('logo')}
                  onMouseLeave={() => setHoveredItem(null)}
                />
              </div>
              
              <div className="flex space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    className={`px-3 py-2 rounded-md text-md font-medium transition-colors duration-200 hover:bg-blue-50
                      ${hoveredItem === item.name 
                        ? 'text-blue-700 font-semibold' 
                        : 'text-gray-600 hover:text-blue-600'
                      }`}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => window.location.href = item.href}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
};

export default NavigationBar;