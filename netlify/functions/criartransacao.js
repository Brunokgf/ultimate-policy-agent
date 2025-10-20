// /.netlify/functions/criartransacao.js
import fetch from 'node-fetch';
import { getBlob, putBlob } from '@netlify/blob';
import { Resend } from 'resend';

const BLOBS_KEY = 'fila-pedidos';
const RESEND_API_KEY = 're_3DAQaDeL_3NzVmXcqjYpa3gFMUcSHHSSL';
const resend = new Resend(RESEND_API_KEY);

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

    // Enviar email com detalhes do pedido
    try {
      const itensHtml = pedido.carrinho.map(item => 
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.nome}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantidade}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</td>
        </tr>`
      ).join('');

      await resend.emails.send({
        from: 'World Tech <onboarding@resend.dev>',
        to: ['rubenscardosoaguiar@gmail.com'],
        subject: `Novo Pedido - ${pedido.formaPagamento.toUpperCase()} - R$ ${pedido.total.toFixed(2)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e90ff; border-bottom: 3px solid #1e90ff; padding-bottom: 10px;">🛒 Novo Pedido Recebido!</h1>
            
            <h2 style="color: #333; margin-top: 30px;">Dados do Cliente</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px; background: #f5f5f5;"><strong>Nome:</strong></td>
                <td style="padding: 8px;">${pedido.nome}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #f5f5f5;"><strong>Email:</strong></td>
                <td style="padding: 8px;">${pedido.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #f5f5f5;"><strong>CPF:</strong></td>
                <td style="padding: 8px;">${pedido.cpf}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #f5f5f5;"><strong>Telefone:</strong></td>
                <td style="padding: 8px;">${pedido.telefone}</td>
              </tr>
            </table>

            <h2 style="color: #333; margin-top: 30px;">Endereço de Entrega</h2>
            <p style="padding: 15px; background: #f9f9f9; border-left: 4px solid #1e90ff;">
              ${pedido.endereco.rua}, ${pedido.endereco.numero}<br>
              ${pedido.endereco.bairro} - ${pedido.endereco.cidade}/${pedido.endereco.estado}<br>
              CEP: ${pedido.endereco.cep}
            </p>

            <h2 style="color: #333; margin-top: 30px;">Itens do Pedido</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background: #1e90ff; color: white;">
                  <th style="padding: 12px; text-align: left;">Produto</th>
                  <th style="padding: 12px; text-align: center;">Qtd</th>
                  <th style="padding: 12px; text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itensHtml}
              </tbody>
            </table>

            <div style="background: #28a745; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
              <h2 style="margin: 0 0 10px 0;">Total do Pedido</h2>
              <p style="font-size: 32px; font-weight: bold; margin: 0;">R$ ${pedido.total.toFixed(2).replace('.', ',')}</p>
              <p style="margin: 10px 0 0 0; font-size: 18px;">Forma de Pagamento: ${pedido.formaPagamento === 'pix' ? 'PIX' : 'Cartão de Crédito'}</p>
              ${resultadoFinal?.transacaoId ? `<p style="margin: 5px 0 0 0; font-size: 14px;">ID da Transação: ${resultadoFinal.transacaoId}</p>` : ''}
            </div>

            <p style="margin-top: 30px; color: #666; font-size: 12px; text-align: center;">
              Este é um email automático do sistema World Tech
            </p>
          </div>
        `,
      });
      console.log('Email enviado com sucesso');
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError);
      // Não bloqueia a resposta se o email falhar
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
