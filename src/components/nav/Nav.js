import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
    const navArr = [
        {
            alias: 'post',
            name: 'Posts',
            link: '',
            isHaveCategory: false,
            type: 'none'
        },
        {
            alias: 'best-seller',
            name: 'Best Sellers',
            link: '',
            isHaveCategory: false,
            type: 'none'
        },
        {
            alias: 'new-book',
            name: 'New Books',
            link: '',
            isHaveCategory: false,
            type: 'none'
        },
        {
            alias: 'fiction',
            name: 'Fiction',
            link: '',
            type: 'fiction',
            isHaveCategory: true,
            category: [
                {
                    name: 'Romance',
                    url: 'romance'
                },
                {
                    name: 'Comics & Graphic Novels',
                    url: 'comics-graphic-novels'
                },
                {
                    name: 'Historical Fiction',
                    url: 'historical-fiction'
                },
                {
                    name: 'Horror',
                    url: 'horror'
                },
                {
                    name: 'Literature & Fiction',
                    url: 'literature-fiction'
                },
                {
                    name: 'Manga',
                    url: 'manga'
                },
                {
                    name: 'Mystery, Thrillers, & Crime',
                    url: 'mystery-thrillers-true-crime'
                },
                {
                    name: 'Poetry',
                    url: 'poetry'
                },
                {
                    name: 'Science Fiction',
                    url: 'science-fiction'
                },
                {
                    name: 'Fantasy',
                    url: 'fantasy'
                },
            ]
        },
        {
            alias: 'non-fiction',
            name: 'Nonfiction',
            link: '',
            type: 'non-fiction',
            isHaveCategory: true,
            category: [
                {
                    name: 'Coming Soon',
                    url: ''
                },
            ]
        },
        {
            alias: 'kid',
            name: 'Kids',
            link: '',
            isHaveCategory: false,
            type: 'none'
        },
        {
            alias: 'today-deal',
            name: `Today's Deals`,
            link: '',
            isHaveCategory: false,
            type: 'none'
        }
    ]

    // const [position, setPosition] = useState(window.pageYOffset)
    // const [visible, setVisible] = useState(true)
    // useEffect(() => {
    //     const handleScroll = () => {
    //         let moving = window.pageYOffset

    //         setVisible(position > moving);
    //         setPosition(moving)
    //     };
    //     window.addEventListener("scroll", handleScroll);
    //     return (() => {
    //         window.removeEventListener("scroll", handleScroll);
    //     })
    // })

    // const cls = visible ? "visible" : "hidden";


    return (
        <div
            className={`nav`}
        //  className={`nav ${cls}`}
        >
            {navArr.map(navItem => {
                return (
                    <div key={navItem.alias} className='nav-item-wrapper'>
                        <NavLink to={`/${navItem.alias}`} className={({ isActive }) => (isActive ? 'nav-item  active' : 'nav-item')}>
                            {/* <div className='nav-item-name'> */}
                            {navItem.name}
                            {/* </div> */}
                        </NavLink>
                        {navItem.isHaveCategory && <div className='nav-item-category'>
                            {navItem.category?.map((category, index) => {
                                return (
                                    <Link to={`/${category.url}`} className='category-item' key={index}>
                                        {category.name}
                                    </Link>
                                )
                            })}
                        </div>}

                    </div>
                )
            })}
        </div>
    )
}

export default Nav;