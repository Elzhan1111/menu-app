// src/App.jsx
import React, { useState } from 'react';
import { MENU_DATA, ALL_ITEMS } from './menuData';

export default function OrderMenu() {
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);

  const POSTMAN_MOCK_URL = 'https://КОД_ВАШЕГО_MOCK_СЕРВЕРА.mock.pstmn.io/order';

  const handleCheckboxChange = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? 0 : 1,
    }));
  };

  const incrementCount = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrementCount = (id) => {
    setQuantities((prev) => {
      const currentCount = prev[id] || 0;
      if (currentCount <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: currentCount - 1 };
    });
  };

  const subtotal = ALL_ITEMS.reduce((sum, item) => {
    const count = quantities[item.id] || 0;
    return sum + (item.price * count);
  }, 0);

  const serviceCharge = Math.round(subtotal * 0.1);
  const totalWithService = subtotal + serviceCharge;

    // Замените старую функцию отправки на этот готовый код для WhatsApp:
    const handleTestPostRequest = () => {
        // Собираем только выбранные блюда
        const orderedItems = ALL_ITEMS.filter(item => quantities[item.id] > 0).map(item => ({
          name: item.name,
          price: item.price,
          quantity: quantities[item.id],
          total_item_price: item.price * quantities[item.id]
        }));
    
        if (orderedItems.length === 0) {
          alert('Пожалуйста, выберите позиции из меню!');
          return;
        }
    
        // ВПИШИТЕ СЮДА СВОЙ НОМЕР ТЕЛЕФОНА (Начинается с 7, без плюсов и пробелов)
        const MY_WHATSAPP_NUMBER = '77052042550'; 
    
        // Формируем красивый текст для сообщения
        let message = `🌲 *НОВЫЙ ЗАКАЗ — Горы • Река* 🌲\n`;
        message += `───────────────────\n`;
        
        orderedItems.forEach((item, index) => {
          message += `*${index + 1}. ${item.name}*\n`;
          message += `   └ ${item.quantity} шт. х ${item.price} тг = *${item.total_item_price} тг*\n`;
        });
        
        message += `───────────────────\n`;
        message += `💵 *Сумма блюд:* ${subtotal} тг\n`;
        message += `⚙️ *Обслуживание (10%):* ${serviceCharge} тг\n`;
        message += `💰 *ИТОГО К ОПЛАТЕ:* *${totalWithService} тг*`;
    
        // Кодируем текст, чтобы WhatsApp его правильно прочитал
        const encodedMessage = encodeURIComponent(message);
    
        // Создаем прямую ссылку на быстрый чат
        // const whatsappUrl = `https://wa.me{MY_WHATSAPP_NUMBER}?text=${encodedMessage}`;
        // Самый надежный вариант без косых кавычек:
        const whatsappUrl = "https://wa.me/" + MY_WHATSAPP_NUMBER + "?text=" + encodedMessage;

        // Мгновенно открываем чат с готовым текстом заказа
        window.open(whatsappUrl, '_blank');
        
        // По желанию сбрасываем корзину на сайте
        setQuantities({}); 
      };
    

  const renderCategory = (title, items) => (
    <div style={{ marginBottom: '25px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #2e7d32' }}>
      {/* Хвойно-зеленая линия под заголовком категории */}
      <h3 style={{ borderBottom: '2px solid #2e7d32', paddingBottom: '5px', marginTop: 0, color: '#1b5e20', fontSize: '18px', fontWeight: 'bold' }}>{title}</h3>
      {items.map((item) => {
        const count = quantities[item.id] || 0;
        const isChecked = count > 0;

        return (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e8f5e9' }}>
            
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flex: 1, marginRight: '10px', color: '#000000', fontSize: '15px', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(item.id)}
                style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2e7d32' }}
              />
              <span style={{ fontWeight: isChecked ? '700' : '500', color: '#000000' }}>
                {item.name}
              </span>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              
              {/* Рамка счётчика теперь зеленая */}
              <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #2e7d32', borderRadius: '4px', overflow: 'hidden' }}>
                <button 
                  onClick={() => decrementCount(item.id)} 
                  type="button" 
                  style={{ width: '30px', height: '30px', border: 'none', background: '#c8e6c9', color: '#000000', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                >
                  -
                </button>
                <span style={{ width: '35px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', color: '#000000' }}>
                  {count}
                </span>
                <button 
                  onClick={() => incrementCount(item.id)} 
                  type="button" 
                  style={{ width: '30px', height: '30px', border: 'none', background: '#c8e6c9', color: '#000000', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                >
                  +
                </button>
              </div>

              <span style={{ fontWeight: '700', minWidth: '85px', textAlign: 'right', color: '#000000', fontSize: '16px' }}>
                {item.price * (count || 1)} тг
              </span>
            </div>

          </div>
        );
      })}
    </div>
  );

  return (
    // Главный фон страницы — мягкий природный зеленый цвет (#e8f5e9)
    <div style={{ backgroundColor: '#e8f5e9', minHeight: '100vh', padding: '20px 10px' }}>
      {/* Белая карточка меню со строгой лесной зеленой рамкой */}
      <div style={{ maxWidth: '650px', margin: '0 auto', padding: '25px', border: '3px solid #2e7d32', borderRadius: '12px', backgroundColor: '#ffffff', fontFamily: 'system-ui, sans-serif', boxShadow: '0 6px 20px rgba(27,94,32,0.12)' }}>
        
        <h1 style={{ textAlign: 'center', marginBottom: '25px', color: '#1b5e20', fontSize: '28px', fontWeight: '900' }}>🌲 Меню Тургеньская форель</h1>

        {renderCategory('🐟 Форель', MENU_DATA.forel)}
        {renderCategory('🔥 Блюда на заказ', MENU_DATA.custom_orders)}
        {renderCategory('🍟 Гарниры', MENU_DATA.garniry)}
        {renderCategory('🥗 Салаты', MENU_DATA.salaty)}
        {renderCategory('☕ Чай и кофе', MENU_DATA.tea_coffee)}
        {renderCategory('🥤 Напитки', MENU_DATA.napitki)}
        {renderCategory('🥖 Хлебная корзина', MENU_DATA.bread)}
        {renderCategory('🍯 Дополнения', MENU_DATA.addons)}
        {renderCategory('⛺ Беседки и топчаны', MENU_DATA.besedki)}

        {/* Итоговый расчет */}
        <div style={{ borderTop: '2px dashed #2e7d32', paddingTop: '15px', marginTop: '25px', fontSize: '16px', color: '#000000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Сумма блюд:</span>
            <span style={{ fontWeight: '700' }}>{subtotal} тг</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span>Обслуживание (10%):</span>
            <span style={{ fontWeight: '700' }}>{serviceCharge} тг</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: '900', borderTop: '2px solid #2e7d32', paddingTop: '10px' }}>
            <span>Итого к оплате:</span>
            <span style={{ color: '#1b5e20' }}>{totalWithService} тг</span>
          </div>
        </div>

        {/* Сочная зеленая кнопка отправки заказа */}
        <button
          onClick={handleTestPostRequest}
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: loading ? '#aaaaaa' : '#4caf50',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '30px',
            boxShadow: '0 4px 10px rgba(76,175,80,0.3)',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2e7d32')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#4caf50')}
        >
          {loading ? 'Отправка заказа...' : '🚀 Отправить заказ'}
        </button>
      </div>
    </div>
  );
}
