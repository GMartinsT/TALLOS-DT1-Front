import io, { Socket } from "socket.io-client";

export class SocketModule {
  private static instance: SocketModule;

  public static static_io: Socket;
  private io: Socket;
  private listeners = new Map<string, any>();

  constructor(uri: string) {
    this.io = io(uri);
    SocketModule.static_io = this.io;
  }

  public static connect() {
    console.log('ANTES!!!')
    if (SocketModule.instance) return SocketModule.instance;
    SocketModule.instance = new SocketModule("ws://localhost:3001");
    console.log('DEPOIS!!!')
    return SocketModule.instance;
  }

  public static disconnect() {
    SocketModule.static_io.disconnect()
    console.log('ENTROU!!!')
  }

  public registerListener(
    namespace: string,
    event: string,
    cb: (userEmail: string) => void
  ) {
    if (this.listeners.has(`${namespace}/${event}`)) return;

    this.io.on(event, cb);
    this.listeners.set(`${namespace}/${event}`, cb);
  }
}