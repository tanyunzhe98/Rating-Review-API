import React from 'react';// Bring React in to build a component.
import { lazy, useState, useEffect, createContext } from 'react';
import { createRoot } from "react-dom/client";
const Reviews = lazy(() => import("./Components/Reviews/Reviews.jsx"));

import axios from 'axios';

import CurrentContext from './CurrentContext.js';
import ModuleContext from './ModuleContext.js';
//import background from './background.jpg';

const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  const [current, setCurrent] = useState({});

  function scrollTo(selector) {
    var div = document.getElementsByClassName(selector);
    div[0].scrollIntoView();
  }

  useEffect(() => {
    scrollTo('app')
  }, [current]);

  const appStyle = {
    fontFamily: 'Verdana, sans-serif',
    color: 'rgb(87 72 72)',
    backgroundColor: 'rgb(240, 240, 240)',
    width: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };


  return (
    <div className='app' style={appStyle}>
      <CurrentContext.Provider value={current.id}>
        <ModuleContext.Provider value='reviews'>
          <Reviews current={'3745'}/>
        </ModuleContext.Provider>
      </CurrentContext.Provider>
    </div>
  );
}

root.render(<App />);