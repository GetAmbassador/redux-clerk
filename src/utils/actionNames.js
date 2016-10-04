/**
 * Generates async action names for a provided prefix and type
 * @param  {String} prefix - name of the id field in the object
 * @param  {String} type - List of Maps
 *
 * @return {object} - Object of action names
 *
 * Ex: generateActionNames('users', 'fetch')
 * {
 *   start: 'USERS_FETCH_START',
 *   success: 'USERS_FETCH_SUCCESS',
 *   error: 'USERS_FETCH_ERROR'
 * }
 */
const generateActionNames = (prefix, type) => {

  // Action types to generate
  const ACTIONS = [
    'start',
    'success',
    'error'
  ]

  // Generate the full action names
  let actions = {}
  for (var i = 0; i < ACTIONS.length; i++) {
    const actionName = [prefix, type, ACTIONS[i]].join('_')
    actions[ACTIONS[i]] = actionName.toUpperCase()
  }
  return actions
}

export default generateActionSet
