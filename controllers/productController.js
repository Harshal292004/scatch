const productModel=require('../models/product-model')

module.exports.createdProduct=async (req, res)=> {
    try {

        let {
            productName,
            productDescription,
            price,
            sizes,
            quantity,
            tags,
            category,
            brand,
            colors,
            backgroundColor,
            textColor,
            material,
        } = req.body



        // Handle array fields
        sizes = Array.isArray(sizes) ? sizes[0].split(',') : []
        tags = Array.isArray(tags) ? tags[0].split(',') : []
        colors = Array.isArray(colors) ? colors[0].split(',') : []

        const product = await productModel.create({
            productName,
            productDescription,
            price,
            sizes,
            quantity,
            tags,
            picture : req.file.buffer,
            category,
            brand,
            colors,
            backgroundColor,
            textColor,
            material
        })



        if(product){
            req.flash('success','Product created successfully!!')
            return  res.status(200).redirect('/owners/shop')
        }
        else{
            req.flash('error','Unable to create the product')
            return res.status(501).redirect('/owners/addProduct')
        }
    } catch (err) {
        console.error('Error in product creation:'+ err)
        req.flash('error','Error in product creation')
        return res.status(501).redirect('/owners/addProduct')
    }
}