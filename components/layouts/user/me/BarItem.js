
export default function Tab (props) {
  const {
    leftIcon,
    title,
    children
  } = props
  return (
    <a {...props} className={`bar-item px-4 py-3 mb-sm-3 ${props.active === props.item_id ? 'current-tab' : ''}`}>
      <span className='icon-button me-2'>{leftIcon}</span>
      {title || children}
    </a>
  )
}
