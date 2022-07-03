export default function InputForm ({ field, form, ...props }) {
  const {
    titleLabel = 'Email Address',
    id,
    name,
    value,
    pattern,
    labelClassName,
    inputClassname,
    placeholder,
    type,
    disabled,
    readOnly,
    errors,
    touched
  } = props
  return (
    <div className='d-block input-wrapper py-2'>
      <label
        htmlFor={id}
        className={`d-flex justify-content-between align-items-center bg-white ${labelClassName}`}
      >
        {titleLabel}
      </label>
      <input
        {...field}
        type={type}
        id={id}
        name={name}
        value={value}
        pattern={pattern}
        className={`d-block w-100 fw-normal text-sm mt-2 py-2 px-3 bg-white ${inputClassname}`}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}

      />
      {errors && touched
        ? (
          <div className='validate-msg'>
            <span>{errors}</span>
          </div>
          )
        : null}
    </div>
  )
}
