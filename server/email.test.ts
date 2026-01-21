import { describe, it, expect } from 'vitest';
import { verifyResendApiKey } from './email';

describe('Email Service - Resend', () => {
  it('should have a valid Resend API key configured', async () => {
    const result = await verifyResendApiKey();
    
    expect(result.valid).toBe(true);
    if (!result.valid) {
      console.error('Resend API key validation failed:', result.error);
    }
  }, 10000); // Timeout de 10 segundos para llamada a API
});
