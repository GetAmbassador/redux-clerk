import { generateActionNames } from '../utils/actionNames'

class BaseAction {
  constructor(type, config) {
    this.config = Object.assign({}, config)
    this.actionNames = generateActionNames(config.actionPrefix, type)
  }

  success = (dispatch, actionData) => {
    const action = Object.assign({}, { type: this.actionNames.success }, actionData)
    dispatch(action)
  }
}

export default BaseAction
