interface StateParams {
  target: any;
  listener: (a: any) => any;
}

export default function createStore({ target, listener }: StateParams) {
  let observable: any = null;

  const set = (target: any, name: any, value: any) => {
    target[name] = value;
    listener(observable);
    return true;
  };

  const get = (target: any, name: any) => {
    return Object.freeze(target[name]);
  };

  const handler = {
    set,
    get,
  };

  observable = new Proxy(target, handler);

  return observable;
}
