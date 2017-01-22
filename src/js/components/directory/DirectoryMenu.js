import React, { Component } from "react"
import { Link } from "react-router"


const data = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const DirectoryMenu = () => {

  return (
    <div class="sixteen">
      <div class="navbar text-center fpng">
        <div>People Directory :
          {data.map((v, k) => <Link key={k} to={`/directory/person/${v.toLowerCase()}`} class="directoryLink active">{v}</Link>)}
        </div>
        <div>Company Directory :
          {data.map((v, k) => <Link key={k} to={`/directory/company/${v.toLowerCase()}`} class="directoryLink active">{v}</Link>)}
        </div>
      </div>
    </div>
  )
};

export default DirectoryMenu;
