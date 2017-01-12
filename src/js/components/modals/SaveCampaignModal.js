import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class SaveCampaignModal extends React.Component {
  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="thirteen columns text-center smallModal">
        		<h1 class="modalTitle gray">Saved!</h1>
        		<h5>Just some final adjustments...</h5>
        		<form>
	        		<div class="gray inlineFlex">
	        			<div class="preText">Start this campaign on</div>
	        			<input type="text" placeholder="MM/DD/YYYY" class="datePicker inline-block"></input> 
	        			at
	        			<Input type='select' name="whatHour" id="hour" onChange={this.handleSelected}>
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
			            <Input type='select' name="whatMinute" id="minute" onChange={this.handleSelected}>
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
			            <Input type='select' name="amOrPm" id="meridian" onChange={this.handleSelected}>
			                <option value="am">AM</option>
			                <option value="pm">PM</option>
			            </Input>
	        		</div>
	        		<div class="gray inlineFlex bigger">Send this campaign to 
	        			<Input type='select' name="chooseList" onChange={this.handleSelected}>
			                <option value="">Choose List</option>
			                <option value="13">My first List</option>
			                <option value="1234">Other List</option>
			            </Input>
	        		</div>
	        		<div class="gray inlineFlex bigger">Name this campaign 
	        			<Input type='text' name="createName" placeholder="My Campaign" onChange={this.handleSelected}>
			            </Input>
	        		</div>
	        		<div class="advancedSettingsBtn"><small class="text-center"><a class="active">Advanced Settings</a></small></div>


			        <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Save & Schedule</div>
		        </form>
        	</div>
        </div>
    )
  }
}
