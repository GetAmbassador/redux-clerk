## 1.0.0
###### _August 10, 2017_

- Convert responseData to Immutable data structure before adding to store ([#51](https://github.com/GetAmbassador/redux-clerk/pull/51))

## 1.0.0-rc.4
###### _May 2, 2017_

- Accept responseData in handleSuccess for the update action ([#48](https://github.com/GetAmbassador/redux-clerk/pull/48))
- Update docs to reflect optional optimism ([#47](https://github.com/GetAmbassador/redux-clerk/pull/47))

## 1.0.0-rc.3
###### _April 10, 2017_

- Cast all raw ids to strings ([#44](https://github.com/GetAmbassador/redux-clerk/pull/44))
- Update selectors to handle optional optimism ([#43](https://github.com/GetAmbassador/redux-clerk/pull/43))
- Make optimistic updates optional ([#41](https://github.com/GetAmbassador/redux-clerk/pull/41))

## 1.0.0-rc.2
###### _March 23, 2017_

- Added pre action hooks ([#38](https://github.com/GetAmbassador/redux-clerk/pull/38))

## 1.0.0-rc.1
###### _March 22, 2017_

- Added post action hooks ([#36](https://github.com/GetAmbassador/redux-clerk/pull/36))
- Rename delete action to remove to avoid reserved word conflicts ([#35](https://github.com/GetAmbassador/redux-clerk/pull/35))

## 0.3.0
###### _March 15, 2017_

- Fetch response will now deep merge response data into raw data ([#33](https://github.com/GetAmbassador/redux-clerk/pull/33))

## 0.2.8
###### _February 21, 2017_

- Cast uid to int in record selector ([#31](https://github.com/GetAmbassador/redux-clerk/pull/31))

## 0.2.7
###### _February 16, 2017_

- Added the get selector ([#29](https://github.com/GetAmbassador/redux-clerk/pull/29))

## 0.2.6
###### _January 11, 2017_

- Added the datasetProperty selector ([#27](https://github.com/GetAmbassador/redux-clerk/pull/27))

## 0.2.5
###### _January 3, 2017_

- Return Map instead of List for empty dataset ([#25](https://github.com/GetAmbassador/redux-clerk/pull/25))
- Ensure data is properly converted between actions and reducers ([#24](https://github.com/GetAmbassador/redux-clerk/pull/24))

## 0.2.4
###### _December 15, 2016_

- uidField option has been removed for the reducer (it is not longer needed) ([#22](https://github.com/GetAmbassador/redux-clerk/pull/22))

## 0.2.3
###### _December 14, 2016_

- Records are now added while updating if not already in state ([#20](https://github.com/GetAmbassador/redux-clerk/pull/20))

## 0.2.2
###### _December 13, 2016_

- Added the ability to return fetch response as an object or array ([#18](https://github.com/GetAmbassador/redux-clerk/pull/18))

## 0.2.1
###### _December 7, 2016_

- Added the ability to pass additional data with fetch, create and delete actions ([#16](https://github.com/GetAmbassador/redux-clerk/pull/16))

## 0.2.0
###### _December 5, 2016_

- Initial Release
