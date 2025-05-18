import EntryField from './EntryField.jsx'
import WordList from './WordList.jsx'
import Practice from './Practice.jsx'
import Modal from './Modal.jsx'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  // modal
  const [showModal, setShowModal] = useState(false)

  function handleModalClose() {
    setShowModal(false)
    togglePractice()
  }

  // managing vocab pouch updates and practice
  const [wordList, setWordList] = useState(JSON.parse(localStorage.getItem('vocabs')) || [])
  const [isPracticing, setPracticing] = useState(false)

  useEffect(() => {
    localStorage.setItem('vocabs', JSON.stringify(wordList))
  }, [wordList])

  function togglePractice() {
    setPracticing(!isPracticing)
  }

  function addVocab(newVocab) {

    newVocab = {...newVocab, 'score':0, 'timeAdded': Date.now()}
    setWordList(prevWordList => (
      [...prevWordList, newVocab]
    ))

  }

  function practiceVocab(){

    // decaying the score to simulate forgetting words
    for (const word of wordList) {

      const monthRelapse = Math.floor((Date.now() - word.timeAdded)/1000/60/60/24/30)

      if (monthRelapse >= 1)  {
        word.score -= monthRelapse
        word.timeAdded = Date.now()
      }
    }

    return wordList.sort((a, b) => {
      if (a.score > b.score) {
          return 1
      }

      if (b.score > a.score) {
          return -1
      }

      return 0
    })

  }

  // conditional rendering for components
  if (isPracticing) {

    if (wordList.length == 0) {
      return (

      <>
        <div className='entry-field-area'>
          <EntryField addVocab={addVocab}/>
        </div>
    
        <div className='word-list-area'>
          <h3>Pouch</h3>
          <WordList wordList={wordList} />
          <button className='practice-btn' onClick={togglePractice}>Practice</button>
        </div>

        <Modal isOpen={true} handleModalClose={handleModalClose} content={"Vocab pouch empty!"} />
      </>
        
      )     
    }

    if (practiceVocab()[0].score == 5) {
      return (

      <>
        <div className='entry-field-area'>
          <EntryField addVocab={addVocab}/>
        </div>
    
        <div className='word-list-area'>
          <h3>Pouch</h3>
          <WordList wordList={wordList} />
          <button className='practice-btn' onClick={togglePractice}>Practice</button>
        </div>

        <Modal isOpen={true} handleModalClose={handleModalClose} content={"All Words Mastered"} />
      </>
        
      )
    }

    return (
      <div className="practice-area">
        <Practice togglePractice={togglePractice} practiceList={practiceVocab()} />
      </div>
    )

  } else {

    return (
      <>
      <div className='entry-field-area'>
        <EntryField addVocab={addVocab}/>
      </div>
  
      <div className='word-list-area'>
        <h3>Pouch</h3>
        <WordList wordList={wordList} />
        <button className='practice-btn' onClick={togglePractice}>Practice</button>
      </div>

      </>
    )

  }



}

export default App