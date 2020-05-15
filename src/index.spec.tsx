import * as React from 'react';
import 'jest';
import { shallow } from 'enzyme';
import { useAsyncSagaReducer } from './';

describe('useAsyncSagaReducer', () => {
  it('initializes reducer with initial state and returns current state', () => {
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    const initialState = { foo: 'baz' };
    const fooReducer = jest.fn((state, action) => state);

    function* fooSaga() {
        yield true;
    }

    const TestReactComponent = () => {
      const [state, ] = useAsyncSagaReducer(fooReducer, fooSaga, initialState);

      return (<p className="current-state">{state.foo}</p>);
    };

    const wrapper = shallow(<TestReactComponent />);

    expect(useReducerSpy).toHaveBeenCalledWith(fooReducer, initialState);

    const text = wrapper.find('.current-state').text();
    expect(text).toEqual('baz');
  });
});
