import React, { Component } from "react"
import { IndexLink } from "react-router"
import { CubeGrid }     from "better-react-spinkit";


const DirectoryListings = ({ list, directory }) => {

  return (
    <div class="sixteen">
      <ul>
        {
          list && list.length ?
          list.map((v, k) => <li key={k} class="navbar white-background small-bottom-border gray-border text-center" ><IndexLink class="active" to={`/profiles/${directory}/${v.id}`}>{v.name}</IndexLink></li> )
          : <CubeGrid size={50} color="#36b7ea" className="flex-center" />
        }
      </ul>
    </div>
  )
};


export default DirectoryListings;
