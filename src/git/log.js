const gitLog = gitService => {
  return {
    getAllLogs() {
      return new Promise((resolve, reject) => {
        gitService.log([], (err, logs) => {
          if (err) {
            reject(err);
          }
          console.log('\n', 'logs', logs);
          resolve(logs.all);
        });
      });
    }
  };
};

export default gitLog;
