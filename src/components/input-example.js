export const Input = ({
  label,
  type,
  pristine,
  valid,
  errorMsg,
  ...rest
}) => {
  const Component = type || InputTypeText
  const showError = !pristine && !valid

  return (
    <div>
      <label>{label}</label>
      <Component {...rest} />
      <small>{showError && errorMsg}</small>
    </div>
  )
}
