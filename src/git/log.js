const gitLog = gitService => {
  return {
    getLatestLogs() {
      return new Promise((resolve, reject) => {
        gitService.log([], (err, logs) => {
          if (err) {
            reject(err);
          }
          resolve(logs.all.slice(0, 5));
        });
      });
    }
  };
};

export default gitLog;
