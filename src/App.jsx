import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import MovieList from './Components/MovieList'
import Movie from './Components/Movie'


const App = () => {
  return (
    <div className='App'> 
    <Router>
    <Header/>
      <Routes>
        <Route index element = {<Home />}></Route>
        <Route path='movie/:id' element = {<Movie /> } />
        <Route path='movies/:type' element = {<MovieList /> } />
        <Route path='/*' element = {<h1>Error</h1>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App 