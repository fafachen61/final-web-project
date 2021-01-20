import React from "react";
import MyGreatPlace from './flag/place_flag.jsx';

//material-ui
let lat = 25
let lng = 121
const CreateFlag = () => {
  return (
    <>
   <MyGreatPlace lat={lat} lng={lng} text={'A'}></MyGreatPlace>
    </>
  );
}

//export default CreateFlag