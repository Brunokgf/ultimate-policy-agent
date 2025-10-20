// /.netlify/functions/criartransacao.js
import fetch from 'node-fetch';
import { getBlob, putBlob } from '@netlify/blob';

const BLOBS_KEY = 'fila-pedidos';

async function lerFila() {
  try {
    const blob = await getBlob(BLOBS_KEY);
    if (!blob) return [];
    return JSON.parse(await blob.text());
  } catch (err) {
    console.error('Erro ao ler fila:', err);
    return [];
  }
}

async function escreverFila(fila) {
  try {
    await putBlob(BLOBS_KEY, JSON.stringify(fila, null, 2), { contentType: 'application/json' });
  } catch (err) {
    console.error('Erro ao escrever fila:', err);
  }
}

export async function handler(event) {
  const retornoErro = (status, msg) => ({
    statusCode: status,
    body: JSON.stringify({ ok: false, erro: msg }),
  });

  try {
    if (event.httpMethod !== 'POST') return retornoErro(405, 'Método não permitido');

    let pedido;
    try {
      pedido = JSON.parse(event.body);
    } catch {
      return retornoErro(400, 'Body inválido');
    }

    if (!pedido.formaPagamento || !pedido.total)
      return retornoErro(400, 'Total e formaPagamento obrigatórios');

    // Adiciona pedido à fila
    const fila = await lerFila();
    const novoPedido = { id: Date.now().toString(), ...pedido };
    fila.push(novoPedido);
    await escreverFila(fila);

    // Processa imediatamente
    const base = process.env.URL || 'https://celadon-banoffee-1a7aa0.netlify.app';
    let resultadoFinal = null;

    try {
      const res = await fetch(`${base}/.netlify/functions/processarFila`, { method: 'POST' });
      const data = await res.json();
      resultadoFinal = data.processados?.find(p => p.id === novoPedido.id);

      // ⚡ Inclui QR code em base64 se existir
      if (resultadoFinal?.qr_code) {
        const QRCode = await import('qrcode');
        resultadoFinal.qrcodeBase64 = await QRCode.toDataURL(resultadoFinal.qr_code);
      }

    } catch (err) {
      console.error('Erro ao chamar processarFila:', err);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        msg: 'Pedido criado e processado',
        transacaoId: resultadoFinal?.transacaoId || null,
        qr_code: resultadoFinal?.qr_code || null,
        qrcodeBase64: resultadoFinal?.qrcodeBase64 || null,
        erro: resultadoFinal?.erro || null,
      }),
    };
  } catch (err) {
    console.error('Erro geral criarTransacao:', err);
    return retornoErro(500, err.message || 'Erro desconhecido');
  }
}
