import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              {/* Link to be changed once pages are created*/}
              <Link to="/">Shopping List</Link>
            </li>
            <li>
              <Link to="/">Add Item</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <ShoppingList />
          </Route>
          <Route path="/">
            <AddItem />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function ShoppingList() {
  return <h2>Shopping List</h2>;
}

function AddItem() {
  return <h2>Add Item</h2>;
}
