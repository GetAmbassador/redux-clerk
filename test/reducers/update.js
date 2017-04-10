import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/update'

describe('Reducers::Update', () => {
  describe('start', () => {
    it('should update data in state', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['123', Immutable.fromJS({ uid: 123, test: '123' })]]),
        pendingRaw: {},
        pending: {
          update: []
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid',
        isAsync: false
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: 'name' }
        },
        pendingRaw: {},
        pending: {
          update: []
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })


    it('should merge partial changes with existing data', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['123', Immutable.fromJS({ uid: 123, test: '123', company: 'Acme' })]]),
        pendingRaw: {},
        pending: {
          update: []
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid',
        isAsync: false
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: 'name', company: 'Acme' }
        },
        pendingRaw: {},
        pending: {
          update: []
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should add new record to raw if not already in state', () => {
      const previousState = Immutable.fromJS({
        raw: {},
        pendingRaw: {},
        pending: {
          update: []
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid',
        isAsync: false
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: 'name' }
        },
        pendingRaw: {},
        pending: {
          update: []
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should add the updated item to pendingRaw and the uid to pending.update', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['123', Immutable.fromJS({ uid: 123, test: '123' })]]),
        pendingRaw: {},
        pending: {
          update: []
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid',
        isAsync: true
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: '123' }
        },
        pendingRaw: {
          '123': { uid: 123, test: 'name' }
        },
        pending: {
          update: ['123']
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('success', () => {
    it('should update the item in raw, remove the item from pendingRaw, and remove the uid from pending.update', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['123', Immutable.fromJS({ uid: 123, test: '123' })], ['234', Immutable.fromJS({ uid: 234, test: '234' })]]),
        pendingRaw: Map([['123', Immutable.fromJS({ uid: 123, test: 'name' })]]),
        pending: {
          update: ['123']
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid',
        isAsync: true
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: 'name' },
          '234': { uid: 234, test: '234' }
        },
        pendingRaw: {},
        pending: {
          update: []
        }
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
    it('should remove the item from pendingRaw and remove the uid from pending.update', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['123', Immutable.fromJS({ uid: 123, test: '123' })], ['234', Immutable.fromJS({ uid: 234, test: '234' })]]),
        pendingRaw: Map([['123', Immutable.fromJS({ uid: 123, test: 'name' })]]),
        pending: {
          update: ['123']
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid',
        isAsync: true
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: '123' },
          '234': { uid: 234, test: '234' }
        },
        pendingRaw: {},
        pending: {
          update: []
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should remove the record from raw if not previously added', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['123', Immutable.fromJS({ uid: 123, test: '123' })], ['234', Immutable.fromJS({ uid: 234, test: '234' })]]),
        pendingRaw: {},
        pending: {
          update: []
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid',
        isAsync: true
      }

      const expectedResult = {
        raw: {
          '123': { uid: 123, test: '123' },
          '234': { uid: 234, test: '234' }
        },
        pendingRaw: {},
        pending: {
          update: []
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
