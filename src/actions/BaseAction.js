import { generateActionNames } from './utils/actionNames'

class BaseAction {
  constructor = (type, config) => {
    this.config = config
    this.actionNames = generateActionNames(config.prefix, type)
  }

  dispatcher = (dispatch, actionState, ...args) => {
    dispatch({
      type: this.actionNames[actionState],
      ...args
    })
  }
}

export default BaseAction
