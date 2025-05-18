import './Practice.css'
import Modal from './Modal.jsx'
import { useRef, useState } from 'react'

function Practice({ togglePractice, practiceList }) {

    // multi-purpose modal: show definition, alert message, etc
    const [showModal, setShowModal] = useState(false)
    const [content, setContent] = useState("")

    // if the last alert happens before session termination
    const [end, setEnd] = useState(false)
    // timeout
    const endModal = useRef(null)
    const endQuit = useRef(null)

    function handleModalClose() {
        setShowModal(false)

        if (end) {
            clearTimeout(endModal.current)
            clearTimeout(endQuit.current)
            togglePractice()
            return
        }

        nextWord()
    }

    // tracking the state of the current index of word list
    const [currentIndex, setIndex] = useState(0)

    function nextWord() {

        // all words practiced
        if (currentIndex == practiceList.length - 1 || practiceList[currentIndex + 1].score == 5) {

            setEnd(true)
            endModal.current = setTimeout(() => {
                setShowModal(true)
                setContent("Practice complete, see you tomorrow!")
            }, 300)
            
            endQuit.current = setTimeout(() => {
                togglePractice()
            }, 5000)

        } else {

            setIndex(prevIndex => prevIndex + 1)

        }
    }

    // handling forget, maybe and remember
    function handleForget() {

        setShowModal(true)
        setContent(practiceList[currentIndex].definition)
        practiceList[currentIndex].score -= 1
        localStorage.setItem('vocabs', JSON.stringify(practiceList))

    }

    function handleMaybe() {

        setShowModal(true)
        setContent(practiceList[currentIndex].definition)
        localStorage.setItem('vocabs', JSON.stringify(practiceList))

    }

    function handleRemember() {

        practiceList[currentIndex].score += 1
        localStorage.setItem('vocabs', JSON.stringify(practiceList))

        nextWord()
    }

    // going back to homepage
    function goBack() {
        togglePractice()
    }

    // displayed component
    return (
        <>
        <h2>Practice Mode</h2>
        <div className="practice-card">
            <p>{practiceList[currentIndex].word}</p>
        </div>

        <div className="recall-btn-bar">
            <div className="recall-btn forget" onClick={handleForget}>Forget</div>
            <div className="recall-btn maybe" onClick={handleMaybe}>Maybe</div>
            <div className="recall-btn remember" onClick={handleRemember}>Remember</div>
        </div>
        
        <button className='back-btn' onClick={goBack}>← Back</button>
        
        <Modal isOpen={showModal} handleModalClose={handleModalClose} content={content} />
        </>
    )

}

export default Practice