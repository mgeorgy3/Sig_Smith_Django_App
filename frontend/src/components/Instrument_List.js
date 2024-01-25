import React, { Component, Fragment, useState, useEffect} from "react";
//import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import axios from "axios";
import { Account_Details } from "./account_details";

export default function Instrument_List(props) {
    console.log("in data grid")
    console.log(props)
    
    const [instrumentList, setinstrumentList] = useState([])

    const account_Dict = Account_Details()
    const accountId = account_Dict.accountId
    const apiKey = account_Dict.accountTokent

    useEffect(() => {
       async function get_instruments() {

            try {
        
                const headers = {
                    Authorization: `Bearer ${apiKey}`,
                  };
            
                
        
                const request = await axios.get(`https://api-fxpractice.oanda.com/v3/accounts/${accountId}/instruments`, {headers: headers})
                const list_of_candles = request.data
                console.log(list_of_candles.instruments)
                setinstrumentList(list_of_candles.instruments)
                console.log("did the thing set?")
                console.log(instrumentList)
            } catch (error) {
                console.error(error)
            }
        
            console.log("Trying to find Instrument_List", instrumentList)
        
            console.log(instrumentList)
        
                
            }
            get_instruments()
    }, [])
    

    const Row = ({index, style}) => {

      console.log(style)

      const ItemStyle = {
        ...style,
        borderBottom: '1px solid #190E4F',
        color: '#ccc',
        marginBottom: "20%",
        boxShadow: '1px',
      }

      //console.log(ItemStyle)
      const Inner_Instrument_List = instrumentList;
      console.log("inner", Inner_Instrument_List)

      return (
      <ListItem key={index} style={ItemStyle} component="div" disablePadding>
            <ListItemButton component="a" href={'/live-data/' + `${Inner_Instrument_List[index].name}` + '/'}>
              {console.log(index)}
              <ListItemText
                  primary={Inner_Instrument_List[index].name} 
                />
            </ListItemButton>
      </ListItem>
      )
    }
    return (
      <Box 
        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: '#8F0000', border: '3px solid #190E4F', 
        borderRadius: 2}}>
        <FixedSizeList
          height={400}
          width={360}
          itemSize={100}
          itemCount={instrumentList.length}
        >
        {Row}
      </FixedSizeList>
      
    </Box>
      
      );
    }