import React, { useState, useEffect } from 'react';
import fitexplorerLogo from '../../public/fitexplorer-logo.png';
import exchangoScreenshot from '../../public/exchango-screenshot.png';
import portfolioScreenshot from '../../public/bild.jpg';

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "FitExplorer",
      description: "A comprehensive fitness tracking platform that combines health data with intelligent insights. My crown achievement showcasing full-stack development and user-centered design.",
      image: fitexplorerLogo,
      tech: ["JavaScript", "Health Data", "User Experience", "Full-Stack"],
      links: {
        code: "https://github.com/Chia213/FitExplorer",
        live: "https://www.fitexplorer.se/"
      },
      featured: true
    },
    {
      id: 2,
      title: "Exchango",
      description: "A modern currency exchange application with real-time rates and intuitive user interface. Demonstrates clean web design and API integration skills.",
      image: exchangoScreenshot,
      tech: ["CSS", "API Integration", "Real-time Data", "UI/UX"],
      links: {
        code: "https://github.com/Chia213/Exchango"
      }
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "This very portfolio you're viewing! A modern, responsive portfolio built from scratch to showcase my projects and skills. Features custom animations, theme switching, and an interactive workspace.",
      image: portfolioScreenshot,
      tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      links: {
        code: "https://github.com/Chia213/chia-portfolio",
        live: "#home"
      }
    },
    {
      id: 4,
      title: "Currency Exchanger",
      description: "A Python-based currency conversion tool with backend logic for handling exchange rates and calculations. Showcases backend development and data processing skills.",
      image: null,
      icon: "fas fa-coins",
      tech: ["Python", "Backend Development", "Data Processing", "Financial APIs"],
      links: {
        code: "https://github.com/Chia213/currency-exchanger"
      }
    },
    {
      id: 5,
      title: "Student Management System",
      description: "A comprehensive student management platform built with Python. Features student records, grade tracking, and administrative tools for educational institutions.",
      image: null,
      icon: "fas fa-user-graduate",
      tech: ["Python", "Database Design", "CRUD Operations", "System Architecture"],
      links: {
        code: "https://github.com/Chia213/student-management-system"
      }
    },
    {
      id: 6,
      title: "Dockerized API Deployment",
      description: "A professional API deployment solution using Docker containers. Demonstrates DevOps best practices, containerization, and scalable architecture design.",
      image: null,
      icon: "fab fa-docker",
      tech: ["Python", "Docker", "API Development", "DevOps"],
      links: {
        code: "https://github.com/Chia213/Dockerized-API-Deployment"
      }
    },
    {
      id: 7,
      title: "Housing Data Platform",
      description: "A data-driven platform for housing market analysis and insights. Combines data processing, visualization, and user-friendly interfaces for real estate applications.",
      image: null,
      icon: "fas fa-home",
      tech: ["Python", "Data Analysis", "Market Insights", "Visualization"],
      links: {
        code: "https://github.com/Chia213/housing-data-platform"
      }
    },
    {
      id: 8,
      title: "Data Insights Dashboard",
      description: "An interactive dashboard built with Jupyter Notebook for data visualization and analysis. Features comprehensive data exploration and business intelligence tools.",
      image: null,
      icon: "fas fa-chart-bar",
      tech: ["Jupyter Notebook", "Data Visualization", "Analytics", "Business Intelligence"],
      links: {
        code: "https://github.com/Chia213/data-insights-dashboard"
      }
    },
    {
      id: 9,
      title: "API Development Environment",
      description: "A complete development environment setup for API development. Streamlines the development workflow with pre-configured tools and best practices.",
      image: null,
      icon: "fas fa-cogs",
      tech: ["Development Tools", "Environment Setup", "API Development", "Workflow Automation"],
      links: {
        code: "https://github.com/Chia213/api-dev-environment"
      }
    },
    {
      id: 10,
      title: "Snake Self-Play Gym",
      description: "An implementation of the classic Snake game with reinforcement learning capabilities using OpenAI Gym. Features self-playing AI agents and training environments.",
      image: null,
      icon: "fas fa-gamepad",
      tech: ["Python", "OpenAI Gym", "Reinforcement Learning", "Game AI"],
      links: {
        code: "https://github.com/Chia213/snake-selfplay-gym"
      }
    },
    {
      id: 11,
      title: "BookFinder AI Discord Bot",
      description: "An intelligent Discord bot that helps users find books using AI. Integrates with Discord API and provides smart book recommendations based on user preferences.",
      image: null,
      icon: "fas fa-robot",
      tech: ["Python", "Discord API", "AI Integration", "OpenAI"],
      links: {
        code: "https://github.com/Chia213/bookfinder-ai-discord-bot"
      }
    },
    {
      id: 12,
      title: "Multi-Agent System",
      description: "A sophisticated multi-agent system built in Python. Demonstrates advanced AI concepts including agent coordination, decision making, and intelligent behavior.",
      image: null,
      icon: "fas fa-network-wired",
      tech: ["Python", "Multi-Agent", "AI", "System Design"],
      links: {
        code: "https://github.com/Chia213/Multi-agent"
      }
    },
    {
      id: 13,
      title: "Hackathon Snake Game",
      description: "A snake game created during a hackathon using pygame. Demonstrates game development skills and quick prototyping abilities under time constraints.",
      image: null,
      icon: "fas fa-trophy",
      tech: ["Python", "Pygame", "Game Development", "Hackathon"],
      links: {
        code: "https://github.com/Chia213/hackathon-Snakegame"
      }
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentProject = projects[currentIndex];

  return (
    <div className="projects-carousel-container animate-on-scroll">
      <div className="carousel-controls">
        <button 
          className="carousel-btn prev" 
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          className="carousel-btn next" 
          onClick={nextSlide}
          disabled={currentIndex === projects.length - 1}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div className="projects-carousel">
        <div className="carousel-track">
          <div className={`project-card ${currentProject.featured ? 'featured' : ''}`}>
            <div className="project-image">
              {currentProject.image ? (
                <img 
                  src={currentProject.image} 
                  alt={`${currentProject.title} Logo`} 
                  className="project-logo"
                />
              ) : (
                <i className={currentProject.icon}></i>
              )}
            </div>
            <div className="project-content">
              <h3>{currentProject.title}</h3>
              <p>{currentProject.description}</p>
              <div className="project-tech">
                {currentProject.tech.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a 
                  href={currentProject.links.code} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <i className="fab fa-github"></i> Code
                </a>
                {currentProject.links.live && (
                  <a 
                    href={currentProject.links.live} 
                    target={currentProject.links.live.startsWith('#') ? '_self' : '_blank'}
                    rel={currentProject.links.live.startsWith('#') ? '' : 'noopener noreferrer'}
                    className="project-link"
                  >
                    <i className="fas fa-external-link-alt"></i> Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="carousel-dots">
        {projects.map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
