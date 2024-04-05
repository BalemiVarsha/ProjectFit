
const {config}=require('dotenv');
const AWS = require('aws-sdk');
const fs = require('fs');


config()
const s3 = new AWS.S3({
  // Set your AWS credentials and region here
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECREATEACCESSKEY,
  region: process.env.AWS_REGION
});

const uploadToS3 = (file,projectId) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);
    const ext = file.originalname.split('.')[1];
    console.log(process.env.AWS_BUCKETNAME)
    const params = {
      Bucket: process.env.AWS_BUCKETNAME,
      Body: fileStream,
    //   ACL: 'public-read',
      Key: projectId+".pdf",
      ContentType: file.mimetype
    };

    s3.upload(params, (err, data) => {
      if (err) {
     //   console.error('Error uploading to S3:', err);
        reject(err);
      } else {
       // console.log("File Uploaded Successfully", data.Location);
        resolve(data.Location);
      }
    });
  });
};



const retrieveFromS3 = (projectId) => {
  return new Promise((resolve, reject) => {
    console.log("==========>"+projectId);
    const params = {
      Bucket: process.env.AWS_BUCKETNAME,
      Key: projectId + ".pdf" // Assuming the file name in S3 is projectId.pdf
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        //console.error('Error retrieving file from S3:', err);
        reject(err);
      } else {
      //  console.log("File retrieved from S3");
        resolve(data.Body);
      }
    });
  });
};




module.exports = {uploadToS3,retrieveFromS3}
