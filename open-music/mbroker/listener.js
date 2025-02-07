class Listener {
  constructor(service, mailer) {
    this.service = service;
    this.mailer = mailer;
  }
  async listen(message) {
    try {
      const { playlistId, receiver } = JSON.parse(message.content.toString());
      const pl = await this.service.getPlaylist(playlistId);
      const res = await this.mailer.sendMail(receiver, JSON.stringify(pl));
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Listener;