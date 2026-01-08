import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Book, 
  Shield, 
  Users, 
  Target, 
  Filter, 
  Activity, 
  Briefcase, 
  BarChart2, 
  CheckCircle, 
  Download, 
  ChevronRight, 
  Info, 
  Save, 
  Activity as ActivityIcon,
  Plus,
  Trash2,
  File,
  FileText,
  ClipboardCheck,
  Menu,
  X,
  User,
  CheckSquare
} from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot } from "firebase/firestore";

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- Constants & Data Models ---

const APP_VERSION = '1.3.1';

const STEPS = [
  { id: 'foundations', title: 'Setup', icon: Book, description: 'Org details and Key Staff' },
  { id: 'compliance', title: 'Compliance', icon: CheckSquare, description: 'Policy 33 Alignment' },
  { id: 'policyMap', title: 'Policy Map', icon: Shield, description: 'Distinguish Org vs. Program policies' },
  { id: 'programModel', title: 'Program Model', icon: Users, description: 'Roles and responsibilities' },
  { id: 'scope', title: 'Scope & Impact', icon: Target, description: 'Eligibility, caps, and exclusions' },
  { id: 'screening', title: 'Client Screening', icon: Filter, description: 'Intake and prioritization' },
  { id: 'lifecycle', title: 'Project Lifecycle', icon: Activity, description: 'Assessment to Closeout' },
  { id: 'workforce', title: 'Workforce Strategy', icon: Briefcase, description: 'Contractors vs. Volunteers' },
  { id: 'performance', title: 'Performance', icon: BarChart2, description: 'KPIs and Reporting' },
  { id: 'export', title: 'Review & Export', icon: ClipboardCheck, description: 'Finalize and download' },
];

const VULNERABLE_GROUPS = [
  { key: 'lmiHouseholds', label: 'LMI Households (≤80% AMI)', reason: 'Core target for HUD/funding; risk of deferred maintenance' },
  { key: 'olderAdults', label: 'Older Adults (62+)', reason: 'Aging in place, fall risk, fixed income' },
  { key: 'disabilities', label: 'People with Disabilities', reason: 'High ADL challenges, modification needs' },
  { key: 'veterans', label: 'Veterans', reason: 'Displacement risk, targeted outreach needs' },
  { key: 'raciallyMarginalized', label: 'Racially Marginalized Communities', reason: 'Historic disinvestment/redlining' },
  { key: 'persistentPoverty', label: 'Persistent Poverty / Distressed', reason: 'Chronic disinvestment, economic hardship' },
  { key: 'femaleHead', label: 'Female Head of Household', reason: 'Historical income disparity' },
  { key: 'largeFamilies', label: 'Large Families (5+ members)', reason: 'Overcrowding, systems stress' },
  { key: 'mobileHomeowners', label: 'Manufactured/Mobile Homeowners', reason: 'High substandard rates, energy burden' },
  { key: 'ruralHouseholds', label: 'Rural Households', reason: 'Limited funding, workforce challenges' },
  { key: 'disasterImpacted', label: 'Disaster-Impacted', reason: 'Structural damage, immediate displacement risk' }
];

