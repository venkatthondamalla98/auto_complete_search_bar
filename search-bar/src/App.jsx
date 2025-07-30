import { useState, useEffect } from 'react'
import './App.css'


function App() {

  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [cache, setCache] = useState({})

  const fetchData = async () => {
    if(cache[input]){
      console.log("cache data returned ", input)
      setCache(cache[input])
      return
    }
    let data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    let jsonData = await data.json()
    setResults(jsonData?.recipes)
    setCache((prev) => ({...prev, [input]:jsonData.recipes}))
  }

  useEffect(() => {
    const timer = setTimeout(fetchData, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <div>
      <h1>Auto complete search bar</h1>
      <div>
      <input type='text'
       className='input-field'
       value={input}
       onChange={(e) => setInput(e.target.value)}
       onFocus={() => setShowResults(true)}
       onBlur={() => setShowResults(false)}
       />
      {
        showResults && (
          <div className='results-container'>
        {
          results.map((res) => {
            // {console.log(res)}
            return (
              <span key={res.id} className='result'>
                {res.name}
              </span>
            )
          })
        }
      </div>
        )
      }
      </div>
    </div>
  )
}

export default App
