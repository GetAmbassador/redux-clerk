import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/remove'

describe('Reducers::Remove', () => {
  describe('start', () => {
    let previousState

    beforeEach(() => {
      previousState = Immutable.fromJS({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
        pending: {
          remove: []
        },
        instances: {
          test1: {
            data: [123,234]
          },
          test2: {
            data: [234,123]
          },
          test3: {
            data: [123]
          }
        }
      })
    })

    it('should remove provided uid from all instances and the item from raw', () => {
      const action = {
        uid: 234,
        isAsync: false
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        },
        pending: {
          remove: []
        },
        instances: {
          test1: {
            data: [123]
          },
          test2: {
            data: [123]
          },
          test3: {
            data: [123]
          }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should add the provided uid to pending.remove when remover is provided', () => {
      const action = {
        uid: 234,
        isAsync: true
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        pending: {
          remove: [234]
        },
        instances: {
          test1: {
            data: [123,234]
          },
          test2: {
            data: [234,123]
          },
          test3: {
            data: [123]
          }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('success', () => {
    let previousState

    beforeEach(() => {
      previousState = Immutable.fromJS({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
        pending: {
          remove: [234]
        },
        instances: {
          test1: {
            data: [123,234]
          },
          test2: {
            data: [234,123]
          },
          test3: {
            data: [123]
          }
        }
      })
    })

    it('should remove the provided item from raw, and the uid from pending.remove and all instances', () => {
      const action = {
        uid: 234,
        isAsync: true
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        },
        pending: {
          remove: []
        },
        instances: {
          test1: {
            data: [123]
          },
          test2: {
            data: [123]
          },
          test3: {
            data: [123]
          }
        }
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
    let previousState

    beforeEach(() => {
      previousState = Immutable.fromJS({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
        pending: {
          remove: [234]
        },
        instances: {
          test1: {
            data: [123,234]
          },
          test2: {
            data: [234,123]
          },
          test3: {
            data: [123]
          }
        }
      })
    })

    it('should remove the provided uid from pending.remove', () => {
      const action = {
        uid: 234,
        isAsync: true
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        pending: {
          remove: []
        },
        instances: {
          test1: {
            data: [123,234]
          },
          test2: {
            data: [234,123]
          },
          test3: {
            data: [123]
          }
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