const INITIAL_DATA = {
  // Foundations
  orgName: '',
  orgAddress: '',
  orgPhone: '',
  orgEmail: '',
  serviceArea: '',
  existingPolicies: '', // Kept in model for backward compatibility, though UI removed
  staff: [
    { id: 1, name: '', title: 'Executive Director' },
    { id: 2, name: '', title: 'Program Manager' }
  ],
  
  // Compliance
  policy33Aligned: false,
  policy33Checklist: {
    assessment: false,
    partnerSelection: false,
    participation: false,
    staffing: false,
    pricing: false,
    constructionTypes: false,
    sustainability: false,
    risk: false,
    safety: false,
    codes: false,
    agreements: false,
    insurance: false
  },

  // Policy Map
  policyMap: {
    governance: 'org',
    finance: 'org',
    hr: 'org',
    eligibility: 'program',
    safety: 'both',
    procurement: 'both',
    recordKeeping: 'program'
  },

  // Program Model
  roles: [
    { id: 1, title: 'Program Manager', responsibilities: 'Overall execution, compliance, reporting', approves: ['SOW', 'Closeout'] },
    { id: 2, title: 'Intake Coordinator', responsibilities: 'Client screening, document collection', approves: ['Eligibility'] },
    { id: 3, title: 'Construction Lead', responsibilities: 'Scoping, QC, Contractor management', approves: ['Change Order'] }
  ],

  // Scope
  repairTypes: {
    critical: true,
    accessibility: false,
    energy: false,
    exterior: false
  },
  financialCap: 15000,
  exclusions: '',

  // Client Screening (formerly Access)
  intakeMethods: { phone: true, web: false, walkin: false },
  priorityFactors: {
    healthSafety: 5, // Defaulting standard factors
    lmiHouseholds: 3,
    olderAdults: 3
  },
  
  // Lifecycle
  stages: [
    { id: 1, name: 'Inquiry & App', reqDoc: 'Application Form' },
    { id: 2, name: 'Eligibility Review', reqDoc: 'Income Verification' },
    { id: 3, name: 'Home Assessment', reqDoc: 'Inspection Report' },
    { id: 4, name: 'SOW & Approval', reqDoc: 'Signed Agreement' },
    { id: 5, name: 'Construction', reqDoc: 'Permits' },
    { id: 6, name: 'Closeout', reqDoc: 'Satisfaction Survey' }
  ],

  // Workforce
  model: 'blended', // contractor, volunteer, blended
  qcFrequency: 'milestone',

  // Performance
  kpis: {
    homesServed: true,
    avgCost: true,
    repairTimeline: false,
    clientSatisfaction: true,
    safetyIncidents: false
  },
  reportingSchedule: 'monthly',
  feedbackMechanism: '',

  // Meta
  version: '1.3.0',
  lastUpdated: new Date().toISOString()
};

// --- Components ---

