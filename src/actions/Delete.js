import BaseAction from './BaseAction'

export class Delete extends BaseAction {
  constructor = (type, config) => {
    super('delete', config)
  }

  do = uid => {
    return dispatch => {
      this.dispatcher(dispatch, 'success', { uid })
    }
  }
}
