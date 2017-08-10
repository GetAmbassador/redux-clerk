import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/create'

describe('Reducers::Create', () => {
  describe('start', () => {
    it('should update data in state', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['123', Immutable.fromJS({ uid: 123, test: '123' })]]),
        pending: {
          create: []
        },
        instances: {
          test1: {
            data: ['123'],
            additionalData: {
              totalCount: 1
            }
          }
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 234, test: '234' }),
        instance: 'test1',
        uidField: 'uid',
        additionalData: {
          totalCount: 2
        },
        isAsync: false
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: '123' },
          '234': { uid: 234, test: '234' }
        },
        pending: {
          create: []
        },
        instances: {
          test1: {
            data: ['234', '123'],
            additionalData: {
              totalCount: 2
            }
          }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should create the provided instance if not already created', () => {
      const previousState = Immutable.fromJS({
        raw: Map({})
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: '123' }),
        instance: 'test1',
        uidField: 'uid',
        isAsync: false
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: '123' }
        },
        instances: {
          test1: { data: ['123'] }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should update data in state when creator is provided', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['123', Immutable.fromJS({ uid: 123, test: '123' })]]),
        pending: {
          create: []
        },
        instances: {
          test1: {
            data: ['123'],
            additionalData: {
              totalCount: 1
            }
          }
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 234, test: '234' }),
        instance: 'test1',
        uidField: 'uid',
        additionalData: {
          totalCount: 2
        },
        isAsync: true
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: '123' },
          '234': { uid: 234, test: '234' }
        },
        pending: {
          create: ['234'],
        },
        instances: {
          test1: {
            data: ['234','123'],
            additionalData: {
              totalCount: 2
            }
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
        raw: Map([['temp123', Immutable.fromJS({ uid: 'temp123', test: '123' })], ['234', Immutable.fromJS({ uid: 234, test: '234' })]]),
        pending: {
          create: ['temp123'],
        },
        instances: {
          test1: {
            data: ['temp123', '234']
          }
        }
      })
    })

    it('should replace the temporary uid with the permanent uid', () => {
      const action = {
        record: Immutable.fromJS({ uid: 'temp123', test: '123' }),
        responseData: { uid: 123, test: '123', test_uid: { test: true } },
        instance: 'test1',
        uidField: 'uid',
        isAsync: true
      }

      const expectedResult = Immutable.fromJS({
        raw: {
          '123': { uid: 123, test: '123', test_uid: { test: true } },
          '234': { uid: 234, test: '234' }
        },
        pending: {
          create: []
        },
        instances: {
          test1: {
            data: ['123', '234']
          }
        }
      })

      expect(Immutable.is(success(previousState, action), expectedResult)).to.be.true
    })

    it('should set additional data in state if provided', () => {
      const action = {
        record: Immutable.fromJS({ uid: 'temp123', test: '123' }),
        responseData: { uid: 123, test: '123' },
        instance: 'test1',
        uidField: 'uid',
        additionalData: {
          totalCount: 2
        },
        isAsync: true
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: '123' },
          '234': { uid: 234, test: '234' }
        },
        pending: {
          create: []
        },
        instances: {
          test1: {
            data: ['123', '234'],
            additionalData: {
              totalCount: 2
            }
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
        raw: Map([['temp123', Immutable.fromJS({ uid: 'temp123', test: '123' })], ['234', Immutable.fromJS({ uid: 234, test: '234' })]]),
        pending: {
          create: ['temp123'],
        },
        instances: {
          test1: {
            data: ['temp123', '234']
          }
        }
      })
    })

    it('should remove the created item', () => {
      const action = {
        record: Immutable.fromJS({ uid: 'temp123', test: '123' }),
        instance: 'test1',
        uidField: 'uid',
        isAsync: true
      }

      const expectedResult = {
        raw: {
          '234': { uid: 234, test: '234' }
        },
        pending: {
          create: []
        },
        instances: {
          test1: {
            data: ['234']
          }
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should set additional data in state if provided', () => {
      const action = {
        record: Immutable.fromJS({ uid: 'temp123', test: '123' }),
        instance: 'test1',
        uidField: 'uid',
        additionalData: {
          totalCount: 1
        },
        isAsync: true
      }

      const expectedResult = {
        raw: {
          '234': { uid: 234, test: '234' }
        },
        pending: {
          create: []
        },
        instances: {
          test1: {
            data: ['234'],
            additionalData: {
              totalCount: 1
            }
          }
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
