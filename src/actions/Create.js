import BaseAction from './BaseAction'

/**
 * Class representing a create action.
 * @extends BaseAction
 */
export class Create extends BaseAction {
  /**
   * Create an instance of the Create action.
   * @param {Object} config - The configuration for the action.
   */
  constructor(config) {
    super('create', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {String} instance - Instance key where changes should be applied
   * @param {Object} record - Record to be created.
   *
   * @returns {Function} - Returns the create action thunk.
   */
  do = (instance, record) => {

    // Validate instance key
    this.validateInstance(instance)

    return dispatch => {

      // Create data object to be dispatched with actions
      const { uidField } = this.config
      const data = { instance, created: record, uidField }

      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, data)

      // If config.creator is provided, call it
      if(typeof this.config.creator === 'function') {
        // Prepare BaseAction.success and BaseAction.error handlers
        // by currying with dispatch and action data
        const success = this.success.bind(this, dispatch, data)
        const error = this.error.bind(this, dispatch, data)

        // Call creator
        return this.config.creator(record, success, error)
      }
    }
  }
}
