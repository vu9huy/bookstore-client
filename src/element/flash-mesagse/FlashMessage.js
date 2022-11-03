import './FlashMessage.scss';

const FlashMessage = ({ type }) => {

    return (
        <div className='flash-massage'>
            <div className='flash-massage-title'>
                Error
            </div>
            <div className='flash-massage-content'>
                Please login to add books to your cart.
            </div>
        </div>
    )

}

export default FlashMessage;
