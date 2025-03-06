'use client';
import { TextField, Button, Spinner, Callout } from "@radix-ui/themes";
import { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from "next/navigation";
import axios from 'axios';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import "easymde/dist/easymde.min.css";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();
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
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <SimpleMDE placeholder="Description"{...field}/>}
                    />
                    <Button>Submit New Issue</Button> 
                </>
            : <Spinner />}
        </form>
    </div>
  )
}

export default NewIssuePage