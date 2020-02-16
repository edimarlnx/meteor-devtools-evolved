declare module Meteor {
  let __devtools: boolean;
  const connection: any;
}

declare module 'simple-sha1' {
  export default function(
    value: string,
    callback: (hash: string) => void,
  ): void;
}

interface Message<T> {
  eventType: string;
  data: T;
  source: string;
}

interface StackTrace {
  columnNumber: number;
  lineNumber: number;
  source: string;
  functionName?: string;
  fileName?: string;
}

interface DDPLog {
  content: string;
  trace?: StackTrace[];
  isInbound?: boolean;
  isOutbound?: boolean;
  timestamp?: number;
  hash?: string;
}

interface Bookmark {
  id?: number;
  timestamp: number;
  log: DDPLog;
}
