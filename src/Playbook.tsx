import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Hammer, 
  Heart, 
  Shield, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  BookOpen, 
  Menu, 
  X,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Leaf,
  DollarSign,
  Activity
} from 'lucide-react';

// New Component: Framework Ring Diagram (Recreating the visual from Page 15)
const FrameworkRingDiagram = () => (
  <svg viewBox="0 0 600 600" className="w-full h-auto max-w-lg mx-auto filter drop-shadow-xl">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Outer Ring: Housing Solutions */}
    <circle cx="300" cy="300" r="280" fill="#e6f5fa" stroke="#0099cc" strokeWidth="2" />
    <path d="M 300 20 A 280 280 0 0 1 300 580" fill="none" stroke="#0099cc" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
    <text x="300" y="60" textAnchor="middle" className="font-bold text-sm fill-[#004e7c] uppercase tracking-widest">Integrated Housing Solutions</text>
    <text x="500" y="300" textAnchor="middle" className="font-bold text-xs fill-[#0099cc]" transform="rotate(90, 500, 300)">Owner-Occupied Repairs</text>
    <text x="100" y="300" textAnchor="middle" className="font-bold text-xs fill-[#0099cc]" transform="rotate(-90, 100, 300)">Acquisition Rehabs</text>

    {/* Middle Ring: Strategic Pillars */}
    <circle cx="300" cy="300" r="200" fill="white" stroke="#78b72a" strokeWidth="24" strokeOpacity="0.8" />
    <text x="300" y="145" textAnchor="middle" className="font-bold text-xs fill-white">Dwelling Safety</text>
    <text x="300" y="465" textAnchor="middle" className="font-bold text-xs fill-white">Home Performance</text>
    <text x="460" y="305" textAnchor="middle" className="font-bold text-xs fill-white">Occupant Health</text>
    <text x="140" y="305" textAnchor="middle" className="font-bold text-xs fill-white">Community Repair</text>
    
    {/* Inner Circle: Core Purpose */}
    <circle cx="300" cy="300" r="120" fill="#004e7c" filter="url(#shadow)" />
    <text x="300" y="290" textAnchor="middle" className="font-bold text-lg fill-white">STABILITY</text>
    <text x="300" y="310" textAnchor="middle" className="font-bold text-sm fill-[#78b72a]">&</text>
    <text x="300" y="330" textAnchor="middle" className="font-bold text-lg fill-white">RESILIENCE</text>
  </svg>
);

