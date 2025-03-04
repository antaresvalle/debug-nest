'use client';
import { TextField, Button, Spinner } from "@radix-ui/themes";
import { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
    
    // Temporary workaround for hydration issue with RadixUI Text components. 
    // TODO: Update once it's fixed.
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);

  return (
    <div className="max-w-lg space-y-3">
        { isClient ? 
            <>
                <TextField.Root placeholder="Title" />
                <SimpleMDE placeholder="Description"/>
                <Button>Submit New Issue</Button> 
            </>
        : <Spinner />}
    </div>
  )
}

export default NewIssuePage