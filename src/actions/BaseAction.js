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
   * Dispatch success action.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} actionData - Any additional data to be passed with the action.
   *
   * @returns {void}
   */
  success = (dispatch, actionData) => {
    const action = Object.assign({}, { type: this.actionNames.success }, actionData)
    dispatch(action)
  }
}

export default BaseAction
