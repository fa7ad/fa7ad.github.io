declare module '*.md' {
  export const metadata: RawMetadata
  type component = React.ElementType
  export default component
}
