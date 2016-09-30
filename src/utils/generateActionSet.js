const ACTIONS = [
  'START',
  'SUCCESS',
  'ERROR'
]

const generateActionSet = (prefix, type) => {
  return ACTIONS.map(a => [prefix, type, a].join('_'))
}

export default generateActionSet
