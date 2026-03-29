import locationIcon from "./location.png";
import phoneIcon from "./phone.png";
import emailIcon from "./email.png";

const FOOTER_CONTACT_INFO = {
    title: "Contact Us",
    links: [
        { 
            icon: locationIcon, 
            value: (
                "City Hall Complex, Brgy. Fort,\n" +
                "Marawi City, Lanao del Sur"
            )
        },
        { icon: phoneIcon, value: "+639234567891" },
        { icon: emailIcon, value: "cgso@gmail.com" }
    ],
};

export default FOOTER_CONTACT_INFO;
