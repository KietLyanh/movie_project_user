import { Route, Routes } from 'react-router-dom'
import { HomeScreen } from './components/Home'
import { MovieListScreen } from './components/Movie'
import { SearchMultiScreen } from './components/Search'
import { MovieScreen } from './components/MovieDetail'
import { WatchMovie } from './components/Watch'
import Redirect from './components/redirect'
import { LoginPage } from './components/Auth'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/movie" element={<MovieListScreen />} />
      <Route path="/search" element={<SearchMultiScreen />} />
      <Route path="/movie/:id" element={<MovieScreen />} />
      <Route path="/watch/:id" element={<WatchMovie />} />
      <Route path="/redirect" element={<Redirect />} />
    </Routes>
  )
}

export default App
