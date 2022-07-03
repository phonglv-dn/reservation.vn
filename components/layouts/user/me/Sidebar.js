
export default function Sidebar (props) {
  return (
    <ul className='sidebar-nav d-flex flex-column w-100'>
      {props.children}
    </ul>
  )
}
