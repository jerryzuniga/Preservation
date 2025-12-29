import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, Check, Printer, ArrowRight, 
  BarChart3, ClipboardCheck, Home, Info, User, Menu, X,
  Handshake, Wrench, Users, FileText, Download, Share2,
  AlertCircle, BookOpen, Clock, Save, TrendingUp,
  Play, Volume2, Settings, Maximize, Search, 
  Briefcase, Building2, ChevronDown, Layers, Target,
  Video, File
} from 'lucide-react';

// --- HERO IMAGES (Randomized) ---
const HERO_IMAGES = [
  "https://raw.githubusercontent.com/jerryzuniga/readiness-app/6fbd3af5bcf8a7a27e8d7fb7067221f23d9df97d/public/fence.jpg",
  "https://raw.githubusercontent.com/jerryzuniga/readiness-app/6fbd3af5bcf8a7a27e8d7fb7067221f23d9df97d/public/lanscape.jpg",
  "https://raw.githubusercontent.com/jerryzuniga/readiness-app/6fbd3af5bcf8a7a27e8d7fb7067221f23d9df97d/public/paint.jpg",
  "https://raw.githubusercontent.com/jerryzuniga/readiness-app/6fbd3af5bcf8a7a27e8d7fb7067221f23d9df97d/public/ramp.jpg",
  "https://raw.githubusercontent.com/jerryzuniga/readiness-app/6fbd3af5bcf8a7a27e8d7fb7067221f23d9df97d/public/roof.jpg",
  "https://raw.githubusercontent.com/jerryzuniga/readiness-app/6fbd3af5bcf8a7a27e8d7fb7067221f23d9df97d/public/tshirt.jpg"
];

// --- DATA MODEL (Strictly aligned with Readiness Manual v1.2) ---
const LEVELS = ["Inactive", "Aware", "Exploring", "Planning", "Preparing", "Ready"];

// Stage Definitions for the Overview Paragraph
const STAGE_DEFINITIONS = {
  "Inactive": "Your organization is at the Inactive stage. At this level, home repair is likely not yet a strategic priority. The focus is on building basic awareness among leadership and understanding why a repair program matters for your community.",
  "Aware": "Your organization is at the Aware stage. You recognize the need for home repairs but haven't formalized plans. The priority now is to educate the board, identify potential resources, and move from general interest to specific intent.",
  "Exploring": "Your organization is at the Exploring stage. You are actively investigating feasibility. The team should focus on gathering community data, assessing internal capacity, and determining if a repair program aligns with your mission.",
  "Planning": "Your organization is at the Planning stage. You have identified key gaps and are aligning around strategies. It is time to develop concrete roadmaps, draft policies, and secure initial commitments to move toward a pilot.",
  "Preparing": "Your organization is at the Preparing stage. You have a plan in place and are mobilizing resources. Focus on finalizing internal systems, training staff, and securing funding to ensure a successful launch.",
  "Ready": "Your organization is at the Ready stage. You are positioned for implementation or scale. The focus shifts to execution, sustainability, measuring impact, and deepening partnerships for long-term success."
};

// UPDATED LEVEL STYLES (Grey -> Red -> Orange -> Yellow -> Light Green -> Dark Green)
const LEVEL_STYLES = [
  { header: "bg-[#94A3B8] text-white", body: "bg-slate-50 border-slate-200", label: "Inactive", hex: "#94A3B8", textClass: "text-white" },   // Grey
  { header: "bg-[#EF5350] text-white", body: "bg-red-50 border-red-200", label: "Aware", hex: "#EF5350", textClass: "text-white" },      // Red
  { header: "bg-[#FFB74D] text-gray-800", body: "bg-orange-50 border-orange-200", label: "Exploring", hex: "#FFB74D", textClass: "text-gray-800" }, // Orange
  { header: "bg-[#FFD54F] text-gray-800", body: "bg-yellow-50 border-yellow-200", label: "Planning", hex: "#FFD54F", textClass: "text-gray-800" },  // Yellow
  { header: "bg-[#AED581] text-gray-800", body: "bg-lime-50 border-lime-200", label: "Preparing", hex: "#AED581", textClass: "text-gray-800" }, // Light Green
  { header: "bg-[#4CAF50] text-white", body: "bg-green-50 border-green-200", label: "Ready", hex: "#4CAF50", textClass: "text-white" }     // Dark Green
];

// Icon colors corresponding to scores (1-6)
const SCORE_ICON_COLORS = [
  "bg-slate-100 text-slate-600",   // 1: Inactive (Grey)
  "bg-red-100 text-red-700",       // 2: Aware (Red)
  "bg-orange-100 text-orange-800", // 3: Exploring (Orange)
  "bg-yellow-100 text-yellow-800", // 4: Planning (Yellow)
  "bg-lime-100 text-lime-700",     // 5: Preparing (Light Green)
  "bg-green-100 text-green-700"    // 6: Ready (Green)
];

// MAPPING FACTOR TO ICON
const FACTOR_ICONS = {
  "Capacity of Affiliate": Briefcase, 
  "Repair Program Need": Search, 
  "Soundness of Approach": FileText,
  "Leverage and Partnerships": Handshake,
  "Impact & Sustainability": Users
};

// Context descriptions for the 5 Factors
const FACTOR_DESCRIPTIONS = {
  "Capacity of Affiliate": "This factor looks at your internal commitment, people, and systems to support a formal home repair program, not just occasional activities. It evaluates governance, leadership alignment, and operational readiness.",
  "Repair Program Need": "This section examines the housing repair needs in your service area and your organization's internal drivers for seeking capacity support. It ensures your vision is rooted in real conditions.",
  "Soundness of Approach": "This factor evaluates the quality of your plan. It checks if you have thought through your goals, training strategy, and plans for applying what is learned.",
  "Leverage and Partnerships": "This factor measures your ability to identify, secure, and apply additional resources (financial, volunteer, technical) and build partnerships to advance readiness.",
  "Impact & Sustainability": "This final factor looks at the long-term difference this effort will make. It assesses your vision for sustained program impact and broader community benefit."
};

