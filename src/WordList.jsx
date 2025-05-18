import './WordList.css'
import Modal from './Modal.jsx'
import { useState } from 'react'

function WordList({ wordList }) {

    // if there is not words yet

    if (wordList.length == 0) {
        return(
            <div className='new'>New User? Add some vocab to get started!</div>
        )
    }

    // display latest first
    wordList.sort((a, b) => {
      if (a.timeAdded < b.timeAdded) {
          return 1
      }

      if (b.timeAdded < a.timeAdded) {
          return -1
      }

      return 0
    })

    // display definition
    const [showModal, setShowModal] = useState(false)
    const [content, setContent] = useState("")

    function displayContent(definition) {
        setShowModal(true)
        setContent(definition)
    }

    function handleModalClose() {
        setShowModal(false)
    }

    // component to render
    return(
        <>
        <ul className='word-list'>

            {wordList.slice(0, 10).map((vocab, index) =>
                <li 
                    className='word'
                    key={index}
                    onClick={() => displayContent(vocab.definition)}  
                >
                    {vocab.word}
                </li>
            )}
         
        </ul>

        <Modal isOpen={showModal} handleModalClose={handleModalClose} content={content}/>
        </>
    )
}

export default WordList