import { MenuType } from "@/types/menu"
import anh1 from "../assets/images/Container.png";
import anh2 from "../assets/images/Link.png";
import anh3 from "../assets/images/Container (1).png";
import anh4 from "../assets/images/Container (2).png";
import anh5 from "../assets/images/Container (3).png";
import anh6 from "../assets/images/Container (6).png";
import anh7 from "../assets/images/Container (4).png";
import anh8 from "../assets/images/Container (5).png";
import anh9 from "../assets/images/Container (6).png";
import anh10 from "../assets/images//Container (7).png";


export const MENU: MenuType[] = [
  {
    title: "Home",
    path: "/",
    children: [],
  },
]
interface products {
  id: string,
  name: string,
  price: string
  imageUrl: string
}

export const Products = [
  {
    id: "1",
    name: "Áo khoác nam",
    price: 450000,
    imageUrl: anh1,
  },
  {
    id: "2",
    name: "Quần jean đen",
    price: 350000,
    imageUrl: anh2,
  },
  {
    id: "3",
    name: "Áo sơ mi trắng",
    price: 250000,
    imageUrl: anh3,
  },
  {
    id: "4",
    name: "Áo thun thể thao",
    price: 180000,
    imageUrl: anh4,
  },
  {
    id: "5",
    name: "Áo khoác nữ",
    price: 550000,
    salePrice: 450000,
    imageUrl: anh5,
  },
  {
    id: "6",
    name: "Áo thun họa tiết",
    price: 220000,
    imageUrl: anh6,
  },
  {
    id: "7",
    name: "Quần jogger",
    price: 320000,
    originalPrice: 550000,
    imageUrl: anh7,
  },
  {
    id: "8",
    name: "Áo hoodie",
    price: 420000,
    imageUrl: anh8,
  },
  {
    id: "9",
    name: "Áo polo",
    price: 280000,
    imageUrl: anh9,
  },
  {
    id: "10",
    name: "Áo len",
    price: 380000,
    imageUrl: anh10,
  },
]