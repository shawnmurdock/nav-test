import { Icon, type IconName } from '../Icon';
import './IconTile.css';

export interface IconTileProps {
  icon: IconName;
  title: string;
  onClick?: () => void;
  className?: string;
}

export function IconTile({ icon, title, onClick, className = '' }: IconTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`icon-tile ${className}`}
    >
      <div className="icon-tile-icon">
        <Icon name={icon} size={20} />
      </div>
      <span className="icon-tile-title">{title}</span>
    </button>
  );
}

export default IconTile;
