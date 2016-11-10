import BaseAction from './BaseAction'

/**
 * Class representing a update action.
 * @extends BaseAction
 */
export class Instance extends BaseAction {
  /**
   * Create an instance of the update action.
   * @param {Object} config - The configuration for the action.
   */
  constructor(config) {
    super('instance', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {Object} instance - key of instance to be created.
   *
   * @returns {Function} - Returns the instance action thunk.
   */
  do = instance => {

    // Validate instance key
    this.validateInstance(instance)

    return dispatch => {

      // Create data object to be dispatched with action
      const data = { instance }

      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, data)
    }
  }
}
