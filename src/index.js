const { Worker, isMainThread, parentPort } = require('worker_threads');
require('./chunk')

const alphabet = "abcdefghijklmnopqrstuvwxyz";

if (isMainThread) {

  const alpha = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'
  ]

  const chunks = alpha.chunk(4)

  const workers = []

  console.log(chunks);

  for (const chunk of chunks) {
    const worker = new Worker(__filename);
    workers.push(worker)
    worker.postMessage(chunk)
  }

}

if (!isMainThread) {
  parentPort.once('message', letters => {
    const arr = []
    console.log(letters);

    for (const chari of letters) {
      if (alphabet.indexOf(chari) !== -1) {
        arr.push(alphabet.indexOf(chari));
      }
    }

    console.log(arr);
  })
}
