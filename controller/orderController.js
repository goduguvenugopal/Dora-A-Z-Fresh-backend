const Order = require("../model/Order");
const sendAdminPush = require("../utils/sendAdminPush");

//  creating place order constroller
const saveOrder = async (request, response) => {
  try {
    const id = request.userId;
    const {
      orderedProdcuts,
      shippingAddress,
      orderStatus,
      totalAmount,
      delayMessage,
    } = request.body;
    if (
      !id ||
      !orderedProdcuts ||
      !shippingAddress ||
      !orderStatus ||
      !totalAmount
    ) {
      return response.status(404).json({ message: "required order details" });
    }
    const currentDate = new Date().toLocaleDateString("en-GB");
    const placeOrder = new Order({
      userId: id,
      orderedProdcuts,
      shippingAddress,
      orderStatus,
      delayMessage,
      totalAmount,
      orderStatusDate: currentDate,
      orderDate: currentDate,
    });
    await placeOrder.save();

    // extract customer name
    const customerName = shippingAddress?.[0]?.name || "Customer";

    // SEND PUSH
  await sendAdminPush({
      title: "🛒 New Order Received",
      body: `You got an order from ${customerName} • ₹${totalAmount}`,
      url: "/",
    });

    return response.status(201).json({ message: "order placed successful" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get all orders controller
const getAllOrders = async (request, response) => {
  try {
    const retrievedAllOrders = await Order.find();
    return response
      .status(200)
      .json({ message: "all orders retrieved successful", retrievedAllOrders });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update order controller
const orderUpdateController = async (request, response) => {
  try {
    const { orderStatus } = request.body;
    const id = request.params.id;
    const orderUpdatedDate = new Date().toLocaleDateString("en-GB");
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { orderStatus: orderStatus, orderStatusDate: orderUpdatedDate } },
      { new: true },
    );

    // extract customer name safely
    const customerName = updatedOrder.shippingAddress?.[0]?.name || "Customer";

    // 🔔 SEND PUSH TO ADMIN
   await sendAdminPush({
      title: "📦 Order Status Updated",
      body: `Order from ${customerName} is now ${orderStatus}`,
      url: `/order_over_view/${id}`,
    });

    return response.status(200).json({
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update order controller
const updateAllController = async (request, response) => {
  try {
    const id = request.params.id;
    const updateDelayOrder = request.body;
    await Order.findByIdAndUpdate(
      id,
      { $set: updateDelayOrder },
      { new: true },
    );
    return response.status(200).json({
      message: "Order details updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = {
  saveOrder,
  getAllOrders,
  orderUpdateController,
  updateAllController,
};