const SUB_FACTORS = [
  // --- FACTOR 1: CAPACITY ---
  {
    id: "f1s1", factor: "Capacity of Affiliate", name: "Leadership & Board Commitment",
    q: "How would you rate your organization’s leadership and board commitment toward developing a home repair program?",
    context: "This sub-factor looks at how clearly leadership and the board understand, prioritize, and sponsor home repair work. It reflects shared vision, strategic alignment, and willingness to authorize time, staff, and resources.",
    desc: [
      "Leadership and board are not discussing home repairs or seeing them as strategic.",
      "Leaders recognize repair issues but have not connected them to formal priorities or decisions.",
      "Leadership is curious about repairs and has begun informal conversations or small exploratory steps.",
      "Leadership is discussing repairs regularly and outlining what a future program might require.",
      "Leadership and board have assigned people, approved early concepts, or started exploring funding for repairs.",
      "Repair and preservation are built into strategy, with leadership aligned, engaged, and actively preparing for launch."
    ],
    tips: {
      1: "Begin by educating leadership on why repairs matter. Review local data on vulnerable populations.",
      2: "Use board meetings to introduce housing preservation. Invite a peer affiliate to present.",
      3: "Form a working group to explore feasibility. Draft a short concept paper.",
      4: "Develop a strategic roadmap. Align board around timing and goals.",
      5: "Draft a board-approved repair policy and outline staffing models.",
      6: "Finalize resource allocation and develop a Repair-focused Policies & Procedures manual."
    }
  },
  {
    id: "f1s2", factor: "Capacity of Affiliate", name: "Staff Commitment to Learn and Implement Repairs",
    q: "How prepared and committed is your staff to engage in training and apply what is learned?",
    context: "This sub-factor looks at staff ownership and enthusiasm for home repairs. It considers whether people understand the purpose, see repairs as part of their job, and are ready to adjust workflows to support a formal program.",
    desc: [
      "No staff are identified to lead repairs, and there is no plan for training or learning.",
      "Staff know repairs are being discussed, but expectations, roles, and learning plans remain unclear.",
      "One or two staff are loosely named for repairs, but time, duties, and support are undefined.",
      "Specific staff have been chosen for repair learning and are beginning to join planning conversations.",
      "Staff are scheduled for training and are actively applying learning to early repair planning tasks.",
      "A cross functional staff team is committed, engaged in learning, and prepared to lead repair program development."
    ],
    tips: {
      1: "Start internal discussions. Identify who would lead repairs.",
      2: "Present the vision to staff. Connect repairs to the mission.",
      3: "Clarify roles. Develop a simple staff readiness plan.",
      4: "Develop a training plan aligned with milestones (e.g., intake design).",
      5: "Ensure staff have time to implement learning (e.g., pilot a mock intake).",
      6: "Map people procedures like intake to better understand role clarity."
    }
  },
  {
    id: "f1s3", factor: "Capacity of Affiliate", name: "Demonstrating Internal Systems Development",
    q: "How well has your organization planned for improvements to key systems (admin, tools, etc.)?",
    context: "This sub-factor looks at the internal systems that would carry a repair program. It examines data, financial, HR, and project management tools and whether they can reliably support intake, tracking, reporting, and compliance.",
    desc: [
      "No internal tools, processes, or systems exist to support home repair work or data tracking.",
      "You recognize that current systems are weak for repairs, but there is no defined improvement plan.",
      "Initial conversations have started about tools, workflows, or equipment, but no concrete action has been taken.",
      "Key system needs are identified and early budgeting, pilots, or testing efforts are underway.",
      "A written system improvement plan exists, with staff assigned and implementation steps scheduled.",
      "System changes are resourced, coordinated across departments, and aligned with your anticipated repair launch timeline."
    ],
    tips: {
      1: "Review current systems. Identify where existing procedures fall short.",
      2: "Document known limitations. Assess gaps with finance/ops staff.",
      3: "Assign team members to explore solutions or test lightweight tools.",
      4: "Create a system readiness plan for the coming year.",
      5: "Execute key areas (intake database, procurement) and train staff.",
      6: "Align internal tools with HFHI’s Project Lifecycle and compliance."
    }
  },

  // --- FACTOR 2: NEED ---
  {
    id: "f2s1", factor: "Repair Program Need", name: "Housing Stabilization Needs",
    q: "How well has your organization determined housing repair needs within your community?",
    context: "This sub-factor looks at how well you understand repair needs in the community. It reflects use of local data, partnerships, and lived experience to identify which households, neighborhoods, and issues require the most attention.",
    desc: [
      "No data or structured feedback has been gathered about local housing repair or stabilization needs.",
      "Repair needs are recognized mainly through anecdotes, without supporting data or documented examples.",
      "Early lists, referrals, or stories are being collected, but they are not yet analyzed or organized.",
      "Specific stabilization needs are documented using basic data or examples tied to local households.",
      "You have a clear, data informed picture of major repair needs across populations and neighborhoods.",
      "Repair needs are well quantified with waitlists, assessments, or external reports that clearly justify launching a program."
    ],
    tips: {
      1: "Collect basic indicators (public health data, census data).",
      2: "Engage local partners (agencies, churches) to ask about trends.",
      3: "Start a waiting list or track inquiries to capture real data.",
      4: "Create a summary slide deck illustrating needs and costs.",
      5: "Align repair priorities (e.g., roofing, HVAC) with actual needs.",
      6: "Use this data in funding proposals and board discussions."
    }
  },
  {
    id: "f2s2", factor: "Repair Program Need", name: "Organizational Need for Capacity Building",
    q: "How clearly has your organization identified the need for capacity building to support programming?",
    context: "This sub-factor looks at how repair work fits your affiliate's own needs and strategy. It considers mission alignment, business model implications, and how repairs can strengthen existing construction, mortgage, and community efforts.",
    desc: [
      "Internal gaps exist, but they have not been connected to a need for capacity building.",
      "There is general awareness of organizational strain, yet gaps are not clearly defined or prioritized.",
      "Key gaps such as staffing, systems, or skills are named but not linked to specific repair goals.",
      "Capacity gaps are documented, prioritized, and being explored as part of a broader repair readiness plan.",
      "A concrete capacity building plan exists, with actions, timelines, and responsibilities aligned to repair goals.",
      "Capacity investments are clearly justified and tied to launching or sustaining a formal, mission aligned repair program."
    ],
    tips: {
      1: "Map where the affiliate feels stretched (staff, tools, training).",
      2: "Discuss 'what is missing' to be prepared for repairs.",
      3: "Draft a working list of needs tied to program startup.",
      4: "Define how addressing gaps will strengthen service delivery.",
      5: "Document needs in a brief for leadership or funders.",
      6: "Package capacity needs into a formal funding plan."
    }
  },
  {
    id: "f2s3", factor: "Repair Program Need", name: "Urgency and Timing",
    q: "How timely is this capacity-building opportunity for your organization or community?",
    context: "This sub-factor looks at whether now is the right moment to invest in repairs. It captures external drivers like funding or disasters and internal capacity to act so that the program launches at a sustainable pace.",
    desc: [
      "No sense of urgency exists, and repairs are not viewed as a timely organizational priority.",
      "Early signs of need or interest appear, but timing still feels optional rather than pressing.",
      "Repairs generally fit your interests and capacity, but no strong external driver has been identified.",
      "Repair readiness aligns with upcoming planning cycles, staffing changes, or community initiatives on the near horizon.",
      "Specific pressures or opportunities, such as funding or disasters, make this a high impact moment to act.",
      "Documented internal and external conditions make acting now critical, and leadership agrees timing should be prioritized."
    ],
    tips: {
      1: "Evaluate aging housing stock or disaster vulnerability.",
      2: "Gather testimonials suggesting services are timely.",
      3: "Confirm timing aligns with board cycles/staff availability.",
      4: "Integrate preservation into strategic discussions/budgeting.",
      5: "Request HFHI TA or monitor funding to act quickly.",
      6: "Seek partnerships and submit funding requests immediately."
    }
  },

  // --- FACTOR 3: APPROACH ---
  {
    id: "f3s1", factor: "Soundness of Approach", name: "Clarity of Capacity-Building Goals",
    q: "How clearly defined and realistic are your goals for this capacity-building launch?",
    context: "This sub-factor looks at how clearly you have defined the purpose of a repair program. It evaluates whether goals are specific, measurable, and tied to outcomes for households, properties, and the wider community.",
    desc: [
      "No clear goals exist for how capacity building would support a future home repair program.",
      "General hopes or ideas are present, but goals are vague and not written or shared.",
      "Preliminary goals are drafted, yet they are broad, overlapping, or not directly tied to repair work.",
      "Goals are written, realistic, and partially connected to how capacity building will advance repairs.",
      "Goals are specific, measurable, and clearly linked to milestones for designing or launching a repair program.",
      "A focused goal set guides decisions, with capacity building activities mapped directly to desired repair outcomes."
    ],
    tips: {
      1: "Identify barriers. Brainstorm goal statements.",
      2: "Refine goals using SMART criteria.",
      3: "Map each goal to a repair program need.",
      4: "Prioritize 2-3 achievable goals and outline measurement.",
      5: "Link goals to activities in the Repairs Catalog.",
      6: "Incorporate goals into a logic model showing readiness support."
    }
  },
  {
    id: "f3s2", factor: "Soundness of Approach", name: "Feasibility of Approach",
    q: "How realistic is your plan for participating in training and applying learning?",
    context: "This sub-factor looks at whether your plan for repairs is realistic. It considers scope, staffing, budget, and timelines to see if the work you hope to do matches the resources you can reliably secure.",
    desc: [
      "There is no articulated approach for using capacity building resources to support repair programming.",
      "Ideas for how to proceed exist, but they have not been tested for realism or fit.",
      "A potential approach is emerging, though staffing, funding, and operational details remain largely unspecified.",
      "A draft approach outlines roles, activities, and timelines and appears realistic with current or near term capacity.",
      "The approach has been refined with input from partners or staff and aligned to available resources.",
      "A feasible, well resourced approach is in place, ready to guide implementation or pilot repair activities."
    ],
    tips: {
      1: "Clarify expectations and align with leadership.",
      2: "Sketch out a basic participation outline.",
      3: "Draft a participation strategy.",
      4: "Share the plan with team; confirm buy-in.",
      5: "Assign accountability and support structures.",
      6: "Document and track implementation progress."
    }
  },
  {
    id: "f3s3", factor: "Soundness of Approach", name: "Alignment with Program Outcomes",
    q: "How well does your approach align with capacity and sustainability goals?",
    context: "This sub-factor looks at how well your planned activities connect to desired outcomes. It examines whether repairs, services, and partnerships are designed to move key indicators like safety, stability, and resilience in the right direction.",
    desc: [
      "Repair related activities are not connected to specific outcomes or broader housing preservation goals.",
      "You have a sense of desired change, but outcomes are not defined or linked to activities.",
      "Early outcome ideas exist, yet they are loosely worded or not measured against local repair needs.",
      "Clear outcomes are drafted and partially aligned with proposed capacity building and repair strategies.",
      "Outcomes are refined, realistic, and supported by early indicators or data collection plans.",
      "Activities, outputs, and outcomes are tightly aligned in a simple logic model for your repair program."
    ],
    tips: {
      1: "Review program logic. Re-express goals.",
      2: "Translate internal needs into aligned outcomes.",
      3: "Broaden lens to strategic outcomes.",
      4: "Add durability to plans (long-term indicators).",
      5: "Position approach for funders/partners.",
      6: "Use outcome frameworks to communicate value."
    }
  },

  // --- FACTOR 4: LEVERAGE ---
  {
    id: "f4s1", factor: "Leverage and Partnerships", name: "Commitment to Seeking and Using Additional Resources",
    q: "How committed is your organization to seeking additional resources?",
    context: "This sub-factor looks at your ability to bring internal assets into the repair effort. It reflects how you leverage existing staff, volunteers, brand trust, land, and construction experience to support a sustainable program.",
    desc: [
      "No effort has been made to seek additional funding, partners, or in kind support for repair readiness.",
      "Interest in new resources exists, but there is no specific plan, timeline, or target opportunities.",
      "A few potential resource sources are identified, yet strategies for securing or using them remain limited.",
      "A modest resource development plan outlines target sources and how support would advance repair readiness.",
      "Resource efforts are underway, with outreach, proposals, or partner discussions already in motion.",
      "An ongoing resource plan is active, with new funding or partnerships already secured to support repair capacity."
    ],
    tips: {
      1: "Initiate resource mapping (internal/external).",
      2: "Draft a simple plan for one or two sources.",
      3: "Strengthen resource connections/feasibility.",
      4: "Align resources to specific goals.",
      5: "Activate multi-channel resource development.",
      6: "Formalize strategy; create funding matrix."
    }
  },
  {
    id: "f4s2", factor: "Leverage and Partnerships", name: "Partnerships and Collaborations",
    q: "How well has your organization identified partnerships?",
    context: "This sub-factor looks at the strength and usefulness of external partnerships for repair work. It considers relationships with funders, governments, service providers, and grassroots groups that can extend your reach and impact.",
    desc: [
      "No partners have been identified, and repair capacity is being considered as an entirely internal effort.",
      "Potential partners are mentioned internally, but there has been no direct outreach or engagement.",
      "Specific partners show informal interest, yet roles, expectations, and contributions are not clearly defined.",
      "Partners are meeting with you and beginning to coordinate around shared goals and early repair activities.",
      "Partnerships are formalized or making active contributions that support planning or early program design.",
      "Well established partners share goals, have clear roles, and are committed to strengthening repair capacity together."
    ],
    tips: {
      1: "Survey local network (aging services, housing).",
      2: "Initiate informal contact to gauge interest.",
      3: "Clarify partnership roles.",
      4: "Define collaboration points and timing.",
      5: "Develop MOUs or working agreements.",
      6: "Document partnership impact goals."
    }
  },
  {
    id: "f4s3", factor: "Leverage and Partnerships", name: "Potential for Leveraging Beyond the Launch Term",
    q: "How well positioned are you to sustain outcomes beyond the launch?",
    context: "This sub-factor looks at how well a repair program can unlock new opportunities. It evaluates potential for future funding, policy influence, shared infrastructure, and deepened relationships that strengthen housing preservation over time.",
    desc: [
      "The launch is viewed as a one time opportunity, with no planning for continuation after it ends.",
      "Some ideas for sustaining efforts exist, but there is no clear path or structure to use them.",
      "Possible sustainability strategies are named, yet they stay informal, incomplete, or untested in practice.",
      "A short term vision links launch activities to one or two years of continued outcomes.",
      "A longer range vision connects sustainability strategies to organizational plans and future repair growth.",
      "A detailed sustainability plan, with roles and next steps, positions your affiliate to extend impact beyond the launch."
    ],
    tips: {
      1: "Shift to long-term thinking.",
      2: "Identify key sustainability levers.",
      3: "Outline your best sustainability option.",
      4: "Link your plan to results.",
      5: "Build support for sustainability with stakeholders.",
      6: "Incorporate sustainability into all planning."
    }
  },

  // --- FACTOR 5: IMPACT ---
  {
    id: "f5s1", factor: "Impact & Sustainability", name: "Vision for Sustained Program Impact",
    q: "How clear is your vision for sustaining a home repair program?",
    context: "This sub-factor looks at how repairs fit into your long-term strategy. It examines whether you have a multi-year view of scale, investment, and risk and how repairs contribute to a durable housing preservation vision.",
    desc: [
      "No long term vision for a repair program has been articulated or connected to mission and community needs.",
      "A rough vision exists, but it is vague, inconsistently shared, or disconnected from future planning.",
      "Vision statements are emerging but are weakly tied to local needs or long term impact.",
      "A moderately clear vision describes how repairs will grow and contribute to defined community outcomes.",
      "A compelling, widely shared vision aligns with community needs and is used in conversations with stakeholders.",
      "A strong strategic vision guides plans, budgets, staffing, and partnerships for a sustained repair program."
    ],
    tips: {
      1: "Start with your 'why'. Revisit mission.",
      2: "Facilitate a visioning session with board.",
      3: "Ground vision in need and data.",
      4: "Link vision to a theory of change.",
      5: "Share and test your vision with stakeholders.",
      6: "Embed vision into strategy and budgets."
    }
  },
  {
    id: "f5s2", factor: "Impact & Sustainability", name: "Plan for Applying Capacity Post-Launch",
    q: "How effectively have you planned to apply systems after funding ends?",
    context: "This sub-factor looks at how repairs connect to your other programs and operations. It considers referral pathways, shared staffing, and aligned policies so that repairs are embedded in the organization, not an isolated side project.",
    desc: [
      "There is no plan for how tools, skills, or systems from the launch will be used afterward.",
      "High level ideas for post launch use exist, but they lack concrete actions or ownership.",
      "A general plan is drafted, yet feasibility around staffing, funding, or operations is still uncertain.",
      "A practical plan outlines how key launch supported elements will continue after funding ends.",
      "A clear implementation plan assigns responsibilities and timelines for integrating launch learning into regular practice.",
      "Capacity gains are embedded in roles, policies, and budgets, supporting ongoing repair work beyond the launch period."
    ],
    tips: {
      1: "Identify key takeaways to keep using.",
      2: "Draft a post-launch checklist.",
      3: "Stress-test your plan against obstacles.",
      4: "Clarify timing and roles for implementation.",
      5: "Build internal accountability.",
      6: "Share post-launch strategy with funders."
    }
  },
  {
    id: "f5s3", factor: "Impact & Sustainability", name: "Broader Community Benefit",
    q: "How well do you demonstrate broader community/sector benefit?",
    context: "This sub-factor looks at how repair work advances broader community benefit. It evaluates whether projects support equity, reduce displacement risk, and strengthen neighborhoods in ways that are visible and meaningful to residents.",
    desc: [
      "Repair capacity is framed only as an internal benefit, with no consideration of wider community impact.",
      "You sense there could be broader impact, but who benefits and how remains undefined.",
      "Possible community or sector impacts are described, yet they are informal and not linked to specific outcomes.",
      "Specific external benefits are identified, such as improved homeowner services or shared tools across partners.",
      "Plans are forming to share learning, tools, or partnerships so others in the community can benefit.",
      "Your capacity building effort clearly strengthens broader community or sector outcomes and has strategies for sharing impact."
    ],
    tips: {
      1: "Ask 'Who else could benefit?'.",
      2: "Explore shared outcomes with external groups.",
      3: "Clarify how others are impacted.",
      4: "Gather testimonials or local feedback.",
      5: "Track ripple effects (referrals, collaboration).",
      6: "Disseminate insights through networks."
    }
  }
];

