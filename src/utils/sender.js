const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID, SUPORTE_TECNICO, BOT_ADMIN_WAID } =
  process.env;
const { default: axios } = require('axios');
const { senpaiMongoDb } = require("./connections");

const dispatchAxios = async (data) => {
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: data,
  })
    .then((response) => console.log('dispatch/ok', response))
    .catch((error) => console.error('dispatch/error', error));
};

const sendAdmin = async (payload) => {
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: SUPORTE_TECNICO,
      type: 'text',
      text: {
        preview_url: false,
        body: payload,
      },
    },
  })
    .then((response) => console.log('send admin', response?.statusText))
    .catch((error) =>
      console.error('send admin/error', error.response?.data || error),
    );
};

const sendPremium = async (payload) => {
  const premiumList = (await senpaiMongoDb.collection("premium").find().toArray()).map(p => p.wa_id);
  await Promise.all(premiumList.map(async premium => {
    return await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: premium,
        type: 'text',
        text: {
          preview_url: true,
          body: payload,
        },
      },
    })
  }))
}

module.exports = {
  dispatchAxios,
  sendAdmin,
  sendPremium,
};
