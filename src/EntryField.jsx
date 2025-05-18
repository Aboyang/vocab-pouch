import './EntryField.css'
import Modal from './Modal.jsx'
import { useState } from 'react'

function EntryField({addVocab}) {

    // modal for alerting input field empty
    const [showModal, setShowModal] = useState(false)
    const [content, setContent] = useState("")

    function handleModalClose() {
        setShowModal(false)
    }

    const [inputs, setInputs] = useState({'word':'', 'definition':''})

    function inputChange(event) {

        const { name, value } = event.target

        setInputs(prevInputs => (
            {...prevInputs, [name]: value}
        ))

    }

    function handleSubmit(event) {

        event.preventDefault()
        
        if (inputs.word == '' || inputs.definition == '') {
            
            setShowModal(true)
            setContent("Empty Field")

            return
        }

        addVocab(inputs)

        setInputs({'word':'', 'definition':''})

    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h3>New Word</h3>
            <input type='text' name='word' value={inputs.word || ''} placeholder='Word' onChange={(event) => inputChange(event)}/>
            <input type='text' name='definition' value={inputs.definition || ''} placeholder='Definition' onChange={(event) => inputChange(event)}/>
            <input className='submit-btn' type='submit' value='Add Word'/>

        </form>

        <Modal isOpen={showModal} handleModalClose={handleModalClose} content={content}/>
        </>
    )
}

export default EntryField