import Vue from 'vue';
import path from 'path';
import simpleGit from 'simple-git';

const git = simpleGit(path.resolve(process.env.GIT_PATH));

Vue.prototype.$git = git;
