import Bee from 'bee-queue';
import RegistrationMail from '../app/jobs/RegistrationMail';
import HelpOrderAnswerMail from '../app/jobs/HelpOrderAnswerMail';
import redisConfig from '../config/redis';

const jobs = [RegistrationMail, HelpOrderAnswerMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig
        }),
        handle
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.error(`Queue ${job.queue.name} failed:`, err);
  }
}

export default new Queue();
