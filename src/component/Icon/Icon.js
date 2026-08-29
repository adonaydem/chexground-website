import { Mail, Activity ,Twitter, GitHub, Layers, Cpu, Coffee, Archive } from "react-feather";

const icons = {
  mail: Mail,
  twitter: Twitter,
  github: GitHub,
  layers: Layers,
  activity: Activity,
  cpu: Cpu,
  coffee: Coffee,
  archive: Archive,
};

const Icon = ({ id, size, strokeWidth = 1, ...delegated }) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <span
      className="icon-wrapper"
      style={{
        "--size": size + "px",
        "--stroke-width": strokeWidth + "px",
      }}
      {...delegated}
    >
      <Component aria-hidden="true" size={size} />
    </span>
  );
};

export default Icon;