const GuidePanel = ({ stepId }) => {
  const guideContent = {
    foundations: {
      title: "Setting the Foundation",
      text: "Start by defining your organization's boundaries. Providing accurate contact details ensures that the exported manual is ready for distribution to Board members or external partners. List the key staff members responsible for the program."
    },
    compliance: {
      title: "Policy 33 Alignment",
      text: "Per 'Policy 33: Home Repairs' (Section 2.1.1), your affiliate MUST operate consistent with a written, board-approved policy. The checklist on the left formalizes these requirements. You must address topics like 'Pricing and repayment model' and 'Risk management' explicitly in this manual."
    },
    policyMap: {
      title: "Who Owns What?",
      text: "This step is crucial to prevent 'Governance Bloat'. Policies are board-approved and change rarely. Procedures are staff-managed and change often. Mark 'Program' for things specific only to repairs (e.g., Lead Safety), and 'Org' for universal rules (e.g., Whistleblower)."
    },
    programModel: {
      title: "Roles & Responsibilities",
      text: "Avoid listing specific people. List roles. In smaller affiliates, one person might wear three hats (Program Manager + Construction Lead). Explicitly define who has 'signing authority' for money vs. who just recommends approval."
    },
    scope: {
      title: "Define the 'No'",
      text: "The most important part of Scope is what you WON'T do. Be specific about exclusions (e.g., 'No roof replacements over 2 stories', 'No mold remediation'). This protects your staff from scope creep."
    },
    screening: {
      title: "Fair & Transparent",
      text: "How do you decide who goes first? Funder requirements (like CDBG) usually mandate prioritizing lowest income or highest health risk. Use the checkboxes to select the specific vulnerable populations your program prioritizes, then weight them to create a defensible scoring matrix."
    },
    lifecycle: {
      title: "The Project Pipeline",
      text: "This is your operational heartbeat. Every project should move through these stages linearly. Ensure 'SOW Approval' happens BEFORE any hammer swings. Define exactly what document triggers the move to the next stage."
    },
    workforce: {
      title: "Managing Labor",
      text: "If you use volunteers, you need a waiver and safety training protocol. If you use contractors, you need insurance verification and lien waiver processes. A 'Blended' model is most common but requires the strictest controls."
    },
    performance: {
      title: "Prove It Works",
      text: "Don't measure everything. Measure what tells your story. 'Homes Served' is output. 'Aging in Place' is outcome. Ensure you have a feedback loop—how do you handle a homeowner complaint? Establishing clear KPIs now helps with future grant reporting."
    },
    export: {
      title: "Ready for Approval",
      text: "This export generates a draft for your Board or ED. It includes a version history log. Remember to update the 'Effective Date' once it is actually signed."
    }
  };

  const content = guideContent[stepId] || { title: "Guidance", text: "Follow the prompts to complete this section." };

  return (
    <div className="bg-white border-l border-gray-200 p-6 h-full shadow-sm">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Best Practices</h4>
      </div>
      <h3 className="text-lg font-semibold text-blue-900 mb-3">{content.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {content.text}
      </p>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Reminders</h5>
        <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4">
          <li>Keep policies broad, procedures specific.</li>
          <li>Reference external docs (HR manual) instead of copying.</li>
          <li>Ensure compliance with local building codes.</li>
        </ul>
      </div>
    </div>
  );
};

// --- Step Components ---

const FoundationsStep = ({ data, onChange }) => {
  const addStaff = () => {
    const newStaff = { id: Date.now(), name: '', title: '' };
    onChange('staff', [...(data.staff || []), newStaff]);
  };

  const updateStaff = (id, field, value) => {
    const updated = data.staff.map(s => s.id === id ? { ...s, [field]: value } : s);
    onChange('staff', updated);
  };

  const removeStaff = (id) => {
    onChange('staff', data.staff.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <h4 className="font-bold text-gray-900 border-b pb-2 mb-4">Organization Profile</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Affiliate / Organization Name</label>
            <input 
              type="text" 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border transition-all duration-200"
              value={data.orgName}
              onChange={(e) => onChange('orgName', e.target.value)}
              placeholder="e.g. Habitat for Humanity of Springfield"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mailing Address</label>
            <input 
              type="text" 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border transition-all duration-200"
              value={data.orgAddress}
              onChange={(e) => onChange('orgAddress', e.target.value)}
              placeholder="e.g. 123 Main St, Springfield, IL 62704"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input 
              type="text" 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border transition-all duration-200"
              value={data.orgPhone}
              onChange={(e) => onChange('orgPhone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border transition-all duration-200"
              value={data.orgEmail}
              onChange={(e) => onChange('orgEmail', e.target.value)}
              placeholder="info@habitatspringfield.org"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Area (Counties/Zips)</label>
            <input 
              type="text" 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border transition-all duration-200"
              value={data.serviceArea}
              onChange={(e) => onChange('serviceArea', e.target.value)}
              placeholder="e.g. Greene County and Northern Polk County"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
            <User className="w-5 h-5 mr-2 text-blue-600"/> Key Staff Contacts
        </h4>
        <div className="space-y-3">
            {(data.staff || []).map((staff) => (
                <div key={staff.id} className="flex gap-3 items-center">
                    <input 
                        type="text" 
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
                        value={staff.name}
                        onChange={(e) => updateStaff(staff.id, 'name', e.target.value)}
                        placeholder="Staff Name"
                    />
                    <input 
                        type="text" 
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
                        value={staff.title}
                        onChange={(e) => updateStaff(staff.id, 'title', e.target.value)}
                        placeholder="Job Title"
                    />
                    <button onClick={() => removeStaff(staff.id)} className="text-gray-400 hover:text-red-500 p-1">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ))}
            <button onClick={addStaff} className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center mt-2">
                <Plus className="h-4 w-4 mr-1" /> Add Staff Member
            </button>
        </div>
      </div>
    </div>
  );
};

const ComplianceStep = ({ data, onChange }) => {
  const toggleCheck = (key) => {
    const newChecklist = { ...data.policy33Checklist, [key]: !data.policy33Checklist[key] };
    onChange('policy33Checklist', newChecklist);
    
    // Auto-update the summary boolean if all are true
    const allChecked = Object.values(newChecklist).every(v => v);
    onChange('policy33Aligned', allChecked);
  };

  const checklistItems = [
    { key: 'assessment', label: 'Project assessment and selection criteria (2.1.1)' },
    { key: 'partnerSelection', label: 'Partner selection criteria & process (2.1.1)' },
    { key: 'participation', label: 'Homeowner participation requirements (2.1.1, 2.1.7)' },
    { key: 'staffing', label: 'Staffing and volunteer participation (2.1.1)' },
    { key: 'pricing', label: 'Pricing and repayment model (2.1.1)' },
    { key: 'constructionTypes', label: 'Defined types of construction activities (2.1.1)' },
    { key: 'sustainability', label: 'Financial sustainability plan (2.1.1)' },
    { key: 'risk', label: 'Risk management policy (2.1.1)' },
    { key: 'safety', label: 'Safety procedures (2.1.1, 3.5)' },
    { key: 'codes', label: 'Compliance with building codes & industry standards (2.1.2)' },
    { key: 'agreements', label: 'Written agreements executed before work (2.1.3)' },
    { key: 'insurance', label: 'Adequate insurance coverage maintenance (2.1.8)' },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckSquare className="text-blue-600 w-5 h-5" />
            <h3 className="font-bold text-gray-800">Policy 33 Compliance Checklist</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${data.policy33Aligned ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {data.policy33Aligned ? 'Compliant' : 'Incomplete'}
          </span>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6">
            Confirm that your manual addresses all mandatory requirements outlined in Policy 33.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.map(item => (
              <label key={item.key} className={`flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${data.policy33Checklist?.[item.key] ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50 border-transparent'}`}>
                <input
                  type="checkbox"
                  className="mt-1 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={data.policy33Checklist?.[item.key] || false}
                  onChange={() => toggleCheck(item.key)}
                />
                <span className={`text-sm leading-tight ${data.policy33Checklist?.[item.key] ? 'text-blue-800 font-medium' : 'text-gray-600'}`}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicyMapStep = ({ data, onChange }) => {
  const updateMap = (key, value) => {
    onChange('policyMap', { ...data.policyMap, [key]: value });
  };

  const rows = [
    { key: 'governance', label: 'Governance & Board Structure' },
    { key: 'finance', label: 'Financial Management' },
    { key: 'hr', label: 'HR & Personnel' },
    { key: 'eligibility', label: 'Client Eligibility Criteria' },
    { key: 'safety', label: 'Worksite Safety' },
    { key: 'procurement', label: 'Contractor Procurement' },
    { key: 'recordKeeping', label: 'Record Keeping' },
  ];

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="py-4 pl-6 pr-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-3 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Org Level</th>
            <th className="px-3 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Program Level</th>
            <th className="px-3 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Both</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rows.map((row) => (
            <tr key={row.key} className="hover:bg-slate-50 transition-colors">
              <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900">{row.label}</td>
              <td className="px-3 py-4 text-center">
                <input type="radio" name={row.key} className="text-blue-600 focus:ring-blue-500" checked={data.policyMap[row.key] === 'org'} onChange={() => updateMap(row.key, 'org')} />
              </td>
              <td className="px-3 py-4 text-center">
                <input type="radio" name={row.key} className="text-blue-600 focus:ring-blue-500" checked={data.policyMap[row.key] === 'program'} onChange={() => updateMap(row.key, 'program')} />
              </td>
              <td className="px-3 py-4 text-center">
                <input type="radio" name={row.key} className="text-blue-600 focus:ring-blue-500" checked={data.policyMap[row.key] === 'both'} onChange={() => updateMap(row.key, 'both')} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProgramModelStep = ({ data, onChange }) => {
  const addRole = () => {
    const newRole = { id: Date.now(), title: 'New Role', responsibilities: '', approves: [] };
    onChange('roles', [...data.roles, newRole]);
  };

  const updateRole = (id, field, value) => {
    const updated = data.roles.map(r => r.id === id ? { ...r, [field]: value } : r);
    onChange('roles', updated);
  };

  const removeRole = (id) => {
    onChange('roles', data.roles.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.roles.map((role) => (
        <div key={role.id} className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-4 right-4">
            <button onClick={() => removeRole(role.id)} className="text-gray-400 hover:text-red-500 p-1">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role Title</label>
              <input 
                type="text" 
                className="block w-full border-0 border-b-2 border-gray-100 focus:border-blue-500 focus:ring-0 px-0 py-2 text-gray-900 font-medium placeholder-gray-300 transition-colors bg-transparent"
                value={role.title}
                onChange={(e) => updateRole(role.id, 'title', e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Key Responsibilities</label>
              <input 
                type="text" 
                className="block w-full border-0 border-b-2 border-gray-100 focus:border-blue-500 focus:ring-0 px-0 py-2 text-gray-900 placeholder-gray-300 transition-colors bg-transparent"
                value={role.responsibilities}
                onChange={(e) => updateRole(role.id, 'responsibilities', e.target.value)}
                placeholder="Enter responsibilities"
              />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-sm text-gray-500">
            <span className="font-medium mr-2">Authority:</span>
            {role.approves.length > 0 ? (
               <div className="flex gap-2">
                 {role.approves.map(a => <span key={a} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{a}</span>)}
               </div>
            ) : <span className="text-gray-400 italic">No specific approval authority defined</span>}
          </div>
        </div>
      ))}
      <button onClick={addRole} className="w-full flex justify-center items-center py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
        <Plus className="h-5 w-5 mr-2" /> Add New Role
      </button>
    </div>
  );
};

const ScopeStep = ({ data, onChange }) => (
  <div className="space-y-8">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-blue-600"/> Included Repairs
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(data.repairTypes).map(type => (
          <label key={type} className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${data.repairTypes[type] ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50 border-gray-100'}`}>
            <input 
              type="checkbox"
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={data.repairTypes[type]}
              onChange={(e) => onChange('repairTypes', { ...data.repairTypes, [type]: e.target.checked })}
            />
            <span className="text-sm font-medium capitalize text-gray-800">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Financial Cap per Project</label>
        <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm font-bold">$</span>
            </div>
            <input 
            type="number" 
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 pr-12 py-3 sm:text-lg border-gray-300 rounded-lg border font-mono" 
            placeholder="0.00"
            value={data.financialCap}
            onChange={(e) => onChange('financialCap', e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400 sm:text-sm">USD</span>
            </div>
        </div>
        </div>

        <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Explicit Exclusions</label>
        <textarea 
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border h-[120px] resize-none"
            value={data.exclusions}
            onChange={(e) => onChange('exclusions', e.target.value)}
            placeholder="e.g., Foundation repair, Mold remediation..."
        />
        </div>
    </div>
  </div>
);

const ClientScreeningStep = ({ data, onChange }) => {
  const getLabel = (key) => {
    if (key === 'healthSafety') return 'Health & Safety Urgency (Home Condition)';
    const group = VULNERABLE_GROUPS.find(g => g.key === key);
    return group ? group.label : key.replace(/([A-Z])/g, ' $1').trim();
  };

  const toggleGroup = (key) => {
    const newFactors = { ...data.priorityFactors };
    if (newFactors[key] !== undefined) {
      delete newFactors[key];
    } else {
      newFactors[key] = 3; // Default weight
    }
    onChange('priorityFactors', newFactors);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4">Intake Channels</h4>
        <div className="flex flex-wrap gap-4">
          {['phone', 'web', 'walkin'].map(channel => (
            <label key={channel} className={`flex items-center space-x-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${data.intakeMethods[channel] ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
              <input 
                type="checkbox" 
                checked={data.intakeMethods[channel]}
                onChange={(e) => onChange('intakeMethods', { ...data.intakeMethods, [channel]: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5"
              />
              <span className="capitalize text-sm font-medium text-gray-700">{channel === 'walkin' ? 'Walk-in' : channel}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-2">Target Populations</h4>
            <p className="text-sm text-gray-500">Select the specific vulnerable groups your program prioritizes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {VULNERABLE_GROUPS.map(group => (
            <label key={group.key} className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${data.priorityFactors[group.key] !== undefined ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50 border-transparent'}`}>
               <input 
                 type="checkbox"
                 className="mt-1 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                 checked={data.priorityFactors[group.key] !== undefined}
                 onChange={() => toggleGroup(group.key)}
               />
               <div>
                 <div className={`text-sm font-medium ${data.priorityFactors[group.key] !== undefined ? 'text-blue-900' : 'text-gray-700'}`}>{group.label}</div>
                 <div className="text-xs text-gray-500 mt-0.5">{group.reason}</div>
               </div>
            </label>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h4 className="font-bold text-gray-900 mb-4">Prioritization Matrix Weights (1-5)</h4>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-800 text-sm">Health & Safety Urgency</span>
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{data.priorityFactors.healthSafety || 5}</span>
                </div>
                <input 
                type="range" 
                min="1" 
                max="5" 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                value={data.priorityFactors.healthSafety || 5}
                onChange={(e) => onChange('priorityFactors', { ...data.priorityFactors, healthSafety: parseInt(e.target.value) })}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Low Priority</span>
                    <span>Critical</span>
                </div>
            </div>

            {Object.keys(data.priorityFactors).filter(k => k !== 'healthSafety').map(factor => (
                <div key={factor}>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">{getLabel(factor)}</span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{data.priorityFactors[factor]}</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    value={data.priorityFactors[factor]}
                    onChange={(e) => onChange('priorityFactors', { ...data.priorityFactors, [factor]: parseInt(e.target.value) })}
                />
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LifecycleStep = ({ data, onChange }) => {
  return (
    <div className="relative pl-8 border-l-2 border-gray-200 space-y-8 py-4">
        {data.stages.map((stage, stageIdx) => (
        <div key={stage.id} className="relative group">
            <div className="absolute -left-[41px] top-1 bg-white border-2 border-blue-600 rounded-full w-6 h-6 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-gray-900">{stage.name}</h5>
                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">Stage {stageIdx + 1}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-slate-50 p-2 rounded-lg inline-block w-full">
                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-semibold text-gray-700 mr-2">Trigger Document:</span>
                    {stage.reqDoc}
                </div>
            </div>
        </div>
        ))}
    </div>
  );
};

const WorkforceStep = ({ data, onChange }) => (
  <div className="space-y-8">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h4 className="font-bold text-gray-900 mb-6">Delivery Model</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['contractor', 'volunteer', 'blended'].map(model => (
          <button
            key={model}
            onClick={() => onChange('model', model)}
            className={`p-4 text-center rounded-xl border-2 transition-all ${
              data.model === model 
                ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="font-bold capitalize mb-1">{model}</div>
            <div className="text-xs opacity-75">
                {model === 'contractor' && 'Outsourced Labor'}
                {model === 'volunteer' && 'Community Labor'}
                {model === 'blended' && 'Hybrid Approach'}
            </div>
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Quality Control (QC) Frequency</label>
      <select 
        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border transition-all"
        value={data.qcFrequency}
        onChange={(e) => onChange('qcFrequency', e.target.value)}
      >
        <option value="milestone">At Major Milestones</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="final">Final Only (Not Recommended)</option>
      </select>
    </div>
  </div>
);

const PerformanceStep = ({ data, onChange }) => (
  <div className="space-y-8">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
        <BarChart2 className="w-5 h-5 mr-2 text-blue-600"/> Key Performance Indicators (KPIs)
      </h4>
      <p className="text-sm text-gray-500 mb-6">Select the metrics you will track to demonstrate program impact.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(data.kpis).map(kpi => (
           <label key={kpi} className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${data.kpis[kpi] ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50 border-gray-100'}`}>
            <input 
              type="checkbox"
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={data.kpis[kpi]}
              onChange={(e) => onChange('kpis', { ...data.kpis, [kpi]: e.target.checked })}
            />
            <span className="text-sm font-medium capitalize text-gray-800">{kpi.replace(/([A-Z])/g, ' $1').trim()}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reporting Schedule</label>
            <select 
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border transition-all"
                value={data.reportingSchedule}
                onChange={(e) => onChange('reportingSchedule', e.target.value)}
            >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Mechanism</label>
             <input 
                type="text" 
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border transition-all"
                value={data.feedbackMechanism}
                onChange={(e) => onChange('feedbackMechanism', e.target.value)}
                placeholder="e.g. Annual Survey, Post-Project Call"
            />
        </div>
    </div>
  </div>
);

const ExportStep = ({ data }) => {
  const handleExport = () => {
    // Generate a simple HTML document that acts as a Doc
    const getLabel = (key) => {
        if (key === 'healthSafety') return 'Health & Safety Urgency (Home Condition)';
        const group = VULNERABLE_GROUPS.find(g => g.key === key);
        return group ? group.label : key.replace(/([A-Z])/g, ' $1').trim();
    };

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>${data.orgName} Repair Manual</title></head>
      <body>
        <h1>${data.orgName} - Home Repair Policies & Procedures</h1>
        <p><strong>Address:</strong> ${data.orgAddress || 'N/A'}</p>
        <p><strong>Phone:</strong> ${data.orgPhone || 'N/A'} | <strong>Email:</strong> ${data.orgEmail || 'N/A'}</p>
        <p><strong>Version:</strong> ${data.version}</p>
        <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
        
        <hr />
        
        <h2>1. Foundations</h2>
        <p><strong>Service Area:</strong> ${data.serviceArea}</p>
        <h3>Key Staff</h3>
        <ul>
          ${(data.staff || []).map(s => `<li><strong>${s.name}</strong> - ${s.title}</li>`).join('')}
        </ul>
        
        <h2>2. Compliance</h2>
        <p><strong>Policy 33 Alignment:</strong> ${data.policy33Aligned ? 'Compliant' : 'Pending'}</p>

        <h2>3. Scope of Services</h2>
        <p><strong>Financial Cap:</strong> $${data.financialCap}</p>
        <p><strong>Exclusions:</strong> ${data.exclusions}</p>
        
        <h2>4. Roles</h2>
        <ul>
          ${data.roles.map(r => `<li><strong>${r.title}:</strong> ${r.responsibilities}</li>`).join('')}
        </ul>
        
        <h2>5. Client Screening & Prioritization</h2>
        <p>Applications are prioritized based on the following weighted criteria:</p>
        <ul>
           ${Object.keys(data.priorityFactors).map(key => `<li><strong>${getLabel(key)}:</strong> Weight ${data.priorityFactors[key]}</li>`).join('')}
        </ul>
        
        <h2>6. Workflow</h2>
        <ol>
           ${data.stages.map(s => `<li>${s.name} (Trigger: ${s.reqDoc})</li>`).join('')}
        </ol>

        <h2>7. Performance & Reporting</h2>
        <p><strong>Schedule:</strong> ${data.reportingSchedule}</p>
        <p><strong>Feedback Mechanism:</strong> ${data.feedbackMechanism}</p>
        <p><strong>Tracked KPIs:</strong></p>
        <ul>
            ${Object.keys(data.kpis).filter(k => data.kpis[k]).map(k => `<li>${k.replace(/([A-Z])/g, ' $1')}</li>`).join('')}
        </ul>
      </body>
      </html>
    `;
    
    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Repair_Manual_${data.orgName.replace(/\s+/g, '_')}_Draft.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 text-center max-w-lg w-full">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Publish</h3>
        <p className="text-gray-500 mb-8 leading-relaxed">
            Your draft is compliant with the standard structure. Export it to Word to add final branding and signatures.
        </p>
        
        <button 
            onClick={handleExport}
            className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5"
        >
            <Download className="mr-2 h-5 w-5" />
            Export to Word (.doc)
        </button>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-left">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Final Check</h4>
            <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600"><CheckCircle className={`w-4 h-4 mr-3 ${data.orgName ? 'text-green-500' : 'text-gray-300'}`}/> Organization Details</li>
                <li className="flex items-center text-sm text-gray-600"><CheckCircle className={`w-4 h-4 mr-3 ${data.roles.length ? 'text-green-500' : 'text-gray-300'}`}/> Program Roles ({data.roles.length})</li>
                <li className="flex items-center text-sm text-gray-600"><CheckCircle className={`w-4 h-4 mr-3 ${data.policy33Aligned ? 'text-green-500' : 'text-gray-300'}`}/> Policy 33 Compliance</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function RepairManualBuilder() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [manualData, setManualData] = useState(INITIAL_DATA);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Auth & Data Loading ---
  
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth Error", err);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'data', 'repairManual');
    
    const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setManualData(prev => ({ ...INITIAL_DATA, ...data }));
      }
      setLoading(false);
    }, (error) => {
      console.error("Data Load Error:", error);
      setLoading(false);
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  // --- Auto-Save Logic ---
  const saveTimeoutRef = useRef(null);

  const handleDataChange = useCallback((field, value) => {
    setManualData(prev => {
        const newData = { ...prev, [field]: value };
        
        setSaveStatus('saving');
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'data', 'repairManual');
                    await setDoc(docRef, newData, { merge: true });
                    setSaveStatus('saved');
                } catch (e) {
                    console.error("Save failed", e);
                    setSaveStatus('error');
                }
            }
        }, 1500);

        return newData;
    });
  }, [user]);

  // --- Rendering Helpers ---

  const renderStepContent = () => {
    const commonProps = { data: manualData, onChange: handleDataChange };
    switch (STEPS[currentStep].id) {
      case 'foundations': return <FoundationsStep {...commonProps} />;
      case 'compliance': return <ComplianceStep {...commonProps} />;
      case 'policyMap': return <PolicyMapStep {...commonProps} />;
      case 'programModel': return <ProgramModelStep {...commonProps} />;
      case 'scope': return <ScopeStep {...commonProps} />;
      case 'screening': return <ClientScreeningStep {...commonProps} />;
      case 'lifecycle': return <LifecycleStep {...commonProps} />;
      case 'workforce': return <WorkforceStep {...commonProps} />;
      case 'performance': return <PerformanceStep {...commonProps} />;
      case 'export': return <ExportStep data={manualData} />;
      default: return <div>Unknown Step</div>;
    }
  };

  if (loading) return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center">
             <Activity className="w-10 h-10 text-blue-600 animate-spin mb-4" />
             <p className="text-gray-500 font-medium">Loading Builder...</p>
          </div>
      </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Dark Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl`}>
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3 mb-1">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/50">
              <Book className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">RepairManual<span className="text-blue-500">.io</span></h1>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = index < currentStep;

            return (
              <button
                key={step.id}
                onClick={() => { setCurrentStep(index); setMobileMenuOpen(false); }}
                className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                <div className="flex-1 text-left">
                  {step.title}
                </div>
                {isCompleted && <CheckCircle className="h-4 w-4 text-emerald-500" />}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project</span>
            </div>
            <div className="text-sm font-medium text-white truncate mb-4">
                {manualData.orgName || 'New Project'}
            </div>
            <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-600">v{APP_VERSION}</span>
                <span className={`flex items-center ${saveStatus === 'saved' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {saveStatus === 'saving' ? <ActivityIcon className="w-3 h-3 mr-1 animate-pulse"/> : <Save className="w-3 h-3 mr-1"/>}
                    {saveStatus === 'saved' ? 'Saved' : 'Saving...'}
                </span>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between border-b border-gray-200 z-20">
           <div className="flex items-center">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mr-3 text-gray-600">
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
                <span className="font-bold text-gray-800">RepairManual</span>
           </div>
        </div>

        {/* Desktop Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{STEPS[currentStep].title}</h2>
            <p className="mt-1 text-sm text-gray-500">{STEPS[currentStep].description}</p>
          </div>
          <div className="flex space-x-3">
             <button 
               onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
               disabled={currentStep === 0}
               className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors text-sm"
             >
               Back
             </button>
             <button 
               onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
               disabled={currentStep === STEPS.length - 1}
               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all text-sm"
             >
               Next Step <ChevronRight className="ml-2 h-4 w-4" />
             </button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex">
           {/* Scrollable Form Content */}
           <div className="flex-1 overflow-y-auto p-8 lg:p-12">
             <div className="max-w-3xl mx-auto pb-12">
                {renderStepContent()}
             </div>
           </div>

           {/* Fixed Guide Panel (Right Sidebar) */}
           <div className="w-80 border-l border-gray-200 bg-white hidden xl:block overflow-y-auto shrink-0 shadow-[rgba(0,0,15,0.05)_0px_0px_10px_0px]">
              <GuidePanel stepId={STEPS[currentStep].id} />
           </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
