# Redux Clerk

[![CircleCI][build-badge]][build]
[![npm package][npm-badge]][npm]

Redux Clerk handles the async CRUD in your Redux App.

* Provides a [set of action creators](docs/ActionsCreators.md) for both asynchronous and synchronous actions.
* Provides an [extendable reducer](docs/Reducer.md).
* Handles derived datasets and provides [selectors](docs/Selectors.md) for computing derived data.
* Stores minimum possible state.
* Optionally handles optimistic updates to the store.
* State is managed and stored as an [Immutable.js](https://facebook.github.io/immutable-js/) data structure.

```
// The tidy, minimal state managed by Redux Clerk.
{

  // Full data objects are only stored once and never duplicated.
  raw: {
    '123': { uid: 123, name: 'Apple' },
    '234': { uid: 234, name: 'Banana' },
    '345': { uid: 345, name: 'Peach' }
  },

  // Redux Clerk stores derived datasets as Lists of UIDs.
  instances: {
    myTypeaheadDataset: ['234', '123'],
    myTableDataset: ['345', '234'],
    myListDataset: ['123', '234', '345']
  }
}
```

## Installation

`npm install redux-clerk --save`

## Configuration & Docs
  - [Action Creators](docs/ActionsCreators.md)
  - [Reducer](docs/Reducer.md)
  - [Selectors](docs/Selectors.md)

## Example
An example TodoMVC using Redux Clerk is available in the [example](/example) directory. To run the example:

```
git clone git@github.com:GetAmbassador/redux-clerk.git
cd redux-clerk
npm install
npm run build
cd example
npm install react-scripts -g
npm install
npm start
```

## [FAQ](docs/FAQ.md)
  - [How can I extend the reducer provided by Redux Clerk?](docs/FAQ.md#how-can-i-extend-the-reducer-provided-by-redux-clerk)
  - [How does redux-clerk know how to normalize my data?](docs/FAQ.md#how-does-redux-clerk-know-how-to-normalize-my-data)
  - [How do I maintain the sort order of the fetch response?](docs/FAQ.md#how-do-i-maintain-the-sort-order-of-the-fetch-response)
  - [How do I recompute the derived companyTypeahead dataset?](docs/FAQ.md#how-do-i-recompute-the-derived-companytypeahead-dataset)

## License
MIT

[build-badge]: https://img.shields.io/circleci/token/9b304b29e1beb2dcd1a8ca0a6a66dc4914340796/project/github/GetAmbassador/redux-clerk/master.svg?style=flat-square
[build]: https://circleci.com/gh/GetAmbassador/redux-clerk

[npm-badge]: https://img.shields.io/npm/v/redux-clerk.svg?style=flat-square
[npm]: https://www.npmjs.org/package/redux-clerk
