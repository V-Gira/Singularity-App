import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { env } from "../../constants/env";
import { Id } from "../../domains/Id/Id";

/**
 * When running fariapp/fari-peer-server locally
 */
export const localhostConfig = {
  host: "localhost",
  port: 9000,
  secure: false,
};

/**
 * For testing peer-js versions
 */
export const stagingConfig = {
  host: "singularity-peer-server.herokuapp.com",
  secure: true,
};

/**
 * For production environment
 */
const prodConfig = {
  host: "singularity-peer-server.herokuapp.com",
  secure: true,
};

export function usePeerJS(options: { debug?: boolean }) {
  const peer = useRef<Peer | undefined>(undefined);
  const [hostId, setHostId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);

  if (!peer.current) {
    const id = Id.generate();
    if (env.isDev) {
      peer.current = new Peer(id, {
        path: "/peer/connect",
        debug: options.debug ? 3 : 0,
        // ...localhostConfig,
        // ...stagingConfig,
        ...prodConfig,
      });
    } else {
      peer.current = new Peer(id, {
        host: "singularity-peer-server.herokuapp.com",
        secure: true,
        path: "/peer/connect",
        debug: options.debug ? 3 : 0,
      });
    }
  }

  useEffect(() => {
    function setupPeer() {
      peer.current?.on("open", onPeerOpenCallback);
      peer.current?.on("disconnected", onPeerDisconnectedCallback);
      peer.current?.on("close", onPeerCloseCallback);
      peer.current?.on("error", onPeerErrorCallback);

      return () => {
        peer.current?.off("open", onPeerOpenCallback);
        peer.current?.off("disconnected", onPeerDisconnectedCallback);
        peer.current?.off("close", onPeerCloseCallback);
        peer.current?.destroy();
      };

      function onPeerOpenCallback(id: string) {
        setHostId(id);
        setLoading(false);
      }
      function onPeerDisconnectedCallback() {
        setHostId(undefined);
        peer.current?.reconnect();
      }
      function onPeerCloseCallback() {
        setHostId(undefined);
      }
      function onPeerErrorCallback(error: any) {
        if (error.type === "server-error") {
          setError(error);
        }
      }
    }

    return setupPeer();
  }, []);

  return { peer: peer.current, hostId, loading, error };
}
