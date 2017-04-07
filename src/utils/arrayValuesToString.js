/**
 * Converts all values of an array to string
 * @param  {Array} mixedArray - Array where string conversion should be applied
 *
 * @return {Array} - Array where string conversion has been applied
 */
const arrayValuesToString = (mixedArray) => {
  // If we are provided an array, map all values to strings
  return mixedArray instanceof Array && mixedArray.map(v => v.toString())
}

export default arrayValuesToString
