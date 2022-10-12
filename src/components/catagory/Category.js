
import './Category.scss';

export const Category = ({ categoryArr }) => {

    return (
        <div className='category'>

        </div>
    )
}

export const FictionCategory = () => {
    const fictionCategoryArr = [
        {
            alias: 'romance',
            name: 'Romance',
            link: '',
        },
        {
            alias: 'best-sellers',
            name: 'Best Sellers',
            link: '',
        },
        {
            alias: 'new-book',
            name: 'New Books',
            link: '',
        },
        {
            alias: 'fiction',
            name: 'Fiction',
            link: '',
        },
        {
            alias: 'non-fiction',
            name: 'Nonfiction',
            link: '',

        },
        {
            alias: 'kid',
            name: 'Kids',
            link: '',
        },
        {
            alias: 'today-deal',
            name: `Today's Deals`,
            link: '',
        }
    ]
    return (
        <Category categoryArr={fictionCategoryArr} />
    )
}

export const NonFictionCategory = () => {
    const nonFictionCategoryArr = [

    ]
    return (
        <Category categoryArr={nonFictionCategoryArr} />
    )
}