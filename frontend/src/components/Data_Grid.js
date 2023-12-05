import React, { Component, Fragment, useState, useEffect} from "react";

//import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';


function renderRow (props) { //const Row = ({ index, key, style }) => (
      const {oanda_requests} = props
      console.log("THis is props", oanda_requests)
  
      return(
      <ListItem key={index} component="div" disablePadding>
            <ListItemButton component="a" href={'/training-data/' + oanda_requests[index].id + '/'}>
              {console.log(index)}
              <ListItemText 
                  primary={oanda_requests[index].FX_Pair + " Gran " + 
                  props.oanda_requests[index].Granularity +
                  "\n" + " Period " + 
                  props.oanda_requests[index].Start_Date + " " + props.oanda_requests[index].End_Date} 
                />
            </ListItemButton>
      </ListItem>
      )
}


export default function Data_Grid(props) {
    console.log("in data grid")
    console.log(props)

    

    const Row = ({index, style}) => {

      console.log(style)

      const ItemStyle = {
        ...style,
        borderBottom: '1px solid #190E4F',
        color: '#ccc',
        marginBottom: "20%",
        boxShadow: '1px'
      }

      console.log(ItemStyle)

      return (
      <ListItem key={index} style={ItemStyle} component="div" disablePadding>
            <ListItemButton component="a" href={'/training-data/' + props.oanda_requests[index].id + '/'}>
              {console.log(index)}
              <ListItemText 
                  primary={props.oanda_requests[index].FX_Pair + " Gran " + 
                  props.oanda_requests[index].Granularity +
                  "\n" + " Period " + 
                  props.oanda_requests[index].Start_Date + " " + props.oanda_requests[index].End_Date} 
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
          itemCount={props.oanda_requests.length}
        >
        {Row}
      </FixedSizeList>
      
    </Box>
      
      );
    }

  

  //import { Grid, Typography } from "@material-ui/core";



//   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//   {console.log("HELO")}
//   {Array.from(data_params).map((params, index) => (
//     <a href={'/training-data/' + params.id + '/'}>
//     <Button >
//     <Grid xs={2} sm={4} md={4} key={index}>
//       <Item>{params.FX_Pair}</Item>
//     </Grid>
//     </Button >
//     </a>
//   ))}
// </Grid>



// function renderRow(props) {

//   const { index, style } = props;

//   let itemIndex = index;

//   console.log(itemIndex)

//   if (itemIndex >= 0 && itemIndex < data_params.length+1) {
//     const item = data_params[itemIndex];

//     return (
//       <ListItem key={index} component="div" disablePadding>
//         <ListItemButton component="a" href={'/training-data/' + item.id + '/'}>
//           <ListItemText primary={item.FX_Pair} />
//         </ListItemButton>
//       </ListItem>
//     );
//   } else {
//     // Handle the case where the index is out of bounds
//     // You might render a placeholder or handle it in another way
//     return (
//       <ListItem key={index} component="div" disablePadding>
//         <ListItemText />
//       </ListItem>
//     );
//   }

// }
