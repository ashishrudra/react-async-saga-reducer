# react-async-saga-reducer
Use redux saga with React useReducer hook to handle side effects without Redux

### install
` npm i react-async-saga-reducer `

### dependencies
    1. React
    2. Redux-Saga

### usage
[DEMO](https://codesandbox.io/s/react-async-saga-reducer-gitch)

saga.js
```javascript
import { put, takeEvery, delay } from 'redux-saga/effects';

function* sagaWorker() {
    let countDown = 5;
    while(countDown > 0) {
        yield put({type: 'UPDATE_TIMER', value: countDown});
        yield delay(1000);
        countDown -= 1;
    }
    yield put({type: 'INCREMENT'});
}

export function* mySaga() {
    yield takeEvery('ASYNC_INCREMENT', sagaWorker);
}
```

reducer.js

```javascript
export function myReducer(state, action) {
    switch(action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 , timer: 0 }
        case 'UPDATE_TIMER':
            return { count: state.count, timer: action.value }
        default:
            return state
    }
}
```

app.js
```javascript
import React from 'react';
import { useAsyncSagaReducer } from 'react-async-saga-reducer';
import { myReducer } from './reducer';
import { mySaga } from './saga';

const initialState = { count: 0 , timer: 0 };

export function App() {
    const [ state, dispatch ] = useAsyncSagaReducer(myReducer, mySaga, initialState);

    return (
    <div className="App">
        <p>Count: {state.count}</p>
        <br/>
        <button onClick={() => dispatch({type: 'ASYNC_INCREMENT'})} disabled={state.timer > 0}>Increment after 5 second</button>
        {state.timer > 0 && <p>...please wait {state.timer} sec...</p>}
    </div>
    );
}
```

### TypeScript
Type annotations may be specified when calling useAsyncSagaReducer:

```javascript
import React from 'react';
import { useAsyncSagaReducer } from 'react-async-saga-reducer';
import { myReducer } from './reducer';
import { mySaga } from './saga';

// define type for State.
export interface StateInterface: {
    count: number;
    timer: number;
}

// define type for action
export interface Action<T> {
    type: string;
    payload?: T
}

export function App() {
    //specify types to gain intelligent code completion and TypeScript type checking.
    const [ state, dispatch ] = useAsyncSagaReducer<StateInterface, Action<Number>>(myReducer, mySaga, initialState);

    return (
        <div className="App">
            <p>Count: {state.count}</p>
            <br/>
            <button onClick={() => dispatch({type: 'ASYNC_INCREMENT'})} disabled={state.timer > 0}>Increment after 5 second</button>
            {state.timer > 0 && <p>...please wait {state.timer} sec...</p>}
        </div>
    );
}

```


