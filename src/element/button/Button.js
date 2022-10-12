import './Button.scss';

const Button = ({ content, icon, type }) => {

    return (
        <div className="button" >
            {icon ? icon : ''}
            {content}
        </div>
    )
}

export default Button;
