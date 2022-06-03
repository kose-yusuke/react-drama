import React from 'react';
import './App.css';
import {Row} from './components/Row'
import {Nav} from './components/Nav'
import {Banner} from './components/Banner'
import {requests} from './utils/request'


const App=()=> {
  return (
    <div className="App">
    <Nav />
    <Banner />
    <Row
      title="NETFLIX ORIGINALS"
      fetchUrl={requests.reachNetflixOriginals}
      isLargeRow
    />
    <Row title="Top Rated" fetchUrl={requests.reactTopRated} />
    <Row title="Comedy Movies" fetchUrl={requests.reactComedyMovies} />
    <Row title="Romance Movies" fetchUrl={requests.reactRomanceMovies} />
    <Row title="Documentaries" fetchUrl={requests.reactDocumentMovies} />
    </div>
  );
}

export default App;
