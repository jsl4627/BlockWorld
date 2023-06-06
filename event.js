 'use strict';

  function gotKey (event) {
      
      var key = event.key;
      // Do something based on key press
	  
      // Move forward 
      if(key == 'f') num_times_done++; 
        
      // create a new shape and do a redo a draw
      draw();
      	
  } 
