import {useEffect, useState} from "react"
import axios from "axios"
import moment from "moment"

import "./styles/App.sass"

import {states} from "./states"

function App() {
  const [resObj, setResObj] = useState({
    date: null
  })

  useEffect(() => {
    (async () => {
      const {data} = await axios.get("http://localhost:5000/api/v1/latest")
      setResObj(data)
    })()
  }, [])

  const formatNumber = x => {
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return x
  }

  return (
    <div className="App">
      <div className="wrapper">
        <h2>Malaysia Vaccination Progress</h2>
        <div className="container">
          <div className="left">
            <h1>Today</h1>
            <div className="grid">
              <div className="inner-grid">
                <h2>Dose 1</h2>
                <h1>+ {formatNumber(resObj.dose1_daily)||"-"}</h1>
                <p>Total: <span>{formatNumber(resObj.dose1_cumulative)||"-"}</span></p>
              </div>
              <div className="inner-grid">
                <h2>Dose 2</h2>
                <h1>+ {formatNumber(resObj.dose2_daily)||"-"}</h1>
                <p>Total: <span>{formatNumber(resObj.dose2_cumulative)||"-"}</span></p>
              </div>
              <div className="inner-grid">
                <h2>Total</h2>
                <h1>+ {formatNumber(resObj.total_daily)||"-"}</h1>
                <p>Total: <span>{formatNumber(resObj.total_cumulative)||"-"}</span></p>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="states-holder">
              <h3>State</h3>
              <select name="" id="">
                <option value="">All States</option>
                {states.map((state, i) => (
                  <option key={i} value="">{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* <h1>Malaysia Vaccination Progress</h1>
      <div>
        <p>Date: {moment(resObj.date).format("dddd, Do MMMM YYYY")||"-"}</p>
        <p>Dose 1 Daily: {resObj.dose1_daily||"-"}</p>
        <p>Dose 2 Daily: {resObj.dose2_daily||"-"}</p>
        <p>Total Daily: {resObj.total_daily||"-"}</p>
        <p>Dose 1 Cumulative: {resObj.dose1_cumulative||"-"}</p>
        <p>Dose 2 Cumulative: {resObj.dose2_cumulative||"-"}</p>
        <p>Total Cumulative: {resObj.total_cumulative||"-"}</p>
      </div> */}
    </div>
  );
}

export default App;
