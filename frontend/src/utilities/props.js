// copied from react-markdown for passing props to element renderers
export function getCoreProps(props) {
  return props['data-sourcepos'] ? { 'data-sourcepos': props['data-sourcepos'] } : {};
}
