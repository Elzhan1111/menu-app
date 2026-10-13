// src/App.jsx
import React, { useState } from 'react';
import { MENU_DATA, ALL_ITEMS } from './menuData';
import { IoSend } from 'react-icons/io5';


export default function OrderMenu() {
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);

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

  const getNextOrderNumber = () => {
    const now = new Date().getTime();
    const savedTime = localStorage.getItem('order_timer');
    const savedNumber = localStorage.getItem('order_number');
    let currentNumber = 1;

    if (!savedTime || now - parseInt(savedTime) > 24 * 60 * 60 * 1000) {
      localStorage.setItem('order_timer', now.toString());
      localStorage.setItem('order_number', '1');
    } else {
      currentNumber = parseInt(savedNumber || '0') + 1;
      localStorage.setItem('order_number', currentNumber.toString());
    }
    return currentNumber;
  };

  const handleTestPostRequest = () => {
    const orderedItems = ALL_ITEMS.filter(item => (quantities[item.id] || 0) > 0).map(item => ({
      name: item.name,
      price: item.price,
      quantity: quantities[item.id],
      total_item_price: item.price * quantities[item.id]
    }));

    if (orderedItems.length === 0) {
      alert('Пожалуйста, выберите позиции из меню (нажимайте + на доступных блюдах)!');
      return;
    }

    const MY_WHATSAPP_NUMBER = '77052042550'; 
    const orderNumber = getNextOrderNumber();

    let message = `📋 *ЗАКАЗ №${orderNumber}*\n`;
    message += `🌲 *НОВЫЙ ЗАКАЗ — Горы • Река* 🌲\n`;
    message += `───────────────────\n`;
    
    orderedItems.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*\n`;
      message += `   └ ${item.quantity} шт. х ${item.price} тг = *${item.total_item_price} тг*\n`;
    });
    
    message += `───────────────────\n`;
    message += `💵 *Сумма блюд:* ${subtotal} тг\n`;
    message += `⚙️ *Обслуживание (10%):* ${serviceCharge} тг\n`;
    message += `💰 *ИТОГО К ОПЛАТЕ:* *${totalWithService} тг*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = "https://wa.me/" + MY_WHATSAPP_NUMBER + "?text=" + encodedMessage;

    window.open(whatsappUrl, '_blank');
    setQuantities({}); 
  };

  const renderCategory = (title, items) => (
    <div style={{ marginBottom: '20px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #2e7d32' }}>
      <h3 style={{ borderBottom: '2px solid #2e7d32', paddingBottom: '5px', marginTop: 0, color: '#1b5e20', fontSize: '18px', fontWeight: 'bold' }}>{title}</h3>
      {items.map((item) => {
        const count = quantities[item.id] || 0;
        const isChecked = count > 0;
        const isStaticItem = ['bs1', 'bs2', 'bs3', 'f1', 'f2', 'f3', 'f4'].includes(item.id);

        return (
          <div key={item.id} className="menu-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e8f5e9', gap: '10px' }}>
            {isStaticItem ? (
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginRight: '10px', color: '#000000', fontSize: '15px', userSelect: 'none', minWidth: '0' }}>
                <span style={{ fontWeight: '500', color: '#000000', wordBreak: 'break-word' }}>
                  {item.name}
                </span>
              </div>
            ) : (
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flex: 1, color: '#000000', fontSize: '15px', userSelect: 'none', minWidth: '0' }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(item.id)}
                  style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2e7d32', flexShrink: 0 }}
                />
                <span style={{ fontWeight: isChecked ? '700' : '500', color: '#000000', wordBreak: 'break-word' }}>
                  {item.name}
                </span>
              </label>
            )}

            <div className="controls-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              {!isStaticItem && (
                <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #2e7d32', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                  <button onClick={() => decrementCount(item.id)} type="button" style={{ width: '28px', height: '28px', border: 'none', background: '#c8e6c9', color: '#000000', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>-</button>
                  <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>{count}</span>
                  <button onClick={() => incrementCount(item.id)} type="button" style={{ width: '30px', height: '30px', border: 'none', background: '#c8e6c9', color: '#000000', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>+</button>
                </div>
              )}
              <span style={{ fontWeight: '700', minWidth: '75px', textAlign: 'right', color: '#000000', fontSize: '15px', flexShrink: 0 }}>
                {item.price * (count || 1)} тг
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ backgroundColor: '#e8f5e9', minHeight: '100vh', padding: '10px 5px' }}>
      <style>{`
        .main-card { max-width: 650px; margin: 0 auto; padding: 25px; border: 3px solid #2e7d32; border-radius: 12px; background-color: #ffffff; fontFamily: system-ui, sans-serif; box-shadow: 0 6px 20px rgba(27,94,32,0.12); }
        .section-divider { margin: 35px 0 25px 0; padding: 10px; background-color: #2e7d32; color: #ffffff; text-align: center; font-weight: 800; font-size: 16px; border-radius: 6px; letter-spacing: 1px; text-transform: uppercase; }
        @media (max-width: 480px) {
          .main-card { padding: 12px !important; border-width: 2px !important; border-radius: 8px !important; }
          .menu-item { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          .controls-wrapper { width: 100% !important; justify-content: space-between !important; }
          h1 { font-size: 22px !important; margin-bottom: 15px !important; }
          .section-divider { font-size: 14px !important; margin: 25px 0 15px 0; }
        }
      `}</style>

      <div className="main-card">
        <h1 style={{ textAlign: 'center', marginBottom: '25px', color: '#1b5e20', fontSize: '28px', fontWeight: '900' }}>🌲 Меню Тургеньская форель</h1>

        <div className="section-divider">Добро пожаловать! Приятного отдыха! 
           Пойманную форель желательно сдать на жарку самостоятельно </div>
        {renderCategory('🐟 Форель', MENU_DATA.forel)}
        {renderCategory('🔥 Блюда на заказ', MENU_DATA.custom_orders)}
        {renderCategory('🍟 Гарниры', MENU_DATA.garniry)}
        {renderCategory('🥗 Салаты', MENU_DATA.salaty)}
        {renderCategory('☕ Чай и кофе', MENU_DATA.tea_coffee)}
        {renderCategory('🥤 Напитки', MENU_DATA.napitki)}
        {renderCategory('🥖 Хлебная корзина', MENU_DATA.bread)}
        {renderCategory('🍯 Дополнения', MENU_DATA.addons)}

        <div className="section-divider ">После оформления заказа вас перенаправит на 
         watsapp нажмите кнопку Отправить <IoSend/> для завершения заказа</div>
         
        {renderCategory('⛺ Беседки и топчаны', MENU_DATA.besedki)}

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

        <button onClick={handleTestPostRequest} disabled={loading} style={{ width: '100%', padding: '16px', backgroundColor: loading ? '#aaaaaa' : '#4caf50', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '18px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '30px', boxShadow: '0 4px 10px rgba(76,175,80,0.3)', transition: 'background 0.2s' }}>
          🚀 Оформить заказ
        </button>
      </div>
    </div>
  );
}
