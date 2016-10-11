# redux-clerk (WIP)

[![CircleCI](https://circleci.com/gh/GetAmbassador/redux-clerk.svg?style=svg&circle-token=a520f1c555abc4074f1801e49633e4244f9ce36d)](https://circleci.com/gh/GetAmbassador/redux-clerk)

Redux Clerk handles the async CRUD in your Redux App.

* Provides a set of action creators for both async and synchronous actions.
* Provides an extendable reducer.
* Handles derived datasets and provides selectors for computing derived data.
* Stores minimum possible state.

## Installation

`npm install redux-clerk`

## Usage

### Actions
Redux Clerk provides action creators for handling CRUD operations.

#### Provided Actions
* fetch
* insert
* update
* delete
* createDataset

```
import { actions } from 'redux-clerk'
import axios from 'axios'

const TodosActions = actions({
  actionPrefix: 'TODOS_',
  uidField: 'uid',
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
import { reducer } from 'redux-clerk'

const TodosReducer = reducer({
  actionPrefix: 'TODOS_',
  uidField: 'uid'
})

export default TodosReducer
```

### Selectors

#### Provided Selectors
* all

```
import { selectors } from 'redux-clerk'

const TodosSelectors = selectors({
  baseSelector: state => state.todos
})

export default TodosSelectors
```

## Running Tests
```
git clone git@github.com:GetAmbassador/redux-clerk.git
cd redux-clerk
npm install
npm test
```

## License
MIT
