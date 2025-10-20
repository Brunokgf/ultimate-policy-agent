// /.netlify/functions/processarFila.js
import fetch from 'node-fetch';
import { getBlob, putBlob } from '@netlify/blob';
import QRCode from 'qrcode';

const TITAN_API = 'https://api.titanshub.io/v1/transactions';
const TITAN_API_KEY = process.env.EXAMPLE_KEY; // ⚡ Chave segura via Netlify ENV
const authValue = Buffer.from(`${TITAN_API_KEY}:x`).toString('base64');
const BLOBS_KEY = 'fila-pedidos';
const LOTE = 2;

async function lerFila() {
  const blob = await getBlob(BLOBS_KEY);
  if (!blob) return [];
  return JSON.parse(await blob.text());
}

async function escreverFila(fila) {
  await putBlob(BLOBS_KEY, JSON.stringify(fila, null, 2), { contentType: 'application/json' });
}

export async function handler() {
  try {
    const fila = await lerFila();
    if (!fila.length)
      return { statusCode: 200, body: JSON.stringify({ ok: true, msg: 'Fila vazia' }) };

    const pedidosParaProcessar = fila.slice(0, LOTE);
    const pedidosRestantes = fila.slice(LOTE);
    const resultados = [];

    for (const pedido of pedidosParaProcessar) {
      let resultado = { id: pedido.id, ok: false };

      try {
        const bodyPayload = {
          amount: Math.round(pedido.total * 100),
          customer: {
            name: pedido.nome,
            email: pedido.email,
            document: { type: 'cpf', number: pedido.cpf?.replace(/\D/g, '') || '' },
          },
          items: [
            {
              title: 'Pedido World Tech',
              unitPrice: Math.round(pedido.total * 100),
              quantity: 1,
              tangible: false,
            },
          ],
        };

        if (pedido.formaPagamento === 'pix') {
          bodyPayload.paymentMethod = 'pix';
        } else if (pedido.formaPagamento === 'cartao') {
          bodyPayload.paymentMethod = 'credit_card';
          bodyPayload.card = { hash: pedido.token };
        }

        const res = await fetch(TITAN_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${authValue}`,
            accept: 'application/json',
          },
          body: JSON.stringify(bodyPayload),
        });

        const data = await res.json();

        if (data.status === 'waiting_payment' || data.status === 'paid') {
          resultado.ok = true;
          resultado.transacaoId = data.id;
          resultado.qr_code = data.pix?.qrcode || null;

          // ⚡ Gera QR code em base64 para frontend
          if (resultado.qr_code) {
            resultado.qrcodeBase64 = await QRCode.toDataURL(resultado.qr_code);
          }
        } else {
          resultado.erro = data.error || data.refusedReason || 'Pagamento não autorizado';
        }
      } catch (err) {
        resultado.erro = 'Erro ao processar: ' + err.message;
      }

      resultados.push(resultado);
    }

    await escreverFila(pedidosRestantes);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        processados: resultados,
        restantes: pedidosRestantes.length,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, erro: err.message }) };
  }
}
