const rating = require('./../model/rating');
const ratingSchema = require('./../model/rating');
const errorHandler = require('./../utils/error.handler');
const productSchema = require('../model/product');



class RatingController {


    async add(body){
		try{
			let response = await ratingSchema.create(body);
			return { status: "success",   msg:"Rating Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	

	async fetchdata(id){
		try{
			let response = await ratingSchema.find({_id:id});
			return response;	
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async topRatedproduct(){
		try{
			const result = await ratingSchema.aggregate([
				{
					$group: {
						_id: '$product',
						averageRating: { $avg: '$rating' },
						userCount: { $addToSet: "$userId" }
					}
				}
			]);
	
			const productsWithAverageRating = await Promise.all(result.map(async (item) => {
				const product = await productSchema.find({_id:item._id});
				console.log(product);
				return {
					product,
					averageRating: item.averageRating,
					UserCount:item.userCount.length
				};
			}));
	
			return productsWithAverageRating;
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async fetch(){
		try{
			let response = await ratingSchema.find();
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



    async delete(id){
		try{
			let response = await ratingSchema.deleteOne({_id: id});
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
            let response = await ratingSchema.update({_id: id}, body);
            return { status: "success", msg:"Category Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

	
}

       

module.exports=new RatingController();