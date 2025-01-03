'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormInput = {
  repoURL: string
  projectName: string
  githubToken?: string
}
const CreatePage = () => {
  const {register, handleSubmit, reset} = useForm<FormInput>()

  const createProject = api.project.createProject.useMutation()

  const onSubmit = (data: FormInput) => {
    createProject.mutate({
      name: data.projectName,
      githubURL: data.repoURL,
      GithubToken: data.githubToken
    },{
      onSuccess: () => {
        toast.success("Project created successfully")
        reset()
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
    return true
  }

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/github.svg" alt="github logo" className="h-56 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github Repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your Github repository to link it to RepoBot AI.
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              required
              {...register("projectName", { required: true })}
              placeholder="Project Name"
            />
            <div className="h-2"></div>
            <Input
              required
              {...register("repoURL", { required: true })}
              placeholder="Github URL"
              type="url"
              />
              <div className="h-2"></div>
            <Input
              {...register("githubToken")}
              placeholder="Github Token (Optional)"
            />
            <div className="h-4"></div>
            <Button type="submit" disabled={createProject.isPending}>Create Project</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage