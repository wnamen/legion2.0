import React, { PropTypes, Component, Children } from 'react';
import { Input } from 'react-materialize'
import cookie from "react-cookie";

class SaveCampaignModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      campaignDetails: {
        credential_id: "",
        name: "",
        only_business_days: true,
        target_market_id: "",
        offset: ((new Date()).getTimezoneOffset()/-60),
      },
      date: {
        format: "",
        hour: "1",
        minute: "00",
        meridiem: "am"
      }
    }

    this.handleSelected = this.handleSelected.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.triggerModalClose = this.triggerModalClose.bind(this);
    this.dateAnalyzer = this.dateAnalyzer.bind(this);
    this.handleCampaignUpdate = this.handleCampaignUpdate.bind(this);

    this.loadLists = this.loadLists.bind(this);
    this.loadEmails = this.loadEmails.bind(this);
    this.setCurrentDate = this.setCurrentDate.bind(this);
  }

  // INITIAL DATA CALLS
  componentWillMount = () => {
    this.loadLists();
    this.loadEmails();
  };

  // UPDATES THE COMPONENTS WITH THE CAMPAIGNS CURRENT DATA
  componentWillReceiveProps = () => {
    let data = this.props.currentView;

    if (data !== undefined){
      this.setState({
        campaignDetails: {
          credential_id: data.credential_id,
          name: data.name,
          only_business_days: !data.only_business_days,
          target_market_id: data.target_market_id
        },
        date: {
          format: data.year ? `${data.month}/${data.day}/${data.year}` : this.setCurrentDate(),
          hour: (data.hour % 12) || this.state.date.hour,
          minute: (data.minute) || this.state.date.minute,
          merdiem: data.hour > 12 ? "pm" : "am"
        }
      })
    }
  }

  // LOADS THE USERS AVAILABLE CREDENTIALS
  loadEmails = () => {
    this.context.http.get('me', {
      headers: {
        'Authorization': `Token ${cookie.load('token')}`
      }
    }).then(response =>
      this.setState({
        emails: response.data.emails,
        credential_id: response.data.emails[0].id
      })
    );
  }

  // LOADS THE USERS AVAILABLE LISTS
  loadLists = () => {
    $.get({
      url: "https://api.legionanalytics.com/tm-list/?page_size=1000",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": `Token ${cookie.load("token")}` },
      success: (response) => {
        this.setState({
          tmLists:response.results,
          target_market_id: response.results[0].id
        })
      }
    });
  }

  // CLOSES THE MODAL
  triggerModalClose = () => {
    this.props.handleModalClose();
  };

  // SETS THE CURRENT DATE IF NONE ARE AVAILABLE
  setCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1
    let yyyy = today.getFullYear();

    dd < 10 ? dd = `0${dd}` : dd = dd;
    mm < 10 ? mm = `0${mm}` : mm = mm;

    return `${mm}/${dd}/${yyyy}`
  }

  // CAPTURES DATE DATA CHANGES
	handleDate = (e) => {
    let dateDetails = this.state.date;
    dateDetails[e.target.name] = e.target.value;
    this.setState(dateDetails);
	}

  // CAPTURES CHECK CHANGES
  handleChecked = (e) => {
    let campaignDetails = this.state.campaignDetails;
    campaignDetails[e.target.name] = !this.state.campaignDetails.only_business_days;
    this.setState({campaignDetails})
  }

  // CAPTURES CAMPAIGN DETAIL CHANGES
	handleSelected = (e) => {
    let campaignDetails = this.state.campaignDetails;
    campaignDetails[e.target.name] = e.target.value;
    this.setState(campaignDetails);
	}

  // HANDLES THE CAMPAIGN UPDATE
  handleCampaignUpdate = (e) => {
    e.preventDefault();
    if (this.validateDate(this.state.date.format)) {
      let date_started = this.dateAnalyzer()
      let campaignDetails = this.state.campaignDetails;
      campaignDetails.date_started = date_started;
      this.props.handleCampaignUpdate(campaignDetails)
      this.triggerModalClose();
    }
  }

  // PARSES THE DATE AND SETS IT TO PROPER FORMAT FOR UPDATES
  dateAnalyzer = () => {
    let date = this.state.date;
    let meridiem = date.meridiem === "am" ? 0 : 12;
    let formatArray = date.format.split("/");
    let formated = `${formatArray[2]}-${formatArray[0]}-${formatArray[1]}`
    let date_started = `${formated}T${parseInt(date.hour) + meridiem}:${date.minute}:00Z`
    return date_started;
  }

  // INSURES A PROPER DATE IS SET
  validateDate = (testdate) => {
    let date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return date_regex.test(testdate);
  }

  render() {

    return (
        <div class="sixteen modalContainer">
         	<div class="thirteen columns text-center smallModal">
        		<h1 class="modalTitle gray">Saved!</h1>
        		<h5>Just some final adjustments...</h5>
        		<form>
	        		<div class="gray inlineFlex">
	        			<div class="preText">Start this campaign on</div>
	        			<input type="text" name="format" placeholder="MM/DD/YYYY" class="datePicker inline-block" value={this.state.date.format} onChange={this.handleDate} />
	        			at
	        			<Input type='select' name="hour" id="hour" value={this.state.date.hour} onChange={this.handleDate}>
			                <option value="1">1</option>
			                <option value="2">2</option>
			                <option value="3">3</option>
			                <option value="4">4</option>
			                <option value="5">5</option>
			                <option value="6">6</option>
			                <option value="7">7</option>
			                <option value="8">8</option>
			                <option value="9">9</option>
			                <option value="10">10</option>
			                <option value="11">11</option>
			                <option value="12">12</option>
			            </Input>
			            <Input type='select' name="minute" id="minute" value={this.state.date.minute} onChange={this.handleDate}>
			                <option value="00">00</option>
			                <option value="01">01</option>
			                <option value="02">02</option>
			                <option value="03">03</option>
			                <option value="04">04</option>
			                <option value="05">05</option>
			                <option value="06">06</option>
			                <option value="07">07</option>
			                <option value="08">08</option>
			                <option value="09">09</option>
			                <option value="10">10</option>
			                <option value="11">11</option>
			                <option value="12">12</option>
			                <option value="13">13</option>
			                <option value="14">14</option>
			                <option value="15">15</option>
			                <option value="16">16</option>
			                <option value="17">17</option>
			                <option value="18">18</option>
			                <option value="19">19</option>
			                <option value="20">20</option>
			                <option value="21">21</option>
			                <option value="22">22</option>
			                <option value="23">23</option>
			                <option value="24">24</option>
			                <option value="25">25</option>
			                <option value="26">26</option>
			                <option value="27">27</option>
			                <option value="28">28</option>
			                <option value="29">29</option>
			                <option value="30">30</option>
			                <option value="31">31</option>
			                <option value="32">32</option>
			                <option value="33">33</option>
			                <option value="34">34</option>
			                <option value="35">35</option>
			                <option value="36">36</option>
			                <option value="37">37</option>
			                <option value="38">38</option>
			                <option value="39">39</option>
			                <option value="40">40</option>
			                <option value="41">41</option>
			                <option value="42">42</option>
			                <option value="43">43</option>
			                <option value="44">44</option>
			                <option value="45">45</option>
			                <option value="46">46</option>
			                <option value="47">47</option>
			                <option value="48">48</option>
			                <option value="49">49</option>
			                <option value="50">50</option>
			                <option value="51">51</option>
			                <option value="52">52</option>
			                <option value="53">53</option>
			                <option value="54">54</option>
			                <option value="55">55</option>
			                <option value="56">56</option>
			                <option value="57">57</option>
			                <option value="58">58</option>
			                <option value="59">59</option>
			            </Input>
			            <Input type='select' name="meridiem" id="meridiem" value={this.state.date.meridiem} onChange={this.handleDate}>
			                <option value="am">AM</option>
			                <option value="pm">PM</option>
			            </Input>
	        		</div>
	        		<div class="gray inlineFlex bigger">Send this campaign to
	        			<Input type='select' name="target_market_id" value={this.state.campaignDetails.target_market_id} onChange={this.handleSelected}>
			                <option value="">Choose List</option>
                      { this.state.tmLists ? this.state.tmLists.map(list =>
                          <option key={list.id} value={list.id}>
                            { list.name }
                          </option>) : <option>No Lists Connected</option>
                           }
			            </Input>
	        		</div>
	        		<div class="gray inlineFlex bigger">Name this campaign
	        			<Input type='text' name="name" placeholder="My Campaign" value={this.state.campaignDetails.name} onChange={this.handleSelected} />
	        		</div>
	        		<div class="gray inlineFlex bigger topMargin1em">
	        			Send this campaign on Saturday & Sunday
		        		<Input class="medium-left-margin" name='only_business_days' type='checkbox' label=" " value={this.state.campaignDetails.only_business_days} onChange={this.handleChecked} />
		        	</div>
	        		<div class="gray inlineFlex bigger whatEmailSend topMargin1em">Send with
                  <Input type='select' name="credential_id" id="chooseEmail" value={this.state.campaignDetails.credential_id} onChange={this.handleSelected} >
                    { this.state.emails ? this.state.emails.map(email =>
                        <option key={email.id} value={email.id}>
                          { email.credential_handle }
                        </option>) :
                        <option>No Emails Connected</option> }
                  </Input>
	        		</div>
			        <button type="submit" onClick={this.handleCampaignUpdate} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Save & Schedule</button>
		        </form>
        	</div>
        </div>
    )
  }
}

export default SaveCampaignModal;

SaveCampaignModal.contextTypes = {
  http: PropTypes.func.isRequired
};
