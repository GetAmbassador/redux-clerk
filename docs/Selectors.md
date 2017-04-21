## Selectors
Once [configured](#configuration), Redux Clerk provides a set of selectors to easily access your data.

#### dataset(state, datasetKey)
The dataset selector recomputes the derived data for the specified dataset. The dataset selector does not include optimistic updates to the store.

###### state
The Redux state provided in `mapStateToProps`

Type: `object`

###### datasetKey
The name of the dataset that should be used for computing the derived data.

Type: `string` _(must be A-Za-z_0-9)_
Required: yes

#### datasetOptimistic(state, datasetKey)
Similar to the `dataset` selector but includes optimistic updates to the store.

###### state
The Redux state provided in `mapStateToProps`

Type: `object`

###### datasetKey
The name of the dataset that should be used for computing the derived data.

Type: `string` _(must be A-Za-z_0-9)_
Required: yes

#### datasetProperty(state, datasetKey, propertyKey)
The datasetProperty selector retrieves an individual property from an instance's additional data.

###### state
The Redux state provided in `mapStateToProps`

Type: `object`

###### datasetKey
The name of the dataset that should be used for computing the derived data.

Type: `string` _(must be A-Za-z_0-9)_
Required: yes

###### propertyKey
The name of the property that should be retrieved.

Type: `string` _(must be A-Za-z_0-9)_
Required: yes

#### record(state, uid)
The record selector retrieves an individual record by its uid. The record selector does not include optimistic update to the store.

###### state
The Redux state provided in `mapStateToProps`

Type: `object`

###### uid
The unique id for the record.

Type: `number` or `string`
Required: yes

#### recordOptimistic(state, uid)
Similar to the `record` selector but includes optimistic updates to the store.

###### state
The Redux state provided in `mapStateToProps`

Type: `object`

###### uid
The unique id for the record.

Type: `number` or `string`
Required: yes

### Configuration
```
import { selectors } from 'redux-clerk'

const todosSelectors = selectors({

  // Tell us where to find the base state for the related redux-clerk reducer.
  baseSelector: state => state.todos
})

export default todosSelectors
```
