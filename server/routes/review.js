const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', (req, res) => {
  // Do some thing
});

router.post('/', async(req, res) => {
    let reviews = JSON.parse(fs.readFileSync('../halodoc/src/database/doctorReviews.json'))

    const doctor = reviews.find((doctor) => doctor.doctor_id === req.body.id);

    if (doctor){
        const doctorReviews = reviews.find((doctor) => doctor.doctor_id === req.body.id).reviews;
        if (doctorReviews){

            const thisEmail = doctorReviews.find((review) => review.email === req.body.email)

            if (!thisEmail){
              const newReview = {
                email: req.body.email,
                rating: req.body.rating,
                review: req.body.review
              };

              doctorReviews.push(newReview);

              const totalRatings = doctorReviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
              const averageRating = totalRatings / doctorReviews.length;
              doctor.rating = averageRating.toFixed(1);
              
              try {
                  const data = JSON.stringify(reviews, null, 2);
                  fs.writeFileSync('../halodoc/src/database/doctorReviews.json', data);
                  console.log('Review added successfully!');
                  res.send('Sucessfully submit review');
                } catch (err) {
                  console.error(`Error writing to file: ${err}`);
                  res.send('Fail to submit review');
                }
            }
            else {
              const totalRatings = doctor.rating * doctorReviews.length - thisEmail.rating + req.body.rating;

              thisEmail.rating = req.body.rating;
              thisEmail.review = req.body.review;
              
              const averageRating = totalRatings / doctorReviews.length;
              doctor.rating = averageRating.toFixed(1);

              try {
                const data = JSON.stringify(reviews, null, 2);
                fs.writeFileSync('../halodoc/src/database/doctorReviews.json', data);
                console.log('Review added successfully!');
                res.send('Sucessfully submit review');
              } catch (err) {
                console.error(`Error writing to file: ${err}`);
                res.send('Fail to submit review');
              }
            }
            
        }
        
    }
    else{
        const newReview = {
            doctor_id: req.body.id,
            rating: req.body.rating,
            reviews: [
              {
                email: req.body.email,
                rating: req.body.rating,
                review: req.body.review
              }
            ]
        }
        reviews.push(newReview);
        try {
            const data = JSON.stringify(reviews, null, 2);
            fs.writeFileSync('../halodoc/src/database/doctorReviews.json', data);
            console.log('Review added successfully!');
            res.send('Sucessfully submit review');
          } catch (err) {
            console.error(`Error writing to file: ${err}`);
            res.send('Fail to submit review');
          }
    }
})  

module.exports = router;