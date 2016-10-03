const ACTIONS = [
  'START',
  'SUCCESS',
  'ERROR'
]

// Generates action set and returns objects
// Ex: generateActionSet('users', 'fetch')
// {
//   start: 'USERS_FETCH_START',
//   success: 'USERS_FETCH_SUCCESS',
//   error: 'USERS_FETCH_ERROR'
// }
const generateActionSet = (prefix, type) => {
  const actions = {}
  prefix = prefix.toUpperCase()

  for (var i = 0; i < ACTIONS.length; i++) {
    const lowerCaseActionName = ACTIONS[i].toLowerCase();
    actions[lowerCaseActionName] = [prefix, type, ACTIONS[i]].join('_')
  }
  return actions
}

export default generateActionSet
