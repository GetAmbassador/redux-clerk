import BaseAction from './BaseAction'

/**
 * Class representing a remove action.
 * @extends BaseAction
 */
export class Remove extends BaseAction {
  /**
   * Create an instance of the remove action.
   * @param {Object} config - The configuration for the action.
   */
  constructor(config) {
    super('remove', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {String} instance - Instance key where changes should be applied
   * @param {String} uid - UID of the item to be removed.
   *
   * @returns {Function} - Returns the remove action thunk.
   */
  do = (instance, uid) => {
    return dispatch => {

      // Create data object to be dispatched with actions
      const { uidField } = this.config
      const data = { instance, uid, uidField }

      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, data)

      // If config.remover is provided, call it
      if(typeof this.config.remover === 'function') {
        // Prepare BaseAction.success and BaseAction.error handlers
        // by currying with dispatch
        const success = this.success.bind(this, dispatch, data)
        const error = this.error.bind(this, dispatch, data)

        // Call remover
        return this.config.remover(uid, success, error)
      }
    }
  }
}
