import React, { useState } from 'react'
import ProgressBar from './Progressbar';
import useProfilePicUrl from '../hooks/useProfilePicUrl';
import { projectStorage } from '../Firebase';

export default function UploadFile() {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    //const { fileNames } = useProfilePicFromStorage();

    //const storageRef = projectStorage.ref();

    const types = ['image/png', 'image/jpeg'];
    
    
        
    const changeHandler = (e) => {
        e.preventDefault()

        
        let selected = e.target.files[0];

        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png/jpeg)');
        }

        
      

        


    }

    
    return (
        <div>
            <form>
                <input type="file" onChange={changeHandler}></input>
                <div className="output"> 
                { error && <div className="error">{ error }</div>}
                { file && <div>{ file.name }</div> }
                { file && <ProgressBar file={file} setFile={setFile} /> }
                </div>
            </form>
        </div>
    )
}

