import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/remove'

describe('Reducers::Remove', () => {
  describe('start', () => {
    let previousState

    beforeEach(() => {
      previousState = Immutable.fromJS({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
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
        },
        pendingRemoval: Map({})
      })
    })

    it('should move provided uid from raw to pendingRemoval', () => {
      const action = {
        uid: 234
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
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
        },
        pendingRemoval: {
          234: {
            instanceIndices: [{ instance: 'test1', index: 1 }, { instance: 'test2', index: 0 }],
            data: { uid: 234, test: '234' }
          }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should set additional data in state if provided', () => {
      const action = {
        uid: 234,
        instance: 'test1',
        additionalData: {
          totalCount: 1
        }
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        },
        instances: {
          test1: {
            data: [123],
            additionalData: {
              totalCount: 1
            }
          },
          test2: {
            data: [123]
          },
          test3: {
            data: [123]
          }
        },
        pendingRemoval: {
          234: {
            instanceIndices: [{ instance: 'test1', index: 1 }, { instance: 'test2', index: 0 }],
            data: { uid: 234, test: '234' }
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
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]]),
        instances: {
          test1: {
            data: [123]
          }
        },
        pendingRemoval: Map([[234, Immutable.fromJS({ instanceIndices: [{ instance: 'test1', index: 1 }, { instance: 'test2', index: 0 }], data: { uid: 234, test: '234' }})]])
      })
    })

    it('should remove the provided item from pendingRemoval', () => {
      const action = {
        uid: 234
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        },
        instances: {
          test1: {
            data: [123]
          }
        },
        pendingRemoval: {}
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should set additional data in state if provided', () => {
      const action = {
        uid: 234,
        instance: 'test1',
        additionalData: {
          totalCount: 1
        }
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        },
        instances: {
          test1: {
            data: [123],
            additionalData: {
              totalCount: 1
            }
          }
        },
        pendingRemoval: {}
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
    let previousState

    beforeEach(() => {
      previousState = Immutable.fromJS({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]]),
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
        },
        pendingRemoval: Map([[234, Immutable.fromJS({ instanceIndices: [{ instance: 'test1', index: 1 }, { instance: 'test2', index: 0 }], data: { uid: 234, test: '234' }})]])
      })
    })

    it('should re-add the removed item', () => {
      const action = {
        uid: 234,
        instance: 'test1'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: {
            data: [234, 123]
          },
          test2: {
            data: [234, 123]
          },
          test3: {
            data: [123]
          }
        },
        pendingRemoval: {}
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should set additional data in state if provided', () => {
      const action = {
        uid: 234,
        instance: 'test1',
        additionalData: {
          totalCount: 2
        }
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: {
            data: [123, 234],
            additionalData: {
              totalCount: 2
            }
          },
          test2: {
            data: [234, 123]
          },
          test3: {
            data: [123]
          }
        },
        pendingRemoval: {}
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
