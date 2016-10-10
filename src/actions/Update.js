import BaseAction from './BaseAction'

export class Update extends BaseAction {
  constructor(config) {
    super('update', config)
  }

  do = data => {
    return dispatch => {
      this.success(dispatch, data)
    }
  }
}
