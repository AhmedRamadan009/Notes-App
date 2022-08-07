import axios from 'axios'
import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import  { useState } from 'react'
import Swal from 'sweetalert2'

        
export default  function Home() {
    let baseURL = 'https://route-egypt-api.herokuapp.com/';
    let token = localStorage.getItem('token')
    let userDecoded = jwt_decode(token)
    let userID = userDecoded._id;


    const [notes, setNotes] = useState([])
    const [note,setNote]=useState({"title":"","desc":"",userID,token})
   



    async function getusernotes(){

         let {data} =await axios.get(baseURL+'getUserNotes',{
         
         headers: {
            userID,
            Token: token
         }
         
     } );
     
     if (data.message == 'success') {
        setNotes(data.Notes)

    }
    console.log(notes);
}

useEffect(() => {
    getusernotes()
}, [])

function getnote(e){
setNote({...note,[e.target.name]: e.target.value})

}
async function addnote(e){

e.preventDefault();

let {data} = await axios.post(baseURL+'addNote',note)
console.log(data);
if (data.message == 'success') {
    document.getElementById('add-form').reset();
getusernotes()

}

}

function deletenote(NoteID) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(baseURL + 'deleteNote', {
                data: {
                    NoteID,
                    token
                }
            }).then((response) => {
                console.log(response);
                if (response.data.message == 'deleted') {
                    getusernotes();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.message,
                    })
                }
            })
        }
    })

    // console.log(data);


}

function getNoteId(Noteindex){

    document.querySelector("#exampleModal1 input ").value= notes[Noteindex].title;
    document.querySelector("#exampleModal1 textarea ").value= notes[Noteindex].desc;

    setNote({...note,'title':notes[Noteindex].title,'desc':notes[Noteindex].desc,NoteID:notes[Noteindex]._id})



}
async function updateNote(e){
e.preventDefault();
let {data} = await axios.put(baseURL+'updateNote',note)

if(data.message=='updated'){

    getusernotes();
    Swal.fire(
        'Updated!',
        'Your note has been updated.',
        'success'
    )
} else {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
    })
}

}

    
  return (
    <>
<div className="container my-5">
                <div className="col-md-12 text-end">
                    <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
                        New</a>
                </div>
            </div>

              {/* <!-- Add Modal --> */}
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form id="add-form" onSubmit={addnote} >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getnote}  placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea  onChange={getnote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

{/* <!-- Edit Modal --> */}
<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form  id="edit-form" onSubmit={updateNote}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getnote}  placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getnote}  className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container">
                <div className="row">
                    {notes.map((note,index)=>{
                         return (
                            <div key={index} className="col-md-4 my-4">
                                <div className="note p-4">
                                    <h3 className="float-start">{note.title}</h3>
                                    <a onClick={()=>{getNoteId(index)}}  data-bs-toggle="modal" data-bs-target="#exampleModal1" ><i className="fas fa-edit float-end edit"></i></a>
                                    <a  onClick={()=>{deletenote(note._id)}}> <i className="fas fa-trash-alt float-end px-3 del"></i></a>
                                    <span className="clearfix"></span>
                                    <p>{note.desc}</p>
                                </div>
                            </div>
                        )
                    })}


 
                        
                        
                   
                      
                           
                      
               


                </div>
            </div>

    </>
  )
}
