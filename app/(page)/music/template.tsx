import { type PropsWithChildren } from 'react'
import RunSideEffect from './scrollToLatest'

export default function Wrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      {children}
      <RunSideEffect />
    </>
  )
}
