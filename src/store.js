import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    )
);

export default store;

// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import rootReducer from './reducers/rootReducer';


// const store = createStore( rootReducer, {}, compose(thunk),
// applyMiddleware(thunk),
//     composeWithDevTools()
// );

// export default store;