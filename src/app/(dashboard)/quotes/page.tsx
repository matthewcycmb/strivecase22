"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Globe, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface QuoteWithRelations {
  id: string;
  brief_id: string;
  manufacturer_id: string;
  quantity_requested: number;
  unit_price: number | null;
  total_price: number | null;
  estimated_lead_time_days: number | null;
  response_notes: string | null;
  additional_notes: string | null;
  status: string;
  created_at: string;
  manufacturers: { business_name: string; verification_status: string; website_url: string | null } | null;
  product_briefs: { title: string } | null;
}

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-500/20 text-yellow-400" },
  responded: { label: "Responded", className: "bg-green-500/20 text-green-400" },
  accepted: { label: "Accepted", className: "bg-blue-500/20 text-blue-400" },
  declined: { label: "Declined", className: "bg-red-500/20 text-red-400" },
};

export default function QuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<QuoteWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const acceptQuote = async (quoteId: string, briefId: string, manufacturerId: string) => {
    const supabase = createClient();

    // Update quote status
    await supabase.from("quotes").update({ status: "accepted" }).eq("id", quoteId);

    // Find the quote to create order
    const quote = quotes.find((q) => q.id === quoteId);
    if (!quote || !quote.unit_price) return;

    // Create order
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("orders").insert({
      brief_id: briefId,
      quote_id: quoteId,
      manufacturer_id: manufacturerId,
      user_id: user.id,
      quantity: quote.quantity_requested,
      unit_price: quote.unit_price,
      total_amount: quote.total_price,
      status: "paid",
      timeline: [
        { status: "Order Placed", timestamp: new Date().toISOString(), note: "Order confirmed and payment processed" },
        { status: "In Production", timestamp: new Date(Date.now() + 7 * 86400000).toISOString(), note: "Manufacturing has begun" },
      ],
    });

    if (error) {
      toast.error("Failed to create order");
      return;
    }

    // Update brief status
    await supabase.from("product_briefs").update({ status: "ordered" }).eq("id", briefId);

    toast.success("Quote accepted! Order created.");
    router.push("/orders");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1615]">Quotes</h1>
        <p className="text-[#757170]">Manage your manufacturer quote requests</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-[#f4f1ee]" />
          ))}
        </div>
      ) : quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="mb-4 h-16 w-16 text-[#e5dfda]" />
          <h2 className="mb-2 text-xl font-semibold text-[#1a1615]">No quotes yet</h2>
          <p className="text-[#757170]">Match with manufacturers to request quotes</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => {
            const style = STATUS_STYLES[quote.status] || STATUS_STYLES.pending;
            const isSample = quote.additional_notes?.includes("[SAMPLE ORDER]") || false;
            return (
              <Card key={quote.id} className="border-[#e5dfda] bg-white shadow-[0_4px_50px_#614a440f] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold text-[#1a1615]">
                        {quote.product_briefs?.title || "Untitled"}
                      </h3>
                      <Badge className={style.className}>{style.label}</Badge>
                      {isSample && (
                        <Badge className="gap-1 bg-purple-500/20 text-purple-400">
                          <Package className="h-3 w-3" />
                          Sample
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#757170]">
                      <span>{quote.manufacturers?.business_name}</span>
                      {quote.manufacturers?.verification_status === "verified" && (
                        <CheckCircle className="h-3 w-3 text-blue-400" />
                      )}
                      {quote.manufacturers?.website_url && (
                        <a
                          href={quote.manufacturers.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                        >
                          <Globe className="h-3 w-3" />
                          <span className="underline">Website</span>
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[#757170]">
                      Qty: {quote.quantity_requested} units | Requested: {new Date(quote.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {quote.status === "responded" && quote.unit_price && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#1a1615]">${quote.unit_price}</p>
                      <p className="text-xs text-[#757170]">per unit</p>
                      <p className="text-sm font-medium text-[#453f3d]">
                        Total: ${quote.total_price?.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                {quote.status === "responded" && quote.response_notes && (
                  <div className="mt-3 rounded-lg bg-[#f4f1ee] p-3">
                    <p className="text-sm text-[#453f3d]">{quote.response_notes}</p>
                    {quote.estimated_lead_time_days && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-[#757170]">
                        <Clock className="h-3 w-3" />
                        Estimated lead time: {quote.estimated_lead_time_days} days
                      </p>
                    )}
                  </div>
                )}

                {quote.status === "responded" && (
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => acceptQuote(quote.id, quote.brief_id, quote.manufacturer_id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Accept Quote
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#e5dfda] text-[#757170]"
                    >
                      Decline
                    </Button>
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
