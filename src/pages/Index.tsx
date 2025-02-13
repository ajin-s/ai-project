import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Cpu, Network, Bot, Microscope, ChevronRight } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  velocity: { x: number; y: number };
  hue: number;
}

interface Pulse {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

const Index = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Initialize particles with color
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 2,
      velocity: {
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5
      },
      hue: Math.random() * 60 + 180
    }));
    setParticles(initialParticles);
  }, []);

  // Create random pulses
  useEffect(() => {
    const createPulse = () => {
      const newPulse = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0,
        opacity: 0.5
      };
      setPulses(prev => [...prev, newPulse]);
      setTimeout(() => {
        setPulses(prev => prev.filter(p => p.id !== newPulse.id));
      }, 2000);
    };

    const interval = setInterval(createPulse, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.velocity.x;
          let newY = particle.y + particle.velocity.y;

          if (newX < 0 || newX > window.innerWidth) {
            particle.velocity.x *= -1;
            newX = particle.x;
          }
          if (newY < 0 || newY > window.innerHeight) {
            particle.velocity.y *= -1;
            newY = particle.y;
          }

          const newHue = (particle.hue + 0.1) % 360;

          return {
            ...particle,
            x: newX,
            y: newY,
            hue: newHue
          };
        })
      );
    };

    const animationInterval = setInterval(animate, 30);
    return () => clearInterval(animationInterval);
  }, []);

  const events = [
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Hackathon 2025",
      description: "24-hour coding challenge to build innovative AI solutions",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
      date: "April 15, 2025",
      formLink: "https://forms.google.com/..."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "TechTalks",
      description: "Inspiring presentations from industry leaders",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
      date: "April 16, 2025",
      formLink: "https://forms.google.com/..."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "RoboWars",
      description: "Battle of autonomous robots",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
      date: "April 16, 2025",
      formLink: "https://forms.google.com/..."
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "AI Art Gallery",
      description: "Exhibition of AI-generated artwork",
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80",
      date: "April 17, 2025",
      formLink: "https://forms.google.com/..."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Gaming Tournament",
      description: "Competitive gaming with AI opponents",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
      date: "April 17, 2025",
      formLink: "https://forms.google.com/..."
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Innovation Showcase",
      description: "Student projects and startup demos",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
      date: "April 18, 2025",
      formLink: "https://forms.google.com/..."
    }
  ];

  const handleRegisterClick = () => {
    setShowEvents(true);
    setTimeout(() => {
      document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Enhanced AI Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <div className="absolute w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Particle System */}
        <svg className="absolute w-full h-full">
          {particles.map((particle, index) => (
            <React.Fragment key={particle.id}>
              {particles.slice(index + 1, index + 4).map((otherParticle, i) => {
                const distance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);
                if (distance < 200) {
                  const opacity = (1 - distance / 200) * 0.3;
                  return (
                    <motion.line
                      key={`${particle.id}-${otherParticle.id}-${i}`}
                      x1={particle.x}
                      y1={particle.y}
                      x2={otherParticle.x}
                      y2={otherParticle.y}
                      stroke={`hsla(${particle.hue}, 70%, 50%, ${opacity})`}
                      strokeWidth="0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity }}
                    />
                  );
                }
                return null;
              })}
              <motion.circle
                cx={particle.x}
                cy={particle.y}
                r={particle.size}
                fill={`hsl(${particle.hue}, 70%, 50%)`}
                opacity={0.6}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </React.Fragment>
          ))}
        </svg>

        {/* Data Flow Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              style={{ top: `${(i + 1) * 12.5}%` }}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Circular Pulses */}
        {pulses.map(pulse => (
          <motion.div
            key={pulse.id}
            className="absolute rounded-full border border-blue-400/30"
            style={{
              left: pulse.x,
              top: pulse.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{
              width: ["0px", "300px"],
              height: ["0px", "300px"],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Enhanced Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)',
          animation: 'gradientShift 15s ease infinite',
        }}
      />

      <main className="relative">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <AnimatePresence>
            {isVisible && (
              <>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="text-center mb-8 relative"
                >
                  {/* 3D Brain Visualization */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                    <motion.div
                      className="w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                  
                  <h1 className="text-7xl md:text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 relative z-10">
                    TECHFEST
                  </h1>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-light text-rose-200 mb-8"
                  >
                    Where Innovation Meets Tomorrow
                  </motion.div>

                  {/* Neural Network Visualization */}
                  <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="grid grid-cols-3 gap-4 opacity-20">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-4 bg-white rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center gap-4"
                >
                  <p className="text-xl text-gray-300 max-w-2xl text-center">
                    April 15-18, 2025 • Tech University Campus
                  </p>
                  <motion.button
                    onClick={handleRegisterClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    Register Now
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Events Section - Only shown after clicking Register Now */}
        <AnimatePresence>
          {showEvents && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5 }}
              id="events-section"
            >
              <section className="py-20 px-4">
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-500"
                >
                  Featured Events
                </motion.h2>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-rose-500/20">
                            {event.icon}
                          </div>
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                        </div>
                        <p className="text-gray-300 mb-4">{event.description}</p>
                        <p className="text-rose-300 mb-4">{event.date}</p>
                        <motion.a
                          href={event.formLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                          Register Now <ChevronRight className="ml-2 w-4 h-4" />
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Index;

<style jsx>{`
  @keyframes gradientShift {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.5);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`}</style>
