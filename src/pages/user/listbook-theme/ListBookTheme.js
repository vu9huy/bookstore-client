import { useParams } from 'react-router-dom';
import Footer from '../../../layouts/footer/Footer';
import Header from '../../../layouts/header/Header';
import './ListBookTheme.scss';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Import React Query 
import { useQuery, } from '@tanstack/react-query';
import { getBooksByListIdsIdApi, getDisplayByIdApi } from '../../../utils/api/CallApi';
import BookItem3 from '../../../components/book-item-3/BookItem3';

// const test = ['62b03e7f8dd30658d4ef8647', '62b03e7f8dd30658d4ef8648', '62b03e7f8dd30658d4ef8649', '62b03e7f8dd30658d4ef864a', '62b03e7f8dd30658d4ef8651', '62b03e7f8dd30658d4ef864f', '62b03e7f8dd30658d4ef864e', '62b03e7f8dd30658d4ef8650', '62b03e8c8dd30658d4ef8652', '62b03e7f8dd30658d4ef864c', '62b03e8c8dd30658d4ef8655', '62b03e8c8dd30658d4ef8656', '62b03e7f8dd30658d4ef864b', '62b03e8c8dd30658d4ef8653', '62b03e8c8dd30658d4ef8654', '62b03e8c8dd30658d4ef8657', '62b03e8c8dd30658d4ef8658', '62b03e8c8dd30658d4ef8659', '62b03e8c8dd30658d4ef865a', '62b03e8c8dd30658d4ef865b', '62b03e8c8dd30658d4ef865c', '62b03e8c8dd30658d4ef865d', '62b03e8c8dd30658d4ef865e', '62b03e7f8dd30658d4ef864d', '62b03e8c8dd30658d4ef865f', '62b03e8c8dd30658d4ef8660', '62b03e8c8dd30658d4ef8661', '62b03e8c8dd30658d4ef8662']


const ListBookTheme = () => {
    const params = useParams();
    const displayId = params.displayId;
    // console.log('displayId', displayId);

    const { isLoading, data, error } = useQuery([`displayid-${displayId}`], async () =>
        await getDisplayByIdApi(displayId), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })
    const display = data?.data?.data;
    // console.log('display', display);
    const listBookIds = display?.listBook;
    // console.log('listBookIds', listBookIds);


    const { isLoading: isLoading2, data: data2, error: error2 } = useQuery([`listbookids-${listBookIds}`], async () =>
        await getBooksByListIdsIdApi(listBookIds), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })
    // console.log('data2', data2);
    const result = data2?.data?.data;
    const listBook = result || [];
    // console.log('listBook', listBook);


    return (
        <>
            <Header />
            <div className='body'>
                <div className='list-books-theme-container'>
                    <div className='list-books-theme-wrapper'>
                        <div className='list-books-theme-title-wrapper'>
                            <div className='list-books-theme-title title'>{display?.name}</div>
                        </div>
                        <div className="list-books-theme" >
                            {listBook?.map((book, index) => {
                                return (
                                    <div className='list-books-theme-item' key={index}>
                                        <BookItem3 isAddButton={true} isLoading={isLoading} bookId={book.id} imageUrl={book.imageUrl} bookName={book.bookName} author={book.author} salePrice={Math.round(book.price * 85 / 100 * 100) / 100} defaultPrice={book.price} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default ListBookTheme;


