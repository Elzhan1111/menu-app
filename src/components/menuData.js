// src/menuData.js

export const MENU_DATA = {
    forel: [
      { id: 'f1', name: 'Форель 1 кг', price: 5500 },
      { id: 'f2', name: 'Жарка форели 1 шт', price: 550 },
      { id: 'f3', name: 'Чистка форели 1 шт', price: 100 },
      { id: 'f4', name: 'Уха из форели 1 порц', price: 650 },
      { id: 'f5', name: 'Готовая жаренная форель 1 шт', price: 3100 },
    ],
    custom_orders: [
      { id: 'c1', name: 'Сірне 5 порций', price: 13500 },
      { id: 'c2', name: 'Плов 5 порций', price: 10500 },
      { id: 'c3', name: 'Шашлык баранина', price: 2000 },
      { id: 'c4', name: 'Шашлык окорочка', price: 1800 },
      { id: 'c5', name: 'Хычины', price: 1500 },
      { id: 'c6', name: 'Буреки с сыром', price: 550 },
      { id: 'c7', name: 'Наггетсы', price: 1150 },
      { id: 'c8', name: 'Пицца Маргарита', price: 2350 },
      { id: 'c9', name: 'Пицца Пепперони', price: 2750 },
    ],
    garniry: [
      { id: 'g1', name: 'Рис', price: 550 },
      { id: 'g2', name: 'Картофель фри', price: 1150 },
      { id: 'g3', name: 'Картофель по-деревенски', price: 1250 },
    ],
    salaty: [
      { id: 's1', name: 'Морковный', price: 1050 },
      { id: 's2', name: 'Ачучук', price: 1450 },
      { id: 's3', name: 'Свежий', price: 1550 },
      { id: 's4', name: 'С заправкой (масло/майонез)', price: 1850 },
      { id: 's5', name: 'Малибу', price: 2150 },
      { id: 's6', name: 'Кавказский', price: 2250 },
      { id: 's7', name: 'Греческий', price: 2350 },
      { id: 's8', name: 'Цезарь', price: 2450 },
      { id: 's9', name: 'Баклажаны в кисло-сладком соусе', price: 2750 },
    ],
    tea_coffee: [
      { id: 'tc1', name: 'Чай Чёрный/Зелёный', price: 600 },
      { id: 'tc2', name: 'Чай с лимоном/молоком', price: 750 },
      { id: 'tc3', name: 'Чай с мятой', price: 850 },
      { id: 'tc4', name: 'Чай Ташкентский', price: 1250 },
      { id: 'tc5', name: 'Кружка чая', price: 350 },
      { id: 'tc6', name: 'Кофе, кружка', price: 450 },
      { id: 'tc7', name: 'Кипяток', price: 200 },
    ],
    napitki: [
      { id: 'n1', name: 'Кола 1 л', price: 1050 },
      { id: 'n2', name: 'Сок натуральный 1 л', price: 1150 },
      { id: 'n3', name: 'Лимонад 1 л', price: 800 },
      { id: 'n4', name: 'Вода 1 л', price: 600 },
    ],
    bread: [
      { id: 'b1', name: 'Лепёшка', price: 450 },
      { id: 'b2', name: 'Баурсаки 12 шт', price: 1200 },
    ],
    addons: [
      { id: 'a1', name: 'Кетчуп, майонез', price: 200 },
      { id: 'a2', name: 'Лимон 1 шт', price: 800 },
      { id: 'a3', name: 'Мёд, сметана', price: 800 },
    ],
    besedki: [
      { id: 'bs1', name: 'Беседка', price: 5000 },
      { id: 'bs2', name: 'Большая беседка', price: 10000 },
      { id: 'bs3', name: 'Топчаны', price: 6000 },
    ]
  };
  
  // Плоский список для быстрого поиска
  export const ALL_ITEMS = Object.values(MENU_DATA).flat();
  