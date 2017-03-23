/**
 * Generates action name for a provided parts
 * @param  {Array} parts - all parts of the action name to be combined
 *
 * @return {String} - Action name string
 */
const generateActionName = (...parts) => {
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
 *   startPre: 'USERS_FETCH_PRE',
 *   start: 'USERS_FETCH',
 *   startPost: 'USERS_FETCH_POST',
 *   successPre: 'USERS_FETCH_SUCCESS_PRE',
 *   success: 'USERS_FETCH_SUCCESS',
 *   successPost: 'USERS_FETCH_SUCCESS_POST',
 *   errorPre: 'USERS_FETCH_ERROR_PRE',
 *   error: 'USERS_FETCH_ERROR',
 *   errorPost: 'USERS_FETCH_ERROR_POST'
 * }
 */
export const generateActionNames = (prefix, type) => {
  return {
    startPre: generateActionName(prefix, type, 'pre'),
    start: generateActionName(prefix, type),
    startPost: generateActionName(prefix, type, 'post'),
    successPre: generateActionName(prefix, type, 'success', 'pre'),
    success: generateActionName(prefix, type, 'success'),
    successPost: generateActionName(prefix, type, 'success', 'post'),
    errorPre: generateActionName(prefix, type, 'error', 'pre'),
    error: generateActionName(prefix, type, 'error'),
    errorPost: generateActionName(prefix, type, 'error', 'post'),
  }
}

export default generateActionNames
