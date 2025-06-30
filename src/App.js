import React, { useState, useEffect } from 'react';

// Add modern CSS animations
const modernStyles = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Modern slider styles */
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(102, 126, 234, 0.4);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
  }
  
  input[type="range"]::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    cursor: pointer;
    border: none;
    box-shadow: 0 3px 6px rgba(102, 126, 234, 0.4);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modernStyles;
  document.head.appendChild(styleSheet);
}

/*───────────────────────────────────────────────
  CKICASModel Class
───────────────────────────────────────────────*/
class CKICASModel {
  constructor(params = {}) {
    this.defaultParams = {
      social_connectivity_baseline: 0.5,
      digital_inclusion_baseline: 0.4,
      resource_availability_baseline: 0.6,
      technological_access_baseline: 0.5,
      volatility_level: 0.3,
      uncertainty_level: 0.4,
      complexity_level: 0.5,
      ambiguity_level: 0.4,
      adaptation_rate: 0.1,
      transformation_threshold: 0.7,
      learning_rate: 0.05,
      feedback_strength: 0.3,
      cycle_duration: 50,
      crisis_start: 50,
      crisis_duration: 20,
      crisis_intensity: 0.5,
      panarchy_enabled: true,
      phase_r_length: 90,
      phase_k_length: 60,
      phase_omega_length: 30,
      phase_alpha_length: 50,
    };
    this.params = Object.assign({}, this.defaultParams, params);
    this.reset();
  }
  reset() {
    this.time = 0;
    this.dt = 0.5;
    this.stocks = {
      community_intelligence: 0.3,
      shared_understanding: 0.2,
      system_adaptability: 0.4,
      resource_mobilization: 0.5,
      knowledge_accumulation: 0.1,
      community_resilience: 0.3,
      innovation_capacity: 0.2,
      transformation_readiness: 0.1,
    };
    this.dummyVars = {
      observation_active: 0,
      theory_building_active: 0,
      system_development_active: 0,
      community_action_active: 0,
      validation_active: 0,
      crisis_mode: 0,
      transformation_mode: 0,
    };
    this.panarchy = {
      potential: 0.5,
      connectedness: 0.3,
      resilience: 0.7,
      phase: 'r',
      phase_time: 0,
    };
    this.history = [];
    this.environmentalPressure = 0;
  }
  smoothRamp(current, target, rate) {
    return current + rate * (target - current);
  }
  calculateEnvironmentalPressure() {
    const baselinePressure = 0.5;
    const seasonal = 0.2 * Math.sin(2 * Math.PI * this.time / 365);
    let crisisSpike = 0;
    if (this.time >= this.params.crisis_start &&
        this.time <= this.params.crisis_start + this.params.crisis_duration) {
      crisisSpike = this.params.crisis_intensity;
    }
    if (this.time >= 200 && this.time <= 220) {
      crisisSpike = Math.max(crisisSpike, 0.4);
    }
    const vucaFactor = (this.params.volatility_level +
      this.params.uncertainty_level +
      this.params.complexity_level +
      this.params.ambiguity_level) / 4;
    return baselinePressure + seasonal + crisisSpike * vucaFactor;
  }
  updatePanarchyState() {
    const p = this.panarchy;
    const phase_time = p.phase_time;
    switch (p.phase) {
      case 'r':
        if (phase_time < this.params.phase_r_length) {
          p.potential += 0.01 * (1 - p.potential);
          p.connectedness += 0.008 * (1 - p.connectedness);
          p.resilience -= 0.003;
          p.phase_time += this.dt;
        } else {
          p.phase = 'K';
          p.phase_time = 0;
        }
        break;
      case 'K':
        if (phase_time < this.params.phase_k_length) {
          p.potential = Math.min(0.9, p.potential + 0.001);
          p.connectedness = Math.min(0.95, p.connectedness + 0.002);
          p.resilience -= 0.01;
          p.phase_time += this.dt;
        } else {
          p.phase = 'Ω';
          p.phase_time = 0;
        }
        break;
      case 'Ω':
        if (phase_time < this.params.phase_omega_length) {
          p.potential *= 0.97;
          p.connectedness *= 0.95;
          p.resilience = Math.max(0.1, p.resilience - 0.005);
          p.phase_time += this.dt;
        } else {
          p.phase = 'α';
          p.phase_time = 0;
        }
        break;
      case 'α':
        if (phase_time < this.params.phase_alpha_length) {
          p.potential += 0.008 * (0.6 - p.potential);
          p.connectedness += 0.005 * (0.4 - p.connectedness);
          p.resilience += 0.015 * (0.8 - p.resilience);
          p.phase_time += this.dt;
        } else {
          p.phase = 'r';
          p.phase_time = 0;
        }
        break;
      default: break;
    }
    p.potential = Math.max(0, Math.min(1, p.potential));
    p.connectedness = Math.max(0, Math.min(1, p.connectedness));
    p.resilience = Math.max(0, Math.min(1, p.resilience));
  }
  updateDummyVariables() {
    const ep = this.environmentalPressure;
    if (ep > 0.7) {
      this.dummyVars.crisis_mode = this.smoothRamp(this.dummyVars.crisis_mode, 1.0, 0.2);
    } else {
      this.dummyVars.crisis_mode = this.smoothRamp(this.dummyVars.crisis_mode, 0.0, 0.1);
    }
    const cycleProgress = (this.time % this.params.cycle_duration) / this.params.cycle_duration;
    if (cycleProgress < 0.2 || this.dummyVars.crisis_mode > 0.5) {
      this.dummyVars.observation_active = this.smoothRamp(this.dummyVars.observation_active, 1.0, 0.15);
    } else {
      this.dummyVars.observation_active = this.smoothRamp(this.dummyVars.observation_active, 0.3, 0.1);
    }
    if (cycleProgress > 0.15 && cycleProgress < 0.35) {
      this.dummyVars.theory_building_active = this.smoothRamp(this.dummyVars.theory_building_active, 1.0, 0.15);
    } else {
      this.dummyVars.theory_building_active = this.smoothRamp(this.dummyVars.theory_building_active, 0.2, 0.1);
    }
    if (cycleProgress > 0.3 && cycleProgress < 0.5) {
      this.dummyVars.system_development_active = this.smoothRamp(this.dummyVars.system_development_active, 1.0, 0.15);
    } else {
      this.dummyVars.system_development_active = this.smoothRamp(this.dummyVars.system_development_active, 0.2, 0.1);
    }
    if (cycleProgress > 0.45 && cycleProgress < 0.75) {
      this.dummyVars.community_action_active = this.smoothRamp(this.dummyVars.community_action_active, 1.0, 0.15);
    } else {
      this.dummyVars.community_action_active = this.smoothRamp(this.dummyVars.community_action_active, 0.3, 0.1);
    }
    if (cycleProgress > 0.7) {
      this.dummyVars.validation_active = this.smoothRamp(this.dummyVars.validation_active, 1.0, 0.15);
    } else {
      this.dummyVars.validation_active = this.smoothRamp(this.dummyVars.validation_active, 0.2, 0.1);
    }
    if (this.stocks.transformation_readiness > this.params.transformation_threshold) {
      this.dummyVars.transformation_mode = this.smoothRamp(this.dummyVars.transformation_mode, 1.0, 0.1);
    } else {
      this.dummyVars.transformation_mode = this.smoothRamp(this.dummyVars.transformation_mode, 0.0, 0.05);
    }
  }
  calculateFlows() {
    const flows = {};
    const s = this.stocks;
    const d = this.dummyVars;
    const p = this.params;
    flows.community_intelligence =
      p.learning_rate * d.observation_active * s.shared_understanding * (1 - s.community_intelligence) -
      0.02 * s.community_intelligence * (1 - d.validation_active);
    flows.shared_understanding =
      0.1 * d.theory_building_active * s.community_intelligence * p.social_connectivity_baseline -
      0.01 * s.shared_understanding;
    flows.system_adaptability =
      p.adaptation_rate * d.system_development_active * s.innovation_capacity * (1 - s.system_adaptability) -
      0.03 * s.system_adaptability * this.environmentalPressure * (1 - d.crisis_mode);
    flows.resource_mobilization =
      0.15 * d.community_action_active * s.shared_understanding * p.resource_availability_baseline -
      0.05 * s.resource_mobilization * (1 + this.environmentalPressure);
    flows.knowledge_accumulation =
      0.08 * d.validation_active * s.community_intelligence * p.digital_inclusion_baseline -
      0.005 * s.knowledge_accumulation;
    const panarchyInfluence = this.params.panarchy_enabled ? this.panarchy.resilience * 0.2 : 0;
    flows.community_resilience =
      0.12 * s.system_adaptability * s.resource_mobilization * (1 - s.community_resilience) +
      panarchyInfluence * (1 - s.community_resilience) -
      0.04 * s.community_resilience * this.environmentalPressure * (1 - d.transformation_mode);
    flows.innovation_capacity =
      0.1 * s.knowledge_accumulation * p.technological_access_baseline * d.theory_building_active -
      0.02 * s.innovation_capacity;
    flows.transformation_readiness =
      0.05 * s.community_resilience * s.innovation_capacity * d.crisis_mode * (1 - s.transformation_readiness) -
      0.03 * s.transformation_readiness * (1 - d.transformation_mode);
    return flows;
  }
  step() {
    this.environmentalPressure = this.calculateEnvironmentalPressure();
    this.updateDummyVariables();
    if (this.params.panarchy_enabled) {
      this.updatePanarchyState();
    }
    const flows = this.calculateFlows();
    for (let key in this.stocks) {
      this.stocks[key] += flows[key] * this.dt;
      this.stocks[key] = Math.max(0, Math.min(1, this.stocks[key]));
    }
    const performanceIndex =
      0.3 * this.stocks.community_resilience +
      0.3 * this.stocks.community_intelligence +
      0.2 * this.stocks.system_adaptability +
      0.2 * this.stocks.resource_mobilization;
    const adaptiveCapacity =
      this.stocks.system_adaptability *
      this.stocks.innovation_capacity *
      this.stocks.transformation_readiness;
    const collapseRisk = (1 - this.panarchy.resilience) * this.panarchy.connectedness;
    this.history.push({
      time: this.time,
      community_intelligence: this.stocks.community_intelligence,
      shared_understanding: this.stocks.shared_understanding,
      system_adaptability: this.stocks.system_adaptability,
      resource_mobilization: this.stocks.resource_mobilization,
      knowledge_accumulation: this.stocks.knowledge_accumulation,
      community_resilience: this.stocks.community_resilience,
      innovation_capacity: this.stocks.innovation_capacity,
      transformation_readiness: this.stocks.transformation_readiness,
      observation_active: this.dummyVars.observation_active,
      theory_building_active: this.dummyVars.theory_building_active,
      system_development_active: this.dummyVars.system_development_active,
      community_action_active: this.dummyVars.community_action_active,
      validation_active: this.dummyVars.validation_active,
      crisis_mode: this.dummyVars.crisis_mode,
      transformation_mode: this.dummyVars.transformation_mode,
      environmental_pressure: this.environmentalPressure,
      performance_index: performanceIndex,
      adaptive_capacity: adaptiveCapacity,
      panarchy_potential: this.panarchy.potential,
      panarchy_connectedness: this.panarchy.connectedness,
      panarchy_resilience: this.panarchy.resilience,
      panarchy_phase: this.panarchy.phase,
      collapse_risk: collapseRisk,
    });
    this.time += this.dt;
  }
  run(steps) {
    for (let i = 0; i < steps; i++) {
      this.step();
    }
    return this.history;
  }
}

