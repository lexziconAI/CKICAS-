import React, { useState, useEffect } from 'react';

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
              <button onClick={() => setShowSettings(!showSettings)}
                style={{
                  padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600',
                  fontSize: '14px', color: 'white',
                  background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                <SettingsIcon /><span>Parameters</span>
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
                <li>Click "Run Simulation" to start</li>
                <li>Switch between chart views to see different aspects</li>
                <li>Adjust parameters to test scenarios</li>
                <li>Use "Reset" to start over with new settings</li>
              </ol>
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

        {/* Settings Panel */}
        {showSettings && (
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px',
            padding: '24px', marginBottom: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>
              ⚙️ Parameters
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {paramsConfig.map(({ key, label, min, max, step, type }) =>
                <div key={key} style={{ margin: '0.75rem 0' }}>
                  <label style={{ fontWeight: 500, marginRight: '0.5rem', display: 'block', marginBottom: '8px' }}>{label}</label>
                  {type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={!!params[key]}
                      onChange={e => handleParamChange(key, e.target.checked)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={params[key]}
                        onChange={e => handleParamChange(key, parseFloat(e.target.value))}
                        style={{ flex: 1, cursor: 'pointer' }}
                      />
                      <span style={{ marginLeft: '0.5rem', fontWeight: 600, minWidth: '80px', textAlign: 'right' }}>
                        {params[key].toFixed(step < 1 ? 2 : 0) + (step < 1 ? '' : ' days')}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}