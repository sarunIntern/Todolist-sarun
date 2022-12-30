// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import middleware from "../../../middlewares/verifytoken"
// import auth from "../../middleware/token"
function handlers(req, res) {
    res.status(200).json([{ name: 'John Doe' }])
  }
  export default handlers