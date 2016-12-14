import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/update'

describe('Reducers::Update', () => {
  describe('start', () => {
    it('should update data in state and store previous version in pendingUpdate', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]]),
        pendingUpdate: Map({})
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: 'name' }
        },
        pendingUpdate: {
          123: { uid: 123, test: '123' }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })


    it('should merge partial changes with existing data', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123', company: 'Acme' })]]),
        pendingUpdate: Map({})
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: 'name', company: 'Acme' }
        },
        pendingUpdate: {
          123: { uid: 123, test: '123', company: 'Acme' }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should add new record to raw if not already in state', () => {
      const previousState = Immutable.fromJS({
        raw: {},
        pendingUpdate: {}
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: 'name' }
        },
        pendingUpdate: {}
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

  })

  describe('success', () => {
    it('should remove the previous version from pendingUpdate', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
        pendingUpdate: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]])
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        pendingUpdate: {}
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
    it('should revert the update', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: 'name' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
        pendingUpdate: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]])
      })

      const action = {
        record: Immutable.fromJS({ uid: 123, test: '123' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        pendingUpdate: {}
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
