import React, { memo } from 'react';
import { useLocation } from 'react-router';
import { LinkStyled, NavList } from './show/Navs.styled';

const LINKS = [
    { to: '/', text: 'Home' },
    { to: '/starred', text: 'starred' },
];

// eslint-disable-next-line react/function-component-definition
const Navs = () => {
    const location = useLocation();
    return (
        <div>
            <NavList>
                {LINKS.map((item) => (
                    <li key={item.to}>
                        <LinkStyled
                            to={item.to}
                            className={
                                item.to === location.pathname ? 'active' : ''
                            }
                        >
                            {item.text}
                        </LinkStyled>
                    </li>
                ))}
            </NavList>
        </div>
    );
};

export default memo(Navs);
