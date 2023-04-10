import "./SearchPage.css";
import React, { useEffect, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table'
import TopNav from "./Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from 'react-bootstrap/Spinner';
//import Sidebar from "./Sidebar";

let baseURL = "http://localhost:8080/data?";
let reactURL = "?";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();
  const [data, setData] = useState(null);


  const nameFilterRef = useRef([]);
  const locationFilterRef = useRef([]);
  const capacityFilterRef = useRef([]);

  function setSearchTerms(value){

    if (baseURL.indexOf("search_query=") !== -1) {
        const st="search_query"+"="+value

        // update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        // update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        baseURL=updatedBaseURL
        reactURL=updatedReactURL

        setSearchTerm(value);
      } else {
        baseURL=baseURL+"&"+"search_query"+"="+value;
        reactURL=reactURL+"&"+"search_query"+"="+value;
        setSearchTerm(value);
      }

      navigate(reactURL)
      
  }

  function setnameFilters(event){

      const value=event.target.value;
      const checked=event.target.checked;
    
      if (checked) {
        nameFilterRef.current = [...nameFilterRef.current, value];
      } else {
        nameFilterRef.current = nameFilterRef.current.filter((option) => option !== value);
      }

      
      if (baseURL.indexOf("name=") !== -1) {

        const st="name"+"="+nameFilterRef.current

        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"name="}[^&]*`),
          st
        );

        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"name="}[^&]*`),
          st
        );
        
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {

        // backend URL
        baseURL=baseURL+"&"+"name"+"="+nameFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"name"+"="+nameFilterRef.current;
      }
  
    navigate(reactURL)

  }

  function setLocationFilters(event){

    const value=event.target.value;
      const checked=event.target.checked;
    
      if (checked) {
        locationFilterRef.current = [...locationFilterRef.current, value];
      } else {
        locationFilterRef.current = locationFilterRef.current.filter((option) => option !== value);
      }

      
      if (baseURL.indexOf("location=") !== -1) {

        const st="location"+"="+locationFilterRef.current

        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"location="}[^&]*`),
          st
        );

        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"location="}[^&]*`),
          st
        );
        
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {

        // backend URL
        baseURL=baseURL+"&"+"location"+"="+locationFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"location"+"="+locationFilterRef.current;
      }
  
    navigate(reactURL)
  }

  function setcapacityFilters(event){
    const value=event.target.value;
      const checked=event.target.checked;
    
      if (checked) {
        capacityFilterRef.current = [...capacityFilterRef.current, value];
      } else {
        capacityFilterRef.current = capacityFilterRef.current.filter((option) => option !== value);
      }

      
      if (baseURL.indexOf("capacity=") !== -1) {

        const st="capacity"+"="+capacityFilterRef.current

        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"capacity="}[^&]*`),
          st
        );

        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"capacity="}[^&]*`),
          st
        );
        
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {

        // backend URL
        baseURL=baseURL+"&"+"capacity"+"="+capacityFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"capacity"+"="+capacityFilterRef.current;
      }
  
    navigate(reactURL)
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function setSearchTerms(value){

    if (baseURL.indexOf("search_query=") !== -1) {
        const st="search_query"+"="+value

        // update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        // update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        baseURL=updatedBaseURL
        reactURL=updatedReactURL

        setSearchTerm(value);
      } else {
        baseURL=baseURL+"&"+"search_query"+"="+value;
        reactURL=reactURL+"&"+"search_query"+"="+value;
        setSearchTerm(value);
      }

      navigate(reactURL)
      
  }

  useEffect(() => {
    axios.get(baseURL)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.data;
        } else {
          throw new Error("Server responded with an error status: " + res.status);
        }
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(handleError);
  }, [nameFilterRef.current,locationFilterRef.current,capacityFilterRef.current,searchTerm]);

  function handleError(error) {
    console.error("Axios error:", error);
    // handle the error here, e.g. show an error message to the user
  }

  if (!data) return <div>Loading...</div>;

  return (
  <div className="bag">
      <TopNav/>
      
    <div>
      <Row>
      <div className="searchbox">        
        <input 
          //style={{backgroundColor: 'white', width: '100%', height: '50px'}}
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerms(event.target.value)}
        />
        <div>
          <button onClick={toggleSidebar} className='btn-search' >Filters</button>
        </div>        
      </div>  
      </Row>
      <Row>
      <Col className="col-md-2">
      <div className="sidebar-container">
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        
          <div class="checkbox-container" style={{ display: 'flex', flexDirection: 'column' }}>
            <label class="checkbox-label">
              <input type="checkbox" value="tennis" onChange={(event) => setnameFilters(event)} />
                <span class="checkmark">Tennis</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="badminton" onChange={(event) => setnameFilters(event)} />
                  <span class="checkmark">Badminton</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="football" onChange={(event) => setnameFilters(event)} />
                <span class="checkmark">Football</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="basketball" onChange={(event) => setnameFilters(event)} />
                <span class="checkmark">Basketball </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="table tennis" onChange={(event) => setnameFilters(event)} />
                <span class="checkmark">Table Tennis </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="volleyball" onChange={(event) => setnameFilters(event)} />
                <span class="checkmark">Volleyball </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="squash" onChange={(event) => setnameFilters(event)} />
                <span class="checkmark">Squash</span> 
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label class="checkbox-label">
              <input type="checkbox" value="srsc" onChange={(event) => setLocationFilters(event)} />
              <span class="checkmark">SRSC </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="north" onChange={(event) => setLocationFilters(event)} />
              <span class="checkmark">North </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="south" onChange={(event) => setLocationFilters(event)} />
              <span class="checkmark">South </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="east" onChange={(event) => setLocationFilters(event)} />
              <span class="checkmark">East </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="west" onChange={(event) => setLocationFilters(event)} />
              <span class="checkmark">West </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="downtown" onChange={(event) => setLocationFilters(event)} />
              <span class="checkmark">Downtown </span>
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label class="checkbox-label">
              <input type="checkbox" value="4" onChange={(event) => setcapacityFilters(event)} />
              <span class="checkmark">4</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="6" onChange={(event) => setcapacityFilters(event)} />
              <span class="checkmark">6</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="7" onChange={(event) => setcapacityFilters(event)} />
              <span class="checkmark">7</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="8" onChange={(event) => setcapacityFilters(event)} />
              <span class="checkmark">8</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="10" onChange={(event) => setcapacityFilters(event)} />
              <span class="checkmark">10</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="30" onChange={(event) => setcapacityFilters(event)} />
              <span class="checkmark">30</span>
            </label>
          </div>
        
        </div>        
      </div>
      </Col>
    <Col classname="col-md-8">
    <div className="filter-container">
      <h2 style={{color:'white'}}>Results</h2>
        <Table striped="columns">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((json) => (
              <tr key={json._id}>
                <td style={{color:'black'}}>{json.name}</td>
                <td style={{color:'black'}}>{json.location}</td>
                <td style={{color:'black'}}>{json.capacity}</td>
              </tr>
              ))) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </tbody>      
        </Table>
    </div>
    </Col>
    <Col className="col-md-2"></Col>
    </Row>
    </div>
  </div>
  );
}

export default App;
