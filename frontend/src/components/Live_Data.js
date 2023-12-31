//const axios = require('axios'); // You may need to install Axios if you haven't already
import axios from 'axios'
import React, { Component,  useState, useCallback, useEffect, onClick} from 'react';
import { createChart } from 'lightweight-charts';
import useWebSocket, {ReadyState} from 'react-use-websocket';

function getUnixTimestamp(date) {
    if (!(date instanceof Date)) {
      throw new Error('Input is not a valid Date object.');
    }
  
    // Convert the date to a Unix timestamp (milliseconds since the Unix epoch)
    return date.getTime();
  }
  
  function formatUtcDateTimeWithLeadingZero(date) {
    if (!(date instanceof Date)) {
      throw new Error('Input is not a valid Date object.');
    }
  
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
  
    // Convert the UTC timestamp to Unix timestamp
    const unixTimestamp = getUnixTimestamp(date);
  
    return {
      formattedDateTime: `${year}-${month}-${day} ${hours}:${minutes}`,
      unixTimestamp: unixTimestamp,
    };
  }


export default function Live_Data(props) {
  
      const[LiveData_Socket, setLiveData_Socket] = useState()
      
      //const betterSocket =  new WebSocket('ws://stream-fxpractice.oanda.com/v3/accounts/101-001-24608229-001/pricing/stream')  

      console.log("HELLo I am in Live Data")


      function Activate_Stream() {
        if(!LiveData_Socket) {
          console.log("THIS FUCKING BUTTON WORKS")
          const outer_LiveData_Socket = new WebSocket('ws://'+ window.location.host + '/api/live-end-point/');
          setLiveData_Socket(outer_LiveData_Socket)
        }
        
      }

      if(LiveData_Socket){
        LiveData_Socket.onmessage = function(e) {
          const data = JSON.parse(e.data);
          console.log("Normal", data)
          //console.log("Parse", JSON.parse(e))
          //console.log("Parse Data", JSON.parse(JSON.stringify(e.data)))
          //document.querySelector('#log').value += (data.message + '\n');
        };
  
        LiveData_Socket.onclose = function(e) {
          console.error('Chat socket closed unexpectedly');
        };
      }

      function Close_Stream() {
        if(LiveData_Socket){
          LiveData_Socket.send("Please Close")
          LiveData_Socket.close()
          console.log("Close")
          setLiveData_Socket(false)
        }
      }


      

      //   betterSocket.onmessage = ({data}) => {
      //     console.log(data)
      // };


  return (
      <div>

        <textarea id="log" cols="100" rows="20"></textarea>


        <button onClick={ Activate_Stream }> Start Stream </button>


        <button onClick={ Close_Stream }>Close Stream</button>

        

      </div>

  );


};

      // console.log("IN LIVE DATA HERE IS DATAID",  props.dataId)
      // let socketUrl = 'ws://'+ window.location.host + '/api/live-end-point/';
      // const [messageHistory, setMessageHistory] = useState([]);

      // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    
      // useEffect(() => {
      //     if (lastMessage !== null) {
      //       setMessageHistory((prev) => prev.concat(lastMessage));
      //     }
      //   }, [lastMessage, setMessageHistory]);

      //   const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

      //   const connectionStatus = {
      //     [ReadyState.CONNECTING]: 'Connecting',
      //     [ReadyState.OPEN]: 'Open',
      //     [ReadyState.CLOSING]: 'Closing',
      //     [ReadyState.CLOSED]: 'Closed',
      //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      //   }[readyState];

      //   return (
      //     <div>
            
      //       <button
      //         onClick={handleClickSendMessage}
      //         disabled={readyState !== ReadyState.OPEN}
      //       >
      //         Click Me to send 'Hello'
      //       </button>
      //       <span>The WebSocket is currently {connectionStatus}</span>
      //       {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      //       <ul>
      //         {messageHistory.map((message, idx) => (
      //           <span key={idx}>{message ? message.data : null}</span>
      //         ))}
      //       </ul>
      //     </div>
      //     );
      // };

  
//   return (
//     <div>

    
//       <h1>Testing Streaming</h1>
//       <button href={Close_WS} formMethod='POST'>
//           Close Stream
//       </button>

//       </div>

//   );

// }

// export default class Live_Data extends Component {
//     constructor(props){
//         super(props);

//         //const file_path = props.file_path;
        
//         this.CandleDATA_ARRAY = [];
//         this.volume_Data = [];
//         this.Request_Parameters;

