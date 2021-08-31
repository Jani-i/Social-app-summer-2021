import { useState, useEffect } from 'react';
import { projectStorage } from '../Firebase';
import { useAuth } from '../context/AuthContext';
import useFireStorage from '../hooks/useFireStorage';
import useProfilePicUrl from '../hooks/useProfilePicUrl';

export default function DeleteFile() {

    const { fileName } = useProfilePicUrl();

    const storageRef = projectStorage.ref();
    

    function handleSubmit(e) {
        e.preventDefault()

        // Create a reference to the file to delete
        var deleteRef = storageRef.child(fileName);

        // Delete the file
        deleteRef.delete().then(() => {
            console.log("file deleted")
        }).catch((error) => {
            console.log(error)
        });

    
       
    }


    return (
        <div>
            <button onClick={handleSubmit}>Delete avatar</button>
        </div>
    )
}

