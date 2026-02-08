const PushSubscription = require("../model/PushSubscription");
const webpush = require("../config/webpush");

const sendAdminPush = async ({ title, body, url }) => {
  try {
    const subscriptions = await PushSubscription.find({ isActive: true });

    if (!subscriptions.length) return;

    const payload = JSON.stringify({ title, body, url });

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys,
          },
          payload
        );
      } catch (err) {
        // auto cleanup expired subscriptions
        if (err.statusCode === 404 || err.statusCode === 410) {
          await PushSubscription.deleteOne({ endpoint: sub.endpoint });
        }
      }
    }
  } catch (error) {
    console.error("Push error:", error.message);
  }
};

module.exports = sendAdminPush;
