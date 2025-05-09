import userAvatar from "./assets/userAvatar.png";
import MonsterHunterWilds from "./assets/thumbnail/MonsterHunterWilds.jpg";
import StreetFiter6 from "./assets/thumbnail/StreetFighter6.jpg";
import wilds_top from "./assets/thumbnail/wilds_top.png";
import ST6_top from "./assets/thumbnail/ST6_top.jpg";

const postData = [
  {
    postId: 100,
    appId: 2246340,
    appName: "Monster Hunter Wilds",
    appImage: [
      MonsterHunterWilds,
      wilds_top,
    ],
    user: {
      id: 123456,
      name: "じょん・すみす",
      avatar: userAvatar,
    },
    tags: ["アクション", "オープンワールド"],
    oneWard: "アクションが好きな人におすすめ",
    comment:
      "モンスターハンターシリーズの最新作で、広大なフィールドでモンスターを狩る爽快感が魅力です。",
    steamAppURL:
      "https://store.steampowered.com/app/2246340/Monster_Hunter_Wilds/",
    favoriteCount: 810,
    formattedDate: "2025年4月1日",
  },
  {
    postId: 101,
    appId: 1364780,
    appName: "Street Fighter 6",
    appImage: [
      StreetFiter6,
      ST6_top,
    ],
    user: {
      id: 123456,
      name: "じょん・すみす",
      avatar: userAvatar,
    },
    tags: ["アクション", "格闘"],
    oneWard: "格闘ゲームの最高峰！",
    comment:
      "ストリートファイターシリーズの最新作で、グラフィックやゲームプレイが大幅に進化しています。",
    steamAppURL: "https://store.steampowered.com/app/1364780/Street_Fighter_6/",
    favoriteCount: 0,
    formattedDate: "2025年4月20日",
  },
];

export default postData;
