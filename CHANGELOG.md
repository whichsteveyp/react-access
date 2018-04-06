# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.0.0] - 2018-04-06
There have been no changes from the `-alpha` releases, however
those have been aggregated to this section for ease of reading.
This version is compatible with the new React 16.3 Context API
🎉

### Added
- A contributors section for the folks who've helped recently get this
updated and reviewed.
- Introduced `create-react-context` polyfill, so we can use new new,
while still being safe for old old
- Broke many API things, namely our exports:
  - `<ReactAccessContext/>` -> `<ReactAccessProvider/>`
  - `<ReactAccessConsumer/>` is brand new, but you _probably_ don't
  need it
  - `<RequireForAccess/>` -> uh, oh, it's the same
- `userPermissions` was simplified to `permissions`, not backwards
compatible

### Fixed
- `requireAll` works now with the default `validator` 🎉
- Fixed a `peerDependency` bug on introduced in `alpha1`
- Updated our yarn stuff to not use my work internal registry
by mistake.

### Changed
- Enhanced TravisCI matrix to include support for testing ^16.x,
and 16.3.x prerelease versions, which use the new React Context API
- Our `README.md` has updated examples on the new API usage
- Updated TravisCI testing framework for supported React versions
- Simplified `peerDependency` versions allowed for React

## [1.0.0-alpha2] - 2018-03-27
### Changed
- Enhanced TravisCI matrix to include support for testing ^16.x,
and 16.3.x prerelease versions, which use the new React Context API
- Our `README.md` has updated examples on the new API usage

### Added
- Introduced `create-react-context` polyfill, so we can use new new,
while still being safe for old old
- Broke many API things, namely our exports:
  - `<ReactAccessContext/>` -> `<ReactAccessProvider/>`
  - `<ReactAccessConsumer/>` is brand new, but you _probably_ don't
  need it
  - `<RequireForAccess/>` -> uh, oh, it's the same
- `userPermissions` was simplified to `permissions`, not backwards
compatible

### Fixed
- `requireAll` still does not work ;)
- Fixed a `peerDependency` bug on introduced in `alpha1`
- Updated our yarn stuff to not use my work internal registry
by mistake.

## [1.0.0-alpha1] - 2018-02-07
- Updated TravisCI testing framework for supported React versions
- Simplified `peerDependency` versions allowed for React

## [0.0.6] - 2017-04-18
### Added
- New `peerDependencies` update! Be sure to include [prop-types](https://www.npmjs.com/package/prop-types)

### Changed
- We no longer utilize `React.PropTypes`. We _also_ don't have a strategy
just yet on how to recommend you using this module in dev & production
without shipping useless bits. TBD!
- Support for `react@0.14.x` has been dropped, although _our_ tests pass
this is likely to break in other apps. We now require `react@^0.14.9`, or
anything on the `15.x` branch
- `<RequireForAccess/>` now only accepts a *single* child node
- The extraneous `<div/>` soup we were adding to the DOM has been removed,
if you had previously relied on that `div.react-access-valid` for layout

### Fixed
- Corrected issues that were commit direct to master previously when trying
to 'fix testing matrix' for other react versions. Lesson learned on no PRs.
Again :)

## [0.0.5] - 2017-04-10
### Added
- Tests for `<ReactAccessContext/>` rendering & default validator

### Fixed
- Default validator behavior did not work when only requiring 1 permission

## [0.0.4] - 2017-03-03
### Added
- Test Runner & basic functionality unit tests added for RequireForAccess
- TravisCI support, with react matrix to ensure module is working across
supported versions.
- yarn

### Changed
- `README.md` has basic API information for the two primary components
- `peerDependencies` updated to allow broader `react` semver support

## [0.0.3] - 2017-03-03
### Fixed
- The default validator was fixed so it _actually_ works and doesn't throw.

## [0.0.2] - 2017-03-30
### Added
- a `CHANGELOG.md` 🎉

### Changed
- Quick Start example was not able to be copypasta'd, and had props
mixed up between components.
- removed full lodash from the bundle by only importing intersection
