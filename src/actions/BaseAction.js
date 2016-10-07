import { generateActionNames } from './utils/actionNames'

class BaseAction {
  constructor = (type, config) => {
    this.config = config
    this.actionNames = generateActionNames(config.prefix, type)
  }

  dispatcher = (dispatch, type, actionData) => {
    const action = Object.assign({}, { type }, actionData)
    dispatch(action)
  }
}

export default BaseAction
