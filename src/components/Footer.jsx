import './Footer.css'
import LogoPlaceholder from '../assets/mata-technologies.jpg'

function Footer() {
    return (
        <footer className="my-footer">
            <div className="footer-left">
                <div className="footer-company">
                    <div className="flex gap-2">
                        <img className="footer-logo hidden md:block lg:block" src={LogoPlaceholder} alt="Mata Technologies logo" />
                        <div className="company-name text-[10px] lg:text-[16px]">Mata Technologies Challenge</div>
                    </div>
                    <div className="copyright text-[10px] lg:text-[14px]">© 2026 Neil Anthony Balbutin. Intern Skills Showcase submission.</div>
                </div>
            </div>

            <div className="footer-right">
                <div className="footer-location hidden md:block lg:block">📍 Cebu City, Philippines</div>
            </div>
        </footer>
    )
}

export default Footer