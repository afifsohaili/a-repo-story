const getLogs = (gitService, totalCommits) => {
  return new Promise((resolve, reject) => {
    const revisionsRange = totalCommits ? [`HEAD~${totalCommits}...HEAD`] : [];
    gitService.log(revisionsRange, (err, logs) => {
      if (err) {
        reject(err);
      }
      resolve(logs.all);
    });
  });
};

export default gitService => {
  return {
    getLatestLogs() {
      return getLogs(gitService, 5);
    },
    getAllLogs() {
      return getLogs(gitService, 0);
    }
  };
};
