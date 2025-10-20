type getLoggerProps = {
  prefix: string;
  color: string;
};

export const getLogger =
  ({ color, prefix }: getLoggerProps) =>
  (...messages: unknown[]) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ms = now.getMilliseconds().toString().padStart(4, "0");
    const timestamp = `${hours}:${minutes}:${seconds}.${ms}`;

    console.log(`%c[${prefix}] ${timestamp}`, `color: ${color}`, ...messages);
  };
