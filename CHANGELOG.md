# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

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
