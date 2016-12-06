import { generateActionNames } from '../utils/actionNames'

/** Class representing base action logic . */
class BaseAction {
  /**
   * Create an action.
   * @param {String} type - The action type. Ex: 'create'.
   * @param {Object} config - The configuration for the action.
   */
  constructor(type, config) {
    const configBase = { type }
    this.config = Object.assign(configBase, config)
    this.actionNames = generateActionNames(config.actionPrefix, type)
  }

  /**
   * Base action dispatcher.
   * @param {Function} type - start, success or error.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} actionData - Data to the original action.
   * @param {Object} responseData - Data from the async request handlers (creator, deleter, updater, fetcher).
   * @param {Object} additionalData - Optional additional data to be saved with the instance
   *
   * @returns {void}
   */
   _dispatch = (type, dispatch, actionData, responseData, additionalData) => {
     const action = Object.assign({}, { type: this.actionNames[type] }, actionData)

     // Include response data from async handler if provided
     if(responseData) {
       action.responseData = responseData
     }

     // Include additional data from async handler if provided
     if(additionalData) {
       action.additionalData = additionalData
     }

     dispatch(action)
   }

   /**
    * Validates instance key, throws an exception if instance key is not valid
    * @param {String} instance - name of the instance
    *
    * @returns {void}
    */
  validateInstance = instance => {
    if (!instance) throw new Error(`clerk.${this.config.type}: Expected instance key`)
    if (typeof instance !== 'string') throw new Error(`clerk.${this.config.type}: Instance key must be a string`)
    if (!(/^([A-Za-z_0-9]+)$/).test(instance)) throw new Error(`clerk.${this.config.type}: Instance key can only contain A-Z, a-z, 0-9 or _`)
  }

  /**
   * Dispatch start action.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} data - Any additional data to be passed with the action.
   *
   * @returns {void}
   */
  start = this._dispatch.bind(this, 'start')

  /**
   * Dispatch success action.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} data - Any additional data to be passed with the action.
   *
   * @returns {void}
   */
  success = this._dispatch.bind(this, 'success')

  /**
   * Dispatch error action.
   * @param {Function} dispatch - The dispatch function provided by Redux.
   * @param {Object} data - Any additional data to be passed with the action.
   *
   * @returns {void}
   */
  error = this._dispatch.bind(this, 'error')
}

export default BaseAction
