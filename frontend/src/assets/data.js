// Waste
import b_img from "./biodegradable.png";
import nb_img from "./non-bio.png";
import r_img from "./recycle.png";
import nr_img from "./non-recycle.png";
import e_img from "./e-waste.png";

// Footer
import facebook from "./facebook.png"
import instagram from "./instagram.png"
import youtube from "./youtube.png"

// Contacts
import locationIcon from "./location.png";
import phoneIcon from "./phone.png";
import emailIcon from "./email.png";

const WASTE = [
    {
        id: 1,
        name: "Biodegradables",
        image: b_img,
    },
    {
        id: 2,
        name: "Non-Biodegradables",
        image: nb_img,
    },
    {
        id: 3,
        name: "Recyclables",
        image: r_img,
    },
    {
        id: 4,
        name: "Non-Recyclables",
        image: nr_img,
    },
    {
        id: 5,
        name: "E-Wastes",
        image: e_img,
    },
];

export default WASTE;

const FOOTER_LINKS = [
    {
        title: "Learn More",
        links: [
            "About Us",
        ],
    },
];

export default FOOTER_LINKS;

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

export const SOCIALS = {
    title: "Social",
    links: [
        facebook,
        instagram,
        youtube,
    ],
};

export default SOCIALS;