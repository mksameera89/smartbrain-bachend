const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");


 hadleApiCall = (req, res) => {
    const IMAGE_URL = req.body.imgUrl;
    const stub = ClarifaiStub.grpc();

    // This will be used by every Clarifai endpoint call
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + "a94a3b651a634c1caca3eca1e181388b");
    
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": "clarifai",
                "app_id": "main"
            },
            model_id: "face-detection",
            // version_id: "6dc7e46bc9124c5c8824be4822abe105",  // This is optional. Defaults to the latest model version
            inputs: [
                { data: { image: { url: IMAGE_URL } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }  
            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }          
            res.json(response);
        }
    );
    
 }

const handleImage = (req, res, db) => {
    const {id} = req.body;
        db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
}

module.exports = {
    handleImage,
    hadleApiCall
}