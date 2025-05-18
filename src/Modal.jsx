import './Modal.css'

function Modal({ isOpen, handleModalClose, content }){

    if (!isOpen) return null

    return (

        <div className='overlay'>

            <div className='main-box'>

                <p>{content}</p>

                <div className='close-btn' onClick={handleModalClose}>Close</div>

            </div>

        </div>
       
    )

}

export default Modal