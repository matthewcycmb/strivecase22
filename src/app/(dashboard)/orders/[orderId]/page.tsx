"use client";

import { useState, useEffect, use } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ORDER_STATUSES } from "@/lib/constants";

interface OrderDetail {
  id: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  status: keyof typeof ORDER_STATUSES;
  escrow_status: string;
  shipping_carrier: string | null;
  tracking_number: string | null;
  estimated_delivery: string | null;
  timeline: { status: string; timestamp: string; note: string }[];
  created_at: string;
  manufacturers: { business_name: string; verification_status: string; location_city: string; location_country: string } | null;
  product_briefs: { title: string; category: string; description: string } | null;
}

export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, manufacturers(*), product_briefs(*)")
      .eq("id", orderId)
      .single();
    setOrder(data as OrderDetail);
    setLoading(false);
  };

  if (loading || !order) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  const statusInfo = ORDER_STATUSES[order.status] || ORDER_STATUSES.pending_payment;

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 gap-2 text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{order.product_briefs?.title}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
            <span>{order.manufacturers?.business_name}</span>
            {order.manufacturers?.verification_status === "verified" && (
              <CheckCircle className="h-3 w-3 text-blue-400" />
            )}
          </div>
        </div>
        <Badge className={`text-white ${statusInfo.color}`}>{statusInfo.label}</Badge>
      </div>

      {/* Order Summary */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-500">Total Amount</p>
          <p className="text-2xl font-bold text-white">${order.total_amount?.toLocaleString()}</p>
        </Card>
        <Card className="border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-500">Quantity</p>
          <p className="text-2xl font-bold text-white">{order.quantity} units</p>
          <p className="text-xs text-zinc-500">${order.unit_price}/unit</p>
        </Card>
        <Card className="border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-500">Escrow</p>
          <p className="text-2xl font-bold text-white capitalize">{order.escrow_status?.replace(/_/g, " ")}</p>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="mb-6 border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Order Timeline</h2>
        <div className="space-y-0">
          {order.timeline && order.timeline.map((event, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                {i < order.timeline.length - 1 && (
                  <div className="h-12 w-px bg-white/10" />
                )}
              </div>
              <div className="pb-8">
                <p className="font-medium text-white">{event.status}</p>
                <p className="text-sm text-zinc-400">{event.note}</p>
                <p className="text-xs text-zinc-500">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {/* Future steps */}
          {["Quality Check", "Shipping", "Delivered"].map((step) => {
            const isReached = order.timeline?.some((e) => e.status === step);
            if (isReached) return null;
            return (
              <div key={step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10">
                    {step === "Shipping" ? (
                      <Truck className="h-4 w-4 text-zinc-600" />
                    ) : step === "Delivered" ? (
                      <Package className="h-4 w-4 text-zinc-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-zinc-600" />
                    )}
                  </div>
                  {step !== "Delivered" && (
                    <div className="h-12 w-px bg-white/10" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="font-medium text-zinc-600">{step}</p>
                  <p className="text-sm text-zinc-700">Pending</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Shipping Info */}
      {order.shipping_carrier && (
        <Card className="border-white/10 bg-white/5 p-4">
          <h3 className="mb-2 font-semibold text-white">Shipping Details</h3>
          <Separator className="mb-3 bg-white/10" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Carrier</span>
              <span className="text-white">{order.shipping_carrier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Tracking Number</span>
              <span className="font-mono text-white">{order.tracking_number}</span>
            </div>
            {order.estimated_delivery && (
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Delivery</span>
                <span className="text-white">{new Date(order.estimated_delivery).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
