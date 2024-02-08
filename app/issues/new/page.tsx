'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm,Controller}from 'react-hook-form'
import axios, { Axios } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
    title :string,
    description: string 

}
 const NewIssuePage = () => {
    const router=useRouter()
    const {register,control,handleSubmit,getValues}=useForm<IssueForm>();
     const [error,setError]=useState('')
  return (
    <div className='space-y-3 max-w-xl'>
        {error&& <Callout.Root color='red'><Callout.Text>{error}</Callout.Text></Callout.Root>}
    <form className='space-y-3 '
     onSubmit={
        handleSubmit(async (data)=>{
            try{
               await  axios.post('/api/issues',data )
                router.push('/issues')
              }

            catch(err){
             console.log(err)
             setError('an expected error accured')
            }
        })}>
      <TextField.Root>
        <TextField.Input placeholder='title' {...register('title')}/>
      </TextField.Root>
      <Controller
      name='description'
      control={control}
      render={({ field }) => {
        // Extract necessary props from field object
        const { value, onChange, onBlur } = field;
    
        return (
          <SimpleMDE
            value={value}
            onChange={(newValue) => onChange(newValue)}
            onBlur={onBlur}
            placeholder='description'
          />
        );
      }}
     
      /> 
      <Button>Submit New issue</Button>   
    </form></div>
  )
}

export default NewIssuePage
