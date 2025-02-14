class Listener {
  constructor(service, mailer) {
    this._service = service;
    this._mailer = mailer;
  }
  async listen(message) {
    try {
      const { playlistId, targetEmail: receiver } = JSON.parse(message.content.toString());
      const pl = await this._service.getPlaylist(playlistId);
      const res = await this._mailer.sendMail(receiver, JSON.stringify(pl));
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Listener;