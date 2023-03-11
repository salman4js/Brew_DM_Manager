import React from 'react';
import FileItems from '../FileItems/FileItems';

const Sidebar = (props) => {

  return (
    <div className = "sidebar" style = {{height: props.height + "px"}}>
        <div className = "sidebar-container">
          {
            props.root.map((option,key) => {
              return(
                <FileItems name = {option} handleSelect = {(data) => props.handleSelect(data)} />
              )
            })
          }
        </div>
    </div>
  )
}

export default Sidebar;