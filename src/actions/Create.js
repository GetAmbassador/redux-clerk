import BaseAction from './BaseAction'

/**
 * Class representing a create action.
 * @extends BaseAction
 */
export class Create extends BaseAction {
  /**
   * Create an instant of the Create action.
   * @param {Object} config - The configuration for the action.
   */
  constructor(config) {
    super('create', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {Object} data - Additional data to be passed with the action.
   *
   * @returns {Function} - Returns the create action thunk.
   */
  do = data => {
    return dispatch => {
      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, data)

      // If config.creator is provided, call it
      if(typeof this.config.creator === 'function') {
        // Prepare BaseAction.success and BaseAction.error handlers
        // by currying with dispatch
        const success = this.success.bind(this, dispatch)
        const error = this.error.bind(this, dispatch)

        // Call creator
        return this.config.creator(data, success, error)
      }
    }
  }
}
