export const types = {
  TOGGLE_SUBSCRIPTION_REQUESTED:
    'TOGGLE_SUBSCRIPTION_REQUESTED:fundAdministration:melon.fund',
  TOGGLE_SUBSCRIPTION_SUCCEEDED:
    'TOGGLE_SUBSCRIPTION_SUCCEEDED:fundAdministration:melon.fund',
  TOGGLE_SUBSCRIPTION_FAILED:
    'TOGGLE_SUBSCRIPTION_FAILED:fundAdministration:melon.fund',
  TOGGLE_REDEMPTION_REQUESTED:
    'TOGGLE_REDEMPTION_REQUESTED:fundAdministration:melon.fund',
  TOGGLE_REDEMPTION_SUCCEEDED:
    'TOGGLE_REDEMPTION_SUCCEEDED:fundAdministration:melon.fund',
  TOGGLE_REDEMPTION_FAILED:
    'TOGGLE_REDEMPTION_FAILED:fundAdministration:melon.fund',
  CONVERT_UNCLAIMED_REWARDS_REQUESTED:
    'CONVERT_UNCLAIMED_REWARDS_REQUESTED:fundAdministration:melon.fund',
  CONVERT_UNCLAIMED_REWARDS_SUCCEEDED:
    'CONVERT_UNCLAIMED_REWARDS_SUCCEEDED:fundAdministration:melon.fund',
  CONVERT_UNCLAIMED_REWARDS_FAILED:
    'CONVERT_UNCLAIMED_REWARDS_FAILED:fundAdministration:melon.fund',
  SHUTDOWN_REQUESTED: 'SHUTDOWN_REQUESTED:fundAdministration:melon.fund',
  SHUTDOWN_SUCCEEDED: 'SHUTDOWN_SUCCEEDED:fundAdministration:melon.fund',
  SHUTDOWN_FAILED: 'SHUTDOWN_FAILED:fundAdministration:melon.fund',
};

export const actions = {
  toggleSubscription: () => ({
    type: types.TOGGLE_SUBSCRIPTION_REQUESTED,
  }),
  toggleSubscriptionFailed: reason => ({
    type: types.TOGGLE_SUBSCRIPTION_FAILED,
    reason,
  }),
  toggleSubscriptionSucceeded: subscriptionAllowed => ({
    type: types.TOGGLE_SUBSCRIPTION_SUCCEEDED,
    subscriptionAllowed,
  }),
  toggleRedemption: () => ({
    type: types.TOGGLE_REDEMPTION_REQUESTED,
  }),
  toggleRedemptionFailed: reason => ({
    type: types.TOGGLE_REDEMPTION_FAILED,
    reason,
  }),
  toggleRedemptionSucceeded: redemptionAllowed => ({
    type: types.TOGGLE_REDEMPTION_SUCCEEDED,
    redemptionAllowed,
  }),
  convertUnclaimedRewards: () => ({
    type: types.CONVERT_UNCLAIMED_REWARDS_REQUESTED,
  }),
  convertUnclaimedRewardsFailed: reason => ({
    type: types.CONVERT_UNCLAIMED_REWARDS_FAILED,
    reason,
  }),
  convertUnclaimedRewardsSucceeded: () => ({
    type: types.CONVERT_UNCLAIMED_REWARDS_SUCCEEDED,
  }),
  shutdown: () => ({
    type: types.SHUTDOWN_REQUESTED,
  }),
  shutdownFailed: reason => ({
    type: types.SHUTDOWN_FAILED,
    reason,
  }),
  shutdownSucceeded: () => ({
    type: types.SHUTDOWN_SUCCEEDED,
  }),
};
