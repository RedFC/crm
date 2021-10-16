import * as _ from "lodash";
import * as fs from "fs";
import * as fsP from "fs/promises";

import { Cloudinary } from "../../../../constants/cloudinary";
import { ErrorService } from "../../../services/error.service";
const config = require('config');

export class ProductImages {

  

  // async Imageuploader(error, files, next) {
  //   try {
      
  //     const image = async (path: any, name: any) => { // MINI Function
  //       try {
  //         const cloudinary = new Cloudinary()
  //         return await cloudinary.uploads(path, `${name}`);
  //       } catch (error) {
  //         console.log(error, "SOMETHING HAPPENED")
  //         return null
  //       }
  //     }
  //     if (files) {
  //       let images: ICloudinaryUpload[] = await Promise.all(files.map(async file => {
  //         console.log("File ===> ", file)
  //         let pathSplit = file.path.split(config.get('SlashENV'))[2].split('.').slice(0, -1).join('.')
  //         console.log("splitPath", pathSplit)
  //         const imgURL = await image(file.path, pathSplit)
  //         fs.unlink(file.path, () => { console.log(`Deleted ${file.path}`) });
  //         return imgURL;
  //       }))
  //       images = _.filter(images, (o) => { return o != null })
        
  //       if (images.length > 0) {
  //         let imagesArray = images.map(i => { return { cloudinaryId: i.id, path: i.url } });
  //         return next(imagesArray);
  //       } else {
  //         return error({ success: false, msg: "Nothing to upload", status: 409 });
  //       }
  //     } else {
  //       return error({ success: false, msg: "File Not Found", status: 400 });
  //     }
  //   } catch (error) {
  //     return error({ success: false, msg: error.message, status: 500 });
  //   }

  // }

  // async ImageuploaderV2(res,body,fields, next) {
  //   try {
  //     let { files } = body;
  //     const image = async (path: any, name: any) => { // MINI Function
  //       try {
  //         const cloudinary = new Cloudinary()
  //         return await cloudinary.uploads(path, `${name}`);
  //       } catch (error) {
  //         console.log(error, "SOMETHING HAPPENED")
  //         return null
  //       }
  //     }
  //     if (files) {
  //       fields.map(async x => {
  //           let images: ICloudinaryUpload[] = await Promise.all(files[x].map(async file => {
  //               // console.log("File ===> ", file)
  //               let pathSplit = file.path.split(config.get('SlashENV'))[2].split('.').slice(0, -1).join('.')
  //               // console.log("splitPath", pathSplit)
  //               const imgURL = await image(file.path, pathSplit)
  //               fs.unlink(file.path, () => { 
  //                   // console.log(`Deleted ${file.path}`) 
  //               });
  //               imgURL['type'] = x
  //               return imgURL;
  //             }))
  //             images = _.filter(images, (o) => { return o != null })
              
  //             if (images.length > 0) {
  //               let imagesArray = images.map(i => { return { cloudinaryId: i.id, path: i.url ,type : i['type']} });
  //               return next(imagesArray);
  //             } else {
  //               return ErrorService.handler(res, 500, { success: false, msg: "Nothing to upload", status: 500 });
  //             }
  //       })
  //     } else {
  //       return ErrorService.handler(res, 500, { success: false, msg: "File Not Found", status: 500 });
  //     }
  //   } catch (error) {
  //    return ErrorService.handler(res,500,{ success: false, msg: error.message, status: 500 });
  //   }

  // }


}