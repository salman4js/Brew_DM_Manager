import React from 'react';
import { root } from '../root/root';
import { IconFile, IconFolder } from '../Icons/IconsHolder';

const Explorer = (props) => {

  if (props.explorer.length > 0) {
    return (
      <div className="content-container" style={{ height: props.height + "px" }}>
        <div className="explorer-cabinet-data">
          {
            props.explorer.map((options, key) => {
              if (!options.addVersion) {
                return (
                  <div className="explorer-data">
                    <span className="file-items-table-view">
                      <span className="file-items-name" onClick={() => props.handleDirectory(options.directory, options.name)}>
                        <span>
                          {
                            options.directory ? (
                              <IconFolder />
                            ) : (
                              <IconFile />
                            )
                          }
                        </span>
                        <span className="brew-title-workspace side-align">
                          {options.name}
                        </span>
                      </span>
                      <div className = "file-items-add-version">
                          <span >
                            Add Version
                          </span>
                        </div>
                      <div className="file-items-download" onClick={() => console.log("Download initiated")}>
                        <span className = "file-items-download-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                          </svg>
                        </span>
                      </div>
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
    return (
      <div className="background-default" style={{ height: props.height + "px" }}>
        <div className="d-flex align-items-center justify-content-center text-handler" style={{ height: (props.height / 1.2) + "px" }}>
          {root.noFiles}
        </div>
      </div>
    )
  }

}

export default Explorer;