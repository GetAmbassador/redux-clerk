import BaseAction from './BaseAction'

/**
 * Class representing a delete action.
 * @extends BaseAction
 */
export class Delete extends BaseAction {
  /**
   * Create an instant of the delete action.
   * @param {Object} config - The configuration for the action.
   */
  constructor(config) {
    super('delete', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {String} uid - UID of the item to be deleted.
   *
   * @returns {Function} - Returns the delete action thunk.
   */
  do = uid => {
    return dispatch => {
      this.success(dispatch, { uid })
    }
  }
}
