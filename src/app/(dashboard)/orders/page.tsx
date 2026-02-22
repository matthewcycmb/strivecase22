"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ORDER_STATUSES } from "@/lib/constants";

interface OrderWithRelations {
  id: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  status: keyof typeof ORDER_STATUSES;
  shipping_carrier: string | null;
  tracking_number: string | null;
  estimated_delivery: string | null;
  timeline: { status: string; timestamp: string; note: string }[];
  created_at: string;
  manufacturers: { business_name: string; verification_status: string } | null;
  product_briefs: { title: string } | null;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, manufacturers(*), product_briefs(*)")
      .order("created_at", { ascending: false });
    setOrders((data || []) as OrderWithRelations[]);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1615]">Orders</h1>
        <p className="text-[#757170]">Track your manufacturing orders</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-[#f4f1ee]" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package className="mb-4 h-16 w-16 text-[#e5dfda]" />
          <h2 className="mb-2 text-xl font-semibold text-[#1a1615]">No orders yet</h2>
          <p className="text-[#757170]">Accept a quote to create your first order</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = ORDER_STATUSES[order.status] || ORDER_STATUSES.pending_payment;
            return (
              <Card
                key={order.id}
                onClick={() => router.push(`/orders/${order.id}`)}
                className="cursor-pointer border-[#e5dfda] bg-white shadow-[0_4px_50px_#614a440f] p-5 transition-colors hover:border-[#e5dfda] hover:bg-[#f4f1ee]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold text-[#1a1615]">
                        {order.product_briefs?.title || "Untitled"}
                      </h3>
                      <Badge className={`text-white ${statusInfo.color}`}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#757170]">
                      <span>{order.manufacturers?.business_name}</span>
                      {order.manufacturers?.verification_status === "verified" && (
                        <CheckCircle className="h-3 w-3 text-blue-400" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[#757170]">
                      {order.quantity} units @ ${order.unit_price}/unit
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-[#1a1615]">${order.total_amount?.toLocaleString()}</p>
                    <p className="text-xs text-[#757170]">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Mini Timeline */}
                {order.timeline && order.timeline.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#757170]">
                    {order.timeline.map((event, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        {event.status}
                        {i < order.timeline.length - 1 && (
                          <span className="mx-1 h-px w-4 bg-[#757170]" />
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
