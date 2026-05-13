import SITE_DATA from "@/constants";


const buildWhatsAppURL = () =>
  `https://wa.me/${SITE_DATA.phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Namaste Sir!, I would like to order.")}`;


export default buildWhatsAppURL
