import cfg from '@/app.config';
import { logger } from '@/utils/logger';
import { randomUUID } from 'crypto';
import { WebSocketServer } from 'ws';
import { getSensorValues } from './aida64';

const wss = new WebSocketServer({ port: cfg.wssPort });

logger.info(`Server started on port ${cfg.wssPort}`);

wss.on('connection', (ws, req) => {
  const id = randomUUID();
  const flag = `[${id}]`;

  logger.success(flag, 'connected', {
    address: req.socket.remoteAddress,
    port: req.socket.remotePort,
  });

  const sendData = async () => {
    try {
      const data = await getSensorValues();
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(data), (error) => {
          if (error) logger.error(flag, error);
          else logger.info(flag, 'sent');
        });
      }
    } catch (error) {
      logger.error(flag, error);
    } finally {
      setTimeout(sendData, cfg.pollingInterval); // 使用 setTimeout 递归调用
    }
  };

  sendData(); // 初始调用

  ws.on('error', (error) => logger.error(flag, error));

  ws.on('close', () => {
    logger.info(flag, 'closed');
  });
});
