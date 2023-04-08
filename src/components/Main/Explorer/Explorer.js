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
                  options.name !== undefined ? (
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
                        <div className="file-items-add-version">
                          <span >
                            {options.version === undefined ? "Latest" : options.version.slice(-1) + ".0"}
                          </span>
                        </div>
                        <div className = "file-items-modified">
                            <span>
                              {options.modified}
                            </span>
                        </div>
                        <div className="file-menu-items" onClick={() => props.menuAction(options.name, options.directory, options.version)}>
                          <span className="file-menu-items-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  ) : (
                    null
                  )
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