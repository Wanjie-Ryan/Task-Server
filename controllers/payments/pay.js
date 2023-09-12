const paymentModel = require("../../models/payments/pay");
const UserModel = require("../../models/RegLog/reglog");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const CreatePayment = async (req, res) => {
  try {
    const {
      Message,
      Success,
      Status,
      Amount,
      transaction_code,
      transaction_reference,
    } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to do a payment" });
    }

    const decodedToken = jwt.verify(token, process.env.user_secret_key);
    const userId = decodedToken.userId;

    const findOneUser = await UserModel.findById(userId);

    if (!findOneUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "User does not exist, therefore, cannot do a payment",
      });
    }

    const newPayment = await paymentModel.create({
      Message,
      Success,
      Status,
      Amount,
      transaction_code,
      transaction_reference: userId,
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Payment has been received successfully", newPayment });
  } catch (err) {
    // console.log(err)

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

// const getAllPayments = async(req,res)=>{

//     try{

//         const allPayment = await paymentModel.find({})

//         return res.status(StatusCodes.OK).json({msg:'Payments are:', allPayment})

//     }
//     catch(err){

//         res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ msg: "Something went wrong, please try again later" });

//     }
// }

module.exports = { CreatePayment };
