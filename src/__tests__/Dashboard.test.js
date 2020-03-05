import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../Dashboard/Dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  //const user = {"id":123,"lastName":"test","name":"test","country":{"id":5}}
  //ReactDOM.render(<Dashboard location={{search:'?lat=10&lng=10'}} user={user}/>, div);
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
