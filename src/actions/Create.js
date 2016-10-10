import BaseAction from './BaseAction'

export class Create extends BaseAction {
  constructor(config) {
    super('create', config)
  }

  do = data => {
    return dispatch => {
      this.success(dispatch, data)
    }
  }
}
