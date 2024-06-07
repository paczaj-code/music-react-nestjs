const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  type = 'button',
  onClick,
  style,
}) => {
  return (
    <button type={type} className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
