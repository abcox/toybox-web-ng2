import { Configuration } from "toybox-backend";

export const hostUrl = "http://localhost:3000";

const config = new Configuration({ basePath: hostUrl });

export { config };
