import BaseAction from './BaseAction'

/**
 * Class representing a fetch action.
 * @extends BaseAction
 */
export class Fetch extends BaseAction {
  /**
   * Create an instant of the Fetch action.
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
  do = (params) => {
    return dispatch => {
      // Merge uidField into action data
      const data = { uidField: this.config.uidField }

      // Add params to action data
      if(params) {
        data.params = params
      }

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
