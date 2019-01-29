## Action Creators
Once [configured](#configuration), Redux Clerk provides a set of action creators for handling CRUD operations.

#### create(datasetKey, record)
###### datasetKey
The name of the dataset where created record should be applied.

Type: `string` _(must be A-Za-z_0-9)_  
Required: yes

###### record
The record to be created. Must contain a temporary UID in the configured `uidField`.

Type: `object`  
Required: yes

#### fetch(datasetKey, params, options)
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

#### update(record)
###### record
The record to be updated. Must contain the UID to be updated in the configured `uidField`.

Type: `object`  
Required: yes

#### remove(uid)
###### uid
The UID of the record to be removed.

Type: `number`  
Required: yes

### Configuration
```
import { actions } from 'redux-clerk'
import axios from 'axios'

const todosActions = actions({
  actionPrefix: 'TODOS',
  uidField: 'id',
  fetcher: (params, handleSuccess, handleError) => {
    return axios.get('todos', { params })
    .then(response => handleSuccess(response.data))
    .catch(response => handleError())
  },
  creator: (data, handleSuccess, handleError) => {
    return axios.post('todos', data)
    .then(response => handleSuccess(response.data))
    .catch(response => handleError())
  },
  updater: (data, handleSuccess, handleError) => {
    return axios.patch(`todos/${data.id}`, data)
    .then(response => handleSuccess(response.data))
    .catch(response => handleError())
  },
  remover: (id, handleSuccess, handleError) => {
    return axios.delete(`todos/${id}`)
    .then(response => handleSuccess())
    .catch(response => handleError())
  }
})

export default todosActions
```

#### Configuration Options

###### actionPrefix
Prefix for all dispatched actions.

Type: `string` _(must be A-Za-z_0-9)_  
Required: yes

###### uidField
Name of property where the record's unique identifier can be found.

Type: `string` _(must be A-Za-z_0-9)_  
Required: yes

###### fetcher
Used for making async request when fetch action is called. The `fetcher` will be provided three args: `params`, `handleSuccess`, and  `handleError`.

Type: `function`  
Required: no  
Provided Args:  
  - `params` - params provided when the `fetch` action is called
  - `handleSuccess` - function to call when async request is complete. Array of fetched items should be passed as the first argument. A single object is also acceptable.
  - `handleError` - function to call when async request fails.

###### creator
Used for making async request when create action is called. The `creator` will be provided three args: `record`, `handleSuccess`, and  `handleError`.

Type: `function`  
Required: no  
Provided Args:  
  - `record` - the newly created record.
  - `handleSuccess` - function to call when async request is complete. Saved record can be optionally passed as the first argument while calling `handleSuccess`.
  - `handleError` - function to call when async request fails.

###### updater
Used for making async request when update action is called. The `updater` will be provided three args: `record`, `handleSuccess`, and  `handleError`.

Type: `function`  
Required: no  
Provided Args:  
  - `record` - the updated record.
  - `handleSuccess` - function to call when async request is complete. Saved record can be optionally passed as the first argument while calling `handleSuccess`.
  - `handleError` - function to call when async request fails.

###### remover
Used for making async request when remove action is called. The `remover` will be provided three args: `id`, `handleSuccess`, and  `handleError`.

Type: `function`  
Required: no  
Provided Args:
  - `id` - the id of the record to be removed.
  - `handleSuccess` - function to call when async request is complete.
  - `handleError` - function to call when async request fails.
