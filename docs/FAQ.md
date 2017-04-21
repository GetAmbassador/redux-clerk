## FAQ

### How can I extend the reducer provided by Redux Clerk?
If you need to handle additional updates to the raw/instance data it is possible to extend the provided reducer with [reduce-reducers](https://www.npmjs.com/package/reduce-reducers).

```
import reduceReducers from 'reduce-reducers'
import { selectors } from 'redux-clerk'

// Configure the Redux Clerk reducer normally
const reduxClerkReducer = reducer({
  actionPrefix: 'TODOS'
})

// Create a reducer to handle any additional actions
const myReducer = (state, action) => {
  case 'MY_OTHER_ACTION':
    return state.setIn(['raw', 123, 'name'], 'New Name')
  default: return state
}

const reducer = reduceReducers(reduxClerkReducer, myReducer)

export default reducer
```

If you need to make additional updates to the store before or after any of the CRUD actions, Redux Clerk will dispatch a pre/post action for each CRUD operation. You can add cases for these actions in your reducer and update the store as needed.

Below is a list of all additional actions that are dispatched. Each each will contain relevant data for the action type.

```
{prefix}_CREATE_PRE
{prefix}_CREATE_POST
{prefix}_CREATE_SUCCESS_PRE
{prefix}_CREATE_SUCCESS_POST
{prefix}_CREATE_ERROR_PRE
{prefix}_CREATE_ERROR_POST
{prefix}_FETCH_SUCCESS_PRE
{prefix}_FETCH_SUCCESS_POST
{prefix}_FETCH_ERROR_PRE
{prefix}_FETCH_ERROR_POST
{prefix}_UPDATE_PRE
{prefix}_UPDATE_POST
{prefix}_UPDATE_SUCCESS_PRE
{prefix}_UPDATE_SUCCESS_POST
{prefix}_UPDATE_ERROR_PRE
{prefix}_UPDATE_ERROR_POST
{prefix}_REMOVE_PRE
{prefix}_REMOVE_POST
{prefix}_REMOVE_SUCCESS_PRE
{prefix}_REMOVE_SUCCESS_POST
{prefix}_REMOVE_ERROR_PRE
{prefix}_REMOVE_ERROR_POST
```

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
  '11': { uid: 11, name: 'Test 1' },
  '22': { uid: 22, name: 'Test 2' },
  '33': { uid: 33, name: 'Test 3' }
}
```

### How do I maintain the sort order of the fetch response?
The fetch action creator requires a dataset key to be provided. Ex: `fetch('companyTypeahead')`

Redux-clerk will store an array of UIDs from the fetch response. Your state would then look like this:

```
{
  // Normalized source data
  raw: {
    '11': { uid: 11, name: 'Test 1' },
    '22': { uid: 22, name: 'Test 2' },
    '33': { uid: 33, name: 'Test 3' }
  },

  // companyTypeahead dataset
  companyTypeahead: ['22', '11', '33']
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
