import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { pollCommits } from "@/lib/github"

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure.input(
    z.object({
      name: z.string().min(1, "Project name is required"),
      githubUrl: z.string().url("Must be a valid GitHub URL"),
      GithubToken: z.string().optional()
    })
  ).mutation(async ({ ctx, input }) => {
    const project = await ctx.db.project
      .create({
        data: {
          githubUrl: input.githubUrl,
          name: input.name,
          userToProjects: {
            create: {
              userId: ctx.user.userId!,
            },
          },
        },
      })
    try {
      await pollCommits(project.id)
    } catch (error) {
      console.error("Failed to poll commits:", error)
    }
    return project
  }),
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({
      where: {
        userToProjects: {
          some: {
            userId: ctx.user.userId!
          }
        },
        deletedAt: null
      }
    })
    return projects
  }),
  getCommits: protectedProcedure.input(z.object({
    projectId: z.string()
  })).query(async ({ ctx, input }) => {
    return ctx.db.commit.findMany({
      where: {
        projectId: input.projectId
      }
    })
  })
})