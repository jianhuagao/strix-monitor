import cfg from '@/app.config';
import { logger } from '@/utils/logger';
import { moment } from '@/utils/moment';
import { useCallback, useEffect, useRef, useState } from 'react';

const flag = '[ws]';

export const useWs = () => {
  const ws = useRef<WebSocket>();
  const [data, setData] = useState<Aida64>();
  const [isConnected, setIsConnected] = useState(false); // 连接状态管理
  const reconnectAttempts = useRef(0); // 使用 useRef 来保存重连次数
  const maxReconnectAttempts = 5; // 最大重连次数

  const connect = useCallback(() => {
    ws.current = new WebSocket(`ws://localhost:${cfg.wssPort}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data) as Aida64;
      logger.info(flag, 'received', {
        local: moment().format('HH:mm:ss'),
        sensor: data.STIME.value,
        data,
      });
      setData(data);
    };

    ws.current.onopen = () => {
      logger.success(flag, 'connected');
      setIsConnected(true);
      reconnectAttempts.current = 0; // 重置重连计数
    };

    ws.current.onerror = (error) => {
      logger.error(flag, error);
      // 可以在这里添加更多的错误处理逻辑
    };

    ws.current.onclose = (event) => {
      logger.warn(flag, 'close', event.code, event.reason);
      setIsConnected(false);
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        logger.info(flag, `reconnecting attempt ${reconnectAttempts.current}`);
        setTimeout(connect, 1000); // 延迟重连
      } else {
        logger.error(flag, 'max reconnect attempts reached');
      }
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close(); // 组件卸载时关闭连接
    };
  }, [connect]);

  return { data, isConnected }; // 返回连接状态
};
