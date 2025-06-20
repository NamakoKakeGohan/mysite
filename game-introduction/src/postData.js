import userAvatar         from "./assets/userAvatar.png";
import Steam              from "./assets/thumbnail/Steam.jpg";
import Steam_top          from "./assets/thumbnail/Steam_top.png";
import MonsterHunterWilds from "./assets/thumbnail/MonsterHunterWilds.jpg";
import wilds_top          from "./assets/thumbnail/wilds_top.png";
import StreetFiter6       from "./assets/thumbnail/StreetFighter6.jpg";
import ST6_top            from "./assets/thumbnail/ST6_top.jpg";

const postData = [
  {
    postId: 100,
    appId: 2246340,
    appName: "Monster Hunter Wilds",
    appImages: [MonsterHunterWilds, wilds_top],
    user: {
      id: 123456,
      name: "じょん・すみす",
      avatar: userAvatar,
    },
    tags: ["アクション", "オープンワールド"],
    oneWard: "アクションが好きな人におすすめ",
    comment: "モンスターハンターシリーズの最新作で、広大なフィールドでモンスターを狩る爽快感が魅力です。",
    steamAppURL: "https://store.steampowered.com/app/2246340/Monster_Hunter_Wilds/",
    likeCount: 1,
    isLiked: false,
    formattedDate: "2025年4月1日",
  },
  {
    postId: 101,
    appId: 1364780,
    appName: "Street Fighter 6",
    appImages: [StreetFiter6, ST6_top],
    user: {
      id: 123456,
      name: "じょん・すみす",
      avatar: userAvatar,
    },
    tags: ["アクション", "格闘"],
    oneWard: "格闘ゲームの最高峰！",
    comment: "ストリートファイターシリーズの最新作で、グラフィックやゲームプレイが大幅に進化しています。",
    steamAppURL: "https://store.steampowered.com/app/1364780/Street_Fighter_6/",
    likeCount: 0,
    isLiked: false,
    formattedDate: "2025年4月30日",
  },
  {
    postId: 2233,
    appId: 646570,
    appName: "Slay the Spire",
    appImages: [Steam, Steam_top],
    user: {
      id: 777777,
      name: "スーパーオタクくん",
      avatar: userAvatar,
    },
    tags: ["カードゲームデッキ構築", "ローグライク"],
    oneWard: "デッキ構築ローグライクといえば！",
    comment: "有象無象のデッキ構築型ローグライクを乱造させた諸悪の根源。これをやらずしてデッキ構築型ローグライクは語れない。",
    steamAppURL: "https://store.steampowered.com/app/646570/Slay_the_Spire/",
    likeCount: 1,
    isLiked: false,
    formattedDate: "2025年4月3日",
  },
  {
    postId: 55,
    appId: 1245620,
    appName: "ELDEN RING",
    appImages: [Steam, Steam_top],
    user: {
      id: 777777,
      name: "スーパーオタクくん",
      avatar: userAvatar,
    },
    tags: ["ソウルライク", "オープンワールド"],
    oneWard: "フロムゲーの集大成",
    comment: "フロムソフトウェアの最新作で、広大なオープンワールドと緻密なストーリーが魅力です。",
    steamAppURL: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
    likeCount: 0,
    isLiked: false,
    formattedDate: "2025年2月14日",
  },
  {
    postId: 999,
    appId: 367520,
    appName: "Hollow Knight",
    appImages: [Steam, Steam_top],
    user: {
      id: 114514,
      name: "餅バター",
      avatar: userAvatar,
    },
    tags: ["メトロイドヴァニア", "アクション"],
    oneWard: "美しいアートスタイルと緻密なゲームプレイ",
    comment: "ホロウナイトは、手描きのアートスタイルと緻密なゲームプレイが魅力のメトロイドヴァニアです。探索と戦闘が絶妙に組み合わさっています。",
    steamAppURL: "https://store.steampowered.com/app/367520/Hollow_Knight/",
    likeCount: 999,
    isLiked: false,
    formattedDate: "2025年5月5日",
  },
];

// 日付が新しい順にソート（formattedDateを比較）
postData.sort((a, b) => {
  const dateA = new Date(
    a.formattedDate.replace(/年|月/g, "/").replace("日", "")
  );
  const dateB = new Date(
    b.formattedDate.replace(/年|月/g, "/").replace("日", "")
  );
  return dateB - dateA; // 新しい順
});

export default postData;
