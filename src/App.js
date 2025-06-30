import CKICASModel from './CKICASModel';
// CKICAS Dashboard - JSX Fixed Version
// Copy this entire file to App.js in StackBlitz

import React, { useState, useEffect } from 'react';

// CKICAS Model Class (same as before)
// ... [No changes to this class. For brevity, see above—your original code here remains unchanged, so keep your full class definition exactly as in your post.]

// --- Your CKICASModel class from start to end goes here ---

// [All the utility and chart components remain unchanged. Keep your existing code for these.]

/* ... 
  SimpleLineChart,
  paramsConfig,
  PlayIcon,
  PauseIcon,
  ResetIcon,
  SettingsIcon,
  ZapIcon,
  ProgressBar,
  PhaseIndicator
... */

// Main Dashboard Component
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
        if (model.time >= 365) {
          setIsRunning(false);
        }
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
    if (model.history.length > 0) {
      return model.history[model.history.length - 1];
    }
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

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
      padding: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }
  }, React.createElement('div', { style: { maxWidth: '1400px', margin: '0 auto' } }, [
    // Header
    React.createElement('div', {
      key: 'header',
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }
    }, [
      React.createElement('h1', {
        key: 'title',
        style: {
          fontSize: '32px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #2563eb, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 8px 0'
        }
      }, 'CKICAS Systems Dynamics Dashboard'),
      React.createElement('p', {
        key: 'subtitle',
        style: { color: '#6b7280', margin: 0 }
      }, 'Community Kinetic Intelligent Complex Adaptive System - Interactive Simulation')
    ]),

    // Control Panel
    React.createElement('div', {
      key: 'controls',
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }
    }, [
      React.createElement('div', {
        key: 'button-row',
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }
      }, [
        React.createElement('div', {
          key: 'buttons',
          style: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }
        }, [
          React.createElement('button', {
            key: 'run',
            onClick: () => setIsRunning(!isRunning),
            style: {
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '14px',
              color: 'white',
              background: isRunning 
                ? 'linear-gradient(to right, #ef4444, #dc2626)' 
                : 'linear-gradient(to right, #22c55e, #16a34a)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.1s',
            }
          }, [
            isRunning ? React.createElement(PauseIcon, { key: 'icon' }) : React.createElement(PlayIcon, { key: 'icon' }),
            React.createElement('span', { key: 'text' }, isRunning ? 'Pause Simulation' : 'Run Simulation')
          ]),
          React.createElement('button', {
            key: 'reset',
            onClick: handleReset,
            style: {
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '14px',
              color: 'white',
              background: '#6b7280',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }
          }, [
            React.createElement(ResetIcon, { key: 'icon' }),
            React.createElement('span', { key: 'text' }, 'Reset')
          ]),
          React.createElement('button', {
            key: 'fast',
            onClick: handleRunComplete,
            style: {
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '14px',
              color: 'white',
              background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }
          }, [
            React.createElement(ZapIcon, { key: 'icon' }),
            React.createElement('span', { key: 'text' }, 'Fast Forward (2 years)')
          ]),
          React.createElement('button', {
            key: 'settings',
            onClick: () => setShowSettings(!showSettings),
            style: {
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '14px',
              color: 'white',
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }
          }, [
            React.createElement(SettingsIcon, { key: 'icon' }),
            React.createElement('span', { key: 'text' }, 'Parameters')
          ])
        ]),
        
        React.createElement('div', {
          key: 'time',
          style: {
            background: 'linear-gradient(to right, #dbeafe, #f3e8ff)',
            padding: '12px 20px',
            borderRadius: '8px',
            border: '1px solid #3b82f6'
          }
        }, [
          React.createElement('span', { 
            key: 'label',
            style: { fontSize: '14px', color: '#6b7280', fontWeight: '500' }
          }, 'Simulation Time:'),
          React.createElement('span', {
            key: 'value',
            style: { marginLeft: '10px', fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }
          }, `${currentTime.toFixed(1)} days`)
        ])
      ]),

      // View Selector
      React.createElement('div', {
        key: 'view-selector',
        style: { display: 'flex', flexWrap: 'wrap', gap: '8px' }
      }, [
        { id: 'stocks', label: 'System Stocks' },
        { id: 'dummy', label: 'Stage Activation' },
        { id: 'performance', label: 'Performance Metrics' },
        { id: 'panarchy', label: 'Panarchy Cycle' },
        { id: 'help', label: '📚 Help & Guide' },
      ].map(view =>
        React.createElement('button', {
          key: view.id,
          onClick: () => setSelectedView(view.id),
          style: {
            padding: '10px 16px',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px',
            color: selectedView === view.id ? 'white' : '#374151',
            background: selectedView === view.id 
              ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
              : '#f3f4f6',
            boxShadow: selectedView === view.id ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.2s'
          }
        }, view.label)
      ))
    ]),

    // Main Content
    React.createElement('div', { key: 'main-content', style: { marginBottom: '24px' } }, [
      // Charts
      selectedView === 'stocks' && React.createElement(SimpleLineChart, {
        key: 'stocks-chart',
        data: model.history,
        title: '📊 System Stocks Over Time',
        dataKeys: ['community_intelligence', 'shared_understanding', 'community_resilience', 'system_adaptability'],
        colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800']
      }),
      selectedView === 'dummy' && React.createElement(SimpleLineChart, {
        key: 'dummy-chart',
        data: model.history,
        title: '🔄 Stage Activation Patterns',
        dataKeys: ['observation_active', 'theory_building_active', 'system_development_active', 'community_action_active', 'validation_active'],
        colors: ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1']
      }),
      selectedView === 'performance' && React.createElement(SimpleLineChart, {
        key: 'performance-chart',
        data: model.history,
        title: '📈 Performance Metrics',
        dataKeys: ['performance_index', 'adaptive_capacity', 'environmental_pressure'],
        colors: ['#4CAF50', '#FF9800', '#F44336']
      }),
      selectedView === 'panarchy' && React.createElement(SimpleLineChart, {
        key: 'panarchy-chart',
        data: model.history,
        title: '🔄 Panarchy Adaptive Cycle',
        dataKeys: ['panarchy_potential', 'panarchy_connectedness', 'panarchy_resilience', 'collapse_risk'],
        colors: ['#2196F3', '#4CAF50', '#F44336', '#9C27B0']
      }),

      // Help Section — fully detailed and included
      selectedView === 'help' && React.createElement('div', {
        key: 'help-section',
        style: {
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }
      }, [
        React.createElement('h2', {
          key: 'help-title',
          style: { fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }
        }, '📚 CKICAS Dashboard Guide'),
        React.createElement('p', {
          key: 'intro',
          style: { fontSize: '16px', marginBottom: '20px' }
        }, 'Welcome to the CKICAS simulation dashboard—an interactive system-dynamics tool for exploring community resilience.'),
        React.createElement('h3', {
          key: 'getting-started',
          style: { fontSize: '20px', fontWeight: '600', margin: '16px 0 8px' }
        }, '🚀 Getting Started'),
        React.createElement('ul', {
          key: 'getting-list',
          style: { paddingLeft: '20px', marginBottom: '20px' }
        }, [
          React.createElement('li', { key: 'gs1' }, 'Click ', React.createElement('strong', null, 'Run Simulation'), ' to begin.'),
          React.createElement('li', { key: 'gs2' }, 'Click ', React.createElement('strong', null, 'Parameters'), ' to open a panel of 21 controls:'),
          React.createElement('li', { key: 'gs3' }, 'Slide any of the 17 sliders or toggle ', React.createElement('strong', null, 'Panarchy Enabled'), ' to test scenarios in real time.'),
          React.createElement('li', { key: 'gs4' }, 'Use ', React.createElement('strong', null, 'Reset'), ' to clear history or ', React.createElement('strong', null, 'Fast Forward'), ' to simulate two years instantly.')
        ]),
        React.createElement('div', {
          key: 'param-groups',
          style: { paddingLeft: '20px', marginBottom: '20px' }
        }, [
          React.createElement('p', { key: 'grp-intro' }, 'Controls are grouped as:'),
          React.createElement('ul', { key: 'grp-list', style: { listStyle: 'disc', paddingLeft: '40px' } }, [
            React.createElement('li', { key: 'grp1' }, React.createElement('strong', null, '🎯 Core:'), ' Learning Rate, Adaptation Rate, Feedback Strength, Transformation Threshold'),
            React.createElement('li', { key: 'grp2' }, React.createElement('strong', null, '🌍 Environmental & Crisis:'), ' Crisis Intensity, Volatility Level, Uncertainty Level, Complexity Level, Ambiguity Level'),
            React.createElement('li', { key: 'grp3' }, React.createElement('strong', null, '📊 Baseline:'), ' Social Connectivity, Digital Inclusion, Resource Availability, Technological Access'),
            React.createElement('li', { key: 'grp4' }, React.createElement('strong', null, '⏱️ Timing & Cycle:'), ' Cycle Duration, Crisis Start Time, Crisis Duration, Panarchy Enabled'),
            React.createElement('li', { key: 'grp5' }, React.createElement('em', null, 'Hidden:'), ' Panarchy Phase lengths are configurable in code but not exposed here.')
          ])
        ]),
        React.createElement('h3', {
          key: 'chart-guide',
          style: { fontSize: '20px', fontWeight: '600', margin: '16px 0 8px' }
        }, '📊 Chart Guide'),
        React.createElement('ul', {
          key: 'chart-list',
          style: { paddingLeft: '20px' }
        }, [
          React.createElement('li', { key: 'cl1' }, React.createElement('strong', null, 'System Stocks:'), ' community intelligence, shared understanding, adaptability, resilience'),
          React.createElement('li', { key: 'cl2' }, React.createElement('strong', null, 'Stage Activation:'), ' observation, theory building, system development, community action, validation'),
          React.createElement('li', { key: 'cl3' }, React.createElement('strong', null, 'Performance:'), ' performance index, adaptive capacity, environmental pressure'),
          React.createElement('li', { key: 'cl4' }, React.createElement('strong', null, 'Panarchy:'), ' potential, connectedness, resilience, collapse risk across adaptive cycle')
        ]),
        React.createElement('h3', {
          key: 'tips',
          style: { fontSize: '20px', fontWeight: '600', margin: '16px 0 8px' }
        }, '🛠️ Tips'),
        React.createElement('ul', {
          key: 'tips-list',
          style: { paddingLeft: '20px', marginBottom: '0' }
        }, [
          React.createElement('li', { key: 'tip1' }, 'Parameter changes apply immediately and restart the model.'),
          React.createElement('li', { key: 'tip2' }, 'Use chart tabs above to focus on aspects of interest.'),
          React.createElement('li', { key: 'tip3' }, 'Interpret spikes and dips as emergent behaviour from your parameter set.')
        ])
      ])
    ])
    // ... All other panels unchanged below
    ,

    // Current State Panel and KPI Dashboard, Settings Panel, remain unchanged.  
    // (Keep your code for these sections exactly as it was)
  ]));
}
