/* eslint-disable global-require */
import cluster from 'cluster';
import os from 'os';
import R from 'ramda';

if (cluster.isMaster) {
  const numOfCPUs = os.cpus().length;
  const { RESTART_WORKER_DELAY = 500, NUM_OF_WORKERS = numOfCPUs } = R.compose(
    R.evolve({
      NUM_OF_WORKERS: R.curryN(2, parseInt)(R.__, 10),
    }),
  )(process.env);

  console.log('Master cluster starting with', NUM_OF_WORKERS, 'workers');
  for (let i = 0; i < NUM_OF_WORKERS; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log('pid', worker.process.pid, 'exit');
    console.log(`Starting with new worker in ${RESTART_WORKER_DELAY} seconds...`);
    setTimeout(() => cluster.fork(), RESTART_WORKER_DELAY);
  });
} else {
  const createServer = require('./server').default;
  createServer();
}
