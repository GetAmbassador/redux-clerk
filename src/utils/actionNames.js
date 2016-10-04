/**
 * Generates action name for a provided prefix, type and action
 * @param  {String} action name prefix, ex: users
 * @param  {String} type - action type, ex: fetch
 * @param  {String} action - base action name, ex: success
 *
 * @return {String} - Object of action names
 */
const generateActionName = (prefix, type, action) => {
  const parts = []
  if(prefix) parts.push(prefix)
  if(type) parts.push(type)
  if(action) parts.push(action)

  return parts.join('_').toUpperCase()
}


/**
 * Generates async action names for a provided prefix and type
 * @param  {String} prefix - action name prefix, ex: users
 * @param  {String} type - action type, ex: fetch
 *
 * @return {String} - Object of action names
 *
 * Ex: generateActionNames('users', 'fetch')
 * {
 *   start: 'USERS_FETCH',
 *   success: 'USERS_FETCH_SUCCESS',
 *   error: 'USERS_FETCH_ERROR'
 * }
 */
export const generateActionNames = (prefix, type) => {
  return {
    start: generateActionName(prefix, type),
    success: generateActionName(prefix, type, 'success'),
    error: generateActionName(prefix, type, 'error')
  }
}

export default generateActionNames
