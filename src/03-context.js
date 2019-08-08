import React from 'react'

// src/count/count-context.js
const CountContext = React.createContext()
const CountDContext = React.createContext()

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  return context
}

function useDCount() {
  const context = React.useContext(CountDContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountDProvider`)
  }
  return context
}

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => [count, setCount], [count])
  return <CountContext.Provider value={value} {...props} />
}

function CountDProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => [count, setCount], [count])
  return <CountDContext.Provider value={value} {...props} />
}

// export {CountProvider, useCount}

////////////////

// src/count/page.js

// import {CountProvider, useCount} from './count-context'

function Counter() {
  const [count, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function DCounter() {
  const [count, setCount] = useDCount()
  const increment = () => setCount(c => c - 1)
  return <button onClick={increment}>{count}</button>
}

function CountDDisplay() {
  const [count] = useDCount()
  return <div>The current counter count is {count}</div>
}

function CountDisplay() {
  const [count] = useCount()
  return <div>The current counter count is {count}</div>
}

function CountPage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
      <CountDProvider>
        <CountDDisplay />
        <DCounter />
      </CountDProvider>
    </div>
  )
}

export default CountPage
