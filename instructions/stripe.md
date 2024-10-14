# Project Overview
This is a nextjs 14 project with MongoDB, NextAuth, Stripe, and TailwindCSS.

As part of a new feature, we are implementing a subscription model for users to access premium content. We will be using Stripe to handle the subscription process.

Users need to be able to:
1. Sign up for a plan - Done
2. View their subscription status - Done
   1. Include the plan tier and billing cycle - Done
   2. Include the next billing date
   3. Include the next billing amount - Done
   4. Include if they are currently subscribed - Done
   5. Include their renewal date or their cancellation date
3. Cancel their subscription
   1. Cancel should occur at the next billing date - Done
   2. Should be able to uncancel before the next billing date - Done
4. Change their plan
   1. Downgrade
      1. When downgrading, user should not be refunded! Keep until end of cycle..
      2. Downgrade should occur at the next billing date
   2. Upgrade
      1. Upgrade should occur immediately
      2. Upgrade should be prorated for the rest of the cycle
   3. Change billing cycle (monthly/annual)
      1. This should occur at the next billing date
      2. Users should also be able to change both the plan tier and billing cycle in the same request
5. Update their payment method
   1. Update should occur immediately
   2. Should be able to update the card on file
   3. Should be notified if their card is declined or if payment fails
   4. Should be able to update their payment method
   5. Should be notified if their card is about to expire
6. View their invoices
   1. Include the invoice date, amount, and any discounts

Keep the current project structure as is.
