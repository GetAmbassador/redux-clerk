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
    }
  }
}
