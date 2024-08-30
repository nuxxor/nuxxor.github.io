import React from 'react';
import Highcharts from 'highcharts';
import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsReact from 'highcharts-react-official';

// Sand Signika temasını import edin
import sandSignikaTheme from 'highcharts/themes/sand-signika';

// Sankey modülünü ve temayı yükleyin
HighchartsSankey(Highcharts);
sandSignikaTheme(Highcharts);

// Temayı uygulayın
Highcharts.setOptions(Highcharts.theme);

const AIBotDiagram = () => {
  const options = {
    chart: {
      type: 'sankey',
      backgroundColor: '#f6f7f9', // Sand Signika'nın arka plan rengi
    },
    title: {
      text: 'AI-POWERED SOCIAL MEDIA ANALYSIS FLOW'
    },
    subtitle: {
      text: 'DATA FLOW FROM SOCIAL MEDIA TO AI APPLICATIONS'
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
      }
    },
    tooltip: {
      headerFormat: null,
      pointFormat: '{point.fromNode.name} → {point.toNode.name}: {point.weight:.2f} units',
      nodeFormat: '{point.name}: {point.sum:.2f} units'
    },
    series: [{
      keys: ['from', 'to', 'weight'],
      nodes: [
        { id: 'Fine-tuning', color: '#ffa500' },
        { id: 'Information Bots', color: '#74ffe7' },
        { id: 'Support Bots', color: '#8cff74' },
        { id: 'Analysis Bots', color: '#ff8da1' },
        { id: 'User Interfaces', color: '#f4c0ff' },
        { id: 'User Information', color: '#e6e6e6' },
        { id: 'Community Interaction', color: '#F9E79F' },
        { id: 'Twitter', color: '#1DA1F2' },
        { id: 'Model Training', color: '#1a8dff' },
        { id: 'Discord', color: '#7289DA' },
        { id: 'Telegram', color: '#0088cc' },
        { id: 'Data Collection', color: '#1a8dff' },
        { id: 'Data Analysis', color: '#009c00' },
        { id: 'Data Cleaning', color: '#989898' }
      ],
      data: [
        ['Twitter', 'Data Collection', 5],
        ['Discord', 'Data Collection', 4],
        ['Telegram', 'Data Collection', 3],
        ['Data Collection', 'Data Cleaning', 12],
        ['Data Cleaning', 'Data Analysis', 11],
        ['Data Analysis', 'Model Training', 10],
        ['Model Training', 'Fine-tuning', 9],
        ['Fine-tuning', 'Information Bots', 2],
        ['Fine-tuning', 'Support Bots', 2],
        ['Fine-tuning', 'Analysis Bots', 2],
        ['Fine-tuning', 'User Interfaces', 2],
        ['Information Bots', 'User Information', 1.5],
        ['Support Bots', 'User Information', 1.5],
        ['Analysis Bots', 'User Information', 1.5],
        ['User Interfaces', 'User Information', 1.5],
        ['Information Bots', 'Community Interaction', 0.5],
        ['Support Bots', 'Community Interaction', 0.5],
        ['Analysis Bots', 'Community Interaction', 0.5],
        ['User Interfaces', 'Community Interaction', 0.5]
      ],
      type: 'sankey',
      name: 'AI-Powered Social Media Analysis Flow'
    }]
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default AIBotDiagram;