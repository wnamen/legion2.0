import React, { Component } from "react"
import { IndexLink } from "react-router"
import { CubeGrid }     from "better-react-spinkit";


const DirectoryListings = ({ list, directory }) => {
  
  return (
    <div class="sixteen">
      <div class="navbar white-background small-border gray-border text-center fpng">
        <a href="#" class="active">Person's Name</a>
      </div>
      <ul>
        {
          list && list.length ?
          list.map((v, k) => <li key={k} ><IndexLink to={`/profile/${directory}/${v.id}`}>{v.name}</IndexLink></li> )
          : <CubeGrid size={50} color="#36b7ea" className="flex-center" />
        }
      </ul>
    </div>
  )
};


export default DirectoryListings;
