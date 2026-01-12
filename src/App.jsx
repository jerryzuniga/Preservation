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
  Activity,
  LayoutGrid,
  Wrench,
  Library,
  GraduationCap,
  Search,
  Bell,
  Settings,
  ChevronRight,
  MoreVertical,
  FileText,
  Calendar,
  ExternalLink,
  MessageSquare,
  Clock,
  Star,
  Zap,
  ClipboardCheck,
  BarChart3,
  Map,
  Play
} from 'lucide-react';

// --- VISUAL ASSETS (SVG Components) ---

// Framework Ring Diagram
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
    <circle cx="300" cy="300" r="280" fill="#e6f5fa" stroke="#0099CC" strokeWidth="2" />
    <path d="M 300 20 A 280 280 0 0 1 300 580" fill="none" stroke="#0099CC" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
    <text x="300" y="60" textAnchor="middle" className="font-bold text-sm fill-[#002F6C] uppercase tracking-widest">Integrated Housing Solutions</text>
    <text x="500" y="300" textAnchor="middle" className="font-bold text-xs fill-[#0099CC]" transform="rotate(90, 500, 300)">Owner-Occupied Repairs</text>
    <text x="100" y="300" textAnchor="middle" className="font-bold text-xs fill-[#0099CC]" transform="rotate(-90, 100, 300)">Acquisition Rehabs</text>

    {/* Middle Ring: Strategic Pillars */}
    <circle cx="300" cy="300" r="200" fill="white" stroke="#C4D600" strokeWidth="24" strokeOpacity="0.8" />
    <text x="300" y="145" textAnchor="middle" className="font-bold text-xs fill-[#88888D]">Dwelling Safety</text>
    <text x="300" y="465" textAnchor="middle" className="font-bold text-xs fill-[#88888D]">Home Performance</text>
    <text x="460" y="305" textAnchor="middle" className="font-bold text-xs fill-[#88888D]">Occupant Health</text>
    <text x="140" y="305" textAnchor="middle" className="font-bold text-xs fill-[#88888D]">Community Repair</text>
    
    {/* Inner Circle: Core Purpose */}
    <circle cx="300" cy="300" r="120" fill="#002F6C" filter="url(#shadow)" />
    <text x="300" y="290" textAnchor="middle" className="font-bold text-lg fill-white">STABILITY</text>
    <text x="300" y="310" textAnchor="middle" className="font-bold text-sm fill-[#C4D600]">&</text>
    <text x="300" y="330" textAnchor="middle" className="font-bold text-lg fill-white">RESILIENCE</text>
  </svg>
);

// Generational Wealth Chart
const WealthChart = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full bg-white/5 rounded-xl p-4">
    {/* Grid Lines */}
    <line x1="50" y1="350" x2="750" y2="350" stroke="white" strokeWidth="2" opacity="0.5" /> 
    <line x1="50" y1="50" x2="50" y2="350" stroke="white" strokeWidth="2" opacity="0.5" />
    
    {/* Areas */}
    <path d="M 50 350 L 750 350 L 750 50 L 50 250 Z" fill="url(#gradientEquity)" opacity="0.3" />

    {/* Lines */}
    <path d="M 50 100 C 200 120, 400 180, 600 350" fill="none" stroke="#A4343A" strokeWidth="4" strokeDasharray="8 4" />
    <text x="60" y="90" fill="#A4343A" className="text-sm font-bold">DEBT (Liability)</text>

    <path d="M 50 350 C 200 340, 400 200, 750 50" fill="none" stroke="#C4D600" strokeWidth="5" />
    <text x="700" y="40" fill="#C4D600" className="text-sm font-bold">WEALTH (Asset)</text>

    {/* Markers */}
    <circle cx="50" cy="350" r="6" fill="white" />
    <text x="50" y="380" fill="white" textAnchor="middle" fontSize="12">Day 1</text>
    <circle cx="250" cy="300" r="6" fill="white" />
    <text x="250" y="380" fill="white" textAnchor="middle" fontSize="12">Yrs 5-15</text>
    <circle cx="500" cy="150" r="6" fill="white" />
    <text x="500" y="380" fill="white" textAnchor="middle" fontSize="12">Yrs 20-25</text>
    <circle cx="750" cy="50" r="8" fill="#C4D600" stroke="white" strokeWidth="2" />
    <text x="750" y="380" fill="white" textAnchor="middle" fontSize="12">Transfer</text>

    <defs>
      <linearGradient id="gradientEquity" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#C4D600" stopOpacity="0" />
        <stop offset="100%" stopColor="#C4D600" stopOpacity="0.5" />
      </linearGradient>
    </defs>
  </svg>
);


