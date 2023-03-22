import React from 'react';
import { root } from '../root/root';
import { IconFile, IconFolder } from '../Icons/IconsHolder';

const Explorer = (props) => {

  if(props.explorer.length > 0){
    return (
      <div className = "content-container" style = {{height: props.height + "px"}}>
         <div className = "explorer-cabinet-data">
          {
              props.explorer.map((options,key) => {
                if(!options.addVersion){
                  return(
                    <div className = "explorer-data" onClick={() => props.handleDirectory(options.directory, options.name)}>
                      <span className = "file-items-table-view">
                        <span className = "file-items-name">
                          <span>
                            {
                              options.directory ? (
                                <IconFolder />
                              ) : (
                                <IconFile />
                              )
                            }
                          </span>
                          <span className = "brew-title-workspace side-align">
                            {options.name}
                          </span>
                        </span>
                        {/* <div className = "file-items-add-version">
                          <span >
                            Add Version
                          </span>
                        </div> */}
                      </span>
                    </div>
                  )
                }
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