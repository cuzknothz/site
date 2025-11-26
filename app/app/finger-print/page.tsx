'use client';
import { ClientInfo } from '@/app/app/finger-print/components/ClientInfo';
import { FingerFrintCtx } from '@/app/app/finger-print/components/Ctx';

export default function FingerFrintPage() {
  return (
    <FingerFrintCtx>
      <ClientInfo />
    </FingerFrintCtx>
  );
}
