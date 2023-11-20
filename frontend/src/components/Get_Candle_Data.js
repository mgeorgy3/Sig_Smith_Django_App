//const axios = require('axios'); // You may need to install Axios if you haven't already
//import axios from 'axios'
import { Component } from 'react';


export default class Get_Candle_Data extends Component {
    constructor(props){
        super(props);

        //const file_path = props.file_path;
        
        console.log(" I AM IN GET CANDLE_Data JS and Fetch Data");
        this.CandleDATA_ARRAY = [];
        this.volume_Data = [];

        this.state = {
            CandleDATA_ARRAY: this.CandleDATA_ARRAY,
            volume_Data: this.volume_Data
        };
    }

    fetchData() {

        console.log(" I AM IN GET CANDLE_Data JS and Fetch Data");
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

// const apiKey = '101-001-24608229-001'; // Replace with your file's path

// const tokenPath = 'a09c0de6d587f58cc8fd89b1da17611a-b6ed55130caa024e533c9bbb1a1375d6'; // Replace with your file's path

// console.log(apiKey)
// console.log(accountID)

// // Define the OANDA API endpoints
// const baseUrl = "https://api-fxpractice.oanda.com";

// // Function to fetch historical price data
// async function getHistoricalData() {
//     const instrument = 'USD_NOK';
//     const granularity = 'D';
//     const from = '2020-11-01T00:00:00Z'; // Start date
//     const to = new Date().toISOString(); // Current time

//     const url = `${baseUrl}/v3/instruments/${instrument}/candles`;
//     console.log(url)
//     console.log(apiKey)
//     const headers = {
//         Authorization: `Bearer ${apiKey}`
//     };

//     const params = {
//         granularity,
//         from,
//         to
//     };

//     try {
//         const response = await axios.get(url, { headers, params });
//         const historicalData = response.data;
//         return historicalData;
//     } catch (error) {
//         console.error('Error fetching historical data:', error);
//     }
// }


// some_stuff = getHistoricalData().then((historicalData) => {
//     // You can access the historicalData here
//     console.log(historicalData);
//     // Now you can work with the historical data

//     console.log(historicalData.candles)


//     const jsonData = JSON.stringify(historicalData.candles, null, 2); // The second argument is for formatting (2 spaces for indentation)

//     // Specify the file path where you want to save the JSON data
//     const filePath = 'USD_NOK.json';

//     // Write the JSON data to a file
//     fs.writeFile(filePath, jsonData, 'utf8', (err) => {
//     if (err) {
//         console.error('Error writing the file:', err);
//     } else {
//         console.log('JSON data has been written to', filePath);
//     }
//     });

//   });

