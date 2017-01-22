import React from "react";
import { Link } from "react-router"
import DirectoryListings from "./DirectoryListings";


const data = 'abcdefghijklmnopqrstuvwxyz'.split('');

const DirectoryTable = ({ current: { subDirectory, directory }, groupView, list }) => {
  
  let mappedSections = [];
  
  if (groupView === false) {
    mappedSections = data.map((section, k) =>
      <div key={k} class="subDirectoryContainer">
        <Link to={`/directory/${directory}/${subDirectory}${section}`}>
          {subDirectory.toUpperCase()}{section.toUpperCase()}
        </Link>
      </div>
    )
  }
  
  return (
    <div class="sixteen">
      <div class="white-background small-border gray-border large-top-margin small-horizontal-padding">
        <div class="text-center directPadding">
          { groupView ? <DirectoryListings list={list} directory={directory} /> : mappedSections }
        </div>
      </div>
    </div>
  )
};


export default DirectoryTable;

