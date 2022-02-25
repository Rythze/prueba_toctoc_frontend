import { useEffect } from "react";
import { useState } from "react";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

function App() {

  const [data, setData] = useState({});

  const [memoryData, setMemoryData] = useState([]);

  const [memoryDate, setMemoryDate] = useState([]);

  useEffect(() => {
    if (data.message === 'success') {
      const memoryArr = data.data.map(memoria => ((memoria.memory / 1024) / 1024) / 1024)
      const dateArr = data.data.map(fecha => new Date(fecha.datetime).getHours() + ':' + new Date(fecha.datetime).getMinutes())
      setMemoryData(memoryArr)
      setMemoryDate(dateArr)
    }

  }, [data])

  const fetchData = async () => {
    const data = await fetch('http://localhost:8000/resource/data')
      .then(resultado => resultado.json())
      .then(resultado => setData(resultado))
  }

  const estoyCambiando = (event) => {
    console.log(event)
  }

  useEffect(() => {
    setInterval(() => {
      console.log("ejecucion")
      fetchData()
        .catch(console.error)
    }, 5000);
  }, [])
  return (
    <div className="App">
      <Bar
        datasetIdKey='id'
        data={{
          labels: memoryDate,
          datasets: [
            {
              id: 1,
              label: '',
              data: memoryData,
              backgroundColor: '#36a2eb'
            }
          ],
        }}
      />
    </div>
  );
}

export default App;