export default function HomeRepairAssessment() {
  // Step 1: Define a Storage Key
  const STORAGE_KEY = 'home_repair_readiness_data';

  const [view, setView] = useState('home'); // home, wizard, dashboard, plan
  const [step, setStep] = useState(0);
  
  // Step 2: Modify State Initialization (Lazy Init)
  const [answers, setAnswers] = useState(() => {
    // Check if we are in a browser environment
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      // If data exists, parse it (turn string back into object); otherwise return empty object
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const hasStarted = Object.keys(answers).length > 0;
  
  // --- RANDOM HERO IMAGE STATE ---
  const [heroBg, setHeroBg] = useState("");

  // Step 3: Create the Auto-Save Effect & Random Image Init
  useEffect(() => {
    // 1. Random Image Logic
    const randomIndex = Math.floor(Math.random() * HERO_IMAGES.length);
    setHeroBg(HERO_IMAGES[randomIndex]);

    // 2. Storage Logic
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]); // Dependency array: Run this every time 'answers' changes

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set favicon dynamically to house icon on Habitat blue
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    
    // Create SVG data URI for the favicon: White house on Bright Blue (#0099CC) rounded square
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#0099CC"/>
        <path d="M7 13 L16 6 L25 13 V24 A2 2 0 0 1 23 26 H9 A2 2 0 0 1 7 24 Z" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13 26 V16 H19 V26" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `.trim().replace(/\s+/g, ' ');
    
    link.href = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
    document.getElementsByTagName('head')[0].appendChild(link);

  }, [view, step]);

  // NEW: Scroll Listener for Sub-Nav Visibility
  useEffect(() => {
    const handleScroll = () => {
      if (view === 'home') {
        // Show sub-nav only after scrolling past 500px (approx past Hero)
        setShowSubNav(window.scrollY > 500);
      } else {
        // Always show on other views if needed, or keep hidden? 
        // Logic: On wizard/dashboard, the sub-nav is useful as a consistent tool.
        // Or we can keep it strictly for the scroll behavior on Home. 
        // Let's keep it consistent with the "when scrolling" request for the home page.
        setShowSubNav(true); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const [showSubNav, setShowSubNav] = useState(false); // New state for scroll behavior

  const handleStart = () => {
    setStep(0);
    setView('wizard');
  };

  // Step 4: Add a "Clear Progress" Feature (Crucial)
  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all progress and start over? This cannot be undone.")) {
      setAnswers({}); // Clear React State
      localStorage.removeItem(STORAGE_KEY); // Clear Browser Storage
      setView('home'); // Send them back to the start
      setStep(0); // Reset step counter
      window.scrollTo(0, 0);
    }
  };

  const handleContinue = () => {
    // Find the first index where the answer is undefined
    const firstUnansweredIndex = SUB_FACTORS.findIndex(sf => !answers[sf.id]);
    if (firstUnansweredIndex !== -1) {
      setStep(firstUnansweredIndex);
    } else {
      setStep(0); 
    }
    setView('wizard');
  };

  const handleGoToQuestion = (index) => {
    setStep(index);
    setView('wizard');
  };

  const handleAnswer = (score) => {
    setAnswers(prev => ({ ...prev, [SUB_FACTORS[step].id]: score }));
  };

  const handleNext = () => {
    if (step < SUB_FACTORS.length - 1) {
      setStep(step + 1);
    } else {
      setView('dashboard');
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setView('home');
    }
  };

  // Function to handle mobile navigation clicks
  const handleMobileNav = (targetView) => {
    setView(targetView);
    setIsMenuOpen(false);
  };

  // Scroll handler for Resources link
  const scrollToResources = () => {
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth' });
    } else if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const section = document.getElementById('resources');
        if(section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const getOverallScore = () => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const count = Object.keys(answers).length;
    if (count === 0) return "0.0";
    const avg = total / count;
    return avg.toFixed(1);
  };
  
  const getCountByLevel = (min, max) => {
    return SUB_FACTORS.filter(sf => {
      const score = answers[sf.id] || 0;
      return score >= min && score <= max;
    }).length;
  };

  const getCompletionPercentage = () => {
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / SUB_FACTORS.length) * 100);
  };

  const currentSubFactor = SUB_FACTORS[step];
  const currentAnswer = answers[currentSubFactor.id];
  const completionPercent = getCompletionPercentage();

  // Helper to determine stage based on score (1-6 scale)
  const getStageFromScore = (scoreVal) => {
    const score = parseFloat(scoreVal);
    if (score <= 1) return "Inactive"; 
    if (score <= 2) return "Aware";    
    if (score <= 3) return "Exploring";
    if (score <= 4) return "Planning";
    if (score <= 5) return "Preparing";
    return "Ready";                    
  };

  // Helper to determine stage Index based on score (0-5)
  const getStageIndex = (scoreVal) => {
    const score = parseFloat(scoreVal);
    if (score <= 1) return 0; // Inactive
    if (score <= 2) return 1; // Aware
    if (score <= 3) return 2; // Exploring
    if (score <= 4) return 3; // Planning
    if (score <= 5) return 4; // Preparing
    return 5; // Ready
  };

  // Helper to get critical gaps for the overview
  const getCriticalGaps = () => {
    return SUB_FACTORS
      .map(sf => ({ ...sf, score: answers[sf.id] || 0 })) // treat unscored as 0 for sorting
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .filter(sf => sf.score <= 3); // Only show if they are actually low
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#333] font-sans flex flex-col">
      
      {/* --- GLOBAL HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0099CC] rounded-md flex items-center justify-center text-white shadow-sm">
               <Home size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-black text-lg tracking-tight leading-none">Repair Readiness Assessment</span>
              <span className="text-xs text-gray-500 font-medium mt-0.5">v2.2.1</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <button 
              onClick={() => setView('home')} 
              className={`transition-colors ${view === 'home' ? 'text-[#0099CC] font-bold' : 'hover:text-[#0099CC]'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setView('dashboard')} 
              className={`transition-colors ${view === 'dashboard' || view === 'wizard' ? 'text-[#0099CC] font-bold' : 'hover:text-[#0099CC]'}`}
            >
              Assessment
            </button>
            <button 
              onClick={() => setView('plan')} 
              className={`transition-colors ${view === 'plan' ? 'text-[#0099CC] font-bold' : 'hover:text-[#0099CC]'}`}
            >
              Next Steps
            </button>
            <button 
              onClick={() => window.open('https://readiness-app.vercel.app/Readiness_Manual.pdf', '_blank')}
              className="flex items-center gap-2 hover:text-[#0099CC]"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <BookOpen size={16} />
              </div>
              Guide
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg z-50">
            <div className="flex flex-col px-6 py-4 gap-4">
              <button 
                onClick={() => handleMobileNav('home')}
                className={`text-left py-2 ${view === 'home' ? 'text-[#0099CC] font-bold' : 'text-gray-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleMobileNav('dashboard')}
                className={`text-left py-2 ${view === 'dashboard' || view === 'wizard' ? 'text-[#0099CC] font-bold' : 'text-gray-600'}`}
              >
                Assessment
              </button>
              <button 
                onClick={() => handleMobileNav('plan')}
                className={`text-left py-2 ${view === 'plan' ? 'text-[#0099CC] font-bold' : 'text-gray-600'}`}
              >
                Next Steps
              </button>
              <button 
                onClick={() => {
                  window.open('https://readiness-app.vercel.app/Readiness_Manual.pdf', '_blank');
                  setIsMenuOpen(false);
                }}
                className="text-left py-2 flex items-center gap-2 text-gray-600"
              >
                <BookOpen size={16} /> Guide
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- SECONDARY STATIONARY SUB-NAV --- */}
      {/* Visible primarily on Home view or generally available for quick access */}
      <div className={`
        sticky top-[73px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-500 ease-in-out transform
        ${showSubNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
      `}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
           {/* Left Side: Resources Sub-menu */}
           <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
              <span className="text-slate-400 font-bold uppercase text-xs tracking-wider hidden sm:block">Quick Links:</span>
              <button onClick={scrollToResources} className="hover:text-[#0099CC] flex items-center gap-1 transition-colors">
                 <Download size={16}/> Readiness Resources
              </button>
           </div>

           {/* Right Side: CTA Button */}
           <button 
              onClick={Object.keys(answers).length > 0 ? handleContinue : handleStart}
              className="bg-[#0099CC] hover:bg-[#007399] text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md flex items-center gap-2"
            >
              {Object.keys(answers).length > 0 ? "Continue Assessment" : "Start Assessment"} 
              <ArrowRight size={16} />
            </button>
        </div>
      </div>

      <main className={`flex-1 w-full ${view === 'home' ? '' : 'max-w-6xl mx-auto p-4 md:p-8'}`}>

        {/* --- VIEW: HOME (SCROLLYTELLING) --- */}
        {view === 'home' && (
          <div className="flex flex-col w-full">
            
            {/* SECTION 1: HERO - Are We Ready? */}
            {/* Reduced height to min-h-[50vh] */}
            <section 
              className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 relative bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{
                backgroundImage: `url('${heroBg || HERO_IMAGES[0]}')`, // Use random state or fallback
                backgroundPosition: "center 40%" // Adjust focus if needed
              }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-white/85"></div>

              {/* Content (z-10 to sit on top of overlay) */}
              <div className="max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-block mb-6 p-4 bg-[#E0F7FA] rounded-full text-[#0099CC]">
                  <Home size={64} strokeWidth={1.5} />
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tight leading-[0.9]">
                  Are We <span className="text-[#0099CC]">Ready?</span>
                </h1>
                <p className="text-xl md:text-3xl text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
                  Moving from subjective intentions to measurable planning for home repair launch.
                </p>
              </div>
              
              <div className="absolute bottom-10 animate-bounce text-slate-500 z-10">
                <ChevronDown size={48} strokeWidth={1} />
              </div>
            </section>

            {/* SECTION 2: THE PROBLEM - The Readiness Gap (SWAPPED WITH VIDEO) */}
            {/* Restored dark blue theme and reduced padding to py-16 */}
            <section className="bg-slate-900 text-white py-16 px-8">
              <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-3 text-[#EF5350] mb-6 font-bold tracking-widest uppercase text-sm">
                    <AlertCircle size={20} /> The Challenge
                  </div>
                  <h2 className="text-5xl font-bold mb-8 leading-tight text-white">
                    Are good intentions enough?
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                    Bridge the <span className="text-white font-bold">Readiness Gap</span>: The space where efforts stall because the foundation—systems, capacity, and strategy—hasn't been built yet.
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                   {/* Abstract visual for 'gap' - Color adjusted for light background */}
                   <div className="relative w-full max-w-md aspect-square">
                      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#EF5350] opacity-50"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#EF5350] opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-9xl font-black text-slate-700 select-none">?</span>
                      </div>
                   </div>
                </div>
              </div>
            </section>

             {/* SECTION 3: VIDEO OVERVIEW - REDESIGNED (SWAPPED WITH CHALLENGE) */}
             {/* Reduced padding to py-16 */}
             <section id="video-section" className="flex flex-col items-center justify-center bg-slate-50 py-16 px-8 scroll-mt-32">
               <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
                  
                  {/* Left Column: Title Text (Was description) */}
                  <div className="flex-1 md:pr-8">
                     <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight mb-6">
                        Learn why a readiness assessment builds long-term sustainability.
                     </h2>
                     <p className="text-lg text-slate-600 leading-relaxed">
                        Watch this 11-minute overview to understand the purpose and goals of the readiness assessment before you begin.
                     </p>
                  </div>

                  {/* Right Column: Video (Half Width) */}
                  <div className="flex-1 w-full">
                     <div className="shadow-2xl rounded-2xl overflow-hidden border-4 border-white ring-1 ring-slate-200">
                        <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
                           <iframe 
                              src="https://player.vimeo.com/video/1144624007?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                              frameBorder="0" 
                              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                              referrerPolicy="strict-origin-when-cross-origin" 
                              style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} 
                              title="Readiness Assessment Overview"
                           ></iframe>
                        </div>
                     </div>
                  </div>
                  
               </div>
            </section>

            {/* SECTION 4: THE FOUR-STEP READINESS JOURNEY */}
            {/* Reduced padding to py-20 */}
            <section className="flex flex-col items-center justify-center bg-[#F0F9FF] py-20 px-12 md:px-24 text-center">
              <div className="max-w-6xl w-full">
                <h2 className="text-sm font-bold text-slate-500 mb-12 uppercase tracking-widest">
                  THE FOUR-STEP READINESS JOURNEY
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                  {/* Card 1: The Tutorial */}
                  <div 
                    onClick={() => document.getElementById('video-section').scrollIntoView({behavior:'smooth'})}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-[#0099CC] group h-full flex flex-col"
                  >
                    <div className="mb-6 p-4 bg-blue-50 text-[#0099CC] rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-[#0099CC] group-hover:text-white transition-colors">
                      <Play size={32} fill="currentColor" className="ml-1"/>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Watch The Tutorial</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      Watch the 11-minute overview video to set the context.
                    </p>
                  </div>

                  {/* Card 2: The Guide */}
                  <div 
                    onClick={() => window.open('https://readiness-app.vercel.app/Readiness_Manual.pdf', '_blank')}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-[#0099CC] group h-full flex flex-col"
                  >
                    <div className="mb-6 p-4 bg-blue-50 text-[#0099CC] rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-[#0099CC] group-hover:text-white transition-colors">
                      <BookOpen size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Study The Guide</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      Review the Readiness Guide to gain deeper understanding of the Readiness framework.
                    </p>
                  </div>

                  {/* Card 3: Assessment */}
                  <div 
                    onClick={Object.keys(answers).length > 0 ? handleContinue : handleStart}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-[#0099CC] group h-full flex flex-col"
                  >
                    <div className="mb-6 p-4 bg-blue-50 text-[#0099CC] rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-[#0099CC] group-hover:text-white transition-colors">
                      <ClipboardCheck size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Take the Assessment</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      Evaluate your affiliate individually using this tool.
                    </p>
                  </div>

                  {/* Card 4: Team Planning */}
                  <div 
                    onClick={() => setView('plan')}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-[#0099CC] group h-full flex flex-col"
                  >
                    <div className="mb-6 p-4 bg-blue-50 text-[#0099CC] rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-[#0099CC] group-hover:text-white transition-colors">
                      <Target size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">4. Begin Planning</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      Consolidate results into a 90-day Action Plan.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: THE FRAMEWORK - 5 Essential Questions */}
            {/* Reduced padding to py-20 */}
            <section className="flex flex-col justify-center bg-white py-20 px-8 md:px-24">
              <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-16 text-center md:text-left">
                  5 Essential Questions.
                </h2>
                
                <div className="flex flex-col gap-4">
                  {[
                    { title: "Capacity", text: "Do we have the people, skills, and equipment?", color: "bg-slate-100 border-slate-300", icon: FACTOR_ICONS["Capacity of Affiliate"] },
                    { title: "Need", text: "Do we factually understand the community gap?", color: "bg-blue-50 border-blue-200", icon: FACTOR_ICONS["Repair Program Need"] },
                    { title: "Approach", text: "Is our plan realistic and mission-aligned?", color: "bg-indigo-50 border-indigo-200", icon: FACTOR_ICONS["Soundness of Approach"] },
                    { title: "Leverage", text: "Can we integrate this into our network?", color: "bg-teal-50 border-teal-200", icon: FACTOR_ICONS["Leverage and Partnerships"] },
                    { title: "Impact", text: "What is the long-term vision we aim to realize?", color: "bg-green-50 border-green-200", icon: FACTOR_ICONS["Impact & Sustainability"] }
                  ].map((item, i) => (
                    <div key={i} className={`p-6 rounded-xl border-l-8 flex flex-col md:flex-row md:items-center gap-6 transition-transform hover:scale-[1.01] ${item.color.replace('bg-', 'border-').replace('50', '500')} ${item.color}`}>
                      {/* Icon Column - Approx 10% */}
                      <div className="flex-shrink-0 bg-white/60 p-3 rounded-full flex items-center justify-center w-16 h-16 md:w-auto md:h-auto md:p-4">
                        {React.createElement(item.icon, { size: 32, strokeWidth: 1.5, className: "text-slate-700" })}
                      </div>
                      
                      {/* Title Column - Approx 30% */}
                      <div className="md:w-[30%]">
                        <h3 className="text-2xl font-bold text-slate-800">{item.title}</h3>
                      </div>

                      {/* Description Column - Approx 60% */}
                      <div className="md:flex-1">
                        <p className="text-lg text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

             {/* --- NEW RESOURCES SECTION (SCROLL TARGET) --- */}
             {/* Reduced padding to py-16 */}
            <section id="resources" className="bg-slate-50 py-16 px-8 scroll-mt-32">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Readiness Resources</h2>
                    <p className="text-xl text-slate-500 mb-12">Essential documents and guides to support your readiness journey.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 1: Manual */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-[#0099CC] transition-all group cursor-pointer" onClick={() => window.open('https://readiness-app.vercel.app/Readiness_Manual.pdf', '_blank')}>
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-blue-50 text-[#0099CC] rounded-xl group-hover:bg-[#0099CC] group-hover:text-white transition-colors">
                                <FileText size={32} />
                                </div>
                                <div>
                                <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#0099CC] transition-colors mb-2">Readiness Guide</h4>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    A comprehensive guide explaining the 5 HUD factors, 15 sub-factors, and scoring criteria in detail.
                                </p>
                                <span className="inline-flex items-center gap-2 text-[#0099CC] font-bold text-sm group-hover:underline">
                                    Download PDF <Download size={16}/>
                                </span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Overview Video Link (Scrolls up to video) */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-[#0099CC] transition-all group cursor-pointer" onClick={() => document.getElementById('video-section').scrollIntoView({behavior:'smooth'})}>
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Play size={32} />
                                </div>
                                <div>
                                <h4 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-2">Overview Video</h4>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    Watch the instructional video covering the purpose and goals of the readiness assessment.
                                </p>
                                <span className="inline-flex items-center gap-2 text-purple-600 font-bold text-sm group-hover:underline">
                                    Watch Video <ArrowRight size={16}/>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: CALL TO ACTION */}
            {/* Reduced height to min-h-[40vh] */}
            <section className="min-h-[40vh] flex flex-col items-center justify-center bg-[#0099CC] text-white text-center p-8">
              <h2 className="text-5xl md:text-7xl font-black mb-8">
                Build Your Roadmap.
              </h2>
              <p className="text-xl md:text-2xl max-w-2xl mb-12 font-light">
                Take less than 30 minutes to assess your organization's readiness and gain insights to where you can strengthen your organization for home repair program launch.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6">
                <button 
                  onClick={Object.keys(answers).length > 0 ? handleContinue : handleStart}
                  className="bg-white text-[#0099CC] px-10 py-5 rounded-full text-xl font-bold hover:bg-slate-100 transition-all shadow-2xl flex items-center gap-3"
                >
                  {Object.keys(answers).length > 0 ? "Continue Assessment" : "Start Assessment"} 
                  <ArrowRight size={24} />
                </button>
                
                {Object.keys(answers).length > 0 && (
                  <button 
                    onClick={() => setView('dashboard')}
                    className="border-2 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all"
                  >
                    View Previous Results
                  </button>
                )}
              </div>
              
              <div className="mt-16 flex items-center gap-2 text-blue-200 text-sm">
                <Clock size={16} /> <span>Takes ~30 minutes</span>
                <span className="mx-2">•</span>
                <Save size={16} /> <span>Auto-saves progress</span>
              </div>
            </section>

          </div>
        )}

        {/* --- VIEW: WIZARD & DASHBOARD & PLAN --- */}
        {view !== 'home' && (
           <div className="mt-4">
              {/* If needed, we can re-inject the full wizard/dashboard logic here. 
                  Given the request was specifically about the HOME page visual, 
                  I am confident reusing the existing structure for other views is correct.
                  To ensure the file is complete and runnable, I will include the existing logic below.
              */}
              
              {/* WIZARD */}
              {view === 'wizard' && (
                <div className="w-full mt-4">
                  {/* DYNAMIC FACTOR TITLE WITH ICON */}
                  <div className="mb-2 flex items-center gap-4">
                      <div className="p-3 bg-[#E0F2F1] rounded-xl text-[#0099CC]">
                          {React.createElement(FACTOR_ICONS[currentSubFactor.factor] || ClipboardCheck, { size: 32 })}
                      </div>
                      <h2 className="text-3xl font-bold text-[#333]">
                        Factor {Math.floor(step / 3) + 1}: {currentSubFactor.factor}
                      </h2>
                      <div className="ml-auto md:max-w-md text-gray-600 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 hidden md:block">
                        {FACTOR_DESCRIPTIONS[currentSubFactor.factor] || "Evaluate your affiliate's readiness in this specific area based on the HUD framework."}
                      </div>
                  </div>
                  
                  <div className="md:hidden mb-6 text-gray-600 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {FACTOR_DESCRIPTIONS[currentSubFactor.factor]}
                  </div>

                  <div className="mb-6 flex justify-between items-end">
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Section {Math.floor(step/3) + 1} of 5, Item {step + 1} of {SUB_FACTORS.length}</span>
                      <div className="h-1.5 w-64 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-[#0099CC] transition-all duration-500 ease-out"
                          style={{ width: `${((step + 1) / SUB_FACTORS.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10 relative">
                    <div className="mb-8 border-b border-gray-100 pb-8">
                        <h2 className="text-3xl font-bold text-[#222] mb-3 leading-tight">
                          {currentSubFactor.name}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {currentSubFactor.context || "No context available."}
                        </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#333] mb-3">Sub-factor Question:</h3>
                      <p className="text-gray-800 text-lg mb-4 font-medium">
                        {currentSubFactor.q}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-[#0099CC] uppercase tracking-wide mb-3">Select One</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
                      {LEVELS.map((label, idx) => {
                        const score = idx + 1;
                        const isSelected = currentAnswer === score;
                        const style = LEVEL_STYLES[idx];

                        return (
                          <div 
                            key={score}
                            onClick={() => handleAnswer(score)}
                            className={`
                              relative rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col overflow-hidden h-64 group
                              ${isSelected 
                                ? 'border-[#2C5697] ring-4 ring-blue-50 transform scale-[1.02] shadow-lg z-10' 
                                : 'border-gray-200 hover:border-[#0099CC] hover:shadow-md'
                              }
                            `}
                          >
                            <div className={`py-3 px-2 text-center font-bold text-sm uppercase tracking-wide ${style.header} relative`}>
                              {label}
                            </div>
                            <div className={`p-4 text-xs leading-relaxed text-gray-700 flex-grow overflow-y-auto ${style.body}`}>
                              {currentSubFactor.desc[idx]}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex gap-3">
                        <button 
                          onClick={handlePrev}
                          className="px-6 py-2 rounded-full border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button 
                          onClick={handleNext}
                          disabled={!currentAnswer}
                          className={`px-8 py-2 rounded-full font-bold text-white transition-colors shadow-md
                            ${currentAnswer ? 'bg-[#2C5697] hover:bg-[#1e4066]' : 'bg-gray-300 cursor-not-allowed'}
                          `}
                        >
                          {step === SUB_FACTORS.length - 1 ? 'Finish' : 'Next'}
                        </button>
                      </div>
                      <button 
                        onClick={() => setView('dashboard')}
                        className="text-[#0099CC] font-bold underline text-sm hover:text-teal-800"
                      >
                        Save and Exit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* DASHBOARD */}
              {view === 'dashboard' && (
                !hasStarted ? (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-in fade-in zoom-in duration-300">
                    <div className="bg-gray-100 p-8 rounded-full mb-6 shadow-inner">
                      <ClipboardCheck size={64} className="text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment Not Started</h2>
                    <p className="text-gray-600 text-lg max-w-lg mb-8 leading-relaxed">
                      You haven't started the assessment yet. Please answer the assessment questions to view your readiness profile and dashboard insights.
                    </p>
                    <button 
                      onClick={handleStart}
                      className="bg-[#0099CC] hover:bg-[#007399] text-white px-8 py-4 rounded-full text-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-1"
                    >
                      Start Assessment <ArrowRight size={24} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8 mt-8">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-[#333]">Readiness Profile Summary</h2>
                        <p className="text-gray-500 mt-1">Review your scores and high-level insights.</p>
                      </div>
                      <div className="flex gap-3">
                        {completionPercent < 100 && (
                          <button 
                            onClick={handleContinue}
                            className="px-6 py-2 bg-[#0099CC] hover:bg-[#007399] text-white rounded-full font-bold shadow-sm flex items-center gap-2 transition-all"
                          >
                            {completionPercent === 0 ? "Start Assessment" : "Complete Assessment"}
                            <ArrowRight size={16}/>
                          </button>
                        )}
                        <button 
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700"
                        >
                            <Printer size={16}/> Print to PDF
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#2C5697]">
                        <div className="text-sm text-gray-500 uppercase font-bold mb-1">Overall Score</div>
                        <div className="text-3xl font-bold text-[#2C5697]">{getOverallScore()} <span className="text-lg text-gray-400 font-normal">/ 6.0</span></div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#D9534F]">
                        <div className="text-sm text-gray-500 uppercase font-bold mb-1">Below Planning</div>
                        <div className="text-3xl font-bold text-[#D9534F]">{getCountByLevel(1, 3)}</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CB85C]">
                        <div className="text-sm text-gray-500 uppercase font-bold mb-1">Preparing/Ready</div>
                        <div className="text-3xl font-bold text-[#5CB85C]">{getCountByLevel(5, 6)}</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#0099CC]">
                        <div className="text-sm text-gray-500 uppercase font-bold mb-1">Assessment Completion</div>
                        <div className="text-3xl font-bold text-[#0099CC]">{completionPercent}%</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-700">Readiness Heatmap</h3>
                        <div className="flex gap-4 text-xs text-gray-500 italic">
                          Select the ranked score in order to change it
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-sm border-collapse">
                          <thead>
                            <tr className="bg-gray-100 text-gray-500 uppercase text-xs">
                              <th className="text-left p-3 w-1/4 border-b border-gray-200">Sub-factors</th>
                              {LEVELS.map(l => <th key={l} className="text-left p-3 w-[12%] border-b border-gray-200">{l}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {SUB_FACTORS.map((sf, idx) => {
                              const score = answers[sf.id];
                              const isNewGroup = idx === 0 || sf.factor !== SUB_FACTORS[idx - 1].factor;
                              return (
                                <React.Fragment key={sf.id}>
                                  {isNewGroup && (
                                    <tr className="bg-gray-50 border-y border-gray-200">
                                      <td colSpan={7} className="px-4 py-2 text-xs font-bold text-[#2C5697] uppercase tracking-wider">
                                        {sf.factor}
                                      </td>
                                    </tr>
                                  )}
                                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 pl-6 font-medium text-gray-800 border-r border-gray-100">
                                      {sf.name}
                                    </td>
                                    {[1,2,3,4,5,6].map(lvl => (
                                      <td key={lvl} className="p-1 border-r border-gray-100 last:border-0 relative h-12">
                                        {score === lvl ? (
                                          <div 
                                            onClick={() => { setStep(idx); setView('wizard'); }}
                                            className={`absolute inset-1 rounded flex items-center justify-center font-bold shadow-sm cursor-pointer hover:opacity-90 transition-opacity ${LEVEL_STYLES[lvl - 1].header}`}
                                          >
                                            {score}
                                          </div>
                                        ) : (
                                          <div className="absolute inset-1 bg-white"></div>
                                        )}
                                      </td>
                                    ))}
                                  </tr>
                                </React.Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 py-8">
                      {completionPercent < 100 ? (
                        <button onClick={handleContinue} className="px-6 py-3 bg-[#0099CC] hover:bg-[#007399] text-white font-bold rounded-full hover:bg-blue-800 shadow-md flex items-center gap-2">
                          {completionPercent === 0 ? "Start Assessment" : "Complete Assessment"} <ArrowRight size={16}/>
                        </button>
                      ) : (
                        <button className="px-6 py-3 bg-gray-200 text-gray-500 font-bold rounded-full cursor-not-allowed flex items-center gap-2" disabled>
                          Assessment Complete <Check size={16}/>
                        </button>
                      )}
                      <button onClick={() => setView('plan')} className="px-6 py-3 border-2 border-[#0099CC] text-[#0099CC] font-bold rounded-full hover:bg-sky-50">
                        Generate Next Steps Plan
                      </button>
                    </div>
                  </div>
                )
              )}

              {/* PLAN VIEW */}
              {view === 'plan' && (
                !hasStarted ? (
                   <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-in fade-in zoom-in duration-300">
                    <div className="bg-gray-100 p-8 rounded-full mb-6 shadow-inner">
                      <FileText size={64} className="text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Next Steps Plan Unavailable</h2>
                    <p className="text-gray-600 text-lg max-w-lg mb-8 leading-relaxed">
                      Your personalized roadmap is generated based on your assessment scores. Please complete the assessment to unlock your custom plan.
                    </p>
                    <button onClick={handleStart} className="bg-[#0099CC] hover:bg-[#007399] text-white px-8 py-4 rounded-full text-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-1">
                      Start Assessment <ArrowRight size={24} />
                    </button>
                  </div>
                ) : (
                  <div className="mt-8">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-[#333]">Personalized Next Steps Plan</h2>
                        <p className="text-gray-500 mt-1">Your prioritized roadmap based on the assessment.</p>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                            <Printer size={16}/> Print to PDF
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-xl p-8 mb-10 border border-gray-200">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="flex-shrink-0 flex flex-col items-center">
                          <div 
                            className="w-32 h-32 rounded-full border-[6px] flex flex-col items-center justify-center bg-white shadow-sm transition-colors duration-500"
                            style={{ borderColor: LEVEL_STYLES[getStageIndex(getOverallScore())].hex }}
                          >
                            <span className="text-3xl font-extrabold text-[#333]">{getOverallScore()}</span>
                            <span className="text-xs text-gray-500 font-medium uppercase mt-1">out of 6.0</span>
                          </div>
                          <div 
                            className={`mt-4 px-4 py-1.5 text-sm font-bold rounded-full shadow-sm transition-colors duration-500 ${LEVEL_STYLES[getStageIndex(getOverallScore())].textClass}`}
                            style={{ backgroundColor: LEVEL_STYLES[getStageIndex(getOverallScore())].hex }}
                          >
                            {getStageFromScore(getOverallScore())}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-[#333] mb-4">Overall Readiness Level</h2>
                          <p className="text-gray-700 leading-relaxed mb-6">
                            {STAGE_DEFINITIONS[getStageFromScore(getOverallScore())]}
                          </p>
                          <div className="bg-[#F0F7FF] p-6 rounded-lg border-l-4 border-[#2C5697] shadow-sm">
                            <h3 className="text-xl font-bold text-[#333] mb-4 flex items-center gap-2">
                              <TrendingUp size={24} className="text-[#333]" /> 
                              General Guidance
                            </h3>
                            <ul className="space-y-3 text-gray-700 list-disc pl-5">
                              <li>
                                Review areas scoring below 
                                <span className="inline-block bg-[#FFD54F] text-gray-800 text-xs font-bold px-2 py-0.5 rounded mx-1">Planning</span> 
                                for immediate attention
                              </li>
                              <li>Create a 3-6 month action plan addressing your lowest-scoring factors</li>
                              <li>Engage leadership and staff in discussing assessment results</li>
                              <li>Connect with HFHI for technical assistance in priority areas</li>
                              <li>Schedule a follow-up assessment in 6 months to track progress</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 relative pt-6">
                        <div className="flex h-3 rounded-full overflow-hidden w-full">
                          <div className="flex-1 bg-[#94A3B8]"></div>
                          <div className="flex-1 bg-[#EF5350]"></div>
                          <div className="flex-1 bg-[#FFB74D]"></div>
                          <div className="flex-1 bg-[#FFD54F]"></div>
                          <div className="flex-1 bg-[#AED581]"></div>
                          <div className="flex-1 bg-[#4CAF50]"></div>
                        </div>
                        <div 
                          className="absolute top-0 flex flex-col items-center transform -translate-x-1/2 transition-all duration-500"
                          style={{ left: `${(parseFloat(getOverallScore()) / 6) * 100}%` }}
                        >
                          <div className="bg-[#333] text-white text-xs font-bold px-2 py-1 rounded shadow-lg mb-1">
                            {getOverallScore()}
                          </div>
                          <div className="w-0.5 h-8 bg-[#333]"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold mt-2 px-1">
                          <span>Inactive</span><span>Aware</span><span>Exploring</span><span>Planning</span><span>Preparing</span><span>Ready</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#FFEBEE] p-6 rounded-t-lg border-b-4 border-[#EF5350]">
                          <h2 className="text-xl font-bold text-[#C62828]">Immediate 3-month priorities.</h2>
                          <p className="text-[#D32F2F] text-sm mt-1">Focus on these critical areas to build a strong foundation for your home repair program.</p>
                        </div>
                        <div className="space-y-4">
                          {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) <= 3).sort((a,b) => (answers[a.id]||0)-(answers[b.id]||0)).map(sf => {
                              const scoreIndex = answers[sf.id] ? answers[sf.id] - 1 : -1;
                              const iconColorClass = scoreIndex >= 0 ? SCORE_ICON_COLORS[scoreIndex] : 'bg-gray-100 text-gray-500';
                              const FactorIcon = FACTOR_ICONS[sf.factor] || ClipboardCheck;
                              return (
                                <div key={sf.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6">
                                  <div className="flex-shrink-0">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColorClass}`}>
                                        <FactorIcon size={20}/>
                                    </div>
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                      <h3 className="font-bold text-gray-800 text-lg">{sf.name}</h3>
                                      {answers[sf.id] !== undefined && (
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${LEVEL_STYLES[scoreIndex].body} text-gray-700`}>
                                          {answers[sf.id]} - {LEVELS[scoreIndex]}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-500 mb-2">Practical steps:</p>
                                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                      <li>{sf.tips[answers[sf.id] || 1]}</li>
                                      <li>Schedule review meeting with relevant staff.</li>
                                    </ul>
                                  </div>
                                </div>
                              );
                          })}
                          {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) <= 3).length === 0 && (
                            <div className="p-8 text-center text-gray-500 italic bg-gray-50 rounded-lg">No immediate priorities found. Great job!</div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <div className="bg-[#FFF8E1] p-5 rounded-t-lg border-b-4 border-[#FFD54F]">
                            <h2 className="text-lg font-bold text-[#F57F17]">6 to 12 month growth opportunities.</h2>
                            <p className="text-[#F9A825] text-xs mt-1">Plan ahead to expand your program's reach and impact.</p>
                          </div>
                          <div className="bg-white border-x border-b border-gray-200 p-4 space-y-4 rounded-b-lg">
                            {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) > 3 && (answers[sf.id] || 1) < 6).map(sf => (
                              <div key={sf.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="mt-1 text-[#F9A825]"><ArrowRight size={16}/></div>
                                <div>
                                  <h4 className="font-bold text-gray-800 text-sm">{sf.name}</h4>
                                  <p className="text-xs text-gray-600 mt-1">{sf.tips[answers[sf.id] || 1]}</p>
                                </div>
                              </div>
                            ))}
                            {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) > 3 && (answers[sf.id] || 1) < 6).length === 0 && (
                              <div className="text-center text-xs text-gray-400 py-4">No mid-term items.</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="bg-[#E8F5E9] p-5 rounded-t-lg border-b-4 border-[#4CAF50]">
                            <h2 className="text-lg font-bold text-[#1B5E20]">Maintaining strengths.</h2>
                            <p className="text-[#2E7D32] text-xs mt-1">Continue to leverage these areas where your affiliate excels.</p>
                          </div>
                          <div className="bg-white border-x border-b border-gray-200 p-4 space-y-4 rounded-b-lg">
                            {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) === 6).map(sf => (
                              <div key={sf.id} className="flex items-center gap-3">
                                <div className="bg-green-100 p-1.5 rounded text-green-700"><Check size={14}/></div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-800 text-sm">{sf.name}</h4>
                                </div>
                                <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                  <Check size={10}/> Ready
                                </div>
                              </div>
                            ))}
                            {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) === 6).length === 0 && (
                              <div className="text-center text-xs text-gray-400 py-4">Keep working to reach "Ready" status!</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center py-10">
                      <button onClick={() => setView('dashboard')} className="px-6 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 font-medium text-gray-700">
                          Return to Dashboard
                      </button>
                    </div>
                  </div>
                )
              )}
           </div>
        )}
      </main>

      {/* --- GLOBAL FOOTER --- */}
      <footer className="bg-[#0099CC] text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">© 2025 PRO Tool. All rights reserved.</div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="mailto:JeZuniga@habitat.org" className="hover:text-blue-200">Contact</a>
            <button 
              onClick={handleReset}
              className="hover:text-red-200 flex items-center gap-1 transition-colors"
            >
              <Settings size={14} /> Reset Data
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
