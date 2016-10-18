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
      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, { uid })

      // If config.deleter is provided, call it
      if(typeof this.config.deleter === 'function') {
        // Prepare BaseAction.success and BaseAction.error handlers
        // by currying with dispatch
        const success = this.success.bind(this, dispatch)
        const error = this.error.bind(this, dispatch)

        // Call deleter
        this.config.deleter(uid, success, error)
      }
    }
  }
}
