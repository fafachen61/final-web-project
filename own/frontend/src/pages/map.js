import React, { Component ,useState} from 'react';
import GoogleMapReact from 'google-map-react';
import Flags from '../components/Flags.js'
import { useSelector } from "react-redux";
import MyGreatPlace from '../components/flag/place_flag.jsx';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import RestaurantCard from ".././components/RestaurantCard";
import Spinner from "../util/spinner/spinner";
import RestaurantContent from "../components/RestaurantContent";
import SearchBar from "../components/SearchBar";

const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center",
  },
  SearchBar: {
    margin: "24px 0 28px 360px",
  },
}));

const SimpleMap = () => {
  const map_center = {lat: 25.01163,lng: 121.32165}
  const map_center_zoom = 11
  const K_size = 40

  /*const { loading } = useSelector((state) => state.data);
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);*/

  const { restaurants } = useSelector((state) => state.data);
  const restaurantArray = restaurants.restaurants;

  const CreateFlag = () => {
    const classes = useStyles();
    const { loading } = useSelector((state) => state.data);
    const {
      account: { role },
      authenticated,
    } = useSelector((state) => state.auth);
    const [locationStatus, setLocationStatus] = useState(
      localStorage.getItem("location") ? true : false
    );
    let restaurantMarkup = loading ? <Spinner /> : <RestaurantContent />;

    return (
      <>
      <Grid item className={classes.SearchBar}>
              <SearchBar page="home" action={setLocationStatus} />
      </Grid>
      <Grid item xs={12} sm={10}>
                {locationStatus ? (
                  <p></p>
                ) : (
                  <Typography variant="body1" className={classes.center} noWrap>
                    Enter your location to view nearby restaurants
                  </Typography>
                )}
      </Grid>

      <div style={{ height: '100vh', width: '100%' ,alignContent: 'center'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAGZrNKrojgH6WD3LiY4F5HZW8raFW6uDg" }}
          defaultCenter={map_center}
          defaultZoom={map_center_zoom}
          hoverDistance={K_size/2}
        >
          {restaurantArray? (  restaurantArray.map(( restaurant) =>{
      const {
        name,
        tags,
        costForOne,
        minOrderAmount,
        payment,
        address,
        imageUrl,
        _id,
      } = restaurant;
      return (<MyGreatPlace lat={address.lat} lng={address.lng} text={name}></MyGreatPlace>)
    })  ) : <p></p>}
        </GoogleMapReact>
      </div>
      </>
      );
    }

  const getRestaurantCard = (restaurantObj) => {
      return (
        <Grid item xs={12} sm={3} key={restaurantObj._id}>
          <RestaurantCard {...restaurantObj} />
        </Grid>
      );
  };
  return (
    <>
      <CreateFlag></CreateFlag>
      <Grid container spacing={2}>
        {restaurantArray? (restaurantArray.map((restaurant) => getRestaurantCard(restaurant))) : <p></p>}
      </Grid>
    </>
    );
}
 
export default SimpleMap;

