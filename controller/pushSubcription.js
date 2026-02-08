const PushSubscription = require("../model/PushSubscription");

// save Notification subscription data 

exports.subscribeAdmin = async (req, res) => {
  try {
    const { subscription, deviceInfo } = req.body;
    

    await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        deviceInfo,
        isActive: true,
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Notifications enabled" });
  } catch (err) {
    res.status(500).json({ message: "Subscription failed" });
  }
};


// turn off notification controller then subscription data will be removed from db 

exports.unsubscribeAdmin = async (req, res) => {
  try {
    const { endpoint } = req.body;

    await PushSubscription.deleteOne({ endpoint });

    res.status(200).json({ message: "Notifications disabled" });
  } catch (err) {
    res.status(500).json({ message: "Unsubscribe failed" });
  }
};
