//const axios = require('axios'); // You may need to install Axios if you haven't already
import axios from 'axios'
import React, { Component,  useState, useCallback, useEffect, onClick} from 'react';
import { createChart } from 'lightweight-charts';
import useWebSocket, {ReadyState} from 'react-use-websocket';
//import {sendRequest} from "./httpClient"


//import {https} from 'https-browserify'
//const https = require('https');
//const https = require('https-browserify');
const querystring = require("querystring")
//import {querystring} from 'querystring'
import { io } from "socket.io-client";
//import { error } from 'console';
import cors from "cors"

// let httpsAgent

// let maxSockets = 2

// module.exports = {
//     setMaxSockets: (max) => {
//         maxSockets = max
//     },
//   }

    const sendRequest = function (options, _callback, onData) {
        const {data, timeout, stream} = options
        const TIMEOUT = timeout || 5000

        // For non streaming connections, use HTTP Agent to pool persistent TCP sockets for HTTP requests
        if (!stream) {
            if (!httpsAgent) {
                httpsAgent = new https.Agent({
                    maxSockets: maxSockets
                })
            }
            options.agent = httpsAgent

            Object.keys(options.agent.requests).forEach((connectionName) => {
                console.debug("OANDA socket pool for", connectionName, "has", options.agent.requests[connectionName].length, "pending requests over", options.agent.sockets[connectionName].length, "sockets")
            })
        }

        const request = https.request(options)

        if (data) {
            if (options.headers && options.headers["Content-Type"] === "application/x-www-form-urlencoded") {
                request.write(querystring.stringify(data))
            } else {
                request.write(JSON.stringify(data))
            }
        }

        request.end()

        const callback = (...args) => {
            _callback(...args)
            _callback = () => {
                console.error("OANDA HTTP callback called twice", options.hostname, options.port, options.method, options.path, ...args)
            }
        }

        request.once("response", (response) => {
            let body = ""
            let ended = false

            const {statusCode} = response

            response.setEncoding("utf8")

            response.on("data", (chunk) => {
                if (stream) {
                    if (onData) {
                        onData(chunk)
                    }
                    body = chunk
                } else {
                    body += chunk
                }
            })

            response.once("end", () => {
                ended = true

                if (body) {
                    try {
                        body = JSON.parse(body)
                    } catch (error) {
                        console.warn("OANDA HTTP response body could not be parsed", options.hostname, options.port, options.method, options.path, body.length)
                    }
                }

                if (statusCode !== 200 && statusCode !== 201 && statusCode !== 204 && statusCode !== 206) {
                    console.error("OANDA HTTP responded with error code", statusCode, options.hostname, options.port, options.method, options.path)
                    return callback(true, body, statusCode, body) // TODO added body as second argument anyway (error responses can have a body that describes the error). Get rid of anywhere expecting it as 4th arg
                }

                if (options.agent) {
                    Object.keys(options.agent.requests).forEach((connectionName) => {
                        console.debug("OANDA socket pool for", connectionName, "has", options.agent.requests[connectionName].length, "pending requests over", options.agent.sockets[connectionName].length, "sockets")
                    })
                }
                callback(null, body, statusCode)
            })

            response.once("error", (error) => {
                ended = true
                console.error("OANDA HTTP response errored", options.hostname, options.port, options.method, options.path, error)
                callback(error)
            })

            response.once("close", () => {
                if (!ended) {
                    console.error("OANDA HTTP response  closed unexpectedly", options.hostname, options.port, options.method, options.path)
                    callback("Response closed unexpectedly", null, 500)
                }
            })

            request.removeAllListeners()
        })

        request.once("error", (error) => {
            console.error("OANDA HTTP request errored", options.hostname, options.port, options.method, options.path, error)
            callback(error, null, 500)
        })

        if (!stream) {
            request.setTimeout(TIMEOUT, () => {
                request.removeAllListeners()
                console.error("OANDA HTTP request timed out after", timeout / 1000 + "s", options.hostname, options.port, options.method, options.path)
                callback("timeout", null, 508)
            })
        }

        return request
    }

function getUnixTimestamp(date) {
    if (!(date instanceof Date)) {
      throw new Error('Input is not a valid Date object.');
    }
  
    // Convert the date to a Unix timestamp (milliseconds since the Unix epoch)
    return date.getTime();
  }
  
