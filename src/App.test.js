import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';
import Footer from './components/Footer/Footer';

configure({adapter: new Adapter()});

describe("<App />", () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<App location={{pathname: ""}} onTryAutoSignup={() => {}} />);
    expect(wrapper.find(Footer)).toHaveLength(0);
  });

})