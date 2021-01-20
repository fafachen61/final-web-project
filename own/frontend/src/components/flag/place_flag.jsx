import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {greatPlaceStyle} from './place_flag_styles.js';
import {greatPlaceStyle_hover} from './place_flag_hover_styles.js';

const MyGreatPlace =(props)=> {

  const text = props.text
  //shouldComponentUpdate = shouldPureComponentUpdate;
  const style = props.$hover? greatPlaceStyle_hover : greatPlaceStyle
    return (
       <div style={style}>
          {text}
       </div>
    )
}

export default MyGreatPlace 