// New Component: Generational Wealth Chart (Recreating the visual from Page 27)
const WealthChart = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full bg-white/5 rounded-xl p-4">
    {/* Grid Lines */}
    <line x1="50" y1="350" x2="750" y2="350" stroke="white" strokeWidth="2" opacity="0.5" /> {/* X Axis */}
    <line x1="50" y1="50" x2="50" y2="350" stroke="white" strokeWidth="2" opacity="0.5" />   {/* Y Axis */}
    
    {/* Areas */}
    <path d="M 50 350 L 750 350 L 750 50 L 50 250 Z" fill="url(#gradientEquity)" opacity="0.2" />

    {/* Lines */}
    {/* Debt Line (Decreasing) */}
    <path d="M 50 100 C 200 120, 400 180, 600 350" fill="none" stroke="#f87171" strokeWidth="4" strokeDasharray="8 4" />
    <text x="60" y="90" fill="#f87171" className="text-sm font-bold">DEBT (Liability)</text>

    {/* Equity Line (Increasing) */}
    <path d="M 50 350 C 200 340, 400 200, 750 50" fill="none" stroke="#78b72a" strokeWidth="5" />
    <text x="700" y="40" fill="#78b72a" className="text-sm font-bold">WEALTH (Asset)</text>

    {/* Stages Markers */}
    <circle cx="50" cy="350" r="6" fill="white" />
    <text x="50" y="380" fill="white" textAnchor="middle" fontSize="12">Day 1</text>
    
    <circle cx="250" cy="300" r="6" fill="white" />
    <text x="250" y="380" fill="white" textAnchor="middle" fontSize="12">Yrs 5-15</text>
    
    <circle cx="500" cy="150" r="6" fill="white" />
    <text x="500" y="380" fill="white" textAnchor="middle" fontSize="12">Yrs 20-25</text>
    
    <circle cx="750" cy="50" r="8" fill="#78b72a" stroke="white" strokeWidth="2" />
    <text x="750" y="380" fill="white" textAnchor="middle" fontSize="12">Transfer</text>

    <defs>
      <linearGradient id="gradientEquity" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#78b72a" stopOpacity="0" />
        <stop offset="100%" stopColor="#78b72a" stopOpacity="0.5" />
      </linearGradient>
    </defs>
  </svg>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const NavLink = ({ to, label, mobile = false }) => (
    <button 
      onClick={() => scrollToSection(to)}
      className={`${mobile ? 'block w-full text-left py-2' : ''} hover:text-[#0099cc] transition-colors font-medium text-gray-700`}
    >
      {label}
    </button>
  );

  return (
    <div className="font-sans text-gray-800 antialiased bg-white selection:bg-[#0099cc] selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#0099cc] tracking-tight leading-none">US HOUSING</span>
                <span className="text-sm font-bold text-[#78b72a] tracking-widest uppercase">Preservation Playbook</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <NavLink to="summary" label="Summary" />
              <NavLink to="framework" label="The Framework" />
              <NavLink to="priorities" label="Key Priorities" />
              <NavLink to="resources" label="Resources" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-[#0099cc]">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 shadow-lg">
            <NavLink to="summary" label="Summary" mobile />
            <NavLink to="framework" label="The Framework" mobile />
            <NavLink to="priorities" label="Key Priorities" mobile />
            <NavLink to="resources" label="Resources" mobile />
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#0099cc_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#e6f5fa] text-[#004e7c] font-semibold text-sm tracking-wide uppercase">
            Stabilization & Resiliency
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Preserving Homes,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099cc] to-[#78b72a]">
              Strengthening Communities.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            A comprehensive playbook for Owner-Occupied Repairs and Vacant Housing Rehabilitation to ensure every family has a safe, stable place to live.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('summary')}
              className="px-8 py-4 rounded-lg bg-[#0099cc] text-white font-bold text-lg hover:bg-[#007aa3] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Explore the Playbook <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Executive Summary Section */}
      <section id="summary" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Housing Preservation Matters</h2>
            <div className="w-24 h-1.5 bg-[#78b72a] mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Preservation is not just about fixing homes; it's a strategic response to keeping families housed, strengthening neighborhoods, and reducing long-term costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#0099cc] mb-6">
                  <Hammer size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Owner-Occupied Repairs</h3>
                <p className="text-gray-600 mb-4">
                  Addressing the needs of homeowners who are already in place. Focuses on critical home systems, accessibility upgrades, and improvements that allow families to remain safely in their homes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle size={16} className="text-[#78b72a] mr-2" /> Critical Home Repair
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle size={16} className="text-[#78b72a] mr-2" /> Aging in Place
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle size={16} className="text-[#78b72a] mr-2" /> Weatherization
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-[#78b72a] mb-6">
                  <Home size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Vacant Housing Rehabs</h3>
                <p className="text-gray-600 mb-4">
                  Reviving distressed or abandoned properties to restore them to livable conditions. This creates new pathways to affordable homeownership and supports communities facing disinvestment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle size={16} className="text-[#0099cc] mr-2" /> Acquisition Rehabilitation
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle size={16} className="text-[#0099cc] mr-2" /> Neighborhood Revitalization
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle size={16} className="text-[#0099cc] mr-2" /> Community Stabilization
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#004e7c] text-white p-8 rounded-2xl text-center">
              <div className="text-4xl font-black mb-2 text-[#78b72a]">$126.9B</div>
              <p className="text-blue-100 font-medium">Needed to address disrepair in existing U.S. housing.</p>
            </div>
            <div className="bg-[#004e7c] text-white p-8 rounded-2xl text-center">
              <div className="text-4xl font-black mb-2 text-[#78b72a]">35 Million</div>
              <p className="text-blue-100 font-medium">U.S. homes place occupants at health & safety risk.</p>
            </div>
            <div className="bg-[#004e7c] text-white p-8 rounded-2xl text-center">
              <div className="text-4xl font-black mb-2 text-[#78b72a]">833%</div>
              <p className="text-blue-100 font-medium">Growth in Habitat Repairs production over the last decade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Framework Section */}
      <section id="framework" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Left Column: 5 Goals */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">5 Strategic Goals</h2>
              <p className="text-gray-500 mb-8">Guiding the network toward leadership in housing preservation.</p>
              
              <div className="space-y-4">
                {[
                  { title: "Centered", desc: "Housing Preservation as a Key Tool", color: "border-l-[#0099cc]" },
                  { title: "Sustainable", desc: "Effective, Financially Sustainable Programming", color: "border-l-[#78b72a]" },
                  { title: "Holistic", desc: "Consistent, Clear and Robust Connections", color: "border-l-[#0099cc]" },
                  { title: "Innovative", desc: "Foster Innovation and Program Excellence", color: "border-l-[#78b72a]" },
                  { title: "Influential", desc: "Move Intentionally Toward Thought Leadership", color: "border-l-[#0099cc]" },
                ].map((goal, index) => (
                  <div key={index} className={`bg-white p-5 rounded-lg shadow-sm border border-gray-100 border-l-4 ${goal.color} hover:shadow-md transition-shadow`}>
                    <h4 className="font-bold text-gray-900">{index + 1}. {goal.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 4 Pillars Diagram */}
            <div className="md:w-1/2 flex flex-col items-center justify-center">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0099cc] to-[#78b72a]"></div>
                <h3 className="text-center text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Housing Preservation Framework</h3>
                <FrameworkRingDiagram />
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                   <div className="p-2 bg-slate-50 rounded text-xs text-gray-500">
                      <span className="block font-bold text-[#0099cc]">Core Purpose</span>
                      Stability & Resilience
                   </div>
                   <div className="p-2 bg-slate-50 rounded text-xs text-gray-500">
                      <span className="block font-bold text-[#78b72a]">Strategic Pillars</span>
                      Safety, Health, Performance, Community
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Priorities Section */}
      <section id="priorities" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#78b72a] font-bold tracking-wider uppercase text-sm">Action Plan</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2">6 Key Priorities</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Strategic initiatives to realize the vision of housing stability and resilience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="text-[#78b72a]" />,
                title: "1. Build Network Capacity",
                desc: "Equipping affiliates with onboarding tools like Readiness and Operations assessments. Organizing affiliates into personas from Pre-Launch to Advanced Programming."
              },
              {
                icon: <DollarSign className="text-[#78b72a]" />,
                title: "2. Sustainable Funding",
                desc: "Securing pathways to government funding (CDBG, WAP) and healthcare partnerships (Medicaid waivers). Positioning repairs as an upstream healthcare strategy."
              },
              {
                icon: <AlertTriangle className="text-[#78b72a]" />,
                title: "3. Disaster Programming",
                desc: "Integrating disaster preparedness and recovery. Creating a unified approach where preservation strategies address both sudden shocks and ongoing chronic challenges."
              },
              {
                icon: <Activity className="text-[#78b72a]" />,
                title: "4. Measure Housing Quality",
                desc: "Gathering data on unmet needs to identify critical deficiencies. Using insights to strengthen advocacy and identify 'invisible' housing crises."
              },
              {
                icon: <Heart className="text-[#78b72a]" />,
                title: "5. Center Targeted Outcomes",
                desc: "Prioritizing vulnerable populations: Veterans, Older Adults (Aging in Place), and historically disinvested communities. Viewing homes as generational wealth assets."
              },
              {
                icon: <Home className="text-[#78b72a]" />,
                title: "6. Vacant Housing Needs",
                desc: "Using Acquisition Rehabs to revitalize neighborhoods. Recognizing that vacancy is an indicator of destabilization and taking action to reverse decline."
              }
            ].map((priority, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-[#78b72a] transition-all hover:transform hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-600 transition-colors">
                  {priority.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{priority.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {priority.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Special Feature: Generational Wealth */}
          <div className="mt-16 bg-gradient-to-r from-[#004e7c] to-[#006699] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-blue-800">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                  <TrendingUp className="text-[#78b72a]" />
                  Homes as Generational Wealth
                </h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  A home is more than shelter; it is a financial asset. But affordable homeownership does not equal instant wealth. It requires time, consistency, and <strong>preservation</strong>.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                    <span className="text-[#78b72a] font-bold text-sm uppercase block mb-1">Stage 1: Day 1</span>
                    <p className="text-sm text-blue-100"><strong>Greatest Debt.</strong> Home is a liability, not yet realized wealth. Maintenance is key.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                    <span className="text-[#78b72a] font-bold text-sm uppercase block mb-1">Stage 2: Years 5-15</span>
                    <p className="text-sm text-blue-100"><strong>Equity Build.</strong> Asset grows, but debt is still a major factor. Upkeep required.</p>
                  </div>
                   <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                    <span className="text-[#78b72a] font-bold text-sm uppercase block mb-1">Stage 4: Transfer</span>
                    <p className="text-sm text-blue-100"><strong>Wealth Realized.</strong> Stabilized asset converts into realized generational wealth.</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 flex items-center justify-center">
                 <div className="w-full aspect-[16/9] lg:aspect-auto lg:h-full">
                    <WealthChart />
                    <p className="text-center text-xs text-blue-300 mt-2 italic">
                      Visualizing the journey from Liability to Asset Transfer
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Resources</h2>
            <p className="mt-4 text-gray-500">Tools currently under development to support the network (2026 Releases).</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-[#0099cc]">
                  <Lightbulb size={24} />
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">Coming Soon</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Readiness Toolkit</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Targeted guidance for affiliates exploring what it takes to start a repair program responsibly. Includes a readiness assessment for the 200+ affiliates currently "considering" launch.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg text-[#78b72a]">
                  <Hammer size={24} />
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">Coming Soon</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Operations Toolkit</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Resources to support project management, contractor oversight, client services, safety protocols, and funding practices.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                  <BookOpen size={24} />
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">Coming Soon</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Designing a Home Repair Program</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Guide and socialization materials aimed at supporting operational efficiency and compliance. Helps with developing a program-based policies and procedures manual.
              </p>
            </div>

             <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                  <Users size={24} />
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">Coming Soon</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">MyHabitat Repairs Portal</h3>
              <p className="text-gray-600 mb-4 text-sm">
                A central hub for affiliates offering support resources. Will undergo a refresh in 2026 to mirror best practices and provide a consistent user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#004e7c] text-white py-12 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
               <span className="text-2xl font-black text-white tracking-tight">US HOUSING</span>
               <span className="block text-sm font-bold text-[#78b72a] tracking-widest uppercase">Preservation Playbook</span>
            </div>
            <div className="text-blue-200 text-sm">
              &copy; 2025 Habitat for Humanity International
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center md:text-left">
            <p className="text-blue-200 text-sm mb-4">
              "We recognize that our affiliate network views the preservation of existing housing not simply as a tactical approach, but as a long-term commitment to community stability and well-being."
            </p>
            <p className="text-xs text-blue-300">
              Adrienne Goolsby, Senior Vice President, U.S. Office and Canada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;