const element = <h1>Hello World</h1>
const element = <h1>Execute expressions! {2+2}</h1>

// Under the hood without JSX
// React.createElement(type, [props], [...children])
const element = React.createElement('h1', null, `Hello World`)
const element = React.createElement('h1', null, `Execute expressions! ${2+2}`)
