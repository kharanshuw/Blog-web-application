import React from 'react';

import './index.css';

import conf from './config/environment-config.js';




function App() {

  console.log(conf.appwriteUrl);
  
  

  return (

    <div className=' container-div'>

      <p>
        block application
      </p>

    </div>


  )
}

export default App;
