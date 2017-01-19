import React            from "react";
import { Link }         from "react-router";
import cookie           from "react-cookie";
import { CubeGrid }     from "better-react-spinkit";
import $                from "jquery";

import ContactsBar      from "../components/contacts/ContactsBar";
import ContactsTable    from "../components/contacts/ContactsTable";
import MapBar           from "../components/contacts/MapBar";
import MapTable         from "../components/contacts/MapTable";
import MapResults       from "../components/contacts/MapResults";

export default class Contacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      token: cookie.load("token"),
      isSelected: false,
      loading: false,
      mapping: false,
      results: [],
      tmLists: [],
      defaultListView: "All My Contacts"
    }
    this.updateMappingStatus = this.updateMappingStatus.bind(this);
    this.uploadCSV = this.uploadCSV.bind(this);
    this.changeListView = this.changeListView.bind(this);
    this.getNewListView = this.getNewListView.bind(this);
    this.captureSelected = this.captureSelected.bind(this);
    this.loadInitialListView = this.loadInitialListView.bind(this);
    this.loadAvailableLists = this.loadAvailableLists.bind(this);
    this.deleteCurrentList = this.deleteCurrentList.bind(this);
  }

  // INITALIZE LOADING ICON AND CALL FN TO CAPTURE THE USER'S LISTS
  componentWillMount = () =>{
    this.setState({loading:true});
    this.loadAvailableLists();
  }

  // CAPTURE ALL AVAILABLE LISTS
  loadAvailableLists = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url:'https://api.legionanalytics.com/tm-list/?page_size=1000',
      headers: {"Authorization": tokenHeader },
      dataType:'json',
      crossDomain: true,
      cache:false,
      success:function(response){
        console.log(response);
        this.loadInitialListView(response.results);
        this.setState({
          tmLists:response.results
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  // LOAD THE DEFAULT LIST VIEW
  loadInitialListView = (lists) => {
    lists.forEach((list) => {
      if (list.name === this.state.defaultListView) {
        let tokenHeader = `Token ${this.state.token}`;

        $.get({
          url:`https://api.legionanalytics.com/contacts/${list.id}/?page_size=50`,
          headers: {"Authorization": tokenHeader },
          dataType:'json',
          crossDomain: true,
          cache:false,
          success:function(results){
            console.log(results);
            this.setState({
              results:results,
              loading: false
            });
          }.bind(this),
          error:function(xhr, status, err){
          }.bind(this)
        });
      }
    });
  }

  // UPDATE AND LOAD THE NEW SELECTED LIST VIEW
  getNewListView = (listID) => {
    this.setState({loading:true});
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url:`https://api.legionanalytics.com/contacts/${listID}/?page_size=50`,
      headers: {"Authorization": tokenHeader },
      dataType:'json',
      crossDomain: true,
      cache:false,
      success:function(results){
        this.setState({
          results:results,
          loading: false
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  // DELETE THE CURRENT LIST VIEW
  deleteCurrentList = (selectedList) => {
    this.state.tmLists.forEach((list) => {
      if (list.name === selectedList) {
        let tokenHeader = `Token ${this.state.token}`;


        $.post({
          url: "https://api.legionanalytics.com/delete-tm",
          headers: {"Authorization": tokenHeader },
          data: {id: list.id},
          success: (response) => {
            console.log(response);
            this.loadAvailableLists();
          },
          error: (response) => {
            console.log(response);
          }

        })
      }
    });
  }

  //UPLOADS CSV TO BACKEND TO BEGIN MAPPING
  uploadCSV = (path, filename) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.post({
      url: "https://api.legionanalytics.com/upload-document",
      headers: {"Authorization": tokenHeader, "Content-Disposition": `attachment; filename=${filename}`, "Content-Type": "text/csv"},
      data: path,
      success: (response) => {
        console.log(response);
        this.setState({
          importedSample: response
        })
      },
      error: (response) => {
        console.log(response);
      }

    })
  }

  // TOGGLE FOR MAPPING NEW CSVS
  updateMappingStatus = () => {
    this.setState({mapping: !this.state.mapping})
  }

  // FINDS THE NEW SELECTED LIST VIEW AND CALLS THE FN TO UPDATE THE VIEW
  changeListView = (selectedList) => {
    this.state.tmLists.forEach((list) => {
      if (list.name === selectedList) {
        this.getNewListView(list.id);
      }
    });
  }

  // CAPTURES THE SELECTED DATA ROWS
  captureSelected = (data) => {
    console.log(data);
    // this.setState({isSelected: true});
  }

  render() {
    let currentView;

    // TOGGLES VIEW BETWEEN MAPPING AND CONTACTS LISTS
    if (this.state.mapping) {
      currentView = (
        <div class="sixteen columns">
          <MapBar mapping={this.state.mapping} updateMappingStatus={this.updateMappingStatus}/>
          <MapTable contacts={this.state.importedSample}/>
          <MapResults />
        </div>
      )
    } else {
      currentView = (
        <div class="sixteen columns">
          <ContactsBar resultsCount={this.state.results.count} lists={this.state.tmLists} onNewListView={this.changeListView} isSelected={this.state.isSelected} loadAvailableLists={this.loadAvailableLists} deleteCurrentList={this.deleteCurrentList} uploadCSV={this.uploadCSV} mapping={this.state.mapping} updateMappingStatus={this.updateMappingStatus} />
            { this.state.loading ?
              <div class="sixteen columns"><div id="loaderContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding"><CubeGrid size={50} color="#36b7ea" /></div></div> :
              <ContactsTable results={this.state.results} captureSelected={this.captureSelected} />
            }
        </div>
      )
    }

    return (
        <div class="page-container gray-light-background">
          <div class="sixteen columns">
            { currentView }
          </div>
        </div>

    );
  }
}
