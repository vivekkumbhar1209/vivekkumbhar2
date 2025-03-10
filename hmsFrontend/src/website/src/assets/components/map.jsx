import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapSection = () => {
    return(
        <div className="mapdiv text-center p-4 w-full md:w-[80%] bg-opacity-90 mx-auto mb-10">
            {/* Responsive Map Container */}
            <div className="relative w-full h-0 pb-[35%] rounded-2xl overflow-hidden">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2559677875247!2d73.78305487496517!3d18.60755328250295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9c9c2fd8f09%3A0x6dacfbc00175765b!2sFORTUNE%20HOSPITAL!5e0!3m2!1sen!2sin!4v1740985075912!5m2!1sen!2sin"
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default MapSection;

