import React, { useState } from 'react'
import { database } from '../Firebase'
import { useAuth } from '../context/AuthContext';

export default function UpdateUserName() {

    const { currentUser } = useAuth();
    
    const [ userName, setUserName ] = useState('');
    const [ error, setError ] = useState('');

    const userIntoString = currentUser.email;
    const userIntoUrl = userIntoString.replaceAll('.', '-');

    const databaseRef = database.ref('users/' + userIntoUrl + '/username' );
    const databaseRef2 = database.ref('emails/' + userName);


    const changeHandler = (e) => {
        e.preventDefault()

        
        let writtenName = e.target.value;

        if(writtenName.includes('.') || writtenName.includes(',')) {
            setUserName('');
            setError('Do not use . or ,');
        } else {
            setUserName(writtenName);
            setError('');
        }
    }


    function onSubmit () {
        
        databaseRef.set(userName);
        databaseRef2.set(userIntoUrl)
    }
        
    return (
        <div>
            <form>
                <label>
                    <input type="text" onChange={changeHandler} name="name" />
                </label>
                <input type="submit" value="Submit" onClick={onSubmit} />
            </form>
        </div>
    )
}
