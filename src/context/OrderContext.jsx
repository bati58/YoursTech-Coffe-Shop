/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { safeParse } from "../utils/format";

const ORDERS_KEY = "orders";
const OrderContext = createContext(null);

function readOrders() {
  const parsed = safeParse(localStorage.getItem(ORDERS_KEY), []);
  return Array.isArray(parsed) ? parsed : [];
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(readOrders);

  const createOrder = useCallback(({ user, items, customer = {}, totals }) => {
    const normalizedItems = items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity }));
    const subtotal = normalizedItems.reduce((s, i) => s + i.price * i.quantity, 0);

    const order = {
      id: crypto.randomUUID(),
      userEmail: user.email,
      customerName: customer.name || `${user.firstName} ${user.lastName}`.trim(),
      phone: customer.phone || "",
      note: customer.note || "",
      items: normalizedItems,
      subtotal,
      tax: totals?.tax ?? 0,
      fee: totals?.fee ?? 0,
      total: totals?.total ?? subtotal,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => {
      const next = [order, ...prev];
      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
      } catch {
        /* ignore storage errors */
      }
      return next;
    });
    return order;
  }, []);

  const getOrdersByEmail = useCallback((email) => orders.filter((o) => o.userEmail === email), [orders]);

  const value = useMemo(() => ({ orders, createOrder, getOrdersByEmail }), [orders, createOrder, getOrdersByEmail]);
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  return useContext(OrderContext);
}
