import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios";
import { aiSummarizeCommit } from "./gemini";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
};

export const getCommitsHashes = async (githubUrl: string): Promise<Response[]> => {
    // https://github.com/akshitjain16/RepoBot-AI/commit/<commitHash>.diff :- logical part
    const [owner, repo] = githubUrl.split("/").slice(-2);
    if (!owner || !repo) {
        throw new Error("Invalid github url");
    }
    const { data } = await octokit.rest.repos.listCommits({
        owner,
        repo
    });
    const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[]

    return sortedCommits.slice(0, 10).map((commit: any) => ({
        commitHash : commit.sha as string,
        commitMessage : commit.commit.message ?? "",
        commitAuthorName : commit.commit?.author?.name ?? "",
        commitAuthorAvatar : commit.commit?.author?.avatar_url ?? "",
        commitDate : commit.commit?.author?.date ?? ""
    }))
}

export const pollCommits = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
    const commitHashes = await getCommitsHashes(githubUrl);
    const unProcessedCommits = await filterUnProcessedCommits(projectId, commitHashes);
    const summaryResponses = await Promise.allSettled(unProcessedCommits.map((commit) => summarizeCommits(githubUrl, commit.commitHash)));
    const summaries = summaryResponses.map((response) => {
        if (response.status === "fulfilled") {
            return response.value as string;
        } else {
            return "";
        }
    });

    const commits = await db.commit.createMany({
        data: summaries.map((summary, index) => {
            console.log(`processing commit ${index}`)
            return {
                projectId: projectId,
                commitHash: unProcessedCommits[index]!.commitHash,
                commitMessage: unProcessedCommits[index]!.commitMessage,
                commitAuthorName: unProcessedCommits[index]!.commitAuthorName,
                commitAuthorAvatar: unProcessedCommits[index]!.commitAuthorAvatar,
                commitDate: unProcessedCommits[index]!.commitDate,
                summary
            }
        })
    });

    return commits
}


async function summarizeCommits(githubUrl: string, commitHashes: string) {
    const { data } = await axios.get(`${githubUrl}/commit/${commitHashes}.diff`, {
        headers: {
            Accept: "application/vnd.github.v3.diff"
        }
    });
    return await aiSummarizeCommit(data) || "";
}


async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            githubUrl: true
        }
    });
    if (!project?.githubUrl) {
        throw new Error("Project has no github url");
    }
    return {
        project,
        githubUrl: project.githubUrl
    }
}

async function filterUnProcessedCommits(projectId: string, commitHashes: Response[]) {
    const processedCommits = await db.commit.findMany({
        where: {
            projectId: projectId
        }
    });

    const unProcessedCommits = commitHashes.filter((commit: Response) => {
        return !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash);
    });

    return unProcessedCommits;
}