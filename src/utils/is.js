/**
 * Checks if provided value is an object
 * @param  {*} value - The value in question
 *
 * @return {Boolean} - True if value is an object
 */
export const isObject = (value) => {
  return value === Object(value) && Object.prototype.toString.call(value) !== '[object Array]'
}

/**
 * Checks if provided value is a promise
 * @param  {*} value - The value in question
 *
 * @return {Boolean} - True if value is a promise
 */
export const isPromise = (value) => {
  return typeof value.then === 'function'
}
