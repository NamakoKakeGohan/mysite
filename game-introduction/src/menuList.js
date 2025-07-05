import homeIcon    from './assets/home.svg';
import rankingIcon from './assets/ranking.svg';
import tagsIcon    from './assets/tags.svg';
import testIcon    from './assets/test.svg';
import accountIcon from './assets/account.svg';
import optionIcon  from './assets/option.svg';

const menuList = [
  { id: 1, path: "/", src: homeIcon, alt: "ホームアイコン", name: "Home" },
  { id: 2, path: "/ranking", src: rankingIcon, alt: "ランキングアイコン", name: "Ranking" },
  { id: 3, path: "/tags", src: tagsIcon, alt: "タグアイコン", name: "Tags" },
  { id: 4, path: "/test", src: testIcon, alt: "テストアイコン", name: "Test" },
  { id: 5, path: "/account", src: accountIcon, alt: "アカウントアイコン", name: "Account" },
  { id: 6, path: "option", src: optionIcon, alt: "オプションアイコン", name: "Option" },
];

export default menuList;