//         this.state = {
//             CandleDATA_ARRAY: this.CandleDATA_ARRAY,
//             volume_Data: this.volume_Data,
//             Request_Parameters: this.Request_Parameters
//         };
//     }

    


//     async fetchData() {
        
//         console.log("1", this.props.dataId)
//         console.log("2", this.props.dataId)
//         const rp_url = '/api/fetch_params/' + this.props.dataId + '/';
//         const response = await fetch(rp_url);
//         const Request_Parameters = await response.json();
  
//         // Handle the fetched data
//         console.log(Request_Parameters);
//         this.setState({ Request_Parameters });
  
//         // Define the OANDA API endpoints
//         //const baseUrl = 'https://api-fxpractice.oanda.com';
  
//         // Function to fetch historical price data
//         const instrument = Request_Parameters.FX_Pair;
//         // const granularity = Request_Parameters.Granularity;
//         // const from = Request_Parameters.Start_Date; // Start date
//         // const to = Request_Parameters.End_Date; // Current time
//         const accountID = '101-001-24608229-001'
  
        
  
//         const apiKey = '5df72a7b015f65d651bb94b5c3debf17-4f936395133828cfc5c83d8b2220d062';

        

        

//         // socket.onopen = function(e) {
//         //   alert("[open] Connection established");
//         //   alert("Sending to server");
//         //   socket.send("My name is John");
//         // };

//         // socket.onmessage = function(event) {
//         //   alert(`[message] Data received from server: ${event.data}`);
//         // };

//         // socket.onclose = function(event) {
//         //   if (event.wasClean) {
//         //     alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//         //   } else {
//         //     // e.g. server process killed or network down
//         //     // event.code is usually 1006 in this case
//         //     alert('[close] Connection died');
//         //   }
//         // };

//         // socket.onerror = function(error) {
//         //   alert(`[error]`);
//         // };
        
//         // //const url = `wss://stream-fxtrade.oanda.com/v3/accounts/${accountID}/pricing/stream`;

//         // let socket = new WebSocket("ws://javascript.info");
//         // //console.log("logging url", url);

//         // //const ws = new WebSocket(url);


//         // //const ws = new WebSocket(url);

//         // //const socket = new WebSocket(url);

//         // // Connection opened
//         // ws.addEventListener("open", (event) => {
//         //   ws.send("Hello Server!");
//         // });

//         // // Listen for messages
//         // ws.addEventListener("message", (event) => {
//         //   console.log("Message from server ", event.data);
//         // });




//       }

//     async componentDidMount() {

//         // Await this function and then call then graph it.
//         await this.fetchData();

        

//         const chartOptions = {
//             layout: {
//               textColor: 'white',
//               background: { type: 'solid', color: 'black' },
//             },
//             timeScale: {
//               timeVisible: true,
//               tickMarkFormatter: (time) => {
//                 const date = new Date(time * 1000); // Convert Unix timestamp to milliseconds
//                 const formattedDateTime = formatUtcDateTimeWithLeadingZero(date).formattedDateTime;
//                 return formattedDateTime;
//               },
//             },
//           };
          
//         this.chart = createChart(document.getElementById(this.props.containerId), chartOptions);
        

//         const areaSeries = this.chart.addAreaSeries({
//             lineColor: '#2962FF', topColor: '#2962FF',
//             bottomColor: 'rgba(41, 98, 255, 0.28)',
//         });

//         const candlestickSeries = this.chart.addCandlestickSeries()

//         //areaSeries.setData(volume_Data);
//         console.log(this.CandleDATA_ARRAY)
//         candlestickSeries.setData(this.CandleDATA_ARRAY);
//     }
        
//     render() {
//         const { Request_Parameters } = this.state;

//         if (!Request_Parameters) {
//           // Data is still loading, you might want to show a loading indicator
//           return <p>Loading...</p>;
//         }
//         return (
//             <div className="grid-item-below-navbar">
//                 <h2 className="currency_header">{Request_Parameters.FX_Pair}</h2> 
//                 <div className="chart_container" id={this.props.containerId}>
//             </div>
            

//             <div className = "paragraph">
//                 <p>
//                     This will describe the chart and whats going on in it.
//                     This will describe the chart and whats going on in it.
//                     This will describe the chart and whats going on in it.
//                     This will describe the chart and whats going on in it.
//                 </p>
//             </div>
//             </div>
//           );
//     }
// }


