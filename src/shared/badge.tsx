export interface BadgeProps {
  placeholder: string;
  color: string;
  fontColor?: string;
}

const Badge: React.FC<BadgeProps> = ({ placeholder, color, fontColor }) => {
  return (
    <div className={`${color} ${fontColor} px-4 py-1 rounded-full`}>
      {placeholder}
    </div>
  );
};

export default Badge;
