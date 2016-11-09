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
    super('update', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {Object} instanceKey - key of instance to be created.
   *
   * @returns {Function} - Returns the instance action thunk.
   */
  do = instanceKey => {
    return dispatch => {
      // Create data object to be dispatched with actions
      const data = { instanceKey }

      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, data)
    }
  }
}
