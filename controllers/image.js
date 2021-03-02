import Clarifai from "clarifai";
import { json } from "express";

const ClarifAI = new Clarifai.App({
    apiKey: "3de3a381a8354375b3482d9a2567a27d",
  });

const handleApiCall = (req, res) => {
    ClarifAI.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
} 

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users ")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0]);
      })
      .catch((err) => res.status(400).json("unable to fetch the count"));
  };
export default {
    handleImage,
    handleApiCall

}