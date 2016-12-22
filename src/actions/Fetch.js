import Immutable from 'immutable'
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
   * Default options for the fetch action.
   */
  static defaultOptions = {
    appendResponse: false
  }

  /**
   * Generate an action creator with the provided data.
   * @param {String} instance - Instance key where changes should be applied
   * @param {Object} params - Additional params to be passed to the fetcher
   * @param {Object} options - Additional options used in the fetch action
   *
   * @returns {Function} - Returns the fetch action thunk.
   */
  do = (instance, params = null, options = {}) => {

    // Extend fetch options
    options = Object.assign({}, this.defaultOptions, options)

    // Make sure params is a raw JS object
    params = Immutable.Iterable.isIterable(params) ? params.toJS() : params

    // Validate instance key
    this.validateInstance(instance)

    return dispatch => {

      // Create data object to be dispatched with actions
      const { uidField } = this.config
      const data = { instance, uidField, options }

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
