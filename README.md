# redux-clerk

Redux Clerk handles the async CRUD in your Redux App.

## Installation

`npm install redux-clerk`

## Configuration

### Actions
Redux Clerk provides action creators for handling CRUD operations.

#### Provided Actions
* fetch
* insert
* update
* delete
* createDataset

```
import { DataManagerActions } from 'DataManager'
import axios from 'axios'

const TodosActions = new DataManagerActions({
  eventPrefix: 'TODOS_',
  uid: 'uid',
  fetcher: (params, handleSuccess, handleError) => {
    return axios.get('todos', { params })
    .then(response => handleSuccess(response.data))
    .catch(response => handleError(response.data))
  },
  inserter: (data, handleSuccess, handleError) => {
    return axios.post('todos', data)
    .then(response => handleSuccess(response.data))
    .catch(response => handleError(response.data))
  },
  updater: (data, handleSuccess, handleError) => {
    return axios.patch(`todos/${data.id}`, data)
    .then(response => handleSuccess(response.data))
    .catch(response => handleError(response.data))
  },
  deleter: (id, handleSuccess, handleError) => {
    return axios.delete(`todos/${data.id}`, data)
    .then(response => handleSuccess(response.data))
    .catch(response => handleError(response.data))
  }
})

export default TodosActions
```

### Reducer

```
import { DataManagerReducer } from 'DataManager'

const TodosReducer = new DataManagerReducer({
  eventPrefix: 'TODOS_'
})

export default TodosReducer
```

### Selectors

#### Provided Selectors
* all

```
import { DataManagerSelectors } from 'DataManager'

const TodosSelectors = new DataManagerSelectors({
  baseSelector: state => state.todos
})

export default TodosSelectors
```
