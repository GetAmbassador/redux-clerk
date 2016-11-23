import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import TodoActions from '../actions'
import TodoSelectors from '../selectors'

const App = ({todos, actions}) => (
  <div>
    <Header create={actions.create} />
    <MainSection todos={todos} actions={actions} />
  </div>
)

App.propTypes = {
  todos: ImmutablePropTypes.list.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: TodoSelectors.dataset(state, 'todos')
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
