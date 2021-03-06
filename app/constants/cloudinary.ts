require('dotenv').config();
const cloudinary = require('cloudinary');
const { reject } = require('lodash');
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    env_variable: process.env.CLOUDINARY_ENV_VARIABLE
});

export class Cloudinary {

    uploads(file, name){

        return new Promise((resolve, reject) => {
            try {
                cloudinary.uploader.unsigned_upload(file, "vl9apwwg", {
                    unique_filename: true,
                    public_id: name,
                    resource_type: "raw",
                }).then(function (result,error) {
                    if(result){
                        resolve({
                            url: result.url,
                            id: result.public_id
                        })
                    }else{
                        // console.log(error);
                        reject(error)
                    }
                })
            } catch (error) {
                // console.log(error)
                reject(error)
            }
        })
    }

    remove(cloudinaryId) {
        return new Promise(resolve => {
            cloudinary.uploader.destroy(cloudinaryId, (result) => {
                // console.log(result);
                resolve({
                    url: result.url,
                    id: result.public_id
                })
            })
        })
    }

}