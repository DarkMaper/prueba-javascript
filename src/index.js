import 'dotenv/config';
import App from './server';

function bootstrap() {
    const app = new App();
    app.listen();
}

bootstrap();