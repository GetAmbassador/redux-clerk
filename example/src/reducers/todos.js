import { reducer } from '../../../lib'

const TodosReducer = reducer({
  actionPrefix: 'TODOS',
  uidField: 'id'
})

export default TodosReducer
