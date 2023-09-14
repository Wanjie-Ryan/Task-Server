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
      transaction_reference,
      transaction_code,
    } = req.body;

    const newPayment = await paymentModel.create({
      Message,
      Success,
      Status,
      Amount,
      transaction_reference,
      transaction_code,
    });
    // console.log(newPayment)

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

const getAllPayments = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to do a payment" });
    }

    const decodedToken = jwt.verify(token, process.env.user_secret_key);
    const userId = decodedToken.userId;
    // console.log(userId)

    const findOneUser = await UserModel.findById(userId);

    if (!findOneUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "User does not exist, therefore, cannot do a payment",
      });
    }

    const allPayment = await paymentModel.find({transaction_reference:userId}).sort({createdAt:-1}).limit(1)
    // console.log(allPayment)

    // const userPayment = allPayment.filter((payment) =>
    //   payment.transaction_reference.equals(userId)
    // );
    

    // console.log(userPayment)
    // console.log(userPayment)
    if (allPayment.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No payment has been transacted by userId:${userId}` });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Payments are:",latestpayment: allPayment[0] });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { CreatePayment, getAllPayments };
