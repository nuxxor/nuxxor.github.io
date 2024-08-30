import React from 'react';
import NarrativeComparison from './narrativecomparison';
import PieWithPatterns from './PieChartWithPatterns';
import AIBotDiagram from './aibotdiagram';

function App() {
  return (
    <div className="App">
      <h1>Crypto Analytics Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2>Narrative Price Comparison</h2>
          <NarrativeComparison />
        </div>
        <div>
          <h2>TVL Distribution</h2>
          <PieWithPatterns />
        </div>
        <div>
          <h2>AI Bot Diagram</h2>
          <AIBotDiagram />
        </div>
      </div>
    </div>
  );
}

export default App;