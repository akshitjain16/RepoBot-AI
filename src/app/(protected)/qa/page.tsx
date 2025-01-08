'use client'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'

const QAPage = () => {
  const {projectId} =useProject()
  const{data:  questions} = api.project
  return (
    <div>
      
    </div>
  )
}

export default QAPage
