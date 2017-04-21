## Reducer
The reducer will handle all actions dispatched by the [action creators](ActionsCreators.md).

### Configuration
```
import { reducer } from 'redux-clerk'

const todos = reducer({
  actionPrefix: 'TODOS'
})

export default todos
```

### Usage
Once the reducer is configured, it will need added to the root reducer.

```
import todos from './reducers/todos'

const rootReducer = combineReducers({
  ...
  todos
  ...
})

export default rootReducer
```
