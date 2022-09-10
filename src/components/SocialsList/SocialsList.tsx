import "./SocialsList.css";
import { Social } from "../../types";

interface SocialsListProps {
  socials: Social[];
}

export function SocialsList({ socials }: SocialsListProps) {
  return (
    <div className="socials">
      {socials.map(({ type, value, baseURL }) => (
        <a rel="noreferrer" target="_blank" href={baseURL + value}>
          <i className={`fa-brands fa-${type}`}></i>
        </a>
      ))}
    </div>
  );
}
