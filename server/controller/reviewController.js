const Review = require("../models/reviews");

exports.createRivew = async (req, res) => {
  const user = req.Authorized.id;
  const { room, title, content, rating } = req.body;

  try {
    let existReview = await Review.findOne({ user: user, room: room });

    if (!existReview) {
      let review = await Review.create({
        room,
        user: user,
        title,
        content,
        rating,
      });
      return res
        .status(200)
        .json({ review, message: "rivew created successfully" });
    } else {
      return res.status(400).json({ message: "rivew already exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("room")
      .populate("user");
    res.status(200).json({ reviews, count: reviews.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

exports.getReviewById = async (req, res) => {
    const id = req.params.id  // the id is for the review , not for the user !!
  try {
    const review = await Review.findById(id).populate("room").populate("user");

    if (!review) {
      return res.status(404).json({message: "Review not found for user"})
    }

    res.status(200).json({review,message:"review found"});
  } catch (error) {
    res.status(500).json({message: error.message});
    console.log(error.message)
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({message: "Review not found"});
    }
    res.status(200).json({message: "Review deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
    console.log(error.message)
  }
};

exports.updateReviewStatus = async (req, res) => {
    const{id,status}=req.body
  try {
    const review = await Review.findByIdAndUpdate(id,{status},{ new: true})

    if (!review) {
      return res.status(404).json({message: "Review not found"});
    }

    res.status(200).json({message: "Review status changed successfully",review});
  } catch (error) {
    res.status(500).json({message: error.message});
    console.log(error.message)
  }
};
