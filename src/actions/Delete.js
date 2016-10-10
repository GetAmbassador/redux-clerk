import BaseAction from './BaseAction'

export class Delete extends BaseAction {
  constructor(config) {
    super('delete', config)
  }

  do = uid => {
    return dispatch => {
      this.success(dispatch, { uid })
    }
  }
}
