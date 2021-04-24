import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Create from './components/create' 
import Notes from './components/notes'
import Home from './components/home'
import Diary from './components/diary'

function App() {
  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/notes" component={Notes} />
            <Route path="/create" component={Create} />
            <Route path="/diary" component={Diary} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
