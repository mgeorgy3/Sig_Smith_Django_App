import React, { Component,  useState, useCallback, useEffect, onClick} from 'react';
import { createChart } from 'lightweight-charts';


//const querystring = require("querystring")
//import {querystring} from 'querystring'
import { io } from "socket.io-client";
//import { error } from 'console';
//import cors from "cors"
import { Account_Details } from './account_details';
import { useParams } from 'react-router-dom';


function getUnixTimestamp(date) {
    if (!(date instanceof Date)) {
      throw new Error('Input is not a valid Date object.');
    }
  
    // Convert the date to a Unix timestamp (milliseconds since the Unix epoch)
    return date.getTime();
  }
  
export default function Live_Data(props) {
  
      const[LiveData_Socket, setLiveData_Socket] = useState()

      console.log(props)
      const { instrument_id } = useParams()
      

      console.log("HELLo I am in Live Data")

      
      function Activate_Stream() {
        if(!LiveData_Socket) {

          const account_Dict = Account_Details()
          const accountId = account_Dict.accountId
          const accessToken = account_Dict.accountTokent


          const corsOptions = {
            //origin: 'http://localhost:8000',
            credentials: true,
            //methods: ["GET", "POST"],
            
          };
          
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
              instruments : `${instrument_id}`
            },
            
          });

          console.log("Socket_outer:", Socket_outer)

          Socket_outer.on('connect', () => {
            console.log('Connected to OANDA pricing stream');
          });

          Socket_outer.onmessage = function(m) {
            console.log(e)
          }

          Socket_outer.onAny((eventName, ...args) => {
            console.log(eventName)
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
          console.log(LiveData_Socket)
          LiveData_Socket.disconnect()
          console.log("Close")
          setLiveData_Socket(false)
          
        }
      }

  return (
      <div>

        <textarea id="log" cols="100" rows="20"></textarea>


        <button onClick={ Activate_Stream }> Start Stream </button>


        <button onClick={ Close_Stream }>Close Stream</button>

        

      </div>

  );


};