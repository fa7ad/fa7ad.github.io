declare module '*.mdx' {
  export const metadata: RawMetadata
  type component = React.ElementType
  export default component
}
