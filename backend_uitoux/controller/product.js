const productSchema = require('../model/product');
const errorHandler = require('../utils/error.handler');
const ratingSchema = require('../model/rating'); // Assuming you've exported your Rating model
const dotenv = require("dotenv");
var admin = require("firebase-admin");
var serviceAccount = require("../admin.json");
const product = require('../model/product');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://letschat-f9f77.firebaseio.com",
});

var storage = admin.storage();

const bucket = storage.bucket('gs://letschat-f9f77.appspot.com');

dotenv.config();

async function uploadImage(file) {
  try {
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }
    const fileName = `${Date.now()}` + file.originalname;
    var buffer = new Uint8Array(file.buffer);
    const url = await bucket
      .file(fileName)
      .getSignedUrl({ action: "read", expires: "03-01-2500" });
    await bucket.file(fileName).save(buffer, { resumable: true });
    return url;
  } catch (error) {
    return error.message;
  }
}


class ProductController {

  
    async add(body,files){
		
        try{
			if (!files || files.length === 0) {
			  return res.status(400).json({ error: 'No files were uploaded.' });
			}
			let url = await Promise.all(files.map(uploadImage));

			console.log(url[0][0]);
			body.imageUrl =url[0][0];
			let response =   await productSchema.create(body);
      return {
                status: 'success',
                msg: 'Product created',
				response:response
            }
        } catch(err){
            return {
                status: 'error',
                msg: 'Product creation failed'
            }
        }
    }

	
	async fetch(){
		try{

            
			let response = await productSchema.find({}).limit(4);
			let count=Object.keys(response).length;
			return {
				response: response,
				count:count
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
   
	async topRatedProducts(){
		try{
			let response = await productSchema.find({}).populate('averageRating').limit(4);
			let count=Object.keys(response).length;
			return {
				response: response,
				count:count
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async fetchdata(id){
		try{
			let response = await productSchema.find({_id:id});
			return response;	
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}


	async fetchByCategory(categoryId){
		try{
			let response = await productSchema.find({categoryId:categoryId});
			return response;	
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}


	async fetchBySploffer(){
		try{
			let response = await productSchema.find({}).sort({discountPrice: 1 }).limit(4);
			return response;	
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async delete(id){
		try{
			let response = await productSchema.deleteOne({_id: id});
			return {
				status: "success",
				response: response
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async update(id, body) {

        try {
            let response = await productSchema.update({_id: id}, body);
            return { status: "success", msg:"Product Updated successfully",result: response };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

	
}

       

module.exports=new ProductController();