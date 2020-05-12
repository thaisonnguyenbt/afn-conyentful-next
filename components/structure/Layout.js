import Header from './header/Header'
import Footer from './Footer'
import Head from 'next/head';

const Layout = props => (
    <>
        <Head>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        </Head>
        <div className="root responsivegrid afn">
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 aem-Grid--small--12 aem-Grid--medium--12 ">
                <Header />
                <div className="responsivegrid p-page-wrapper container aem-GridColumn--small--none aem-GridColumn--offset--medium--1 aem-GridColumn--medium--none aem-GridColumn--default--none aem-GridColumn--medium--10 aem-GridColumn aem-GridColumn--small--12 aem-GridColumn--offset--small--0 aem-GridColumn--default--10 aem-GridColumn--offset--default--1">
                    <div className="aem-Grid aem-Grid--default--10 aem-Grid--medium--12 aem-Grid--small--12">
                    {props.children}
                    </div>
                </div>
            </div>
            <div className="viewport-bottom">
                <Footer/>
            </div>
        </div>
    </>
);
  
export default Layout;