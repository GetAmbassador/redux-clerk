import { generateActionNames } from '../utils/actionNames'

class BaseAction {
  constructor(type, config) {
    this.config = Object.assign({}, config)
    this.actionNames = generateActionNames(config.actionPrefix, type)
  }

  dispatcher = (dispatch, actionName, actionData) => {
    const action = Object.assign({}, { type: actionName }, actionData)
    dispatch(action)
  }
}

export default BaseAction
