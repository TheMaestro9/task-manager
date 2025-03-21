export interface BadgeProps {
  placeholder: string;
  color: string;
  fontColor?: string;
  leadingIcon?: React.ReactNode;
}
const Badge: React.FC<BadgeProps> = ({
  placeholder,
  color,
  fontColor,
  leadingIcon,
}) => {
  return (
    <div
      className={`${color} ${fontColor} w-fit px-4 py-1 rounded-full text-xs flex items-center gap-2`}
    >
      {leadingIcon && <span>{leadingIcon}</span>}
      {placeholder}
    </div>
  );
};

export default Badge;
