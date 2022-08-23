import { lightTheme, darkTheme } from "../constants/theme";
import { SWITCH_THEME } from "./themeAction";
import { useState } from "react";



const initialState = {
    
  theme: lightTheme,
};


const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { 
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default themeReducer;
