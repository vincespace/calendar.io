import { Switch, Route } from 'react-router-dom';
import Home from '../Pages/Home/index';
import Create from '../Pages/Create/index';

const RouterComp = () => (
    <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/create" component={Create} />
    <Route path="/editEvent/:id" component={Create} />

  </Switch>
  )


export default RouterComp;