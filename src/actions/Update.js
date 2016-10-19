import BaseAction from './BaseAction'

/**
 * Class representing a update action.
 * @extends BaseAction
 */
export class Update extends BaseAction {
  /**
   * Create an instant of the update action.
   * @param {Object} config - The configuration for the action.
   */
  constructor(config) {
    super('update', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {String} data - Additional data to be passed with the action.
   *
   * @returns {Function} - Returns the update action thunk.
   */
  do = data => {
    return dispatch => {
      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, data)

      // If config.updater is provided, call it
      if(typeof this.config.updater === 'function') {
        // Prepare BaseAction.success and BaseAction.error handlers
        // by currying with dispatch
        const success = this.success.bind(this, dispatch)
        const error = this.error.bind(this, dispatch)

        // Call updater
        return this.config.updater(data, success, error)
      }
    }
  }
}
