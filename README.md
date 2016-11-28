# Redux Clerk

[![CircleCI](https://circleci.com/gh/GetAmbassador/redux-clerk.svg?style=svg&circle-token=a520f1c555abc4074f1801e49633e4244f9ce36d)](https://circleci.com/gh/GetAmbassador/redux-clerk)

Redux Clerk handles the async CRUD in your Redux App.

* Provides a set of action creators for both async and synchronous actions.
* Provides an extendable reducer.
* Handles derived datasets and provides selectors for computing derived data.
* Stores minimum possible state.
* Handles optimistic updates to the store.

## Installation

`npm install redux-clerk`

## Usage

### Action Creators
Redux Clerk provides action creators for handling CRUD operations.

```
import { actions } from 'redux-clerk'
import axios from 'axios'

const TodosActions = actions({
  actionPrefix: 'TODOS',
  uidField: 'id',
  fetcher: (params, handleSuccess, handleError) => {
    return axios.get('todos', { params })
    .then(response => handleSuccess(response.data))
    .catch(response => handleError(response.data))
  },
  creator: (data, handleSuccess, handleError) => {
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
    return axios.delete(`todos/${id}`, data)
    .then(response => handleSuccess())
    .catch(response => handleError(response.data))
  }
})

export default TodosActions
```

#### Provided Action Creators

##### fetch(datasetKey, params, options)
###### datasetKey
The name of the dataset where the fetched records should be applied.

Type: `string` _(must be A-Za-z_0-9)_    
Required: yes

###### params
The params to be passed to the fetcher.

Type: `object`

###### options
The options for the fetch action.

Type: `object`    
Available options:
* `appendResponse` - By default the dataset is replaced with the response data. Set this to `false` to have the response data appended.

##### create(datasetKey, record)
###### datasetKey
The name of the dataset where created record should be applied.

Type: `string` _(must be A-Za-z_0-9)_    
Required: yes

###### record
The record to be created. Must contain a temporary UID in the configured `uidField`.

Type: `object`    
Required: yes

##### update(record)
###### record
The record to be updated. Must contain the UID to be updated in the configured `uidField`.

Type: `object`    
Required: yes

##### delete(datasetKey, uid)
###### datasetKey
The name of the dataset where deletion should be applied.

Type: `string` _(must be A-Za-z_0-9)_    
Required: yes

###### uid
The UID of the record to be deleted.

Type: `number`    
Required: yes

##### createDataset(datasetKey)
###### datasetKey
The name of the dataset to be created.

Type: `string` _(must be A-Za-z_0-9)_    
Required: yes

### Reducer
The reducer will handle all actions dispatched by the action creators noted above.

```
import { reducer } from 'redux-clerk'

const TodosReducer = reducer({
  actionPrefix: 'TODOS',
  uidField: 'id'
})

export default TodosReducer
```

### Selectors

#### Provided Selectors
* dataset

```
import { selectors } from 'redux-clerk'

const TodosSelectors = selectors({

  // Tell us where to find the base state for the related redux-clerk reducer.
  baseSelector: state => state.todos
})

export default TodosSelectors
```

## Normalization and Derived Datasets
In order to maintain minimum possible state redux-clerk will normalize the data returned from the fetcher and allow subsets of that data to be created.

### How does redux-clerk know how to normalize my data?
Redux-clerk builds key/value pairs using the configured `uidField` as the key and the data object as the value.

For example, your fetch response may be an array in the following format:
```
[
  { uid: 11, name: 'Test 1' },
  { uid: 22, name: 'Test 2' },
  { uid: 33, name: 'Test 3' }
]
```

The array will be normalized into the following format:
```
{
  11: { uid: 11, name: 'Test 1' },
  22: { uid: 22, name: 'Test 2' },
  33: { uid: 33, name: 'Test 3' }
}
```

### How do I maintain the sort order of the fetch response?
The fetch action creator requires a dataset key to be provided. Ex: `fetch('companyTypeahead')`

Redux-clerk will store an array of UIDs from the fetch response. Your state would then look like this:

```
{
  // Normalized source data
  raw: {
    11: { uid: 11, name: 'Test 1' },
    22: { uid: 22, name: 'Test 2' },
    33: { uid: 33, name: 'Test 3' }
  },

  // companyTypeahead dataset
  companyTypeahead: [22,11,33]
}
```

### How do I recompute the derived companyTypeahead dataset?
Redux-clerk provides a selector which will provide the computed data.

For example the TodosSelectors above will provide a `dataset` selector which takes a dataset key and returns the computed data.
```
mapStateToProps = state => {
  return {
    companyTypeaheadData: dataset(state, 'companyTypeahead')
  }
}

// props.companyTypeaheadData will then be set to:
[
  { uid: 22, name: 'Test 2' },
  { uid: 11, name: 'Test 1' },
  { uid: 33, name: 'Test 3' }
]

```

## Running Tests
```
git clone git@github.com:GetAmbassador/redux-clerk.git
cd redux-clerk
npm install
npm test
```

## Example
An example TodoMVC using Redux Clerk is available in the `example` directory. To run the example:

```
git clone git@github.com:GetAmbassador/redux-clerk.git
cd redux-clerk
npm install
npm run build
cd example
npm install react-scripts -g
npm install
npm start
```

## License
MIT