// --- CONTENT COMPONENTS ---

const PlaybookContent = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const SectionLink = ({ to, label }) => (
    <button 
      onClick={() => scrollToSection(to)}
      className="text-xs font-semibold text-[#88888D] hover:text-[#0099CC] uppercase tracking-wider transition-colors"
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Internal Navigation for Playbook */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 px-8 flex items-center justify-between shadow-sm">
         <span className="text-sm font-bold text-[#002F6C]">Playbook Navigation</span>
         <div className="flex space-x-6">
            <SectionLink to="pb-home" label="Intro" />
            <SectionLink to="pb-summary" label="Summary" />
            <SectionLink to="pb-framework" label="Framework" />
            <SectionLink to="pb-priorities" label="Priorities" />
         </div>
      </div>

      {/* Hero Section */}
      <section id="pb-home" className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#0099CC_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#e6f5fa] text-[#002F6C] font-semibold text-sm tracking-wide uppercase">
            Stabilization & Resiliency
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight leading-tight">
            Preserving Homes,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099CC] to-[#C4D600]">
              Strengthening Communities.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#88888D] leading-relaxed">
            A comprehensive playbook for Owner-Occupied Repairs and Vacant Housing Rehabilitation to ensure every family has a safe, stable place to live.
          </p>
        </div>
      </section>

      {/* Executive Summary Section */}
      <section id="pb-summary" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] mb-4">Why Housing Preservation Matters</h2>
            <div className="w-20 h-1 bg-[#C4D600] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-6 -mt-6"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#0099CC] mb-6">
                  <Hammer size={20} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Owner-Occupied Repairs</h3>
                <p className="text-[#88888D] text-sm mb-4">
                  Addressing the needs of homeowners who are already in place. Focuses on critical home systems, accessibility upgrades, and improvements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-xs text-[#88888D]">
                    <CheckCircle size={14} className="text-[#C4D600] mr-2" /> Critical Home Repair
                  </li>
                  <li className="flex items-center text-xs text-[#88888D]">
                    <CheckCircle size={14} className="text-[#C4D600] mr-2" /> Aging in Place
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-6 -mt-6"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-[#f4f7d1] rounded-lg flex items-center justify-center text-[#3AA047] mb-6">
                  <Home size={20} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Vacant Housing Rehabs</h3>
                <p className="text-[#88888D] text-sm mb-4">
                  Reviving distressed or abandoned properties to restore them to livable conditions. This creates new pathways to affordable homeownership.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-xs text-[#88888D]">
                    <CheckCircle size={14} className="text-[#0099CC] mr-2" /> Acquisition Rehabilitation
                  </li>
                  <li className="flex items-center text-xs text-[#88888D]">
                    <CheckCircle size={14} className="text-[#0099CC] mr-2" /> Neighborhood Revitalization
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#002F6C] text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-black mb-1 text-[#C4D600]">$126.9B</div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wide">Repair Need</p>
            </div>
            <div className="bg-[#002F6C] text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-black mb-1 text-[#C4D600]">35 Million</div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wide">Homes at Risk</p>
            </div>
            <div className="bg-[#002F6C] text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-black mb-1 text-[#C4D600]">833%</div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wide">Growth in 10 Yrs</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Framework Section */}
      <section id="pb-framework" className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#002F6C] mb-2">5 Strategic Goals</h2>
              <p className="text-[#88888D] mb-8">Guiding the network toward leadership.</p>
              
              <div className="space-y-3">
                {[
                  { title: "Centered", desc: "Housing Preservation as a Key Tool", color: "border-l-[#0099CC]" },
                  { title: "Sustainable", desc: "Effective, Financially Sustainable Programming", color: "border-l-[#C4D600]" },
                  { title: "Holistic", desc: "Consistent, Clear and Robust Connections", color: "border-l-[#0099CC]" },
                  { title: "Innovative", desc: "Foster Innovation and Program Excellence", color: "border-l-[#C4D600]" },
                  { title: "Influential", desc: "Move Intentionally Toward Thought Leadership", color: "border-l-[#0099CC]" },
                ].map((goal, index) => (
                  <div key={index} className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 border-l-4 ${goal.color}`}>
                    <h4 className="font-bold text-[#002F6C] text-sm">{index + 1}. {goal.title}</h4>
                    <p className="text-xs text-[#88888D] mt-1">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center justify-center">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0099CC] to-[#C4D600]"></div>
                <h3 className="text-center text-lg font-bold text-[#002F6C] mb-6 uppercase tracking-wider">Strategic Framework</h3>
                <FrameworkRingDiagram />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Priorities Section */}
      <section id="pb-priorities" className="py-16 bg-[#000000] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#C4D600] font-bold tracking-wider uppercase text-xs">Action Plan</span>
            <h2 className="text-3xl font-black mt-2 text-white">6 Key Priorities</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "1. Build Network Capacity", icon: <Users className="text-[#C4D600]" /> },
              { title: "2. Sustainable Funding", icon: <DollarSign className="text-[#C4D600]" /> },
              { title: "3. Disaster Programming", icon: <AlertTriangle className="text-[#C4D600]" /> },
              { title: "4. Measure Housing Quality", icon: <Activity className="text-[#C4D600]" /> },
              { title: "5. Center Targeted Outcomes", icon: <Heart className="text-[#C4D600]" /> },
              { title: "6. Vacant Housing Needs", icon: <Home className="text-[#C4D600]" /> }
            ].map((priority, i) => (
              <div key={i} className="bg-[#222222] p-6 rounded-xl border border-[#444444] hover:border-[#C4D600] transition-all">
                <div className="mb-3">{priority.icon}</div>
                <h3 className="font-bold text-sm text-white">{priority.title}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#002F6C] to-[#004e7c] rounded-2xl p-8 relative overflow-hidden border border-[#0099CC]/30">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <TrendingUp className="text-[#C4D600]" size={24} />
                  Generational Wealth
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Affordable homeownership does not equal instant wealth. It requires time, consistency, and <strong>preservation</strong>.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-blue-100 border border-white/20">Debt</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-blue-100 border border-white/20">Equity</span>
                  <span className="px-3 py-1 bg-[#C4D600]/20 text-[#C4D600] rounded-full text-xs border border-[#C4D600]/30">Wealth Transfer</span>
                </div>
              </div>
              <div className="lg:w-1/2 w-full h-48">
                 <WealthChart />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


// --- PLACEHOLDER VIEWS ---

// Updated SharePoint-style "Quick Link" Card to support Apps
const QuickLinkCard = ({ title, imgSrc, color, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#0099CC] transition-all flex flex-col items-center justify-center gap-3 h-36 group"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color} shadow-sm group-hover:scale-110 transition-transform overflow-hidden`}>
       <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
    </div>
    <span className="text-xs font-bold text-[#002F6C] text-center leading-tight line-clamp-2">{title}</span>
  </button>
);

// Updated SharePoint-style "News" Card
const NewsCard = ({ title, date, category, imageColor, main = false }) => (
  <div className={`bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex ${main ? 'flex-col h-full' : 'flex-row h-24'}`}>
    <div className={`${main ? 'h-48 w-full' : 'w-24 h-full'} ${imageColor} shrink-0 flex items-center justify-center`}>
      <MessageSquare className="text-white opacity-20" size={main ? 48 : 24} />
    </div>
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <span className="text-[10px] font-bold text-[#0099CC] uppercase tracking-wide mb-1 block">{category}</span>
        <h4 className={`font-bold text-[#002F6C] ${main ? 'text-lg' : 'text-sm line-clamp-2'}`}>{title}</h4>
      </div>
      <div className="flex items-center gap-2 mt-2">
         <Clock size={12} className="text-gray-400" />
         <span className="text-[10px] text-gray-400">{date}</span>
      </div>
    </div>
  </div>
);

// Updated "Document" Row
const DocumentRow = ({ name, modified, author, icon }) => (
  <div className="flex items-center p-3 hover:bg-blue-50/50 rounded-lg cursor-pointer group transition-colors border-b border-gray-50 last:border-0">
    <div className="p-2 bg-gray-100 rounded text-gray-500 group-hover:bg-[#0099CC] group-hover:text-white transition-colors mr-3">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#0099CC]">{name}</p>
      <p className="text-xs text-gray-500">Modified by {author}</p>
    </div>
    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{modified}</span>
  </div>
);

const HomeView = ({ onNavigate }) => {
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
  <div className="bg-gray-50/50 min-h-full pb-12">
    
    {/* HERO SECTION - SharePoint Style */}
    <div className="relative bg-[#002F6C] h-64 w-full overflow-hidden shrink-0">
       {/* Abstract background elements */}
       <div className="absolute inset-0 bg-gradient-to-r from-[#002F6C] via-[#002F6C] to-[#0099CC] opacity-90"></div>
       <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C4D600] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
       <div className="absolute left-10 bottom-0 w-64 h-64 bg-[#0099CC] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
       
       <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-[#C4D600] text-[#002F6C] text-[10px] font-bold uppercase tracking-wide">Internal Portal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{greeting}, Affiliate Leader</h1>
          <p className="text-blue-100 max-w-2xl text-base md:text-lg font-light">
            Welcome to the PreservationHub. Access your tools, track network news, and align with the national housing preservation strategy.
          </p>
       </div>
    </div>

    {/* MAIN CONTENT CONTAINER */}
    <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 space-y-8">
      
      {/* QUICK LAUNCH - 6 Core Apps */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           <QuickLinkCard 
             title="Policy Builder" 
             imgSrc="https://github.com/jerryzuniga/Preservation/blob/ce11cf49a7ae9130b7763e2de2d66cdcdf9d82ad/public/policy.png?raw=true"
             color="bg-[#8179E2]" 
             onClick={() => window.open('https://policy-builder.vercel.app/', '_blank')} 
           />
           <QuickLinkCard 
             title="Catalog Builder" 
             imgSrc="https://github.com/jerryzuniga/Preservation/blob/ce11cf49a7ae9130b7763e2de2d66cdcdf9d82ad/public/catalog.png?raw=true" 
             color="bg-[#F88259]" 
             onClick={() => window.open('https://repairs-catalog.vercel.app/', '_blank')} 
           />
           <QuickLinkCard 
             title="Readiness Assessment" 
             imgSrc="https://github.com/jerryzuniga/Preservation/blob/6955e8ab2a7da593bfb3d30173f758fd10a6f5b8/public/readiness.png?raw=true" 
             color="bg-[#3EA9D5]" 
             onClick={() => window.open('https://readiness-app.vercel.app/', '_blank')} 
           />
           <QuickLinkCard 
             title="Foundations Assessment" 
             imgSrc="https://github.com/jerryzuniga/Preservation/blob/6955e8ab2a7da593bfb3d30173f758fd10a6f5b8/public/foundations.png?raw=true" 
             color="bg-[#899AAC]" 
             onClick={() => onNavigate('apps')} 
           />
           <QuickLinkCard 
             title="Operations Assessment" 
             imgSrc="https://github.com/jerryzuniga/Preservation/blob/b67cf4298d76d0d6ace08f846fb54cae6e2114fe/public/operations.png?raw=true" 
             color="bg-[#89D276]" 
             onClick={() => onNavigate('apps')} 
           />
           <QuickLinkCard 
             title="Support Systems Assessment" 
             imgSrc="https://github.com/jerryzuniga/Preservation/blob/b67cf4298d76d0d6ace08f846fb54cae6e2114fe/public/supportive.png?raw=true" 
             color="bg-[#21AC9A]" 
             onClick={() => onNavigate('apps')} 
           />
        </div>
      </section>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT COLUMN (News & Docs) */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* NEWS FEED */}
            <section>
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#002F6C] font-bold text-lg flex items-center gap-2">
                     <Star size={18} className="text-[#C4D600]" fill="#C4D600" /> Network News
                  </h3>
                  <a href="#" className="text-xs text-[#0099CC] font-bold hover:underline">See All</a>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-64">
                  {/* Hero News Item */}
                  <NewsCard 
                     main={true}
                     title="New 'Aging in Place' Grant Funding Available for FY26"
                     category="Funding Alert"
                     date="Today, 9:00 AM"
                     imageColor="bg-[#002F6C]"
                  />
                  {/* Side News Items */}
                  <div className="flex flex-col gap-4 h-full">
                     <NewsCard 
                        title="Affiliate Spotlight: How Austin Habitat Reduced Repair Costs by 15%"
                        category="Best Practices"
                        date="Yesterday"
                        imageColor="bg-[#0099CC]"
                     />
                     <NewsCard 
                        title="Updated Safety Protocols for Lead Hazard Control Effective Immediately"
                        category="Compliance"
                        date="Oct 24"
                        imageColor="bg-[#E55025]"
                     />
                  </div>
               </div>
            </section>
            
            {/* RECENT DOCUMENTS */}
             <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[#002F6C] font-bold text-lg">Recent Documents</h3>
                  <div className="flex gap-2">
                     <button className="p-1 hover:bg-gray-100 rounded text-[#88888D]"><Settings size={16}/></button>
                  </div>
               </div>
               <div className="flex flex-col">
                  <DocumentRow name="Q3_Impact_Report_Draft_v2.pdf" modified="2h ago" author="You" icon={<FileText size={18} />} />
                  <DocumentRow name="Project_104_Budget_Estimation.xlsx" modified="5h ago" author="Mike R." icon={<DollarSign size={18} />} />
                  <DocumentRow name="Homeowner_Agreement_Template_2025.docx" modified="1d ago" author="Sarah M." icon={<FileText size={18} />} />
                  <DocumentRow name="Site_Safety_Inspection_Log.pdf" modified="2d ago" author="John D." icon={<Shield size={18} />} />
               </div>
               <button className="w-full mt-4 py-2 text-xs text-[#0099CC] font-bold hover:bg-blue-50 rounded transition-colors">
                  View All Documents
               </button>
            </section>
         </div>

         {/* RIGHT COLUMN (Events & Contacts) */}
         <div className="space-y-8">
            
            {/* UPCOMING EVENTS */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
               <h3 className="text-[#002F6C] font-bold text-lg mb-4">Upcoming Events</h3>
               <div className="space-y-4">
                  {[
                     { day: "28", month: "OCT", title: "Regional Repair Summit", time: "10:00 AM - 2:00 PM" },
                     { day: "02", month: "NOV", title: "Grant Writing Workshop", time: "1:00 PM - 3:00 PM" },
                     { day: "15", month: "NOV", title: "Quarterly Safety Review", time: "9:00 AM - 10:30 AM" },
                  ].map((evt, i) => (
                     <div key={i} className="flex gap-4 items-start group cursor-pointer">
                        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-2 w-14 shrink-0 group-hover:bg-[#0099CC] group-hover:text-white transition-colors">
                           <span className="text-[10px] font-bold uppercase">{evt.month}</span>
                           <span className="text-xl font-black text-[#002F6C] group-hover:text-white">{evt.day}</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#0099CC] transition-colors">{evt.title}</h4>
                           <p className="text-xs text-gray-500 mt-1">{evt.time}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-2 border border-gray-200 rounded text-xs font-bold text-gray-600 hover:border-[#0099CC] hover:text-[#0099CC] transition-colors">
                  Open Calendar
               </button>
            </section>

             {/* MY SITES / PROJECTS */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
               <h3 className="text-[#002F6C] font-bold text-lg mb-4">Pinned Projects</h3>
               <div className="space-y-3">
                  {[
                     { name: "Greenwood Revitalization", status: "Active" },
                     { name: "Veteran Home Repair Initiative", status: "Planning" },
                     { name: "2025 Weatherization Blitz", status: "On Hold" }
                  ].map((proj, i) => (
                     <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer group">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-[#C4D600]"></div>
                           <span className="text-sm font-medium text-gray-700 group-hover:text-[#0099CC]">{proj.name}</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-300 group-hover:text-[#0099CC]" />
                     </div>
                  ))}
               </div>
            </section>

            {/* HELP CARD */}
            <div className="bg-[#e6f5fa] rounded-xl p-6 border border-blue-100">
               <h4 className="font-bold text-[#002F6C] mb-2">Need Help?</h4>
               <p className="text-xs text-blue-800 mb-4">
                  Contact the Affiliate Support Center or browse the Knowledge Base for tutorials.
               </p>
               <button className="text-xs font-bold text-[#0099CC] hover:underline">Contact Support &rarr;</button>
            </div>

         </div>
      </div>
    </div>
  </div>
  );
};

// --- APP CARD COMPONENT ---
const AppCard = ({ title, category, version, imgSrc, color, description, isNew = false, url }) => (
  <div className="bg-white rounded-xl border border-gray-200 hover:border-[#0099CC] hover:shadow-lg transition-all group overflow-hidden flex flex-col h-full">
    {/* Colored Header Strip */}
    <div className={`h-2 w-full ${color}`}></div>
    
    <div className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color} shadow-sm group-hover:scale-110 transition-transform overflow-hidden`}>
           <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
        </div>
        {isNew && (
           <span className="px-2 py-1 bg-[#C4D600] text-[#002F6C] text-[10px] font-bold uppercase rounded-full">New</span>
        )}
      </div>
      
      <div className="mb-4 flex-1">
         <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-[#88888D] uppercase tracking-wide">{category}</span>
            <span className="text-[10px] font-mono text-gray-400">{version}</span>
         </div>
         <h3 className="text-lg font-bold text-[#002F6C] mb-2 group-hover:text-[#0099CC] transition-colors">{title}</h3>
         <p className="text-sm text-[#88888D] leading-relaxed line-clamp-2">
            {description}
         </p>
      </div>

      <button 
        onClick={() => url ? window.open(url, '_blank') : null}
        disabled={!url}
        className={`w-full py-2.5 rounded-lg font-bold text-sm text-white ${url ? color + ' hover:opacity-90' : 'bg-gray-300 cursor-not-allowed'} transition-all flex items-center justify-center gap-2 mt-auto`}
      >
         {url ? (
            <>Launch App <Play size={14} fill="currentColor" /></>
         ) : (
            <>Coming Soon <Clock size={14} /></>
         )}
      </button>
    </div>
  </div>
);

const AppsView = () => (
  <div className="p-8 bg-gray-50/50 min-h-full">
    <div className="mb-8 flex items-end justify-between">
      <div>
         <h1 className="text-2xl font-bold text-[#002F6C]">Apps & Tools</h1>
         <p className="text-[#88888D] text-sm mt-1">Operational tools to manage your preservation programs.</p>
      </div>
      <div className="flex gap-2">
         <button className="p-2 bg-white border border-gray-200 rounded hover:text-[#0099CC]"><LayoutGrid size={18}/></button>
         <button className="p-2 bg-white border border-gray-200 rounded hover:text-[#0099CC]"><MoreVertical size={18}/></button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AppCard 
         title="Policy Builder" 
         category="Governance" 
         version="v1.0" 
         imgSrc="https://github.com/jerryzuniga/Preservation/blob/ce11cf49a7ae9130b7763e2de2d66cdcdf9d82ad/public/policy.png?raw=true" 
         color="bg-[#8179E2]"
         description="Easily build and generate customized Policies and Procedures manuals to structure your program."
         url="https://policy-builder.vercel.app/"
      />
      <AppCard 
         title="Catalog Builder" 
         category="Operations" 
         version="v1.0" 
         imgSrc="https://github.com/jerryzuniga/Preservation/blob/ce11cf49a7ae9130b7763e2de2d66cdcdf9d82ad/public/catalog.png?raw=true" 
         color="bg-[#F88259]"
         description="Create a comprehensive catalog defining your program's specific eligible and non-eligible repair interventions."
         url="https://repairs-catalog.vercel.app/"
      />
      <AppCard 
         title="Readiness Assessment" 
         category="Strategy" 
         version="New" 
         imgSrc="https://github.com/jerryzuniga/Preservation/blob/6955e8ab2a7da593bfb3d30173f758fd10a6f5b8/public/readiness.png?raw=true" 
         color="bg-[#3EA9D5]"
         description="A pre-launch evaluation designed to determine a nonprofit's readiness to start a new home repair program."
         isNew={true}
         url="https://readiness-app.vercel.app/"
      />
      <AppCard 
         title="Foundations Assessment" 
         category="Development" 
         version="v1.0" 
         imgSrc="https://github.com/jerryzuniga/Preservation/blob/6955e8ab2a7da593bfb3d30173f758fd10a6f5b8/public/foundations.png?raw=true" 
         color="bg-[#899AAC]"
         description="Assess early program development efforts, focusing on essential programmatic foundations and pre-operational requirements."
      />
      <AppCard 
         title="Operations Assessment" 
         category="Efficiency" 
         version="v2.1" 
         imgSrc="https://github.com/jerryzuniga/Preservation/blob/b67cf4298d76d0d6ace08f846fb54cae6e2114fe/public/operations.png?raw=true" 
         color="bg-[#89D276]"
         description="Measure the efficiency of internal processes and systems during active program delivery to optimize operations."
      />
      <AppCard 
         title="Support Systems Assessment" 
         category="Sustainability" 
         version="v2.0" 
         imgSrc="https://github.com/jerryzuniga/Preservation/blob/b67cf4298d76d0d6ace08f846fb54cae6e2114fe/public/supportive.png?raw=true" 
         color="bg-[#21AC9A]"
         description="An advanced tool for mature programs to evaluate systems crucial for long-term sustainability and outcomes."
      />
    </div>
  </div>
);

const ResourcesView = () => (
  <div className="p-8 bg-gray-50/50 min-h-full">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-[#002F6C]">Resource Library</h1>
      <p className="text-[#88888D] text-sm">Templates, guides, and policy documents.</p>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 divide-y divide-gray-100">
        {[
          { title: 'Policy 33 Compliance Guide', type: 'PDF Document', date: 'Oct 24, 2025' },
          { title: 'Repair Master Services Agreement', type: 'DOCX Template', date: 'Sep 12, 2025' },
          { title: 'Homeowner Intake Form', type: 'Fillable PDF', date: 'Aug 05, 2025' },
          { title: 'Safety Manual: Lead & Asbestos', type: 'Training Module', date: 'Jul 22, 2025' },
          { title: 'Grant Writing Boilerplate', type: 'Text Snippets', date: 'Jun 15, 2025' },
        ].map((res, i) => (
          <div key={i} className="p-4 hover:bg-gray-50 flex items-center justify-between group cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-100 rounded-lg text-[#88888D] group-hover:bg-blue-50 group-hover:text-[#0099CC] transition-colors">
                <Library size={20} />
              </div>
              <div>
                <p className="font-medium text-black text-sm group-hover:text-[#0099CC]">{res.title}</p>
                <p className="text-xs text-[#88888D]">{res.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#88888D]">{res.date}</span>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0099CC]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


// --- MAIN LAYOUT COMPONENT ---

const SidebarItem = ({ icon, label, id, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`w-full flex flex-col items-center justify-center py-4 px-2 transition-all relative group ${
      active ? 'bg-[#0099CC] shadow-md' : 'hover:bg-gray-50'
    }`}
  >
    {/* Active Indicator */}
    {active && (
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C4D600]"></div>
    )}
    
    <div className={`mb-1.5 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-[#88888D] group-hover:text-[#0099CC]'}`}>
      {icon}
    </div>
    <span className={`text-[10px] uppercase font-bold tracking-wide ${active ? 'text-white' : 'text-[#88888D] group-hover:text-[#0099CC]'}`}>
      {label}
    </span>
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Update favicon dynamically
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = 'https://github.com/jerryzuniga/Preservation/blob/90c1156da350793419c1e61644c4165d8b30b30d/public/hub.png?raw=true';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 font-sans text-[#000000]">
      
      {/* Global Header - Full Width */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-4">
          {/* Logo Moved Here */}
          <img 
            src="https://github.com/jerryzuniga/Preservation/blob/90c1156da350793419c1e61644c4165d8b30b30d/public/hub.png?raw=true"
            alt="PreservationHub Logo"
            className="w-8 h-8 rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setActiveTab('home')}
          />
          
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-[#002F6C]">Preservation</span>
            <span className="text-[#0099CC]">Hub</span>
          </h1>
          
          <div className="h-4 w-px bg-gray-300 mx-2"></div>
          
          <span className="text-sm text-[#88888D] font-medium capitalize">{activeTab}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#88888D]" size={16} />
             <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0099CC]/20 focus:border-[#0099CC] w-64 transition-all text-black placeholder-gray-400"
             />
          </div>
          <button className="p-2 text-[#88888D] hover:text-[#0099CC] hover:bg-gray-50 rounded-full transition-colors relative">
             <Bell size={20} />
             <span className="absolute top-2 right-2 w-2 h-2 bg-[#A4343A] rounded-full border border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar - Now below header */}
        <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 z-40 shrink-0">
          <nav className="flex-1 w-full space-y-1">
            <SidebarItem 
              id="home" 
              label="Home" 
              icon={<Home size={22} />} 
              active={activeTab === 'home'} 
              onClick={setActiveTab} 
            />
            <SidebarItem 
              id="apps" 
              label="Apps" 
              icon={<LayoutGrid size={22} />} 
              active={activeTab === 'apps'} 
              onClick={setActiveTab} 
            />
            <SidebarItem 
              id="resources" 
              label="Resources" 
              icon={<Library size={22} />} 
              active={activeTab === 'resources'} 
              onClick={setActiveTab} 
            />
            <SidebarItem 
              id="learn" 
              label="Learn" 
              icon={<GraduationCap size={22} />} 
              active={activeTab === 'learn'} 
              onClick={setActiveTab} 
            />
          </nav>

          <div className="mt-auto flex flex-col items-center gap-4 mb-2">
            <button className="text-[#88888D] hover:text-[#0099CC] transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#E55025] flex items-center justify-center text-xs text-white font-bold cursor-pointer hover:bg-[#002F6C] transition-colors">
              JD
            </div>
            {/* Version Number Added */}
            <span className="text-[10px] font-mono text-gray-300 mt-2">V1.1</span>
          </div>
        </aside>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth relative bg-gray-50/50">
          {activeTab === 'home' && <HomeView onNavigate={setActiveTab} />}
          {activeTab === 'apps' && <AppsView />}
          {activeTab === 'resources' && <ResourcesView />}
          {activeTab === 'learn' && <PlaybookContent />}
        </main>
      </div>
      
    </div>
  );
};

export default App;
