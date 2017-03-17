import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (newTodo) => {
    if (newTodo.get('text').length === 0) {
      this.props.remove('todos', newTodo.get('id'))
    } else {
      this.props.update(newTodo)
    }
    this.setState({ editing: false })
  }

  render() {
    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={this.props.todo.get('text')}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(this.props.todo.set('text', text))} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={this.props.todo.get('completed')}
                 onChange={() => this.props.complete(this.props.todo.get('id'))} />
          <label onDoubleClick={this.handleDoubleClick}>
            {this.props.todo.get('text')}
          </label>
          <button className="destroy"
                  onClick={() => this.props.remove('todos', this.props.todo.get('id'))} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: this.props.todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
