import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import {execSync} from "node:child_process";

const commitDate = execSync('git log -1 --format=%cI').toString().trimEnd();
const commitHash = execSync('git rev-parse HEAD').toString().trimEnd();
const lastCommitMessage = execSync('git show -s --format=%s').toString().trimEnd();

process.env.VITE_GIT_COMMIT_DATE = commitDate;
process.env.VITE_GIT_COMMIT_HASH = commitHash;
process.env.VITE_GIT_COMMIT_MESSAGE = lastCommitMessage;

export default defineConfig({
    base: '',
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
            babel: {plugins: ["@emotion/babel-plugin"]}
        }),
        viteTsconfigPaths()
    ],
    server: {
        open: true,
        port: 3000,
    },
})
