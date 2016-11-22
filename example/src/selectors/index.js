import { selectors } from '../../../lib'

const TodosSelectors = selectors({
  baseSelector: state => state.todos
})

export default TodosSelectors
