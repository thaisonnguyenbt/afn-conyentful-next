import React from 'react'
import {Link} from 'react-router-dom'
import logo from "../../images/common/logo/afn-logo-white.svg"
import PropTypes from 'prop-types'

/**
 * AFN Footer component
 * 
 * @param {*} siteMetadata 
 *      Metadata read from gatsby-config.js
 */
const Footer = ({ siteMetadata, currentLanguage }) => {

    siteMetadata = {"title":"Asian Food Network | The Home Of Asian Recipes & Cuisine","description":"Asian Food Network (AFN) is the world's home of Asian Recipes & Cuisine. Discover authentic asian recipes, asian travel guides on Asian Food Network. Easy Chinese recipes, Malaysian food recipes, top Filipino food recipes.","facebook":"asianfoodnetworkofficial","pinterest":"asianfoodnetwork","instagram":"asianfoodnetwork"};
    currentLanguage = 'en';
    return <div className={"xf-content-height"}>
        <div className={"aem-Grid aem-Grid--12 aem-Grid--default--12 "}>
            <div className={"footer aem-GridColumn aem-GridColumn--default--12"}>
                <footer className={"o-footer"}>
                    <div className={"o-footer__content"}>
                        <div className={"a-footer__logo"}>
                            <Link to={currentLanguage === 'en' ? '/' : '/' + currentLanguage}>
                                <img src={logo} title={ siteMetadata.title } alt={ siteMetadata.description } className={" ls-is-cached lazyloaded"} />
                            </Link>
                        </div>
                    </div>
                    <div className={"o-footer__menu"}>
                        <div className={"m-footer__menuList"}>
                            <ul>
                                <li>
                                    <Link to={"/" + currentLanguage + "/about"}>About</Link>
                                </li>
                                <li>
                                    <Link to={"/" + currentLanguage + "/contact-us"}>Contact Us</Link>
                                </li>
                                <li>
                                    <Link to='/'>Cookie Policy</Link>
                                </li>
                                <li>
                                    <Link to={"/" + currentLanguage + "/info/privacy-policy"}>Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to={"/" + currentLanguage + "/info/terms-and-conditions"}>Terms and Conditions</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={"m-footer__menuList -socialMedia"}>
                            <ul>
                                <li>
                                    <a href={ "https://www.facebook.com/" + siteMetadata.facebook} target="_blank" rel="noopener noreferrer" className={"a-socialMediaIcon -facebook"}>{null}</a>
                                </li>
                                <li>
                                    <a href={ "https://www.pinterest.com/" + siteMetadata.pinterest} target="_blank" rel="noopener noreferrer" className={"a-socialMediaIcon -pinterest"}>{null}</a>
                                </li>
                                <li>
                                    <a href={ "https://www.instagram.com/" + siteMetadata.instagram} target="_blank" rel="noopener noreferrer" className={"a-socialMediaIcon -instagram"}>{null}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"a-footer__footnote"}>
                        © 2019 Discovery Networks International. All rights reserved
                    </div>
                </footer>
            </div>
        </div>
    </div>
}

Footer.propTypes = {
    siteMetadata : PropTypes.shape({
        title: PropTypes.string,
        description : PropTypes.string,
        facebook: PropTypes.string,
        pinterest : PropTypes.string,
        instagram: PropTypes.string
    }).isRequired,
}

Footer.defaultProps = {
    siteMetadata : {
        title: '',
        description : '',
        facebook: '',
        pinterest : '',
        instagram: ''
    }
}

export default Footer