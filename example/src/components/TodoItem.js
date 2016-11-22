import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (newTodo) => {
    if (newTodo.get('text').length === 0) {
      this.props.deleteTodo(newTodo.get('id'))
    } else {
      this.props.editTodo(newTodo)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.get('text')}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.set('text', text))} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.get('completed')}
                 onChange={() => completeTodo(todo.get('id'))} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.get('text')}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(todo.get('id'))} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
