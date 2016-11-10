import BaseAction from './BaseAction'

/**
 * Class representing a fetch action.
 * @extends BaseAction
 */
export class Fetch extends BaseAction {
  /**
   * Create an instance of the Fetch action.
   * @param {Object} config - The configuration for the action.
   */
  constructor(config) {
    super('fetch', config)
  }

  /**
   * Generate an action creator with the provided data.
   * @param {Object} params - Additional params to be passed to the fetcher
   *
   * @returns {Function} - Returns the fetch action thunk.
   */
  do = (instance = this.config.defaultInstance, params = null) => {

    // Validate instance key
    this.validateInstance(instance)

    return dispatch => {

      // Create data object to be dispatched with actions
      const { uidField } = this.config
      const data = { instance, params, uidField }

      // Call BaseAction.start with dispatch
      this.start(dispatch, data)

      // If config.fetcher is provided, call it
      if(typeof this.config.fetcher === 'function') {
        // Prepare BaseAction.success and BaseAction.error handlers
        // by currying with dispatch
        const success = this.success.bind(this, dispatch, data)
        const error = this.error.bind(this, dispatch, data)

        // Call fetcher
        return this.config.fetcher(params, success, error)
      }
    }
  }
}
