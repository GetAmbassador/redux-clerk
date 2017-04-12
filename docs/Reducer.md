## Reducer
The reducer will handle all actions dispatched by the action creators noted above.

### Configuration
```
import { reducer } from 'redux-clerk'

const todos = reducer({
  actionPrefix: 'TODOS'
})

export default todos
```

### Usage
Once the reducer is configure, it will need added to the root reducer.

```
import todos from './reducers/todos'

const rootReducer = combineReducers({
  ...
  todos
  ...
})

export default rootReducer
```
