import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import darkUnica from 'highcharts/themes/dark-unica';
import patternFill from 'highcharts/modules/pattern-fill';
import axios from 'axios';

darkUnica(Highcharts);
patternFill(Highcharts);

const PieChartWithPatterns = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [error, setError] = useState(null);

  const parseCSV = (csv) => {
    try {
      const lines = csv.split('\n');
      const result = [];
      const headers = lines[0].split(',');

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = currentline[j].trim();
        }

        if (obj.chain_name && obj.tvl) {
          result.push({
            name: obj.chain_name,
            y: parseFloat(obj.tvl),
            logo: getLogo(obj.chain_name)
          });
        }
      }

      return result;
    } catch (error) {
      console.error("Error parsing CSV:", error);
      return [];
    }
  };

  const patterns = [
    'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
    'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9',
    'M 3 0 L 3 10 M 8 0 L 8 10',
    'M 0 3 L 10 3 M 0 8 L 10 8',
    'M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7',
    'M 3 3 L 8 3 L 8 8 L 3 8 Z',
    'M 5 5 L 8 2 L 11 5 L 8 8 Z',
    'M 0 0 L 5 10 L 10 0',
    'M 0 10 L 5 5 L 10 10 L 5 0 Z',
    'M 0 0 A 10 10 0 0 1 10 10 A 10 10 0 0 1 0 0',
    'M 5 0 A 5 5 0 1 1 5 10 A 5 5 0 1 1 5 0'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get('https://api.dune.com/api/v1/query/4019445/results/csv?limit=1000', {
          headers: {
            'X-Dune-API-Key': 'J1xN1qD6cBdaEXBx2GfdtL30CxwN9UU1'
          }
        });
        console.log("Data fetched successfully:", response.data);
        const parsedData = parseCSV(response.data);
        console.log("Parsed data:", parsedData);
        if (parsedData.length > 0) {
          const options = generateChartOptions(parsedData);
          console.log("Chart options generated:", options);
          setChartOptions(options);
        } else {
          setError("No data available after parsing");
        }
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const getLogo = (chainName) => {
    const logos = {
      'Ethereum': 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
      'Tron': 'https://cryptologos.cc/logos/tron-trx-logo.svg',
      'Solana': 'https://cryptologos.cc/logos/solana-sol-logo.svg',
      'BSC': 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
      'Arbitrum': 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg',
      'Base': 'https://orange-above-bird-277.mypinata.cloud/ipfs/QmeTRCBht3ZePByS5TgPWNq558UptSTTSUSbzdw33aBDoe',
      'Avalanche': 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
      'Polygon': 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
      'Blast': 'https://orange-above-bird-277.mypinata.cloud/ipfs/QmcBN7RXxYMgNfWtN9dogQABDHEmLSKjxkRqVphqFxZSNF',
      'Hyperliquid': 'https://orange-above-bird-277.mypinata.cloud/ipfs/QmTxdLCjN6Az8cY9VVVPX9wEqh82YzGmU2RSUrkc5fGS7r',
      'Others': 'https://orange-above-bird-277.mypinata.cloud/ipfs/QmUMWF2sSGtDYHSZQwNW6fJpYnskG21XRJn2X6D9fWKisf'
    };
    return logos[chainName] || logos['Others'];
  };

  const generateChartOptions = (data) => {
    return {
      chart: {
        type: 'pie',
        backgroundColor: '#2a2a2b',
        style: {
          fontFamily: "'Unica One', sans-serif"
        },
        events: {
          load: function() {
            createCustomLegend(this);
          },
          redraw: function() {
            createCustomLegend(this);
          }
        }
      },
      title: {
        text: 'Total Value Locked (TVL by Chain)',
        style: { color: '#E0E0E3', fontSize: '24px', fontWeight: 'bold' }
      },
      subtitle: {
        text: 'Source: @0x_roman',
        align: 'right',
        verticalAlign: 'bottom',
        y: -6,
        style: { color: '#A0A0A3', fontSize: '12px' }
      },
      tooltip: {
        pointFormat: '{point.name}: <b>${point.y:,.0f}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f}%',
            distance: 20,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 1
            },
            style: {
              color: '#E0E0E3',
              fontSize: '11px',
              textOutline: '1px contrast'
            }
          },
          showInLegend: false
        }
      },
      series: [{
        name: 'TVL',
        colorByPoint: true,
        data: data.map((item, index) => ({
          name: item.name,
          y: item.y,
          logo: item.logo,
          color: {
            pattern: {
              path: patterns[index % patterns.length],
              width: 10,
              height: 10,
              color: Highcharts.getOptions().colors[index % Highcharts.getOptions().colors.length]
            }
          }
        }))
      }]
    };
  };

  const createCustomLegend = (chart) => {
    if (!chart || !chart.series || !chart.series[0] || !chart.series[0].data) {
      console.log("Chart or series data is not available for legend creation");
      return;
    }

    if (document.getElementById('custom-legend')) {
      document.getElementById('custom-legend').remove();
    }

    const legend = document.createElement('div');
    legend.id = 'custom-legend';
    legend.style.position = 'absolute';
    legend.style.right = '10px';
    legend.style.top = '50%';
    legend.style.transform = 'translateY(-50%)';
    legend.style.backgroundColor = 'rgba(0,0,0,0.75)';
    legend.style.padding = '10px';
    legend.style.borderRadius = '5px';

    chart.series[0].data.forEach((point) => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.marginBottom = '5px';
      item.style.cursor = 'pointer';

      const img = document.createElement('img');
      img.src = point.options.logo;
      img.style.width = '20px';
      img.style.height = '20px';
      img.style.marginRight = '5px';

      const name = document.createElement('span');
      name.textContent = point.name;
      name.style.color = '#ffffff';
      name.style.fontSize = '12px';

      item.appendChild(img);
      item.appendChild(name);

      item.addEventListener('click', () => {
        point.setVisible(!point.visible);
      });

      legend.appendChild(item);
    });

    chart.container.appendChild(legend);
  };

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }

  if (!chartOptions) {
    return <div style={{ color: 'white', padding: '20px' }}>Loading data...</div>;
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default PieChartWithPatterns;