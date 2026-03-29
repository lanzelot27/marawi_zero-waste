import { Link } from "react-router-dom";
import FOOTER_LINKS from "../assets/footer_links";
import FOOTER_CONTACT_INFO from "../assets/footer_contact";
import SOCIALS from "../assets/socials";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="flexCenter pb-12 pt-10"
      style={{
        backgroundColor: "#587A57",
        color: "white",
        fontFamily: "Caladea, serif",
        fontWeight: "normal",
        letterSpacing: "0.05em",
      }}
    >
      <div className="max_padd_container flex w-full flex-col gap-6">
        <div className="flex flex-col items-start md:flex-row md:items-center gap-[10%]">
          <div className="flex flex-col mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" height={50} width={50} />
              <span
                style={{
                  fontSize: "28px",
                  fontFamily: "Calistoga, sans-serif",
                }}
              >
                MARAWaste
              </span>
            </Link>
            <p
              className="mt-2 text-white text-sm"
              style={{
                fontSize: "13px",
                textAlign: "left",
                marginLeft: "20px",
                fontWeight: "normal",
                fontFamily: "Caladea, serif",
              }}
            >
              MARAWaste seeks to address <br />
              the existing obstacles and <br />
              inefficiencies in waste collection <br />
              and disposal within MSU-Marawi, <br />
              ultimately fostering a more <br />
              sustainable and eco-conscious <br />
              campus environment.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 sm:justify-between md:flex-1">
            {FOOTER_LINKS.map((col) => (
              <FooterColumn title={col.title} key={col.title}>
                <ul className="flex flex-col gap-2 regular-14 text-white">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link to="/" className="text-white" style={{ fontFamily: "Caladea, serif", fontWeight: "normal" }}>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            <div className="flex flex-col">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <div key={link.value} className="flex items-center">
                    <img
                      src={link.icon}
                      alt={link.value}
                      height={30}
                      width={35}
                      style={{ marginRight: "10px" }}
                    />
                    <p className="regular-14 footer-address text-white" style={{ fontFamily: "Caladea, serif", fontWeight: "normal" }}>
                      {link.value}
                    </p>
                  </div>
                ))}
              </FooterColumn>
            </div>
            <div className="flex mt-24">
              <FooterColumn>
                <ul className="flex gap-5">
                  {SOCIALS.links.map((link) => (
                    <li key={link}>
                       <span className="text-white">
                        <img
                          src={link}
                          alt="socialIcon"
                          height={30}
                          width={30}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
        <p className="text-center regular-14 text-white mt-4" style={{ fontFamily: "Caladea, serif" }}>
          @2024 MARAWaste. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-10 whitespace-nowrap" style={{ fontSize: "20px", fontFamily: "Calistoga, serif" }}>{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
