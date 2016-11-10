import BaseAction from './BaseAction'

/**
 * Class representing a delete action.
 * @extends BaseAction
 */
export class Delete extends BaseAction {
  /**
   * Create an instance of the delete action.
   * @param {Object} config - The configuration for the action.
   */
  constructor(config) {
    super('delete', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {String} instance - Instance key where changes should be applied
   * @param {String} uid - UID of the item to be deleted.
   *
   * @returns {Function} - Returns the delete action thunk.
   */
  do = (instance = this.config.defaultInstance, uid) => {

    // Validate instance key
    this.validateInstance(instance)

    return dispatch => {

      // Create data object to be dispatched with actions
      const { uidField } = this.config
      const data = { instance, uid, uidField }

      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, data)

      // If config.deleter is provided, call it
      if(typeof this.config.deleter === 'function') {
        // Prepare BaseAction.success and BaseAction.error handlers
        // by currying with dispatch
        const success = this.success.bind(this, dispatch, data)
        const error = this.error.bind(this, dispatch, data)

        // Call deleter
        return this.config.deleter(uid, success, error)
      }
    }
  }
}
