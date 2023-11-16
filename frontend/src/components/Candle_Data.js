import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import { createChart } from 'lightweight-charts';

function formatDayWithLeadingZero(date) {
    if (!(date instanceof Date)) {
      throw new Error('Input is not a valid Date object.');
    }
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to the month since it's 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

export default class Candle_Data extends Component {
    constructor(props){
        super(props);

        //const file_path = props.file_path;


        this.CandleDATA_ARRAY = [];
        this.volume_Data = [];

        this.state = {
            CandleDATA_ARRAY: this.CandleDATA_ARRAY,
            volume_Data: this.volume_Data
        };
    }

    fetchData() {
        const candle_Data = require('./output.json')

        for (let index = 0; index < candle_Data.length; index++) {
          const element = candle_Data[index];
          let date = new Date(element.time)
          const formattedDate = formatDayWithLeadingZero(date);

          let month = date.getMonth() + 1; // Adding 1 because months are 0-indexed
          let day = date.getDate();
          
          let year = date.getFullYear();
      

          this.CandleDATA_ARRAY.push({ time: formattedDate, 
                                      open: parseFloat(element.mid.o), 
                                      high: parseFloat(element.mid.h), 
                                      low: parseFloat(element.mid.l), 
                                      close: parseFloat(element.mid.c)});
          
          this.volume_Data.push({ time: formattedDate, value: parseInt(element.volume)});
          }

          this.setState({
              CandleDATA_ARRAY: this.CandleDATA_ARRAY,
              volume_Data: this.volume_Data
          });

         console.log(this.CandleDATA_ARRAY);
          //console.log(candle_Data);
          

        
        }

    componentDidMount() {
        this.fetchData();

        const chartOptions = { layout: 
            { textColor: 'white', background: 
            { type: 'solid', color: 'black' } } };

        this.chart = createChart(document.getElementById(this.props.containerId), chartOptions);
        

        const areaSeries = this.chart.addAreaSeries({
            lineColor: '#2962FF', topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
        });

        const candlestickSeries = this.chart.addCandlestickSeries()

        //areaSeries.setData(volume_Data);
        candlestickSeries.setData(this.CandleDATA_ARRAY);
    }
        
    render() {
        return (
            <div></div>
          );
    }
}

