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
      this.success(dispatch, data)
    }
  }
}
