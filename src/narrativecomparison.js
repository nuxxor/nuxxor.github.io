import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const NarrativePriceComparisonChart = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.dune.com/api/v1/query/4018330/results/csv?limit=1000', {
          headers: {
            'X-Dune-API-Key': 'J1xN1qD6cBdaEXBx2GfdtL30CxwN9UU1'
          }
        });
        const parsedData = parseCSV(response.data);
        updateChartOptions(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (csv) => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const narrativeIndex = headers.indexOf('narrative');
    const performanceIndex = headers.indexOf('7d_performance');
    const avgPerformanceIndex = headers.indexOf('avg_last_7d_perc');
    
    const result = {
      narratives: [],
      performance: [],
      avgPerformance: []
    };

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      result.narratives.push(values[narrativeIndex]);
      result.performance.push(parseFloat(values[performanceIndex]) * 100);
      result.avgPerformance.push(parseFloat(values[avgPerformanceIndex]) * 100);
    }

    return result;
  };

  const updateChartOptions = (data) => {
    setChartOptions({
      chart: {
        type: 'column',
        backgroundColor: '#2a2a2b',
      },
      title: {
        text: 'Narrative Price Comparison',
        style: { color: '#E0E0E3' }
      },
      subtitle: {
        text: 'Source: @0x_roman',
        style: { color: '#A0A0A3' }
      },
      xAxis: {
        categories: data.narratives,
        title: {
          text: 'Narrative',
          style: { color: '#E0E0E3' }
        },
        labels: {
          style: { color: '#E0E0E3' }
        }
      },
      yAxis: {
        title: {
          text: '%Change',
          style: { color: '#E0E0E3' }
        },
        labels: {
          formatter: function() {
            return this.value + '%';
          },
          style: { color: '#E0E0E3' }
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: '%'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return this.y.toFixed(2) + '%';
            },
            style: {
              color: '#E0E0E3',
              textOutline: '1px contrast'
            }
          }
        }
      },
      legend: {
        itemStyle: { color: '#E0E0E3' },
        itemHoverStyle: { color: '#FFF' }
      },
      series: [{
        name: '7d Performance',
        data: data.performance
      }, {
        name: 'Avg Last 7d Perc',
        data: data.avgPerformance
      }]
    });
  };

  if (isLoading) return <div style={{ color: 'white', padding: '20px' }}>Loading data...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default NarrativePriceComparisonChart;