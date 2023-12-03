import React, { Component, Fragment, useState, useEffect} from "react";

//import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';


export default function Data_Grid(props) {
    const [data_params, setDataparams] = useState([])
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
      
        const fetchData = async () => {
            try {
                
                const rp_url ='/api/fetch-params-list';
                const response =  await fetch(rp_url);
                const Param_List = await response.json();
                
                
                console.log(Param_List)
                setDataparams(Param_List)
                setLoading(false);

            } catch (error) {

                console.error("Error", error);
                setLoading(false);
            }
        };
        
        fetchData();
        
        console.log("WE ARE FETCHING DATA AGAIN")
    }, []);

    if (loading) {
        return <p>Loading your data sets</p>
    }
      const Row = ({ index }) => ( //const Row = ({ index, key, style }) => (
        
        <ListItem key={index} component="div" disablePadding>
              <ListItemButton component="a" href={'/training-data/' + data_params[index].id + '/'}>
                {console.log(index)}
                <ListItemText 
                    primary={data_params[index].FX_Pair + " Gran " + 
                    data_params[index].Granularity +
                    "\n" + " Period " + 
                    data_params[index].Start_Date + " " + data_params[index].End_Date} 
                  />
              </ListItemButton>
        </ListItem>
       )


    //const navigate = useNavigate()


    return (
      <Box 
        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'rgb(50, 46, 71)' }}>
        <FixedSizeList
          height={400}
          width={360}
          itemSize={35}
          itemCount={data_params.length}
          
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
