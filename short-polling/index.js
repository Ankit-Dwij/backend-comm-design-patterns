const app = require("express")();
const jobs = {};

app.post("/submit", (req, res) => {
  //
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  res.end("\n\n" + jobId + "\n\n");
});

app.get("/checkStatus", (req, res) => {
  //
  console.log(jobs[req.query.jobId]);
  res.end("\n\n" + jobs[req.query.jobId] + "%\n\n");
});

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});

//add 10% progress every 3 seconds
function updateJob(jobId, prg) {
  jobs[jobId] = prg;
  if (prg === 100) return;
  this.setTimeout(() => {
    updateJob(jobId, prg + 10);
  }, 3000);
}

// @curl
// curl -X POST http://localhost:8080/submit
