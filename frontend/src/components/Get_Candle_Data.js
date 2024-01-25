//const axios = require('axios'); // You may need to install Axios if you haven't already
import axios from 'axios'
import React, { Component, Fragment } from 'react';
import { createChart } from 'lightweight-charts';


  function formatUtcDateTimeWithLeadingZero(date) {
    if (!(date instanceof Date)) {
      throw new Error('Input is not a valid Date object.');
    }

  
    const year = date.getFullYear();
    //console.log("year", year)
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDay().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  
    // Convert the UTC timestamp to Unix timestamp
    //const unixTimestamp = date.getTime();
  
    return {
      formattedDateTime: `${year}-${month}-${day}`, //${hours}:${minutes}`,
      unixTimestamp: date.getTime(),
    };
  }


function my_format_date(date) {
  const Date_In = new Date(date)

  console.log(Date_In)

  //console.log(Date_In.toISOString())
  //console.log(Date_In.toLocaleString())
  const year = Date_In.getFullYear();
  //console.log("year", year)
  const month = (Date_In.getMonth() + 1).toString();
  const day = Date_In.getDay().toString();
  const hours = Date_In.getHours().toString();
  const minutes = Date_In.getMinutes().toString();
  const seconds = Date_In.getSeconds().toString();
  //console.log(`${year}-${month}-${day}`)

  return {
    Chart_Date_Time: `${year}-${month}-${day}-${hours}:${minutes}`,
    unixTimestamp: Date_In.getTime(),
  }

}
export default class Get_Candle_Data extends Component {
    constructor(props){
        super(props);

        //const file_path = props.file_path;
        
        this.CandleDATA_ARRAY = [];
        this.volume_Data = [];
        this.Request_Parameters;

        this.state = {
            CandleDATA_ARRAY: this.CandleDATA_ARRAY,
            volume_Data: this.volume_Data,
            Request_Parameters: this.Request_Parameters
        };
    }


    async fetchData() {
        try {
          console.log("IN GET CANDLE DATA HERE IS DATAID",  this.props.dataId)
          const rp_url = '/api/fetch_params/' + this.props.dataId + '/';
          const response = await fetch(rp_url);
          const Request_Parameters = await response.json();
    
          // Handle the fetched data
          console.log(Request_Parameters);
          this.setState({ Request_Parameters });
    
          // Define the OANDA API endpoints
          const baseUrl = 'https://api-fxpractice.oanda.com';
    
          // Function to fetch historical price data
          const instrument = Request_Parameters.FX_Pair;
          const granularity = Request_Parameters.Granularity;
          const from = Request_Parameters.Start_Date; // Start date
          const to = Request_Parameters.End_Date; // Current time
    
          const url = `${baseUrl}/v3/instruments/${instrument}/candles`;
          console.log(url);
    
          const apiKey = 'd88d9a6af501b04454813af5c5d24089-6aa02d844016f3722a226c61064873f9';
          const headers = {
            Authorization: `Bearer ${apiKey}`,
          };
    
          const params = {
            granularity,
            from,
            to,
          };
    
          const historicalDataResponse = await axios.get(url, { headers, params });
          const historicalData = historicalDataResponse.data;
          console.log(historicalData);

          for (let index = 0; index < historicalData.candles.length; index++) {
            const element = historicalData.candles[index];
            const date = element.time;

            //console.log(date)
      
            const { Chart_Date_Time, unixTimestamp } = my_format_date(date);
      
            this.CandleDATA_ARRAY.push({
              time: unixTimestamp,
              open: parseFloat(element.mid.o),
              high: parseFloat(element.mid.h),
              low: parseFloat(element.mid.l),
              close: parseFloat(element.mid.c),
            });
      
            this.volume_Data.push({ time: unixTimestamp, value: parseInt(element.volume) });
          }
      
          this.setState({
            CandleDATA_ARRAY: this.CandleDATA_ARRAY,
            volume_Data: this.volume_Data,
          });
      
          console.log(this.CandleDATA_ARRAY);
          return historicalData;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
        
        
        

    async componentDidMount() {

        // Await this function and then call then graph it.
        await this.fetchData();

        const chartOptions = {
            layout: {
              textColor: 'white',
              background: { type: 'solid', color: 'black' },
            },
            timeScale: {
              timeVisible: true,
              tickMarkFormatter: (time) => {

                const date = new Date(time); // Convert Unix timestamp to milliseconds
                const formattedDateTime = my_format_date(date).Chart_Date_Time;
                return formattedDateTime;
              },
            },
          };

        
          
        this.chart = createChart(document.getElementById(this.props.containerId), chartOptions);
        

        const areaSeries = this.chart.addAreaSeries({
            lineColor: '#2962FF', topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
        });

        const candlestickSeries = this.chart.addCandlestickSeries()

        //areaSeries.setData(volume_Data);
        console.log(this.CandleDATA_ARRAY)
        candlestickSeries.setData(this.CandleDATA_ARRAY);
    }
        
    render() {
        const { Request_Parameters } = this.state;

        if (!Request_Parameters) {
          // Data is still loading, you might want to show a loading indicator
          return <p>Loading...</p>;
        }
        return (
            <Fragment>
                <h2 className="currency_header">{Request_Parameters.FX_Pair}</h2> 
                <div className="chart_container" id={this.props.containerId}> </div>
            </Fragment>
          );
    }
}