/*───────────────────────────────────────────────
  Utility Components & Config
───────────────────────────────────────────────*/

// Chart param config
const paramsConfig = [
  { key: 'learning_rate', label: 'Learning Rate', min: 0, max: 1, step: 0.01 },
  { key: 'adaptation_rate', label: 'Adaptation Rate', min: 0, max: 1, step: 0.01 },
  { key: 'feedback_strength', label: 'Feedback Strength', min: 0, max: 1, step: 0.01 },
  { key: 'transformation_threshold', label: 'Transformation Threshold', min: 0, max: 1, step: 0.01 },
  { key: 'crisis_intensity', label: 'Crisis Intensity', min: 0, max: 1, step: 0.01 },
  { key: 'volatility_level', label: 'Volatility Level', min: 0, max: 1, step: 0.01 },
  { key: 'uncertainty_level', label: 'Uncertainty Level', min: 0, max: 1, step: 0.01 },
  { key: 'complexity_level', label: 'Complexity Level', min: 0, max: 1, step: 0.01 },
  { key: 'ambiguity_level', label: 'Ambiguity Level', min: 0, max: 1, step: 0.01 },
  { key: 'social_connectivity_baseline', label: 'Social Connectivity', min: 0, max: 1, step: 0.01 },
  { key: 'digital_inclusion_baseline', label: 'Digital Inclusion', min: 0, max: 1, step: 0.01 },
  { key: 'resource_availability_baseline', label: 'Resource Availability', min: 0, max: 1, step: 0.01 },
  { key: 'technological_access_baseline', label: 'Technological Access', min: 0, max: 1, step: 0.01 },
  { key: 'cycle_duration', label: 'Cycle Duration (days)', min: 1, max: 100, step: 1 },
  { key: 'crisis_start', label: 'Crisis Start Time (days)', min: 1, max: 200, step: 1 },
  { key: 'crisis_duration', label: 'Crisis Duration (days)', min: 1, max: 50, step: 1 },
  { key: 'panarchy_enabled', label: 'Panarchy Enabled', type: 'checkbox' },
];

