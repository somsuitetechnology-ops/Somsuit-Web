"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cmsApi, CmsApiError } from "@/lib/cms-api";
import { Loader2, Eraser, PenLine } from "lucide-react";
import { toast } from "sonner";

export default function ContractSignPage() {
  const params = useParams();
  const token = typeof params.token === "string" ? params.token : "";
  const qc = useQueryClient();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [agreed, setAgreed] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["public", "contract", token],
    queryFn: () => cmsApi.getPublicContract(token),
    enabled: !!token,
  });

  const signMu = useMutation({
    mutationFn: (signature: string) => cmsApi.signPublicContract(token, signature),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["public", "contract", token] });
      toast.success("Signature saved", {
        description: "Thank you. The contract is marked as signed.",
      });
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Could not save signature");
    },
  });

  const initCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const w = 480;
    const h = 160;
    c.width = w * dpr;
    c.height = h * dpr;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas, data?.alreadySigned]);

  const pos = (e: React.MouseEvent | React.TouchEvent) => {
    const c = canvasRef.current;
    if (!c) return { x: 0, y: 0 };
    const r = c.getBoundingClientRect();
    if ("touches" in e && e.touches[0]) {
      return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    }
    const me = e as React.MouseEvent;
    return { x: me.clientX - r.left, y: me.clientY - r.top };
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    if (data?.alreadySigned) return;
    drawing.current = true;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current || data?.alreadySigned) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const end = () => {
    drawing.current = false;
  };

  const clearPad = () => {
    initCanvas();
  };

  const submit = () => {
    if (!agreed) {
      toast.error("Please confirm you agree to the terms.");
      return;
    }
    const c = canvasRef.current;
    if (!c) return;
    const sig = c.toDataURL("image/png");
    signMu.mutate(sig);
  };

  if (!token) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center text-muted-foreground">
        Invalid link.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
        Loading contract…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center text-destructive">
        {(error as Error).message}
      </div>
    );
  }

  if (!data) return null;

  const isEmployee = data.contractKind === "employee";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isEmployee ? "ICT employment contract" : "Commercial agreement"} — read
          carefully before signing.
        </p>
      </div>

      <Card className="mb-8 border border-border/80 bg-card p-6 shadow-sm">
        <div className="space-y-2 text-sm">
          {(data.partyName || data.partyEmail) && (
            <div>
              <span className="font-semibold text-foreground">Counterparty: </span>
              {[data.partyName, data.partyEmail].filter(Boolean).join(" · ")}
            </div>
          )}
          {isEmployee && data.employeeName && (
            <div>
              <span className="font-semibold text-foreground">Employee: </span>
              {data.employeeName}
            </div>
          )}
          {isEmployee && data.ceoName && (
            <div>
              <span className="font-semibold text-foreground">Company signatory: </span>
              {data.ceoName}
            </div>
          )}
        </div>
        <div className="mt-6 whitespace-pre-wrap border-t border-border pt-6 font-mono text-xs leading-relaxed text-foreground md:text-sm">
          {data.content}
        </div>
      </Card>

      {data.alreadySigned ? (
        <Card className="border-accent/30 bg-accent/5 p-6 text-center">
          <p className="font-medium text-foreground">This contract is already signed.</p>
          {data.signedAt && (
            <p className="mt-1 text-sm text-muted-foreground">
              Recorded: {new Date(data.signedAt).toLocaleString()}
            </p>
          )}
        </Card>
      ) : (
        <Card className="space-y-6 border border-border/80 p-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
            />
            <Label htmlFor="agree" className="text-sm leading-snug cursor-pointer">
              I have read this agreement and agree to be bound by its terms. I understand
              this electronic signature has the same effect as a handwritten signature.
            </Label>
          </div>

          <div>
            <Label className="mb-2 flex items-center gap-2">
              <PenLine className="h-4 w-4" />
              Sign below (mouse or touch)
            </Label>
            <canvas
              ref={canvasRef}
              className="touch-none rounded-md border-2 border-dashed border-border bg-white"
              onMouseDown={start}
              onMouseMove={move}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={(e) => {
                e.preventDefault();
                start(e);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                move(e);
              }}
              onTouchEnd={end}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={clearPad}
            >
              <Eraser className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={signMu.isPending}
            onClick={submit}
          >
            {signMu.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit signature"
            )}
          </Button>
        </Card>
      )}
    </div>
  );
}
