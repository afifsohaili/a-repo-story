const getPreviousCommit = (revision1, revision2, commits) => {
  const indexRevision1 = commits.findIndex(({hash}) => hash === revision1);
  return commits[indexRevision1 + 1] || commits[indexRevision1];
};

const getNextCommit = (revision1, revision2, commits) => {
  const indexRevision1 = commits.findIndex(({hash}) => hash === revision1);
  return commits[indexRevision1 - 1] || commits[indexRevision1];
};

export {
  getNextCommit,
  getPreviousCommit
};
