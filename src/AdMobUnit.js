const TestAd = {
  Banner: 'ca-app-pub-3940256099942544/6300978111',
  AppOpen: 'ca-app-pub-3940256099942544/3419835294',
  Interstitial: 'ca-app-pub-3940256099942544/1033173712',
  Rewarded: 'ca-app-pub-3940256099942544/5224354917',
};

const footer = !__DEV__
  ? 'ca-app-pub-3444194669126701/6340575589'
  : TestAd.Banner;

const useless = !__DEV__
  ? 'ca-app-pub-3444194669126701/6296381544'
  : TestAd.Banner;

const disableAdsTemporary = !__DEV__
  ? 'ca-app-pub-3444194669126701/2712359756'
  : TestAd.Rewarded;


export default {
  Banner: {
    Footer: footer,
  },
  Rewarded: {
    Premium: disableAdsTemporary,
  },
};
