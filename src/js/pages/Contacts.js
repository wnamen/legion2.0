import React, { PropTypes, Component, Children } from 'react';
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
      loading: false,
      mapping: false,
      mappedArray: [],
      mappedColumns: {},
      results: [],
      tmLists: [],
      defaultListView: "All My Contacts"
    }
    this.updateMappingStatus = this.updateMappingStatus.bind(this);
    this.uploadCSV = this.uploadCSV.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.mapCSV = this.mapCSV.bind(this);
    this.handleCaptureColumn = this.handleCaptureColumn.bind(this);
    this.changeListView = this.changeListView.bind(this);
    this.getNewListView = this.getNewListView.bind(this);
    this.loadInitialListView = this.loadInitialListView.bind(this);
    this.loadAvailableLists = this.loadAvailableLists.bind(this);
    this.deleteCurrentList = this.deleteCurrentList.bind(this);
    this.searchCurrentList = this.searchCurrentList.bind(this);
  }

  static childContextTypes = {
    captureSelected: PropTypes.func,
    copySelected: PropTypes.func,
    removeSelected: PropTypes.func,
    isSelected: PropTypes.bool,
  };

  getChildContext() {
    const { http } = this.context;
    let checked = [];
    let selectionStatus = true;

    return {
      isSelected: true,

      captureSelected: (id) => {
        if (checked.length === 0) {
          return checked.push(id);
        }

        checked.indexOf(id) !== -1 ? checked.splice(checked.indexOf(id), 1) : checked.push(id);
      },

      copySelected: (id) => {
        let params = {tm_id: id, prospect_ids: checked};
        http.post('/copy-contacts-to-tm', params: params)
      },

      removeSelected: () => {
        let self = this;
        let params = {tm_id: this.state.currentViewId, prospect_ids: checked};
        http.post('/remove-contacts-from-tm', params: params)
          .then(response => {
            self.getNewListView(self.state.currentViewId)
          })
      }
    }
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
          url:`https://api.legionanalytics.com/contacts/${list.id}?page_size=50`,
          headers: {"Authorization": tokenHeader },
          dataType:'json',
          crossDomain: true,
          cache:false,
          success:function(results){
            this.setState({
              results:results,
              loading: false,
              currentViewId: list.id
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
      url:`https://api.legionanalytics.com/contacts/${listID}?page_size=50`,
      headers: {"Authorization": tokenHeader },
      dataType:'json',
      crossDomain: true,
      cache:false,
      success:function(results){
        this.setState({
          results:results,
          loading: false,
          currentViewId: listID
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
            this.loadAvailableLists();
          },
          error: (response) => {
          }

        })
      }
    });
  }

  // SEARCH THE CURRENT LIST VIEW
  searchCurrentList = (query) => {
    this.setState({loading:true});

    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: `https://api.legionanalytics.com/contacts/${this.state.currentViewId}?page_size=1000&keyword=${query}`,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({
          results:response,
          loading: false
        });
      },
      error: (response) => {
      }

    })
  }

  //EXPORTS CSV TO BACKEND TO BEGIN MAPPING
  exportCSV = () => {
    let tokenHeader = `Token ${this.state.token}`;
    $.post({
      url: "https://api.legionanalytics.com/export-list",
      headers: {"Authorization": tokenHeader},
      data: {"id": this.state.currentViewId},
      success: (response) => {
      },
      error: (response) => {
      }
    })
  }

  //UPLOADS CSV TO BACKEND TO BEGIN MAPPING
  uploadCSV = (file, filename) => {
    let tokenHeader = `Token ${this.state.token}`;
    $.post({
      url: "https://api.legionanalytics.com/upload-document",
      headers: {"Authorization": tokenHeader, "Content-Disposition": `attachment; filename=${filename}`, "Content-Type": "text/csv"},
      data: file,
      processData: false,
      success: (response) => {
        this.setState({
          documentID: response.id,
          importedSample: response.results,
          mappedArray: new Array(response.results.length),
          mapFileName: filename
        })
      },
      error: (response) => {
      }
    })
  }

  mapCSV = () => {
    let tokenHeader = `Token ${this.state.token}`;


    $.post({
      url: "https://api.legionanalytics.com/update-document",
      headers: {"Authorization": tokenHeader},
      data: {document_id: this.state.documentID, document_head: this.state.mappedArray},
      success: (response) => {
      },
      error: (response) => {
      }
    })
  }

  // CAPTURE MAPPED COLUMNS
  handleCaptureColumn = (column, value) => {
    let mappedArray = this.state.mappedArray;
    mappedArray[column] = value;
    this.setState({mappedArray});
  }

  // TOGGLE FOR MAPPING NEW CSVS
  updateMappingStatus = () => {
    this.state.mapping ? this.setState({mapping: !this.state.mapping}) : this.setState({mapping: !this.state.mapping, mappedColumns: {}});
  }

  // FINDS THE NEW SELECTED LIST VIEW AND CALLS THE FN TO UPDATE THE VIEW
  changeListView = (selectedList) => {
    this.state.tmLists.forEach((list) => {
      if (list.name === selectedList) {
        this.getNewListView(list.id);
      }
    });
  }

  render() {
    let currentView;

    // TOGGLES VIEW BETWEEN MAPPING AND CONTACTS LISTS
    if (this.state.mapping) {
      currentView = (
        <div class="sixteen columns">
          <MapBar mapping={this.state.mapping} updateMappingStatus={this.updateMappingStatus} filename={this.state.mapFileName} mapCSV={this.mapCSV}/>
          <MapTable contacts={this.state.importedSample} handleCaptureColumn={this.handleCaptureColumn}/>
          <MapResults />
        </div>
      )
    } else {
      currentView = (
        <div class="sixteen columns">
          <ContactsBar resultsCount={this.state.results.count} lists={this.state.tmLists} onNewListView={this.changeListView} loadAvailableLists={this.loadAvailableLists} deleteCurrentList={this.deleteCurrentList} exportCSV={this.exportCSV} uploadCSV={this.uploadCSV} mapping={this.state.mapping} updateMappingStatus={this.updateMappingStatus} searchCurrentList={this.searchCurrentList}/>
            { this.state.loading ?
              <div class="sixteen columns"><div id="loaderContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding"><CubeGrid size={50} color="#36b7ea" /></div></div> :
              <ContactsTable results={this.state.results} />
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

Contacts.contextTypes = {
  http: PropTypes.func.isRequired
};
