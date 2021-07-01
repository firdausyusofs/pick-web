import {useEffect, useState} from "react"
import axios from "axios"
import moment from "moment"
import { Line } from 'react-chartjs-2';
import Calendar from 'react-calendar'

import "./styles/App.sass"

import {states} from "./states"

function App() {
  const [resObj, setResObj] = useState({
    date: null
  })

  const [activeDate, setActiveDate] = useState(null)

  const [graphData, setGraphData] = useState({
    total_cumulative: [],
    dose1_cumulative: []
  })

  const [graphLabel, setGraphLabel] = useState([])

  useEffect(() => {
    (async () => {
      const {data} = await axios.get("http://127.0.0.1:5000/api/v1/latest")
      setResObj(data)

      setActiveDate(moment(data.date).toDate());

      // alert(moment(data.date).toDate())

      setGraphData([])
      setGraphLabel([])
      const {data: allData} = await axios.get("http://127.0.0.1:5000/api/v1/all")
      var total_cumulative = []
      var dose1_cumulative = []
      var dose2_cumulative = []
      var total_daily = []
      var dose1_daily = []
      var dose2_daily = []
      allData.forEach(d => {
        total_cumulative.push(d['total_cumulative'])
        dose1_cumulative.push(d['dose1_cumulative'])
        dose2_cumulative.push(d['dose2_cumulative'])
        total_daily.push(d['total_daily'])
        dose1_daily.push(d['dose1_daily'])
        dose2_daily.push(d['dose2_daily'])
        setGraphLabel(state => ([...state, moment(d['date']).format('DD/MM/YYYY')]))
      })
      setGraphData({total_cumulative: total_cumulative, dose1_cumulative: dose1_cumulative, dose2_cumulative, total_daily, dose1_daily, dose2_daily})
    })()
  }, [])

  const formatNumber = x => {
    if (x === undefined) return x
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return x
  }

  const data = {
    labels: graphLabel,
    datasets: [
      {
        label: 'Total Cumulative',
        data: graphData.total_cumulative,
        pointRadius: 1,
        fill: false,
        backgroundColor: '#24d95a',
        borderColor: '#24d95a',
        tension: 0.4
      },
      {
        label: 'Dose 1 Cumulative',
        data: graphData.dose1_cumulative,
        pointRadius: 1,
        fill: false,
        backgroundColor: '#20b5fe',
        borderColor: "#20b5fe",
        tension: 0.4
      },
      {
        label: 'Dose 2 Cumulative',
        data: graphData.dose2_cumulative,
        radius: 1,
        pointRadius: 1,
        fill: false,
        backgroundColor: '#ff1f4a',
        borderColor: '#ff1f4a',
        tension: 0.4
      },
    ],
  };

  const data1 = {
    labels: graphLabel,
    datasets: [
      {
        label: 'Total Daily',
        data: graphData.total_daily,
        pointRadius: 1,
        fill: false,
        backgroundColor: '#24d95a',
        borderColor: '#24d95a',
        tension: 0.4
      },
      {
        label: 'Dose 1 Daily',
        data: graphData.dose1_daily,
        pointRadius: 1,
        fill: false,
        backgroundColor: '#20b5fe',
        borderColor: "#20b5fe",
        tension: 0.4
      },
      {
        label: 'Dose 2 Daily',
        data: graphData.dose2_daily,
        radius: 1,
        pointRadius: 1,
        fill: false,
        backgroundColor: '#ff1f4a',
        borderColor: '#ff1f4a',
        tension: 0.4
      },
    ],
  };

  const options = {
    bezierCurve: true,
    scales: {
      x: {
        ticks: {
          font: {
            weight: 'bold'
          },
          align: "center"
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            weight: 'bold'
          },
        }
      }
    },
  };  

  return (
    <div className="App">
      <div className="wrapper">
        <h2>Malaysia Vaccination Progress (MVP)</h2>
        <div className="container">
          <div className="left">
            <div className="latest-holder left-inner">
              <div className="title-holder">
                <h1>{moment().format('DD/MM/YYYY') == moment(resObj.date).format('DD/MM/YYYY') ? "Today" : "Latest"}</h1>
                <h4>{moment(resObj.date).format("dddd, Do MMMM YYYY")}</h4>
              </div>
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
                <div className="inner-grid">
                  <h2>Dose 1 %</h2>
                  <h1>{formatNumber(resObj.dose1_cumulative_percentage)||"-"}</h1>
                  <p>&nbsp;</p>
                </div>
                <div className="inner-grid inner-grid2">
                  <h2>Full Dose %</h2>
                  <h1>{formatNumber(resObj.dose2_cumulative_percentage)||"-"}</h1>
                  <p>80% to achieve herd immunity</p>
                </div>
              </div>
            </div>
            <div className="chart-holder left-inner">
              <h1>Total Doses Given</h1>
              <Line data={data} options={options} />
            </div>
            <div className="chart-holder left-inner">
              <h1>Daily Doses Given</h1>
              <Line data={data1} options={options} />
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
            <div className="calendar-holder">
              <Calendar value={activeDate} />
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
