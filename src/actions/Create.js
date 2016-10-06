import BaseAction from './BaseAction'

export class Create extends BaseAction {
  constructor = (type, config) => {
    super('create', config)
  }

  do = data => {
    return dispatch => {
      this.dispatcher(dispatch, 'success', data)
    }
  }
}