// Icons
const PlayIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const ResetIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v6h6M21 12a9 9 0 11-6-7.7"/></svg>;
const SettingsIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/></svg>;
const ZapIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>;
const MicIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const SendIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>;
const ChatIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const CloseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>;
const XIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SlidersIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>;
const TabIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>;

// SimpleLineChart Component (uses SVG, no external deps)
const SimpleLineChart = ({ data, title, dataKeys, colors, width = 800, height = 400 }) => {
  if (!data || data.length === 0) return <div>No data available</div>;
  const margin = { top: 20, right: 80, bottom: 60, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const maxTime = Math.max(...data.map(d => d.time));
  const minTime = Math.min(...data.map(d => d.time));
  const getX = (time) => margin.left + (time - minTime) / (maxTime - minTime || 1) * chartWidth;
  const getY = (value) => margin.top + (1 - value) * chartHeight;
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>{title}</h3>
      <svg width={width} height={height} style={{ border: '1px solid #eee' }}>
        {/* Y Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map(y => (
          <g key={`grid-${y}`}>
            <line x1={margin.left} y1={getY(y)} x2={margin.left + chartWidth} y2={getY(y)} stroke="#f0f0f0" strokeWidth="1" />
            <text x={margin.left - 10} y={getY(y) + 4} textAnchor="end" fontSize="12" fill="#666">{(y * 100).toFixed(0)}%</text>
          </g>
        ))}
        {/* X Grid/Time axis */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => {
          const time = minTime + t * (maxTime - minTime);
          return (
            <g key={`time-${t}`}>
              <line x1={getX(time)} y1={margin.top} x2={getX(time)} y2={margin.top + chartHeight} stroke="#f0f0f0" strokeWidth="1" />
              <text x={getX(time)} y={margin.top + chartHeight + 20} textAnchor="middle" fontSize="12" fill="#666">{time.toFixed(0)}</text>
            </g>
          );
        })}
        {/* Lines */}
        {dataKeys.map((key, idx) => {
          const color = colors[idx] || '#8884d8';
          const pathData = data.map((pt, i) => {
            const x = getX(pt.time);
            const y = getY(pt[key] || 0);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ');
          return <path key={key} d={pathData} fill="none" stroke={color} strokeWidth="2" />;
        })}
        {/* Axis labels */}
        <text x={margin.left + chartWidth / 2} y={height - 10} textAnchor="middle" fontSize="14" fill="#333">Time (days)</text>
        <text x={20} y={margin.top + chartHeight / 2} textAnchor="middle" fontSize="14" fill="#333" transform={`rotate(-90, 20, ${margin.top + chartHeight / 2})`}>Value (%)</text>
      </svg>
      {/* Legend */}
      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {dataKeys.map((key, idx) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '20px', height: '3px', backgroundColor: colors[idx] || '#8884d8' }} />
            <span style={{ fontSize: '12px', color: '#666' }}>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgressBar = ({ label, value, color = '#3b82f6' }) => (
  <div style={{ marginBottom: '15px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
      <span style={{ fontSize: '14px', fontWeight: 'bold', color }}>{(value * 100).toFixed(1)}%</span>
    </div>
    <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{
        width: `${value * 100}%`,
        height: '100%',
        backgroundColor: color,
        transition: 'width 0.3s ease'
      }} />
    </div>
  </div>
);

const PhaseIndicator = ({ phase }) => {
  const phaseColors = { 'r': '#22c55e', 'K': '#eab308', 'Ω': '#ef4444', 'α': '#3b82f6' };
  const phaseNames = { 'r': 'Exploitation', 'K': 'Conservation', 'Ω': 'Release', 'α': 'Reorganisation' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '12px', height: '12px', borderRadius: '50%',
        backgroundColor: phaseColors[phase]
      }} />
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{phaseNames[phase]}</span>
    </div>
  );
};

// Modern Parameter Adjustment Panel Component
const ModernParameterPanel = ({ 
  isOpen, 
  onToggle, 
  mode, 
  onModeChange, 
  params, 
  onParameterChange,
  paramsConfig 
}) => {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pendingSuggestion, setPendingSuggestion] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [lastChanged, setLastChanged] = useState('');

  // Web Speech API for AI mode
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  // AI message processing
  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    const userMessage = message.trim();
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const newHistoryItem = {
        id: Date.now(),
        userMessage,
        summary: data.summary,
        parameter_changes: data.parameter_changes,
        timestamp: new Date().toLocaleTimeString(),
        applied: false
      };

      setHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
      
      if (Object.keys(data.parameter_changes).length > 0) {
        setPendingSuggestion(newHistoryItem);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Apply AI suggestions
  const applyChanges = (historyItem) => {
    Object.entries(historyItem.parameter_changes).forEach(([key, value]) => {
      onParameterChange(key, value);
    });
    
    setHistory(prev => prev.map(item => 
      item.id === historyItem.id ? { ...item, applied: true } : item
    ));
    setPendingSuggestion(null);
    showChangeToast('AI suggestions applied');
  };

  // Manual parameter change with feedback
  const handleManualChange = (key, value) => {
    onParameterChange(key, value);
    setLastChanged(key);
    showChangeToast(`${key.replace(/_/g, ' ')} updated`);
  };

  const showChangeToast = (message) => {
    setLastChanged(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Floating Action Button
  if (!isOpen) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000
      }}>
        <button
          onClick={onToggle}
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1) translateY(-2px)';
            e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0)';
            e.target.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
          }}
        >
          <SlidersIcon />
        </button>
        
        {/* Toast Notification */}
        {showToast && (
          <div style={{
            position: 'fixed',
            bottom: '120px',
            right: '24px',
            background: 'rgba(34, 197, 94, 0.95)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
            backdropFilter: 'blur(10px)',
            animation: 'slideInUp 0.3s ease-out',
            zIndex: 1001
          }}>
            ✓ {lastChanged}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '480px',
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Parameter Adjustment</h3>
          <button
            onClick={onToggle}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <CloseIcon />
          </button>
        </div>
        
        {/* Mode Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'manual', label: 'Manual', icon: '🎛️' },
            { id: 'ai', label: 'AI Assistant', icon: '🤖' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onModeChange(tab.id)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: mode === tab.id 
                  ? 'rgba(255, 255, 255, 0.25)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {mode === 'manual' ? (
          <ManualParameterMode 
            params={params}
            paramsConfig={paramsConfig}
            onParameterChange={handleManualChange}
          />
        ) : (
          <AIParameterMode
            message={message}
            setMessage={setMessage}
            history={history}
            isLoading={isLoading}
            isListening={isListening}
            pendingSuggestion={pendingSuggestion}
            onSendMessage={sendMessage}
            onStartListening={startListening}
            onApplyChanges={applyChanges}
            onRejectChanges={() => setPendingSuggestion(null)}
          />
        )}
      </div>
    </div>
  );
};

// Manual Parameter Mode Component
const ManualParameterMode = ({ params, paramsConfig, onParameterChange }) => {
  const parameterGroups = {
    'Core Parameters': ['learning_rate', 'adaptation_rate', 'feedback_strength', 'transformation_threshold'],
    'Environmental & Crisis': ['crisis_intensity', 'volatility_level', 'uncertainty_level', 'complexity_level', 'ambiguity_level'],
    'Baseline Capabilities': ['social_connectivity_baseline', 'digital_inclusion_baseline', 'resource_availability_baseline', 'technological_access_baseline'],
    'Timing & Cycles': ['cycle_duration', 'crisis_start', 'crisis_duration', 'panarchy_enabled']
  };

  return (
    <div style={{ 
      padding: '24px', 
      height: '100%', 
      overflowY: 'auto',
      background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)'
    }}>
      {Object.entries(parameterGroups).map(([groupName, paramKeys]) => (
        <div key={groupName} style={{ marginBottom: '32px' }}>
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#1e293b', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '4px',
              height: '20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }} />
            {groupName}
          </h4>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {paramKeys.map(key => {
              const config = paramsConfig.find(p => p.key === key);
              if (!config) return null;
              
              return (
                <ModernParameterControl
                  key={key}
                  config={config}
                  value={params[key]}
                  onChange={(value) => onParameterChange(key, value)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// Modern Parameter Control Component
const ModernParameterControl = ({ config, value, onChange }) => {
  const { key, label, min, max, step, type } = config;
  
  if (type === 'checkbox') {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        transition: 'all 0.2s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{label}</span>
          <label style={{
            position: 'relative',
            display: 'inline-block',
            width: '52px',
            height: '28px'
          }}>
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: value ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#e5e7eb',
              borderRadius: '28px',
              transition: 'all 0.3s ease',
              '&:before': {
                position: 'absolute',
                content: '""',
                height: '20px',
                width: '20px',
                left: value ? '28px' : '4px',
                bottom: '4px',
                background: 'white',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }
            }} />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{label}</label>
        <span style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {value?.toFixed ? value.toFixed(step < 1 ? 2 : 0) : value}{step < 1 ? '' : ' days'}
        </span>
      </div>
      
      <div style={{ position: 'relative' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: `linear-gradient(to right, #667eea 0%, #667eea ${((value - min) / (max - min)) * 100}%, #e2e8f0 ${((value - min) / (max - min)) * 100}%, #e2e8f0 100%)`,
            outline: 'none',
            cursor: 'pointer',
            WebkitAppearance: 'none',
            appearance: 'none'
          }}
        />
      </div>
    </div>
  );
};

// AI Parameter Mode Component
const AIParameterMode = ({ 
  message, 
  setMessage, 
  history, 
  isLoading, 
  isListening, 
  pendingSuggestion,
  onSendMessage,
  onStartListening,
  onApplyChanges,
  onRejectChanges
}) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Pending Suggestion */}
      {pendingSuggestion && (
        <div style={{
          margin: '16px',
          padding: '20px',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderRadius: '12px',
          border: '1px solid #f59e0b',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>
            🎯 Parameter Changes Suggested
          </div>
          <div style={{ fontSize: '14px', marginBottom: '12px', color: '#78350f' }}>
            {pendingSuggestion.summary}
          </div>
          <div style={{ fontSize: '12px', marginBottom: '16px', color: '#78350f' }}>
            <strong>Changes:</strong> {Object.entries(pendingSuggestion.parameter_changes).map(([key, value]) => 
              `${key}: ${value}`
            ).join(', ')}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onApplyChanges(pendingSuggestion)}
              style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <CheckIcon /> Apply Changes
            </button>
            <button
              onClick={onRejectChanges}
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <XIcon /> Reject
            </button>
          </div>
        </div>
      )}

      {/* Chat History */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)'
      }}>
        {history.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>AI Assistant Ready</div>
            <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Ask me to adjust parameters using natural language:
              <br />
              <em>"Make it more resilient"</em>
              <br />
              <em>"Simulate a crisis at day 80"</em>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {history.map((item) => (
              <div key={item.id} style={{
                background: item.applied ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${item.applied ? 'rgba(34, 197, 94, 0.3)' : 'rgba(148, 163, 184, 0.2)'}`,
                transition: 'all 0.2s ease'
              }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.timestamp}</span>
                  {item.applied && <span style={{ color: '#22c55e', fontWeight: '500' }}>✓ Applied</span>}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1f2937' }}>
                  You: {item.userMessage}
                </div>
                <div style={{ fontSize: '14px', color: '#374151', marginBottom: '8px' }}>
                  Assistant: {item.summary}
                </div>
                {Object.keys(item.parameter_changes).length > 0 && (
                  <div style={{ fontSize: '12px', color: '#6b7280', background: 'rgba(148, 163, 184, 0.1)', padding: '8px', borderRadius: '6px' }}>
                    <strong>Parameters:</strong> {Object.entries(item.parameter_changes).map(([key, value]) => 
                      `${key}: ${value}`
                    ).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid rgba(148, 163, 184, 0.2)',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me to adjust parameters..."
            style={{
              flex: 1,
              minHeight: '44px',
              maxHeight: '120px',
              padding: '12px 16px',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '12px',
              fontSize: '14px',
              resize: 'vertical',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
          />
          <button
            onClick={onStartListening}
            disabled={isListening || isLoading}
            style={{
              padding: '12px',
              border: 'none',
              borderRadius: '12px',
              background: isListening 
                ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                : 'linear-gradient(135deg, #6b7280, #4b5563)',
              color: 'white',
              cursor: isListening || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <MicIcon />
          </button>
          <button
            onClick={onSendMessage}
            disabled={!message.trim() || isLoading}
            style={{
              padding: '12px',
              border: 'none',
              borderRadius: '12px',
              background: !message.trim() || isLoading 
                ? 'linear-gradient(135deg, #d1d5db, #9ca3af)' 
                : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              cursor: !message.trim() || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            {isLoading ? '...' : <SendIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

// ConversationalAssistant Component
const ConversationalAssistant = ({ onParameterChange, isOpen, onToggle }) => {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pendingSuggestion, setPendingSuggestion] = useState(null);

  // Web Speech API
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    const userMessage = message.trim();
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const newHistoryItem = {
        id: Date.now(),
        userMessage,
        summary: data.summary,
        parameter_changes: data.parameter_changes,
        timestamp: new Date().toLocaleTimeString(),
        applied: false
      };

      setHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
      
      if (Object.keys(data.parameter_changes).length > 0) {
        setPendingSuggestion(newHistoryItem);
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyChanges = (historyItem) => {
    Object.entries(historyItem.parameter_changes).forEach(([key, value]) => {
      onParameterChange(key, value);
    });
    
    setHistory(prev => prev.map(item => 
      item.id === historyItem.id ? { ...item, applied: true } : item
    ));
    setPendingSuggestion(null);
  };

  const rejectChanges = () => {
    setPendingSuggestion(null);
  };

  if (!isOpen) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000
      }}>
        <button
          onClick={onToggle}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <ChatIcon />
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      background: 'white',
      boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>AI Assistant</h3>
        <button
          onClick={onToggle}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Pending Suggestion */}
      {pendingSuggestion && (
        <div style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderBottom: '1px solid #f59e0b',
          borderLeft: '4px solid #f59e0b'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>
            Parameter Changes Suggested
          </div>
          <div style={{ fontSize: '14px', marginBottom: '12px', color: '#78350f' }}>
            {pendingSuggestion.summary}
          </div>
          <div style={{ fontSize: '12px', marginBottom: '12px', color: '#78350f' }}>
            Changes: {Object.entries(pendingSuggestion.parameter_changes).map(([key, value]) => 
              `${key}: ${value}`
            ).join(', ')}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => applyChanges(pendingSuggestion)}
              style={{
                background: '#22c55e',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckIcon /> Apply
            </button>
            <button
              onClick={rejectChanges}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <XIcon /> Reject
            </button>
          </div>
        </div>
      )}

      {/* Chat History */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {history.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '14px',
            marginTop: '40px'
          }}>
            <div style={{ marginBottom: '12px' }}>💬</div>
            <div>Ask me to adjust parameters!</div>
            <div style={{ fontSize: '12px', marginTop: '8px' }}>
              Try: "Make it more resilient" or "Simulate a crisis at day 80"
            </div>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px',
              background: item.applied ? '#f0f9ff' : 'white'
            }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
                {item.timestamp} {item.applied && '✓ Applied'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
                You: {item.userMessage}
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>
                Assistant: {item.summary}
              </div>
              {Object.keys(item.parameter_changes).length > 0 && (
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
                  Parameters: {Object.entries(item.parameter_changes).map(([key, value]) => 
                    `${key}: ${value}`
                  ).join(', ')}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb'
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me to adjust parameters..."
            style={{
              flex: 1,
              minHeight: '40px',
              maxHeight: '120px',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              resize: 'vertical'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={startListening}
            disabled={isListening || isLoading}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              background: isListening ? '#ef4444' : '#6b7280',
              color: 'white',
              cursor: isListening || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MicIcon />
          </button>
          <button
            onClick={sendMessage}
            disabled={!message.trim() || isLoading}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              background: !message.trim() || isLoading ? '#d1d5db' : '#3b82f6',
              color: 'white',
              cursor: !message.trim() || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isLoading ? '...' : <SendIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

/*───────────────────────────────────────────────
  Main Dashboard App Component
───────────────────────────────────────────────*/
export default function App() {
  const [model] = useState(() => new CKICASModel());
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [params, setParams] = useState(model.params);
  const [selectedView, setSelectedView] = useState('stocks');
  const [showSettings, setShowSettings] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showParameterPanel, setShowParameterPanel] = useState(false);
  const [parameterMode, setParameterMode] = useState('manual'); // 'manual' or 'ai'

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        model.step();
        setCurrentTime(model.time);
        setForceUpdate(prev => prev + 1);
        if (model.time >= 365) setIsRunning(false);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isRunning, model]);

  const handleParamChange = (param, value) => {
    const newParams = Object.assign({}, params, { [param]: value });
    setParams(newParams);
    model.params = newParams;
    model.reset();
    setCurrentTime(0);
    setIsRunning(false);
    setForceUpdate(prev => prev + 1);
  };

  const handleReset = () => {
    model.reset();
    setCurrentTime(0);
    setIsRunning(false);
    setForceUpdate(prev => prev + 1);
  };

  const handleRunComplete = () => {
    model.reset();
    model.run(730);
    setCurrentTime(model.time);
    setForceUpdate(prev => prev + 1);
  };

  const getCurrentData = () => {
    if (model.history.length > 0) return model.history[model.history.length - 1];
    return {
      community_intelligence: 0.3,
      shared_understanding: 0.2,
      system_adaptability: 0.4,
      resource_mobilization: 0.5,
      knowledge_accumulation: 0.1,
      community_resilience: 0.3,
      innovation_capacity: 0.2,
      transformation_readiness: 0.1,
      performance_index: 0.3,
      adaptive_capacity: 0.1,
      panarchy_potential: 0.5,
      panarchy_connectedness: 0.3,
      panarchy_resilience: 0.7,
      panarchy_phase: 'r',
      collapse_risk: 0.1,
      crisis_mode: 0,
    };
  };

  const currentData = getCurrentData();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
      padding: '16px', fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px',
          padding: '24px', marginBottom: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '32px', fontWeight: 'bold',
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            margin: '0 0 8px 0'
          }}>CKICAS Systems Dynamics Dashboard</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Community Kinetic Intelligent Complex Adaptive System - Interactive Simulation
          </p>
        </div>

        {/* Controls */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px',
          padding: '24px', marginBottom: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '20px', flexWrap: 'wrap', gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => setIsRunning(!isRunning)}
                style={{
                  padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600',
                  fontSize: '14px', color: 'white',
                  background: isRunning
                    ? 'linear-gradient(to right, #ef4444, #dc2626)'
                    : 'linear-gradient(to right, #22c55e, #16a34a)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.1s',
                }}>
                {isRunning ? <PauseIcon /> : <PlayIcon />}
                <span>{isRunning ? 'Pause Simulation' : 'Run Simulation'}</span>
              </button>
              <button onClick={handleReset}
                style={{
                  padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600',
                  fontSize: '14px', color: 'white', background: '#6b7280',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                <ResetIcon /><span>Reset</span>
              </button>
              <button onClick={handleRunComplete}
                style={{
                  padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600',
                  fontSize: '14px', color: 'white',
                  background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                <ZapIcon /><span>Fast Forward (2 years)</span>
              </button>
            </div>
            <div style={{
              background: 'linear-gradient(to right, #dbeafe, #f3e8ff)',
              padding: '12px 20px', borderRadius: '8px', border: '1px solid #3b82f6'
            }}>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Simulation Time:</span>
              <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                {currentTime.toFixed(1)} days
              </span>
            </div>
          </div>

          {/* View selector */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { id: 'stocks', label: 'System Stocks' },
              { id: 'dummy', label: 'Stage Activation' },
              { id: 'performance', label: 'Performance Metrics' },
              { id: 'panarchy', label: 'Panarchy Cycle' },
              { id: 'help', label: '📚 Help & Guide' },
            ].map(view =>
              <button key={view.id} onClick={() => setSelectedView(view.id)}
                style={{
                  padding: '10px 16px', borderRadius: '6px', border: '1px solid #e5e7eb', cursor: 'pointer',
                  fontWeight: '500', fontSize: '14px',
                  color: selectedView === view.id ? 'white' : '#374151',
                  background: selectedView === view.id
                    ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
                    : '#f3f4f6',
                  boxShadow: selectedView === view.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s'
                }}>
                {view.label}
              </button>
            )}
          </div>
        </div>

        {/* Main content */}
        <div style={{ marginBottom: '24px' }}>
          {selectedView === 'stocks' && <SimpleLineChart
            data={model.history}
            title="📊 System Stocks Over Time"
            dataKeys={['community_intelligence', 'shared_understanding', 'community_resilience', 'system_adaptability']}
            colors={['#4CAF50', '#2196F3', '#F44336', '#FF9800']}
          />}
          {selectedView === 'dummy' && <SimpleLineChart
            data={model.history}
            title="🔄 Stage Activation Patterns"
            dataKeys={['observation_active', 'theory_building_active', 'system_development_active', 'community_action_active', 'validation_active']}
            colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1']}
          />}
          {selectedView === 'performance' && <SimpleLineChart
            data={model.history}
            title="📈 Performance Metrics"
            dataKeys={['performance_index', 'adaptive_capacity', 'environmental_pressure']}
            colors={['#4CAF50', '#FF9800', '#F44336']}
          />}
          {selectedView === 'panarchy' && <SimpleLineChart
            data={model.history}
            title="🔄 Panarchy Adaptive Cycle"
            dataKeys={['panarchy_potential', 'panarchy_connectedness', 'panarchy_resilience', 'collapse_risk']}
            colors={['#2196F3', '#4CAF50', '#F44336', '#9C27B0']}
          />}

          {/* Help section */}
          {selectedView === 'help' && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px',
              padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>
                📚 CKICAS Dashboard Guide
              </h2>
              <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                Welcome to the CKICAS (Community Kinetic Intelligent Complex Adaptive System) simulation dashboard. This tool helps you understand and experiment with community resilience dynamics.
              </p>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>🚀 Getting Started</h3>
              <ol style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                <li>Click "Run Simulation" to start the dashboard</li>
                <li>Click the <strong>floating Parameter Adjustment button</strong> (bottom-right) to open parameter controls</li>
                <li>Choose <strong>Manual</strong> tab for sliders/toggles or <strong>AI Assistant</strong> tab for natural language control</li>
                <li>Switch between chart views to see different aspects of the simulation</li>
                <li>Use "Reset" to start over with new settings</li>
              </ol>
              
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>🎛️ Parameter Adjustment</h3>
              <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#667eea' }}>Manual Mode (Recommended for Precision)</h4>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li>Direct control with modern sliders and toggles</li>
                  <li>Real-time feedback with toast notifications</li>
                  <li>Organized parameter groups: Core, Environmental, Baseline, Timing</li>
                  <li>Instant simulation updates as you adjust</li>
                </ul>
                
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#764ba2' }}>AI Assistant Mode (Natural Language)</h4>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li>Type or speak requests: <em>"Make it more resilient"</em></li>
                  <li>Complex scenarios: <em>"Simulate a crisis at day 80 lasting 25 days"</em></li>
                  <li>Review and approve suggestions before applying</li>
                  <li>Voice input via microphone button</li>
                  <li>Conversation history for context</li>
                </ul>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>📊 Chart Guide</h3>
              <ul style={{ paddingLeft: '20px' }}>
                <li>System Stocks: Core community capabilities</li>
                <li>Stage Activation: Which processes are active</li>
                <li>Performance: Overall system health metrics</li>
                <li>Panarchy: Adaptive cycle dynamics</li>
              </ul>
              <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '16px 0 8px' }}>🛠️ Tips</h3>
              <ul style={{ paddingLeft: '20px', marginBottom: '0' }}>
                <li>Parameter changes apply immediately and restart the model.</li>
                <li>Use chart tabs above to focus on aspects of interest.</li>
                <li>Interpret spikes and dips as emergent behaviour from your parameter set.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Current State Panel */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px',
          padding: '24px', marginBottom: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
            📊 Current System State
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                Core Capabilities
              </h4>
              <ProgressBar label="Community Intelligence" value={currentData.community_intelligence} color="#4CAF50" />
              <ProgressBar label="Shared Understanding" value={currentData.shared_understanding} color="#2196F3" />
              <ProgressBar label="System Adaptability" value={currentData.system_adaptability} color="#FF9800" />
              <ProgressBar label="Community Resilience" value={currentData.community_resilience} color="#F44336" />
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                Resources & Innovation
              </h4>
              <ProgressBar label="Resource Mobilisation" value={currentData.resource_mobilization} color="#9C27B0" />
              <ProgressBar label="Knowledge Accumulation" value={currentData.knowledge_accumulation} color="#795548" />
              <ProgressBar label="Innovation Capacity" value={currentData.innovation_capacity} color="#00BCD4" />
              <ProgressBar label="Transformation Readiness" value={currentData.transformation_readiness} color="#CDDC39" />
            </div>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px',
          padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>
            🎯 Key Performance Indicators
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
              padding: '20px', borderRadius: '12px', border: '1px solid #22c55e'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>📊 Performance Index</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#14532d', marginBottom: '4px' }}>
                {(currentData.performance_index * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '12px', color: '#16a34a' }}>Overall system efficiency</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '20px', borderRadius: '12px', border: '1px solid #3b82f6'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>🔄 Adaptive Capacity</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '4px' }}>
                {(currentData.adaptive_capacity * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '12px', color: '#2563eb' }}>Ability to change & evolve</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
              padding: '20px', borderRadius: '12px', border: '1px solid #ef4444'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#dc2626', marginBottom: '8px' }}>🚨 Crisis Level</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#991b1b', marginBottom: '4px' }}>
                {((currentData.crisis_mode || 0) * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '12px', color: '#ef4444' }}>Emergency activation status</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '20px', borderRadius: '12px', border: '1px solid #f59e0b'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#d97706', marginBottom: '8px' }}>🔄 Panarchy Phase</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px' }}>
                <PhaseIndicator phase={currentData.panarchy_phase} />
              </div>
              <div style={{ fontSize: '12px', color: '#f59e0b' }}>Current adaptive cycle stage</div>
            </div>
          </div>
        </div>

        {/* Modern Parameter Adjustment Panel */}
        <ModernParameterPanel
          isOpen={showParameterPanel}
          onToggle={() => setShowParameterPanel(!showParameterPanel)}
          mode={parameterMode}
          onModeChange={setParameterMode}
          params={params}
          onParameterChange={handleParamChange}
          paramsConfig={paramsConfig}
        />

      </div>
    </div>
  );
}