'use client';
import { TextField, TextArea, Button, Spinner } from "@radix-ui/themes";
import { useState, useEffect } from 'react'

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
                <TextArea placeholder="Description" />
                <Button>Submit New Issue</Button> 
            </>
        : <Spinner />}
    </div>
  )
}

export default NewIssuePage