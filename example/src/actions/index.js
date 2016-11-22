import Immutable from 'immutable'
import { actions } from '../../../lib'

const TodosActions = actions({
  actionPrefix: 'TODOS',
  uidField: 'id'
})

TodosActions.addTodo = TodosActions.create.bind(null, 'todos')
TodosActions.editTodo = TodosActions.update
TodosActions.deleteTodo = TodosActions.delete.bind(null, 'todos')
TodosActions.completeTodo = (id) => {
  return TodosActions.update(Immutable.fromJS({ id, completed: true }))
}

export default TodosActions
