const Job = require('../models/Job');

const newJob = new Job({
  jobTitle: "Software Developer",
  // set other fields if needed
});

newJob.save((err, job) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`New job created: ${job}`);
  }
});