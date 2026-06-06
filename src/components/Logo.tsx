import { Link } from 'react-router-dom';
import JobLogo from "../assets/JobLogo.svg";
export default function Logo({
    className = "" 
} : {className? : string}) {
    return (
        <Link to="/" className ={`${className}`}>
   
                <span className="text-primary-500 text-2xl">
                    <img
                    src={JobLogo}
                    alt="My Job logo"
                    className="w-8 h-8 object-contain"
                    />
                </span>
                MyJob
    
    
        </Link>
    )
}