import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import About from './containers/About';
function App() {
  return (
    <BrowserRouter >
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/About" component={About} />              
    </Switch>
  </BrowserRouter>
  );
}

export default App;
