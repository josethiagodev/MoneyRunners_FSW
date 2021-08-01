import express from 'express';
import mongoose from 'mongoose';
import Busboy from 'busboy';
import bcrypt from 'bcrypt';
import moment from 'moment';

// Importando AWS Service
import aws from '../services/aws.js';

const router = express.Router();

router.post('/', async (req, res) => {
   var busboy = new Busboy({ headers: req.headers });
   busboy.on('finish', async () => {
      try {
         // Criando ID do Usuário
         const userId = mongoose.Types.ObjectId();
         let photo = '';

         // UPLOAD DA IMAGEM
         // req.files = é o próprio arquivo
         if (req.files) {
            const file = req.files.photo;
            // Transformando os 'pontos' do nome em Array
            const nameParts = file.name.split('.');
            // Nome do arquivo
            const fileName = `${userId}.${nameParts[nameParts.length -1]}`;
            // Caminho final do arquivo
            photo = `users/${fileName}`;

            // Resposta
            const response = await aws.uploadToS3(file, photo);
            // Verificação da resposta do tipo 'error'
            if (response.error) {
               // Resposta via JSON
               res.json({
                  error: true, 
                  message: response.message,
               });
               return false;
            }
         }
         // Resposta via JSON após UPLOAD
         res.json({ message: 'Upload da imagem feito com sucesso' });

         // CRIAR USUÁRIO

      } catch (err) {
         res.json({ 
            error: true, 
            message: err.message 
         });
      }
   });
   req.pipe(busboy);
});

export default router;