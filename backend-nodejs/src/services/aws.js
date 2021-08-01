import AWS from 'aws-sdk';

export default {
   // Configurando AWS Service
   IAM_USER_KEY: 'AKIAUU63PBUYYGIR45DT',
   IAM_USER_SECRET: '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',
   BUCKET_NAME: 'money-runners-nodejs',
   AWS_REGION: 'us-east-2',

   // Carregando Arquivo do S3 (UPLOAD)
   uploadToS3: function (file, filename, acl = 'public-read') {
      return new Promise((resolve, reject) => {
         let IAM_USER_KEY = this.IAM_USER_KEY;
         let IAM_USER_SECRET = this.IAM_USER_SECRET;
         let BUCKET_NAME = this.BUCKET_NAME;

         // Nomeando e acessando o Bucket S3
         let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME,
         });

         // Acessando Bucket S3 + Criando
         s3bucket.createBucket(function () {
            // Parâmetros do UPLOAD
            var params = {
               Bucket: BUCKET_NAME,
               Key: filename, // Chave: Nome do arquivo
               Body: file.data, // Arquivo
               ACL: acl, // Nível de acesso de controle
            };

            // Acessando Bucket S3 + Fazendo UPLOAD
            s3bucket.upload(params, function (err, data) {
               if (err) {
                  return resolve({ 
                     error: true, 
                     message: err.message 
                  });
               }
               console.log(data);
               return resolve({ error: false, message: data });
            });
         });
      });
   },

   // Deletando Arquivo S3 (DELETE)
   deleteFileS3: function (key) {
      return new Promise((resolve, reject) => {
         let IAM_USER_KEY = this.IAM_USER_KEY;
         let IAM_USER_SECRET = this.IAM_USER_SECRET;
         let BUCKET_NAME = this.BUCKET_NAME;

         // Nomeando e acessando o Bucket S3
         let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME,
         });

         s3bucket.createBucket(function () {
            s3bucket.deleteObject(
               {
                  Bucket: BUCKET_NAME,
                  Key: key,
               },
               function (err, data) {
                  if (err) {
                     console.log(err);
                     return resolve({ error: true, message: err });
                  }
               console.log(data);
                  return resolve({ error: false, message: data });
               }
            );
         });
      });
   },
};