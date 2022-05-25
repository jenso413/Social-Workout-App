// import React from 'react'
// import '../css/signup.css'

// export default function SignUp({ isActive }) {

//     const [username, setUsername] = React.useState('')
//     const [password, setPassword] = React.useState('')
//     const [email, setEmail] = React.useState('')

//     // const [putUsername, setPutUsername] = React.useState('');
//     // const [putPassword, setPutPassword] = React.useState('');

//     function handleChange(e) {

//         const inputName = e.target.name;
//         const inputValue = e.target.value

//         if (inputName === 'username') {
//             setUsername(inputValue)
//         } else if (inputName === 'password') {
//             setPassword(inputValue)
//         } else if (inputName === 'email') {
//             setEmail(inputValue)
//         }
//     }   


//     // function handleClick(e) {
//     //     e.preventDefault();
//     //     fetch('/api/user', {
//     //         method: 'POST',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify({
//     //             'username' : username,
//     //             'password' : password,
//     //             'email' : email,
//     //         })
//     //     });

//     //     setUsername('')
//     //     setPassword('')
//     //     setEmail('')
//     // }

//     // function validateUserInfo(e) {
//     //     e.preventDefault();
//     //     const userInfo = {
//     //         method: 'POST',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify({
//     //             username : putUsername,
//     //             password: putPassword
//     //         })
//     //     }
//     //     fetch('/api/auth', userInfo)
//     // }

//     return (
//         // Input for username, password, email
//         <div className={`modal-bg ${isActive ? 'bg-active' : ''}`}>
//             <form className='form'>
//                 <h2>Sign Up</h2>
//                 <input name='username' value={username} onChange={handleChange} type='text' placeholder='username'></input>
//                 <input name='password' value={password} onChange={handleChange} type='text' placeholder='password'></input>
//                 <input name='email' value={email} onChange={handleChange} type='email' placeholder='email'></input>
//                 <button >Submit</button>
//             </form>
//         </div>
//     )
// }