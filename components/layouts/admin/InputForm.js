export default function InputForm ({ field, form, ...props }) {
  const {
    titleLabel = 'Email Address',
    id,
    name,
    value,
    pattern,
    labelClassName = '',
    inputClassname = '',
    placeholder,
    type,
    errors,
    touched
  } = props
  return (
    <div className='d-block input-wrapper mb-3'>
      <label
        htmlFor={id}
        className={`d-flex justify-content-between align-items-center pw-lable ${labelClassName}`}
      >
        {titleLabel}
      </label>
      <input
        {...field}
        type={type}
        id={id}
        value={value}
        pattern={pattern}
        name={name}
        className={`d-block w-100 fw-normal text-sm mt-1 py-2 px-3 ${inputClassname}`}
        placeholder={placeholder}
      />
      {errors && touched
        ? (
          <span className='validate-msg text-errors-form'>{errors}</span>
          )
        : null}
    </div>
  )
}
