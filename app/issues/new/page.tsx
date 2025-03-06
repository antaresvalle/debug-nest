'use client';
import { TextField, Button, Spinner, Callout, Text } from "@radix-ui/themes";
import { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import "easymde/dist/easymde.min.css";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    // Temporary workaround for hydration issue with RadixUI Text components. 
    // TODO: Update once it's fixed.
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsClient(true)
    }, []);

    const submitForm = async (data: object) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setError('An unexpected error occurred');
        }
    }

  return (
    <div className="max-w-lg space-y-3">
        { error && <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root> }
        <form  
            onSubmit={ handleSubmit((data) => {
                submitForm(data)
            })}
        >
            { isClient ? 
                <>
                    <TextField.Root placeholder="Title" {...register('title')} />
                    <ErrorMessage>{errors.title?.message}</ErrorMessage>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <SimpleMDE placeholder="Description"{...field}/>}
                    />
                    <ErrorMessage>{errors.description?.message}</ErrorMessage>
                    <Button>Submit New Issue</Button> 
                </>
            : <Spinner />}
        </form>
    </div>
  )
}

export default NewIssuePage