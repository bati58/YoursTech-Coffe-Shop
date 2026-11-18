import cappuccino from "../assets/cappuccino.jpg";
import latte from "../assets/latte.jpg";
import mocha from "../assets/mocha.jpg";
import espresso from "../assets/espresso.jpg";
import americano from "../assets/americano.jpg";
import blackcoffee from "../assets/blackcoffee.jpg";
import caramelWhiteMocha from "../assets/caramel-white-mocha.jpg";
import coffeechocolate from "../assets/COFFEECHOCOLATE.jpg";

// Only categories that accurately describe the current products.
export const categories = ["Espresso", "Milk-Based Coffee", "Specialty Coffee"];

const products = [
  {
    id: 1,
    name: "Cappuccino",
    price: 180,
    category: "Milk-Based Coffee",
    description: "Rich espresso with steamed milk foam.",
    details:
      "A classic balance of espresso, steamed milk and a velvety crown of foam. Served in a warm cup and finished with latte art — smooth, comforting and perfectly layered.",
    image: cappuccino,
    popular: true,
  },
  {
    id: 2,
    name: "Mocha",
    price: 220,
    category: "Specialty Coffee",
    description: "Rich mocha with steamed milk foam.",
    details:
      "Espresso meets chocolate and steamed milk, topped with silky foam. An indulgent cup that feels like dessert and your morning coffee in one.",
    image: mocha,
    popular: true,
  },
  {
    id: 3,
    name: "Black Coffee",
    price: 130,
    category: "Espresso",
    description: "Strong black coffee.",
    details:
      "Simple, honest and full-bodied. Black coffee for those who want the pure character of the bean — no milk, no sugar, just a bold and aromatic cup.",
    image: blackcoffee,
  },
  {
    id: 4,
    name: "White Mocha",
    price: 260,
    category: "Specialty Coffee",
    description: "Caramel white mocha iced coffee.",
    details:
      "An iced caramel white mocha layered with creamy white chocolate, a caramel drizzle and whipped cream. Sweet, cool and wonderfully refreshing.",
    image: caramelWhiteMocha,
    popular: true,
  },
  {
    id: 5,
    name: "Espresso",
    price: 120,
    category: "Espresso",
    description: "Strong and bold espresso shot.",
    details:
      "The heart of every drink we serve: a concentrated shot with a deep, golden crema. Bold, rich and intense — best enjoyed straight away.",
    image: espresso,
  },
  {
    id: 6,
    name: "Latte",
    price: 200,
    category: "Milk-Based Coffee",
    description: "Rich latte with steamed milk foam.",
    details:
      "Smooth espresso layered with plenty of steamed milk and a light touch of foam. Mellow, creamy and easy to love at any time of day.",
    image: latte,
    popular: true,
  },
  {
    id: 7,
    name: "Coffee Chocolate",
    price: 230,
    category: "Specialty Coffee",
    description: "Strong and bold Coffee Chocolate.",
    details:
      "A bold coffee-and-chocolate creation finished with a rich chocolate topping. Deep, sweet and satisfying for true chocolate lovers.",
    image: coffeechocolate,
  },
  {
    id: 8,
    name: "Americano",
    price: 130,
    category: "Espresso",
    description: "Strong and bold Americano shot.",
    details:
      "Espresso lengthened with hot water for a clean, smooth cup that keeps the depth of espresso with a lighter, longer finish.",
    image: americano,
  },
];

export default products;
