import http from 'http';
import 'dotenv/config';
import { requestListener } from './requestListener';

const PORT: string = process.env.PORT || '4000';

const app = http.createServer(requestListener);
export const startApp = (): void => {
    app.listen(PORT, () => {
        console.log(`Server run on the PORT:${PORT}`);
    });
};
