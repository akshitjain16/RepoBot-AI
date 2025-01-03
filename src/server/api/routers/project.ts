import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure.input(
   z.object({
    name: z.string().min(1, "Project name is required"),
    githubURL: z.string().url("Must be a valid GitHub URL"),
    GithubToken: z.string().optional()
  })
  ).mutation(async({ctx, input}) => {
    const project = await ctx.db.project
      .create({
        data: {
          githubURL: input.githubURL,
          name: input.name,
          userToProjects: {
            create: {
              userId: ctx.user.userId!,
            },
          },
        },
      })
    return project
  }),
  getProjects: protectedProcedure.query(async ({ctx}) => {
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
  })
})