const Button = ({ as: Component = 'button', variant = 'primary', className = '', ...props }) => (
  <Component className={`button button--${variant} ${className}`.trim()} {...props} />
)

export default Button
