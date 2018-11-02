const getLatestLogs = gitService => {
  return new Promise((resolve, reject) => {
    gitService.log([], (err, logs) => {
      if (err) {
        reject(err);
      }
      resolve(logs.all.slice(0, 5));
    });
  });
};

export default gitService => {
  return {
    getLatestLogs() {
      return getLatestLogs(gitService);
    }
  };
};
