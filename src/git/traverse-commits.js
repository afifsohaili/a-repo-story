const getPreviousCommit = (revision1, revision2, commits) => {
  const indexRevision1 = commits.findIndex(({hash}) => hash === revision1);
  const indexRevision2 = commits.findIndex(({hash}) => hash === revision2);
  if (indexRevision1 > -1 && indexRevision2 > -1) {
    return indexRevision2 + 1 < commits.length ? commits[indexRevision2 + 1] : commits[indexRevision2];
  }
  return commits[indexRevision1 + 1] || commits[indexRevision1];
};

const getNextCommit = (revision1, revision2, commits) => {
  const indexRevision1 = commits.findIndex(({hash}) => hash === revision1);
  const indexRevision2 = commits.findIndex(({hash}) => hash === revision2);
  if (indexRevision1 > -1 && indexRevision2 > -1) {
    return indexRevision2 - 1 > indexRevision1 ? commits[indexRevision2 - 1] : commits[indexRevision1];
  }
  return commits[indexRevision1 - 1] || commits[indexRevision1];
};

export {
  getNextCommit,
  getPreviousCommit
};
