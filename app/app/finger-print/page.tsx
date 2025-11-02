'use client';
import { ClientInfo } from '@/components/FingerPrint/ClientInfo';
import { FingerFrintCtx } from '@/components/FingerPrint/Ctx';

export default function FingerFrintPage() {
  return (
    <FingerFrintCtx>
      <ClientInfo />
    </FingerFrintCtx>
  );
}
