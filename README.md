# ftl
ftl - the fast template language for React UI components.

## What is ftl?

ftl is a fast template language for React UI components. It is a superset of the 
[ES6 template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) 
syntax, with a few additional features to make it easier to write React components.

[![npm version](https://img.shields.io/npm/v/ftl.svg)](https://www.npmjs.com/package/ftl)
[![Build Status](https://travis-ci.org/ftl/ftl.svg?branch=master)](https://travis-ci.org/ftl/ftl)

## example

```ftl
Box
    Grid container spacing={2}
        Grid item xs={6}
            Typography variant="h3" (Welcome to ${id} Staking Pool!!)
            Typography variant="subtitle1" (stake your tokens to earn more tokens)
```

is converted to:

```tsx
<Box>
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <Typography variant="h3">Welcome to {id} Staking Pool!!</Typography>
            <Typography variant="subtitle1">stake your tokens to earn more tokens</Typography>
        </Grid>
    </Grid>
</Box>
```

Usage:

```tsx
const template = ftl`
    Box
        Grid container spacing={2}
            Grid item xs={6}
                Typography variant="h3" (Welcome to ${id} Staking Pool!!)
                Typography variant="subtitle1" (stake your tokens to earn more tokens)
`
const Component = template({id: 'My Pool'})
ReactDOM.render(<Component />, document.getElementById('root'))
```

## Installation

`npm install ftl`

or

`yarn add ftl`

## ftl template files

ftl template files are just `.ftl` files. They can be imported into your
typescript or javascript files, and then used to create React components.

```tsx
import template from './template.ftl'
const Component = template({id: 'My Pool'})
ReactDOM.render(<Component />, document.getElementById('root'))
```

## ftl template strings

ftl template strings are just template strings. They can be used to create
React components.

```tsx
const template = ftl`
    Box
        Grid container spacing={2}
            Grid item xs={6}
                Typography variant="h3" (Welcome to ${id} Staking Pool!!)
                Typography variant="subtitle1" (stake your tokens to earn more tokens)
`
const Component = template({id: 'My Pool'})
ReactDOM.render(<Component />, document.getElementById('root'))
```

## ftl template functions

ftl template functions are just functions. They can be used to create
React components.

```tsx
const template = ftl`
    Box
        Grid container spacing={2}
            Grid item xs={6}
                Typography variant="h3" (Welcome to ${id} Staking Pool!!)
                Typography variant="subtitle1" (stake your tokens to earn more tokens)
`

## run the tests

`npm test`

## License

MIT
