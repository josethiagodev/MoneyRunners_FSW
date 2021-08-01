import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import busboy from 'connect-busboy';
import busboyBodyParser from 'busboy-body-parser';

// Importando as rotas
import userRoutes from './src/routes/user.routes.js';

const app = express();

app.use(morgan('dev'));
// Receber JSON nas rotas
app.use(express.json());
// Middlewares (Funções BusBoy)
app.use(busboy());
app.use(busboyBodyParser());
// Cuidar do acesso das rotas
app.use(cors());

// Criando as rotas (Middlewares)
app.use('/users', userRoutes);

// Escultar e usar porta
app.listen(8000, () => {
   console.log('AWS rodando');
});