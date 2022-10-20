import { useEffect, useState } from 'react';
import BookSlide from '../../layouts/books-slide/BookSlide';
import { getAllDisplayApi } from '../../utils/api/CallApi';
import './RandomDisplay.scss';

const RandomDisplay = () => {
    const [display, setDisplay] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        setIsLoading(true)
        const response = await getAllDisplayApi();
        const displayList = response.data?.data || [];
        setIsLoading(false)

        function getRandom(list) {
            return list[Math.floor((Math.random() * list.length))];
        }

        const displayRandom = getRandom(displayList);
        setDisplay(displayRandom)
        // console.log(displayRandom);
    }, []);

    return (
        <div className="random-display" >
            <BookSlide display={display} key={display.displayId} isLoading4={isLoading} />
        </div>
    )
}

export default RandomDisplay;