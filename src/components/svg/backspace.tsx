import { useTheme } from "@/components/theme-provider";

interface BackspaceSVGProps {
  className?: string;
  [key: string]: any;
}

const BackspaceSVG: React.FC<BackspaceSVGProps> = ({ className, ...props }) => {
  const { theme } = useTheme();

  let strokeColor = theme === "light" ? "black" : "white";

  if (theme === "system") {
    strokeColor = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "white"
      : "black";
  }

  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 103 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M38.6698 36.0596L32.5698 39.5396L38.8598 36.3896L38.6698 36.0596Z"
        stroke={strokeColor}
      />
      <path
        d="M75.6598 42.3996L64.3698 35.8796L52.9798 29.2996L30.3398 16.2296L23.6198 12.3496L2.02979 34.9196L23.6198 82.4296L80.5498 115.3V45.2196L75.6598 42.3996ZM56.3198 66.4896L67.4598 85.7196L67.0498 85.9596L61.3598 89.1996L55.6698 79.3896L50.0198 69.6396L44.3598 72.8596L38.6698 76.0996L32.5698 65.5696L38.8698 61.9796L43.9098 59.0996L32.5698 39.5396L38.6698 36.0596L38.8598 36.3896L50.0198 55.6196L61.3598 49.1496L61.9098 50.0996L61.9698 50.2096L67.4598 59.6896L58.0598 65.0496L56.1198 66.1496L56.3198 66.4896Z"
        stroke={strokeColor}
      />
      <path
        d="M56.1198 66.1496L56.3198 66.4896L50.0198 69.6396L44.3598 72.8596L38.6698 76.0996L32.5698 65.5696L39.0298 62.3396L52.5698 55.5696L58.0598 65.0496L56.1198 66.1496Z"
        stroke={strokeColor}
      />
      <path
        d="M67.4598 85.7195L67.0498 85.9595L61.3598 89.1995L55.6698 79.3895L50.0198 69.6395L56.3198 66.4895L67.4598 85.7195Z"
        stroke={strokeColor}
      />
      <path
        d="M61.9698 50.2096L52.5698 55.5696L39.0298 62.3396L32.5698 65.5696L38.8698 61.9796L43.9098 59.0996L61.9098 50.0996L61.9698 50.2096Z"
        stroke={strokeColor}
      />
      <path
        d="M61.9098 50.0996L43.9098 59.0996L32.5698 39.5396L38.8598 36.3896L50.0198 55.6196L61.3598 49.1496L61.9098 50.0996Z"
        stroke={strokeColor}
      />
      <path
        d="M100.55 35.2197V105.3L80.5498 115.3V45.2197L83.8998 43.5397L100.55 35.2197Z"
        stroke={strokeColor}
      />
      <path
        d="M100.55 35.2196L83.8999 43.5396L80.5499 45.2196L75.6599 42.3996L64.3699 35.8796L52.9799 29.2996L30.3399 16.2296L23.6199 12.3496L43.6199 2.34961L100.55 35.2196Z"
        stroke={strokeColor}
      />
    </svg>
  );
};

export default BackspaceSVG;
