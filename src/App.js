import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Create from './components/create' 
import Notes from './components/notes'
import Home from './components/home'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/notes" component={Notes}/>
            <Route path="/create" component={Create} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
