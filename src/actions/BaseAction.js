import { generateActionNames } from '../utils/actionNames'

/** Class representing base action logic . */
class BaseAction {
  /**
   * Create an action.
   * @param {String} type - The action type. Ex: 'create'.
   * @param {Object} config - The configuration for the action.
   */
  constructor(type, config) {
    this.config = Object.assign({}, config)
    this.actionNames = generateActionNames(config.actionPrefix, type)
  }

  /**
   * Base action dispatcher.
   * @param {Function} type - start, success or error.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} actionData - Any additional data to be passed with the action.
   *
   * @returns {void}
   */
   _dispatch = (type, dispatch, actionData) => {
     const action = Object.assign({}, { type: this.actionNames[type] }, actionData)
     dispatch(action)
   }

  /**
   * Dispatch start action.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} actionData - Any additional data to be passed with the action.
   *
   * @returns {void}
   */
  start = this._dispatch.bind(this, 'start')

  /**
   * Dispatch success action.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} actionData - Any additional data to be passed with the action.
   *
   * @returns {void}
   */
  success = this._dispatch.bind(this, 'success')

  /**
   * Dispatch error action.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} actionData - Any additional data to be passed with the action.
   *
   * @returns {void}
   */
  error = this._dispatch.bind(this, 'error')
}

export default BaseAction
