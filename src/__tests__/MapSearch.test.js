import React from 'react';
import ReactDOM from 'react-dom';
import MapSearch from '../MapSearch/MapSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapSearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
