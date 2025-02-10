const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;
const axios = require("axios");

const template_manutencao = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload?.contacts[0]?.wa_id,
      type: 'template',
      template: {
        name: 'modo_manutencao',
        language: {
          code: 'pt_br',
        },
        components: [],
      },
    },
  });
}

const message_hello = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        preview_url: true,
        body: "Ficamos felizes que você nos escolheu! Estamos em manutenção para melhorias, estaremos disponíveis em alguns dias, agradecemos pela atenção. ♥️\n\nQue tal acompanhar as novidades direto no nosso site?\n\nAcessa aí: http://www.botdosenpai.com.br"
      }
    },
  });
}

const canal = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        preview_url: true,
        body: "Acompanhe as últimas atualizações no nosso canal!\n\n‎Follow the Bot Senpai channel on WhatsApp: https://whatsapp.com/channel/0029VatyGWjFcow5imozTp2r"
      }
    },
  })
  .then((response) => console.log(response.status))
  .catch((err) => console.error(err.response));
}

const menu = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        preview_url: true,
        body: "Ficamos felizes que você nos escolheu! Estamos em manutenção para melhorias, estaremos disponíveis em alguns dias, agradecemos pela atenção. ♥️\n\nQue tal acompanhar as novidades direto no nosso site?\n\nAcessa aí: http://www.botdosenpai.com.br"
      }
    },
  });
}

module.exports = {
  template_manutencao,
  menu,
  message_hello,
  canal,
};
