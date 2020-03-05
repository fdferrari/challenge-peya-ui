import React from 'react';
import ReactDOM from 'react-dom';
import ChangeTimeCacheModal from '../ChangeTimeCacheModal/ChangeTimeCacheModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChangeTimeCacheModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
