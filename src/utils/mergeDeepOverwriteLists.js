import { List } from 'immutable'

const isMergeable = a => (
  a && typeof a === 'object' && typeof a.mergeWith === 'function' && !List.isList(a)
)

/**
 * Performs a mergeDeep action but overwrites any Immutable Lists
 */
export const mergeDeepOverwriteLists = (a, b) => {
  // If b is null, it would overwrite a, even if a is mergeable
  if (b === null) return b

  // If a is mergeable and not an Immutable List merge with b
  if (isMergeable(a) && !List.isList(a)) {
    return a.mergeWith(mergeDeepOverwriteLists, b)
  }

  // Otherwise replace a with b
  return b
}
