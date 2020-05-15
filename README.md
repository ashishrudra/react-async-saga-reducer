# react-async-saga-reducer
Use redux saga with React useReducer hook to handle side effects without Redux

### install
` npm i react-async-saga-reducer `

### dependencies
    1. React
    2. Redux-Saga

### usage

saga.ts

    import { put } from 'redux-saga/effects';

    export function* mySaga() {
        // do something async
        yield put({ type: 'Action1'});
    }

reducer.ts

    export function myReducer(prevState, action) {
        switch (action.type) {
          case 'ACTION1':
            return prevState + 1
          case 'ACTION2':
            return prevState - 1
          default:
            return prevState
        }
    }

component.tsx

     import * as React from 'react';
     import { useAsyncSagaReducer } from 'react-async-saga-reducer';
     import { mySaga } from './mySaga';
     import { myReducer } from './myReducer';

     const initialState = { foo: 'init' };

      export const MyComponent = () => {
        const [state, ] = useAsyncSagaReducer(myReducer, mySaga, initialState);

        return (<p className="current-state">{state.foo}</p>);
      };

