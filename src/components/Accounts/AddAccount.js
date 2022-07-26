import './AddAccount.css'
import { useEffect, useRef } from 'react';
import AddLocalStorage from '../../utils/AddLocalStorage';


const AddAccount = () => {
    //get the input
    const inputRef = useRef();
    useEffect(()=> {
        document.body.classList.add('modal-open');
        if(inputRef.current) inputRef.current.focus();
        return ()=>{document.body.classList.remove('modal-open');}
    })

    return (
        <div id="add-account-modal" style={{display:"none"}}>
            <div id="overlay"></div>
            <div id="main">
                <div id="form">
                    <div className="p-2">
                        <h5>Add Account</h5>
                    </div>
                    <div>
                        <input
                            id='uname'
                            name="username"
                            onChange={() => {""}}
                            placeholder="ENTER HIVE USERNAME"
                            autoComplete="off"
                            onKeyUp={(e) => {
                                if(e.key === "Enter") {
                                    AddLocalStorage()
                                }
                            }}/>
                        <p>Note: Enter multiple accounts separated by comma<br/>ex. account1,account2</p>
                        <div className="d-flex justify-content-end p-2">
                            <button className="btn-sm btn-danger m-1" onClick={()=>{
                                document.getElementById('add-account-modal').style.display='none'
                            }}>Cancel</button>
                            <button className="btn-sm btn-success m-1" onClick={()=> {
                                AddLocalStorage()
                            }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAccount