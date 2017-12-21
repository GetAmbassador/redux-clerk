import Immutable from 'immutable'
import BaseAction from './BaseAction'
import { isPromise } from '../utils/is'

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

    // Make sure record is an immutable map
    record = Immutable.Iterable.isIterable(record) ? record : Immutable.fromJS(record)

    // Validate instance key
    this.validateInstance(instance)

    return dispatch => {

      // Create data object to be dispatched with actions
      const { uidField, creator } = this.config
      const isAsync = typeof creator === 'function'
      const data = { instance, record, uidField, isAsync }

      // Call BaseAction.start with dispatch and the action data
      this.start(dispatch, data)

      // If config.creator is provided, call it
      if (isAsync) {
        // Prepare BaseAction.success and BaseAction.error handlers
        // by currying with dispatch and action data
        const success = this.success.bind(this, dispatch, data)
        const error = this.error.bind(this, dispatch, data)

        // Call creator
        const creatorAction = creator(record, success, error)

        // Return the action promise
        return isPromise(creatorAction) ? creatorAction : creatorAction(dispatch)
      }
    }
  }
}
