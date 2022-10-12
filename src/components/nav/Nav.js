import { Link, NavLink } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
    const navArr = [
        {
            alias: 'post',
            name: 'Posts',
            link: '',
            type: 'none'
        },
        {
            alias: 'best-seller',
            name: 'Best Sellers',
            link: '',
            type: 'none'
        },
        {
            alias: 'new-book',
            name: 'New Books',
            link: '',
            type: 'none'
        },
        {
            alias: 'fiction',
            name: 'Fiction',
            link: '',
            type: 'fiction'
        },
        {
            alias: 'non-fiction',
            name: 'Nonfiction',
            link: '',
            type: 'non-fiction'
        },
        {
            alias: 'kid',
            name: 'Kids',
            link: '',
            type: 'none'
        },
        {
            alias: 'today-deal',
            name: `Today's Deals`,
            link: '',
            type: 'none'
        }
    ]
    return (
        <div className='nav'>
            {navArr.map(navItem => {
                return (
                    <NavLink to={`/${navItem.alias}`} key={navItem.alias} className={({ isActive }) => (isActive ? 'nav-item  active' : 'nav-item')}>
                        {/* <div className='nav-item-name'> */}
                        {navItem.name}
                        {/* </div> */}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default Nav;