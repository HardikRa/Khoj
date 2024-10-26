import { useState, useEffect } from 'react'

export default function Component({ 
  logoSrc = "/logo1.png", 
  tagline = "Come combat frauds with us" 
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-white p-4 pt-20"> {/* Added pt-12 for padding-top */}
      <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="mb-0 w-full max-w-2xl">
          <img
            src={logoSrc}
            alt="Company Logo"
            className="w-full h-auto max-w-full mx-auto"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-700 mt-2 mb-4">
          {tagline}
        </h1>
        <p className="text-sky-600 text-base sm:text-lg md:text-xl max-w-lg mx-auto">
          Welcome to our website. We're excited to show you what we have to offer.
        </p>
      </div>
    </main>
  )
}
