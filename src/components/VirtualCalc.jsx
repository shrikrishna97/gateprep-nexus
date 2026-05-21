import React, { useState } from 'react';

const VirtualCalc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('');
  const [memory, setMemory] = useState(0);

  const handleBtnClick = (val) => {
    if (val === 'C') {
      setDisplay('');
    } else if (val === 'Back') {
      setDisplay(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        // Safe evaluation replacement for simple math
        let expr = display
          .replace(/pi/g, Math.PI.toString())
          .replace(/e/g, Math.E.toString())
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/sqrt\(/g, 'Math.sqrt(')
          .replace(/\^/g, '**');

        // Simple safe evaluation using Function constructor
        const result = new Function(`return ${expr}`)();
        if (result === undefined || isNaN(result)) {
          setDisplay('Error');
        } else {
          setDisplay(Number(result.toFixed(6)).toString());
        }
      } catch (err) {
        setDisplay('Error');
      }
    } else {
      setDisplay(prev => {
        if (prev === 'Error') return val;
        return prev + val;
      });
    }
  };

  const buttons = [
    { label: 'C', type: 'op' }, { label: 'Back', type: 'op' }, { label: '(', type: 'fn' }, { label: ')', type: 'fn' }, { label: '/', type: 'op' },
    { label: 'sin(', type: 'fn' }, { label: '7', type: 'num' }, { label: '8', type: 'num' }, { label: '9', type: 'num' }, { label: '*', type: 'op' },
    { label: 'cos(', type: 'fn' }, { label: '4', type: 'num' }, { label: '5', type: 'num' }, { label: '6', type: 'num' }, { label: '-', type: 'op' },
    { label: 'tan(', type: 'fn' }, { label: '1', type: 'num' }, { label: '2', type: 'num' }, { label: '3', type: 'num' }, { label: '+', type: 'op' },
    { label: 'log(', type: 'fn' }, { label: 'ln(', type: 'fn' }, { label: '0', type: 'num' }, { label: '.', type: 'num' }, { label: 'pi', type: 'fn' },
    { label: 'sqrt(', type: 'fn' }, { label: '^', type: 'fn' }, { label: 'e', type: 'fn' }, { label: '=', type: 'eq' }
  ];

  return (
    <>
      {/* Floating launcher trigger */}
      <div 
        className="virtual-calc-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        title="Open GATE Virtual Calculator"
      >
        <span style={{ fontSize: '1.25rem' }}>🧮</span>
      </div>

      {/* Floating calculator window */}
      {isOpen && (
        <div className="glass-panel virtual-calculator-window">
          {/* Header */}
          <div className="virtual-calc-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              GATE SCIENTIFIC CALCULATOR
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ cursor: 'pointer', fontSize: '1rem', color: 'var(--text-muted)' }}
            >
              ✕
            </button>
          </div>

          {/* Screen Display */}
          <div className="virtual-calc-screen">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', height: '14px' }}>
              {display ? 'RAD' : ''}
            </div>
            <div>{display || '0'}</div>
          </div>

          {/* Buttons Pad */}
          <div className="virtual-calc-grid">
            {buttons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleBtnClick(btn.label)}
                className={`virtual-calc-btn ${btn.type}`}
              >
                {btn.label.replace('(', '')}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualCalc;
