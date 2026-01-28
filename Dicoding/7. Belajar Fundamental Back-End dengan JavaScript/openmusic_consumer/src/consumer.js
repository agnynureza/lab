import "dotenv/config";
import amqp from "amqplib";
import PlaylistService from "./playlistService.js";
import MailSender from "./mailSender.js";
import Listener from "./listerner.js";

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);
  
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();
  
  await channel.assertQueue("export:playlists", {
    durable: true,
  });
  
  channel.consume("export:playlists", listener.listen, { noAck: true });
};

init();
