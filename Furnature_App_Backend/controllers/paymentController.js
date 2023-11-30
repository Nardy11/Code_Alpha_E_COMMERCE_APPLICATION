const stripe = require('stripe')("sk_test_51OHw9NKANFH79V7KSONbSo66xZK9g9aUCpnoD8CgCM0f8pV5mCVgjrxDg5WpEvfZZB0BRQ9rgl9CBmS30U0G3fYW00axuSuLBc");

module.exports = {
  intent: async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      console.log('Received Amount on Server:', req.body.amount);

      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }
};
