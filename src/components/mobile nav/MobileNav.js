import { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MobileNav.scss';
import '../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css';
import SearchInput from '../search-input/SearchInput';
import Search from '../../pages/user/search/Search';
import MenuNavDisplay from './menu-nav/MenuNavDisplay';

const MobileNav = () => {
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
                    url: 'coming-soon'
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

    const [isDisplayNoti, setIsDisplayNoti] = useState(false);
    const notiRef = useRef(null)

    async function handelDisplayNoti() {
        setIsDisplayNoti(!isDisplayNoti);

    }



    return (
        <div className='mobile-nav'>
            <div className='mobile-nav-menu'>
                {/* <div className='mobile-nav-menu-icon'>
                    <i className='bx bx-menu'></i>
                </div>
                <div className='mobile-nav-menu-items'>
                    rfeddfjkkj
                </div> */}

                <div className='mobile-nav-menu-icon' ref={notiRef} onClick={() => handelDisplayNoti()} >
                    <div className='mobile-nav-menu-icon-bot'>
                        <i className='bx bx-menu'></i>
                    </div>
                </div>

                <div className={isDisplayNoti ? 'mobile-nav-menu-wrapper active' : 'mobile-nav-menu-wrapper hidden'}>
                    <MenuNavDisplay navArr={navArr} notiRef={notiRef} onClickOutside={() => { setIsDisplayNoti(false) }} />
                </div>

            </div>
            <div className='mobile-nav-search'>
                <SearchInput />
            </div>
        </div>
    )
}

export default MobileNav;