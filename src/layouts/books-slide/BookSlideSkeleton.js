import './BookSlide.scss';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BookItem2 from '../../components/book-item-2/BookItem2';


const BookSlideSkeleton = () => {
    const listBooks = [0, 1, 2, 3, 4];
    const listBooks2 = [0, 1, 2, 3, 4, 5];

    return (
        <>
            <div className='book-slide'>
                <div className='book-slide-header'>
                    <div className='book-slide-header-name'>
                        <Skeleton width={400} height={38} />
                    </div>
                    <Skeleton width={220} height={50} />
                </div>
                <div className='list-skeleton'>
                    {listBooks.map(list =>
                        <Skeleton
                            height={300}
                            width={220}
                            key={list}
                        />
                    )}
                </div>
            </div>
            <div className='book-slide'>
                <div className='book-slide-header'>
                    <div className='book-slide-header-name'>
                        <Skeleton width={400} height={38} />
                    </div>
                    <Skeleton width={220} height={50} />

                </div>

                <div className='list-skeleton'>
                    {listBooks.map(list =>
                        <Skeleton
                            height={300}
                            width={220}
                            key={list}
                        />
                    )}
                </div>
            </div>

            <div className='book-table'>
                <div className='book-table-header'>
                    <div className='book-table-header-name'>
                        <Skeleton width={300} height={32} />
                    </div>
                    <Skeleton width={200} height={40} />
                </div>
                <div className='book-table-body'>
                    {listBooks2?.map((book, index) => {
                        return (
                            <div className='book-table-body-item' key={book}>
                                <BookItem2 isLoading={true} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='book-slide'>
                <div className='book-slide-header'>
                    <div className='book-slide-header-name'>
                        <Skeleton width={400} height={38} />
                    </div>
                    <Skeleton width={220} height={50} />

                </div>

                <div className='list-skeleton'>
                    {listBooks.map(list =>
                        <Skeleton
                            height={300}
                            width={220}
                            key={list}
                        />
                    )}
                </div>
            </div>
        </>

    )

}


export default BookSlideSkeleton;