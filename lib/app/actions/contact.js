export function sendContact (text) {
  return {
    type: 'SEND_CONTACT',
    text,
    date: Date.now()
  }
}
