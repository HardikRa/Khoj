import React,{ useState, useEffect } from 'react';
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";

// Using the Engine class directly from tsparticles
const Particles = React.lazy(() => import("react-tsparticles"));

export default function Component({ 
  logoSrc = "/logo1.png", 
  tagline = "Sachhai Ki" 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const options = {
    fpsLimit: 120,
    particles: {
      number: {
        value: 35,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["#6da4e3"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3
      },
      size: {
        value: { min: 1, max: 8 }
      },
      links: {
        enable: true,
        distance: 300,
        color: "#808080",
        opacity: 0.1,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out"
      }
    },
    // interactivity: {
    //   events: {
    //     onHover: {
    //       enable: true,
    //       mode: "grab"
    //     },
    //     onClick: {
    //       enable: true,
    //       mode: "push"
    //     }
    //   },
    //   modes: {
    //     grab: {
    //       distance: 140,
    //       links: {
    //         opacity: 1
    //       }
    //     },
    //     push: {
    //       quantity: 4
    //     }
    //   }
    // },
    detectRetina: true
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-white p-4 pt-15 relative min-h-screen">
            
        {/* <div className="absolute inset-0">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={options}
            className="absolute inset-0"
          />
        </React.Suspense>
      </div> */}
      <div className={`text-center transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

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
          Explore talking to your data, safeguarding your users, and staying ahead of the next-gen of threats.
        </p>
      </div>

      <section className="w-full max-w-6xl mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {[
          { title: "Community Tier Plan", price: "$0", features:["Open source", "Free to use", "Sample data only"] },
          { title: "Standard Tier Plan", price: "$50K", features:["One time installation","One month support","Limited LLM Access"] },
          { title: "Enterprise Plan", price: "$300K/year", features:["Installation support","Support during working hours","Monthly update of ML model"] },
          { title: "Fully Managed Plan", price: "$1M/year", features:["24x7 support","Dedicated support team","Weekly update of ML Model"] }
        ].map((plan) => (
          <div key={plan.title} className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">{plan.title}</h2>
            <p className="text-sky-700 text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="text-gray-600">
              <li>{plan.features[0]}</li>
              <li>{plan.features[1]}</li>
              <li>{plan.features[2]}</li>
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}