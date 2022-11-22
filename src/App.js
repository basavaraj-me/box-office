import React from "react";
import {Switch, Route} from 'react-router';
import Starred from "./pages/Starred";
import Home from "./pages/Home";
import Show from "./pages/Show";

function App() {
  return <div>
    
    <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/starred">
      <Starred />
    </Route>
    <Route exact path="/show/:id">
      <Show />
    </Route>
    <Route>This is 404 page</Route>
  </Switch>
  </div>
}

export default App;