export default function Live_Data(props) {
  
      const[LiveData_Socket, setLiveData_Socket] = useState()
      
      //const betterSocket =  new WebSocket('ws://stream-fxpractice.oanda.com/v3/accounts/101-001-24608229-001/pricing/stream')  

      console.log("HELLo I am in Live Data")

      // const headers = {
      //   Authorization: "Bearer 5df72a7b015f65d651bb94b5c3debf17-4f936395133828cfc5c83d8b2220d062",
      //   instruments: "USD_NOK",
      // };
      
      function Activate_Stream() {
        if(!LiveData_Socket) {

          let accountId = "101-001-24608229-001"
          let accessToken = "d88d9a6af501b04454813af5c5d24089-6aa02d844016f3722a226c61064873f9"

        //   sendRequest(
        //     {
        //         //hostname: 'https://stream-fxpractice.oanda.com',
        //         method: "GET",
        //         //wss://stream-fxpractice.oanda.com
        //         path: `https://stream-fxpractice.oanda.com/v3/accounts/${accountId}/pricing/stream?instruments=USD_NOK`,
        //         headers: {
        //             Authorization: "Bearer " + accessToken
        //             //Origin: 'http://localhost:8000'
        //         },
        //         stream: true
        //     },
        //     //this._onPricesResponse.bind(this, accountId),
        //     //this._onPricesData.bind(this)
        // )
          // console.log("THIS FUCKING BUTTON WORKS")
          //const base_url = "wss://stream-fxpractice.oanda.com/v3/accounts/101-001-24608229-001/pricing/stream";
    
          //const outer_LiveData_Socket = new WebSocket(base_url) //{ headers: { Authorization: "Bearer d88d9a6af501b04454813af5c5d24089-6aa02d844016f3722a226c61064873f9" } });

          // //, { headers: { Authorization: "Bearer 5df72a7b015f65d651bb94b5c3debf17-4f936395133828cfc5c83d8b2220d062" } }
          // const subscribeMsg = {
          //   type: 'PRICE',
          //   instruments: ['USD_NOK'],
          //   accountId: '101-001-24608229-001',
          //   };
          // socket.send(JSON.stringify(subscribeMsg));
          
        //   let priceSubscriptions = "USD_NOK"
        //   //let streamHost = ""

        //   console.log(accessToken)

        //   // setLiveData_Socket(outer_LiveData_Socket)
        //   console.log("Button")
      
        //   const apiKey = 'd88d9a6af501b04454813af5c5d24089-6aa02d844016f3722a226c61064873f9';
        //   const headers = {
        //       Authorization: `Bearer ${accessToken}`,
        //       "Content-Type": "application/json",
        //       //"OANDA-Agent" : `v20-javascript/3.0.25 (${application})` 
        //     };
        //   const url =  `https://stream-fxpractice.oanda.com/v3/accounts/${accountId}/pricing/stream?instruments=USD_NOK`
        //   // axios({
        //   //   method: 'get',
        //   //   url: urlAccounts,
        //   //   headers : {
        //   //     Authorization: `Bearer ${accessToken}`,
        //   //     Host: 'api-fxpractice.oanda.com'
        //   //   },
        //   //   hostname: 'api-fxpractice.oanda.com' 
            
        //   // }).then(
        //   //   onfulfilled => {
        //   //     axios({
        //   //       method: 'get',
        //   //       url: url,
        //   //       responseType: 'stream',
        //   //       headers : {
        //   //         Authorization: `Bearer ${accessToken}`,
        //   //       },
        //   //       hostname: 'stream-fxpractice.oanda.com' 
                
                
        //   //     }).then(
        //   //       response => {
        //   //         response.data.on('data', (chunk) => {
        //   //           console.log(chunk)
        //   //         });
        //   //         response.data.on('end', () => {
        //   //           console.log("ENDED")
        //   //         });
        //   //     })
        //   //     const ws = new WebSocket(`https://stream-fxpractice.oanda.com/v3/accounts/${accountId}/pricing/stream?instruments=${priceSubscriptions}&Authorization=Bearer ${accessToken}`)
        //   //   })


          //const ws = new WebSocket(`wss://stream-fxpractice.oanda.com/v3/accounts/${accountId}/pricing/stream?instruments=${priceSubscriptions}&Authorization=Bearer ${accessToken}`)
          const corsOptions = {
            //origin: 'http://localhost:8000',
            credentials: true,
            //methods: ["GET", "POST"],
            
          };
          //https://api-fxpractice.oanda.com/v3/accounts/101-001-24608229-001/pricing?instruments=AUD/CHF
          //wss protocol without authorization is connection to OANDA server and giving: Insufficient authorization to perform request.
          const Socket_outer = io('https://api-fxpractice.oanda.com', { 
            //connectionName: 'close',
            //transports: ['websocket'],
            host: 'stream-fxpractice.oanda.com',
            path: `/v3/accounts/${accountId}/pricing/`,
            //withCredentials: true,
            cors : corsOptions,  
            extraHeaders: {
              Authorization: `Bearer ${accessToken}`,
              //'Access-Control-Allow-Origin': '*',
              //"Content-Type": "application/json",

            },
            query: {
              instruments : 'USD/NOK'
            },
            
          });

          Socket_outer.on('connect', () => {
            console.log('Connected to OANDA pricing stream');
          });

          
          // Event handler for incoming messages
          Socket_outer.on('message', (data) => {
            console.log('Received message:', data);
          
            // Handle the received message as needed
          });

          Socket_outer.on('disconnect', (reason) => {
            console.log('Disconnected from OANDA pricing stream:', reason);
          });

          Socket_outer.on('error', (error) => {
            console.log("OH DUCK AN ERROR")
          })

          
        setLiveData_Socket(Socket_outer)
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
          console.log("IN CLOSE STREAM")
          //LiveData_Socket.send("Please Close")
          LiveData_Socket.disconnect()
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

      







        