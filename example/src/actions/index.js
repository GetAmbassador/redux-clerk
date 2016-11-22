import Immutable from 'immutable'
import { actions } from '../../../lib'

const TodosActions = actions({
  actionPrefix: 'TODOS',
  uidField: 'id'
})

TodosActions.addTodo = (text)=> {
  return TodosActions.create('todos', Immutable.fromJS({
    id: new Date().getTime(),
    completed: false,
    text
  }))
}

TodosActions.editTodo = (id, text) => {
  return TodosActions.update('todos', Immutable.fromJS({ id, text }))
}

TodosActions.deleteTodo = TodosActions.delete.bind(null, 'todos')

TodosActions.completeTodo = (id) => {
  return TodosActions.update('todos', Immutable.fromJS({ id, completed: true }))
}

export default TodosActions
