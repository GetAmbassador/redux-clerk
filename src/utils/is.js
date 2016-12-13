/**
 * Checks if privided valis is an object
 * @param  {*} value - The value in question
 *
 * @return {Boolean} - True if value is an object
 */
export const isObject = (value) => {
  return value === Object(value) && Object.prototype.toString.call(value) !== '[object Array]'
}
