import React from 'react';
import { root } from '../root/root';

const Explorer = (props) => {

  if(props.explorer.length > 0){
    return (
      <div className = "content-container" style = {{height: props.height + "px"}}>
         <div className = "explorer-cabinet-data">
          {
              props.explorer.map((options,key) => {
                return(
                  <div className = "explorer-data">
                    <span>
                      {options}
                    </span>
                  </div>
                )
              })
            }
         </div>
      </div>
    )
  } else {
    return(
      <div className = "background-default" style = {{height: props.height + "px"}}>
        <div className = "d-flex align-items-center justify-content-center text-handler"  style = {{height: (props.height / 1.2) + "px"}}>
            {root.noFiles}
        </div>
      </div>
    )
  }
  
}

export default Explorer;