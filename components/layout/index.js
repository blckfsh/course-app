import Navigation from "../navigation";
import Redeem from "../dashboard/redeem";
import Students from "../dashboard/students";

export default function Layout(props) {
    return (
        <div>
            <Navigation name={props.name} isCodeRedeemed={props.isCodeRedeemed} onSignOutHandler={props.onSignOutHandler} />      
        </div>
    )
}